import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateSignedPlaybackToken, computeSha256, decryptVideoUrl } from "@/lib/video-crypto";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { sessionToken: string } }
) {
  try {
    const { sessionToken } = params;
    const { searchParams } = new URL(req.url);
    const withQuestions = searchParams.get("withQuestions") === "true";

    const student = await prisma.student.findUnique({
      where: { sessionToken },
      include: {
        school: true,
        slot: true,
        attempts: {
          orderBy: { submittedAt: "desc" },
          take: 1,
        },
      },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student session token not found or invalid." },
        { status: 404 }
      );
    }

    let questions: any[] = [];
    if (withQuestions) {
      // Fetch 30 questions
      const rawQuestions = await prisma.question.findMany({
        take: 30,
      });

      // Strip correctOption for security
      questions = rawQuestions.map((q) => ({
        id: q.id,
        questionText: q.questionText,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        category: q.category,
      }));
    }

    // Secure Video Token Generation (Raw URL is never sent to student browser)
    const activeSlot = student.slot || {
      id: "default-slot",
      slotName: "3F Standard Safety Slot",
      youtubeUrl: "https://www.youtube.com/embed/Z0o2Bw8U_50",
      videoStartTime: new Date(Date.now() - 15 * 60 * 1000),
      videoEndTime: new Date(),
      examStartTime: new Date(),
      examEndTime: new Date(Date.now() + 60 * 60 * 1000),
      examDurationMin: 20,
    };

    const rawDecryptedUrl = decryptVideoUrl(activeSlot.youtubeUrl) || "https://www.youtube.com/embed/Z0o2Bw8U_50";
    const shaFingerprint = computeSha256(rawDecryptedUrl).substring(0, 16);
    const videoPlaybackToken = generateSignedPlaybackToken(student.sessionToken, activeSlot.id, student.name);

    return NextResponse.json({
      id: student.id,
      name: student.name,
      phone: student.phone,
      address: student.address,
      email: student.email,
      standard: student.standard,
      section: student.section,
      ridingExperience: student.ridingExperience,
      sessionToken: student.sessionToken,
      school: {
        id: student.school.id,
        schoolName: student.school.schoolName,
        schoolCode: student.school.schoolCode,
        teacherName: student.school.teacherName,
      },
      slot: {
        id: activeSlot.id,
        slotName: activeSlot.slotName,
        // Shielded: raw URL is omitted from client JSON response
        videoStartTime: activeSlot.videoStartTime instanceof Date ? activeSlot.videoStartTime.toISOString() : activeSlot.videoStartTime,
        videoEndTime: activeSlot.videoEndTime instanceof Date ? activeSlot.videoEndTime.toISOString() : activeSlot.videoEndTime,
        examStartTime: activeSlot.examStartTime instanceof Date ? activeSlot.examStartTime.toISOString() : activeSlot.examStartTime,
        examEndTime: activeSlot.examEndTime instanceof Date ? activeSlot.examEndTime.toISOString() : activeSlot.examEndTime,
        examDurationMin: activeSlot.examDurationMin,
        isDrmProtected: true,
        sha256Fingerprint: shaFingerprint,
      },
      videoPlaybackToken,
      attempt: student.attempts.length > 0 ? student.attempts[0] : null,
      questions: withQuestions ? questions : undefined,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to fetch student status: " + err.message },
      { status: 500 }
    );
  }
}
