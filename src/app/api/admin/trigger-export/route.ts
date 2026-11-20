import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as XLSX from "xlsx";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const querySlotId = searchParams.get("slotId");
    const body = await req.json().catch(() => ({}));
    const targetSlotId = body.slotId || querySlotId;

    // 1. Determine target slot
    let slot = null;
    if (targetSlotId) {
      slot = await prisma.examSlot.findUnique({
        where: { id: targetSlotId },
      });
    }

    if (!slot) {
      // Find slot with candidate attempts, or the most recent slot
      const slotWithAttempts = await prisma.examSlot.findFirst({
        where: { attempts: { some: {} } },
        orderBy: { createdAt: "desc" },
      });
      slot = slotWithAttempts || await prisma.examSlot.findFirst({
        orderBy: { createdAt: "desc" },
      });
    }

    if (!slot) {
      return NextResponse.json(
        { error: "No examination slots found to export." },
        { status: 404 }
      );
    }

    // 2. Fetch all student attempts and records for that slot
    const attempts = await prisma.examAttempt.findMany({
      where: { slotId: slot.id },
      include: {
        student: {
          include: {
            school: true,
            answers: {
              include: {
                question: true,
              },
            },
          },
        },
      },
      orderBy: [
        { score: "desc" },
        { timeTakenSec: "asc" },
        { submittedAt: "asc" },
      ],
    });

    // 3. Prepare Sheet 1: Full Candidate Roster
    const fullRosterData = attempts.map((att, idx) => ({
      "Rank #": idx + 1,
      "Student Name": att.student.name,
      "Contact Phone": att.student.phone,
      "Email Address": att.student.email || "N/A",
      "Class / Standard": att.student.standard,
      "Section": att.student.section,
      "School Name": att.student.school.schoolName,
      "School Code": att.student.school.schoolCode,
      "Two-Wheeler Experience": att.student.ridingExperience,
      "Residential Address": att.student.address,
      "Exam Score": att.score,
      "Total Marks": att.totalQuestions,
      "Percentage": `${Math.round((att.score / att.totalQuestions) * 100)}%`,
      "Time Taken (Seconds)": att.timeTakenSec,
      "Time Taken (MM:SS)": `${Math.floor(att.timeTakenSec / 60)}m ${att.timeTakenSec % 60}s`,
      "Result Status": att.score >= 18 ? "PASSED (Certified)" : "PARTICIPATED",
      "Submission Timestamp": att.submittedAt.toISOString(),
      "Session Token": att.student.sessionToken,
    }));

    // 4. Prepare Sheet 2: Top 10 Merit Leaderboard
    const top10LeaderboardData = attempts.slice(0, 10).map((att, idx) => ({
      "Merit Rank": idx + 1,
      "Badge Tier": idx === 0 ? "Gold Shield Winner" : idx === 1 ? "Silver Shield Winner" : idx === 2 ? "Bronze Shield Winner" : "Merit Gift Winner",
      "Student Name": att.student.name,
      "School Name": att.student.school.schoolName,
      "School Code": att.student.school.schoolCode,
      "Score (Out of 30)": att.score,
      "Completion Time (Sec)": att.timeTakenSec,
      "Completion Time (MM:SS)": `${Math.floor(att.timeTakenSec / 60)}m ${att.timeTakenSec % 60}s`,
      "Riding Profile": att.student.ridingExperience,
      "Coordinator Contact": att.student.school.phone,
    }));

    // 5. Prepare Sheet 3: School Performance Breakdown
    const schoolStatsMap = new Map<string, {
      schoolName: string;
      schoolCode: string;
      teacherName: string;
      teacherPhone: string;
      totalCandidates: number;
      passedCount: number;
      totalScore: number;
    }>();

    for (const att of attempts) {
      const code = att.student.school.schoolCode;
      if (!schoolStatsMap.has(code)) {
        schoolStatsMap.set(code, {
          schoolName: att.student.school.schoolName,
          schoolCode: code,
          teacherName: att.student.school.teacherName,
          teacherPhone: att.student.school.phone,
          totalCandidates: 0,
          passedCount: 0,
          totalScore: 0,
        });
      }
      const item = schoolStatsMap.get(code)!;
      item.totalCandidates++;
      if (att.score >= 18) item.passedCount++;
      item.totalScore += att.score;
    }

    const schoolBreakdownData = Array.from(schoolStatsMap.values()).map((s) => ({
      "School Name": s.schoolName,
      "School Code": s.schoolCode,
      "Teacher Coordinator": s.teacherName,
      "Coordinator Phone": s.teacherPhone,
      "Total Candidates": s.totalCandidates,
      "Certified / Passed": s.passedCount,
      "Pass Rate (%)": s.totalCandidates > 0 ? `${Math.round((s.passedCount / s.totalCandidates) * 100)}%` : "0%",
      "Average Score": s.totalCandidates > 0 ? (s.totalScore / s.totalCandidates).toFixed(1) : "0",
    }));

    // 6. Generate Multi-Sheet Excel Workbook with SheetJS (xlsx)
    const workbook = XLSX.utils.book_new();

    const wsFullRoster = XLSX.utils.json_to_sheet(
      fullRosterData.length > 0 ? fullRosterData : [{ Notice: "No candidates submitted for this slot yet." }]
    );
    const wsTop10 = XLSX.utils.json_to_sheet(
      top10LeaderboardData.length > 0 ? top10LeaderboardData : [{ Notice: "No merit candidates yet." }]
    );
    const wsSchools = XLSX.utils.json_to_sheet(
      schoolBreakdownData.length > 0 ? schoolBreakdownData : [{ Notice: "No school entries available." }]
    );

    XLSX.utils.book_append_sheet(workbook, wsFullRoster, "Full Candidate Roster");
    XLSX.utils.book_append_sheet(workbook, wsTop10, "Top 10 Leaderboard");
    XLSX.utils.book_append_sheet(workbook, wsSchools, "School Breakdown");

    // Write workbook to buffer
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    const safeSlotName = slot.slotName.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 30);
    const filename = `MWS_3F_Report_${safeSlotName}_${new Date().toISOString().split("T")[0]}.xlsx`;

    // 7. Nodemailer SMTP Email Dispatch
    const ngoAdminEmail = process.env.NGO_ADMIN_EMAIL || "director@mahalwelfare.org";

    const emailSubject = `[3F Road Safety] Automated Excel Report & Audit: ${slot.slotName}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 20px; border: 1px solid #333; background: #12161f; color: #f0f6fc; border-radius: 12px;">
        <h2 style="color: #ff5722; margin-top: 0;">Mahal Welfare Services (Est. 2011)</h2>
        <h3 style="color: #ffc107; margin-top: 0;">3F Road Safety Campaign — Automated Slot Report</h3>
        <p>Dear NGO Administrator,</p>
        <p>The examination cycle for slot <strong>${slot.slotName}</strong> has concluded. Please find the multi-sheet Excel dossier attached for your records and certificate/gift distribution.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #2a3441;">
            <td style="padding: 8px 0; color: #90a4ae;">Total Candidates Evaluated:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #fff;">${attempts.length}</td>
          </tr>
          <tr style="border-bottom: 1px solid #2a3441;">
            <td style="padding: 8px 0; color: #90a4ae;">Top Rank Score:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #ff5722;">${attempts[0]?.score || 0} / 30</td>
          </tr>
          <tr style="border-bottom: 1px solid #2a3441;">
            <td style="padding: 8px 0; color: #90a4ae;">Top Rank Time:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #ffc107;">${attempts[0]?.timeTakenSec || 0} seconds</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #90a4ae;">Export Timestamp:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #2e7d32;">${new Date().toUTCString()}</td>
          </tr>
        </table>

        <div style="padding: 12px; background: #1c222c; border-left: 4px solid #ff5722; border-radius: 6px; font-size: 13px; color: #cfd8dc;">
          <strong>Data Privacy &amp; Purge Confirmation:</strong> Student temporary question-by-question response buffers are scheduled for immediate purge from active database storage upon successful transmission of this report. Candidate scores and rankings remain archived permanently.
        </div>
        
        <p style="margin-top: 25px; font-size: 12px; color: #78909c;">
          3F Road Safety Campaign • Focus • Fight • Foster<br/>
          Mahal Welfare Services, Est. 2011
        </p>
      </div>
    `;

    const mailResult = await sendEmail({
      to: ngoAdminEmail,
      subject: emailSubject,
      text: `Automated 3F Road Safety Report for ${slot.slotName}. Total candidates: ${attempts.length}. Attachment: ${filename}`,
      html: emailHtml,
      attachments: [
        {
          filename,
          content: excelBuffer,
          contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      ],
    });

    // 8. DATA PURGE PIPELINE:
    // Once SMTP confirms dispatch, purge/delete individual student response buffer data
    let purgedResponsesCount = 0;
    if (mailResult.success) {
      const studentIdsInSlot = attempts.map((a) => a.studentId);
      if (studentIdsInSlot.length > 0) {
        const purgeResult = await prisma.studentAnswer.deleteMany({
          where: {
            studentId: { in: studentIdsInSlot },
          },
        });
        purgedResponsesCount = purgeResult.count;
      }

      // Mark attempts as isExported = true
      await prisma.examAttempt.updateMany({
        where: { slotId: slot.id },
        data: { isExported: true },
      });
    }

    return NextResponse.json({
      success: true,
      slotName: slot.id,
      filename,
      candidatesCount: attempts.length,
      purgedResponsesCount,
      recipient: ngoAdminEmail,
      mailResult,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Export pipeline error:", err);
    return NextResponse.json(
      { error: "Export pipeline error: " + err.message },
      { status: 500 }
    );
  }
}
