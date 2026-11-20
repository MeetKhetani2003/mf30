import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
      include: { slot: true },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student session not found." },
        { status: 404 }
      );
    }

    const slotId = student.slotId || "default-slot";

    // Check if already attempted
    const existingAttempt = await prisma.examAttempt.findFirst({
      where: { studentId: student.id, slotId },
    });

    if (existingAttempt) {
      return NextResponse.json({
        success: true,
        alreadySubmitted: true,
        score: existingAttempt.score,
        totalQuestions: existingAttempt.totalQuestions,
        timeTakenSec: existingAttempt.timeTakenSec,
      });
    }

    // Fetch all 30 questions with correct options
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
      const selected = (answers && answers[q.id]) ? String(answers[q.id]).toUpperCase() : "NONE";
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

    // Record response buffer in transaction
    await prisma.studentAnswer.createMany({
      data: studentAnswerPayloads,
    });

    // Create ExamAttempt
    const attempt = await prisma.examAttempt.create({
      data: {
        studentId: student.id,
        slotId: student.slotId || (await prisma.examSlot.findFirst())?.id || "default",
        score,
        totalQuestions: allQuestions.length || 30,
        timeTakenSec: Math.max(1, parseInt(timeTakenSec || "120", 10)),
      },
    });

    return NextResponse.json({
      success: true,
      score: attempt.score,
      totalQuestions: attempt.totalQuestions,
      timeTakenSec: attempt.timeTakenSec,
      submittedAt: attempt.submittedAt,
      forcedByTimer: !!forcedByTimer,
    });
  } catch (err: any) {
    console.error("Exam submit error:", err);
    return NextResponse.json(
      { error: "Error submitting exam responses: " + err.message },
      { status: 500 }
    );
  }
}
