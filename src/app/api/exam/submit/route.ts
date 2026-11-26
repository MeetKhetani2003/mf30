import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { sessionToken, answers, timeTakenSec, forcedByTimer, forcedByViolation, violationReason } = await req.json();

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Session token required for submission." },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: { sessionToken },
      include: {
        slot: true,
        school: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student session not found." },
        { status: 404 }
      );
    }

    const slotId = student.slotId || "default-slot";

    // Check if already attempted
    let attempt = await prisma.examAttempt.findFirst({
      where: { studentId: student.id, slotId },
    });

    if (!attempt) {
      // Fetch all questions
      const allQuestions = await prisma.question.findMany({
        take: 30,
      });

      let score = 0;
      const studentAnswerPayloads: {
        studentId: string;
        questionId: string;
        selectedOption: string;
        isCorrect: boolean;
      }[] = [];

      for (const q of allQuestions) {
        const selected = answers && answers[q.id] ? String(answers[q.id]).toUpperCase() : "NONE";
        const isCorrect = selected === q.correctOption.toUpperCase();
        if (isCorrect) {
          score++;
        }

        studentAnswerPayloads.push({
          studentId: student.id,
          questionId: q.id,
          selectedOption: selected,
          isCorrect,
        });
      }

      // Record responses
      await prisma.studentAnswer.createMany({
        data: studentAnswerPayloads,
      });

      // Create ExamAttempt
      attempt = await prisma.examAttempt.create({
        data: {
          studentId: student.id,
          slotId: student.slotId || (await prisma.examSlot.findFirst())?.id || "default",
          score,
          totalQuestions: allQuestions.length || 30,
          timeTakenSec: Math.max(1, parseInt(timeTakenSec || "120", 10)),
        },
      });
    }

    // Calculate candidate rank in this batch
    const allSlotAttempts = await prisma.examAttempt.findMany({
      where: { slotId: attempt.slotId },
      orderBy: [
        { score: "desc" },
        { timeTakenSec: "asc" },
        { submittedAt: "asc" },
      ],
    });

    const userIndex = allSlotAttempts.findIndex((a) => a.studentId === student.id);
    const candidateRank = userIndex >= 0 ? userIndex + 1 : allSlotAttempts.length;
    const isTop10 = candidateRank <= 10;
    const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);

    // Send Result Email
    if (student.email) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const leaderboardUrl = `${appUrl}/portal/${sessionToken}/leaderboard`;

      await sendEmail({
        to: student.email,
        subject: `Your Mission 3F Examination Result: Score ${attempt.score}/${attempt.totalQuestions} (Rank #${candidateRank})`,
        text: `Hello ${student.name},\n\nYour Mission 3F Road Safety Digital Examination result is out!\n\nScore: ${attempt.score} / ${attempt.totalQuestions} (${percentage}%)\nBatch Rank: #${candidateRank} out of ${allSlotAttempts.length} candidates\n${isTop10 ? `\n🎉 CONGRATULATIONS! You have ranked in the TOP 10 of your batch! An official Mission 3F ISI Road Safety Helmet will be dispatched to your registered address:\n${student.address}\n` : ""}\nView the live batch leaderboard here: ${leaderboardUrl}\n\nMahal Welfare Services (Est. 2011)`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #fed7aa; border-radius: 16px; background-color: #fffaf5;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #ff6a00; margin: 0; font-size: 24px;">Mission 3F • Examination Results</h2>
              <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Mahal Welfare Society • Nangal (2011) &amp; Canada (2021)</p>
            </div>

            <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #f1f5f9; margin-bottom: 20px;">
              <p style="font-size: 15px; color: #1e293b; margin: 0 0 16px;">Dear <strong>${student.name}</strong>,</p>
              <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 20px;">
                Thank you for participating in the Mission 3F Digital Road Safety Examination. Your score and batch standing have been officially evaluated.
              </p>

              <div style="display: flex; gap: 12px; margin-bottom: 20px; background-color: #f8fafc; border-radius: 10px; padding: 16px; border: 1px solid #e2e8f0;">
                <div style="flex: 1; text-align: center; border-right: 1px solid #cbd5e1; padding-right: 12px;">
                  <span style="font-size: 12px; color: #64748b; text-transform: uppercase;">Your Score</span>
                  <p style="margin: 4px 0 0; font-size: 28px; font-weight: bold; color: #ff6a00;">${attempt.score}<span style="font-size: 16px; color: #94a3b8;">/${attempt.totalQuestions}</span></p>
                  <span style="font-size: 12px; color: #16a34a; font-weight: bold;">${percentage}% Accuracy</span>
                </div>
                <div style="flex: 1; text-align: center; padding-left: 12px;">
                  <span style="font-size: 12px; color: #64748b; text-transform: uppercase;">Batch Rank</span>
                  <p style="margin: 4px 0 0; font-size: 28px; font-weight: bold; color: #1e293b;">#${candidateRank}</p>
                  <span style="font-size: 12px; color: #64748b;">out of ${allSlotAttempts.length} candidates</span>
                </div>
              </div>

              ${
                isTop10
                  ? `
                <div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 18px; margin-bottom: 20px; text-align: center;">
                  <span style="font-size: 24px;">🏆</span>
                  <h3 style="margin: 6px 0; color: #92400e; font-size: 18px;">TOP 10 BATCH WINNER!</h3>
                  <p style="margin: 0; color: #b45309; font-size: 13px; font-weight: bold;">
                    You have won an official Mission 3F ISI Certified Road Safety Helmet!
                  </p>
                  <div style="background: white; border-radius: 8px; padding: 10px 14px; margin-top: 12px; text-align: left; border: 1px solid #fde68a;">
                    <span style="font-size: 11px; color: #78350f; text-transform: uppercase; font-weight: bold;">Confirmed Dispatch Address:</span>
                    <p style="margin: 4px 0 0; font-size: 13px; color: #1e293b;">${student.address}</p>
                    <p style="margin: 4px 0 0; font-size: 11px; color: #64748b;">Courier contact: ${student.phone}</p>
                  </div>
                </div>
                `
                  : `
                <div style="background: #f8fafc; border-radius: 8px; padding: 14px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <p style="margin: 0; font-size: 13px; color: #475569;">
                    Great effort! You have completed your road safety digital training. Keep practicing helmet fastening, pedestrian discipline, and defensive road habits!
                  </p>
                </div>
                `
              }

              <div style="text-align: center; margin: 20px 0;">
                <a href="${leaderboardUrl}" style="background-color: #ff6a00; color: white; padding: 12px 24px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block;">
                  View Live Batch Leaderboard →
                </a>
              </div>

              <div style="background: #f0fdf4; border: 1px dashed #86efac; border-radius: 10px; padding: 16px; margin-top: 16px;">
                <h4 style="margin: 0 0 6px; color: #166534; font-size: 14px;">🤝 Join as a Mission 3F Student Ambassador / Volunteer</h4>
                <p style="margin: 0; font-size: 12px; color: #15803d; line-height: 1.5;">
                  Take road safety to your school peers! Volunteers receive exclusive Mahal Welfare Services commendation certificates, Ambassador Kits, safety gear, and event gift surprises.
                </p>
                <div style="margin-top: 10px;">
                  <a href="${appUrl}/volunteer" style="color: #15803d; font-weight: bold; font-size: 12px; text-decoration: underline;">
                    Apply for Volunteer Program →
                  </a>
                </div>
              </div>
            </div>

            <div style="text-align: center; font-size: 12px; color: #94a3b8;">
              <p style="margin: 0;">Mahal Welfare Services • Mission 3F (Fit • Fast • Focused)</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      score: attempt.score,
      totalQuestions: attempt.totalQuestions,
      timeTakenSec: attempt.timeTakenSec,
      submittedAt: attempt.submittedAt,
      forcedByTimer: !!forcedByTimer,
      rank: candidateRank,
      isTop10,
      totalCandidates: allSlotAttempts.length,
      deliveryAddress: student.address,
    });
  } catch (err: any) {
    console.error("Exam submit error:", err);
    return NextResponse.json(
      { error: "Error submitting exam attempt: " + err.message },
      { status: 500 }
    );
  }
}
