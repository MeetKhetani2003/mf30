import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { sessionToken: string } }
) {
  try {
    const { sessionToken } = params;

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
        { error: "Student session token invalid." },
        { status: 404 }
      );
    }

    const slotId = student.slotId;

    // Fetch all attempts for this slot, or all attempts if slotId is not set
    const attempts = await prisma.examAttempt.findMany({
      where: slotId ? { slotId } : {},
      include: {
        student: {
          include: {
            school: true,
          },
        },
      },
      orderBy: [
        { score: "desc" },
        { timeTakenSec: "asc" },
        { submittedAt: "asc" },
      ],
    });

    // Map ranks
    let userRank = -1;
    const rankedList = attempts.map((att, idx) => {
      const rank = idx + 1;
      const isCurrent = att.studentId === student.id;
      if (isCurrent) {
        userRank = rank;
      }

      return {
        rank,
        studentId: att.studentId,
        name: att.student.name,
        schoolName: att.student.school.schoolName,
        schoolCode: att.student.school.schoolCode,
        score: att.score,
        totalQuestions: att.totalQuestions,
        timeTakenSec: att.timeTakenSec,
        ridingExperience: att.student.ridingExperience,
        submittedAt: att.submittedAt.toISOString(),
        isCurrentUser: isCurrent,
      };
    });

    const currentAttempt = student.attempts[0] || null;

    return NextResponse.json({
      slot: {
        id: student.slot?.id || "slot-default",
        slotName: student.slot?.slotName || "3F Road Safety Certification Slot",
        totalAttempts: attempts.length,
      },
      currentUser: currentAttempt
        ? {
            name: student.name,
            score: currentAttempt.score,
            totalQuestions: currentAttempt.totalQuestions,
            timeTakenSec: currentAttempt.timeTakenSec,
            rank: userRank > 0 ? userRank : attempts.length,
            percentage: Math.round((currentAttempt.score / currentAttempt.totalQuestions) * 100),
            ridingExperience: student.ridingExperience,
            schoolName: student.school.schoolName,
          }
        : null,
      topRankers: rankedList.slice(0, 10),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to generate leaderboard: " + err.message },
      { status: 500 }
    );
  }
}
