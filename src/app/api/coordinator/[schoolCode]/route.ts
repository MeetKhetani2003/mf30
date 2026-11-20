import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { schoolCode: string } }
) {
  try {
    const schoolCode = (params.schoolCode || "").toUpperCase().trim();

    const school = await prisma.schoolCoordinator.findUnique({
      where: { schoolCode },
      include: {
        students: {
          include: {
            attempts: {
              orderBy: { submittedAt: "desc" },
              take: 1,
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!school) {
      return NextResponse.json(
        { error: "School not found for code: " + schoolCode },
        { status: 404 }
      );
    }

    const totalStudents = school.students.length;
    let completedTests = 0;
    let totalScore = 0;

    const formattedStudents = school.students.map((st) => {
      const attempt = st.attempts[0] || null;
      if (attempt) {
        completedTests++;
        totalScore += attempt.score;
      }

      return {
        id: st.id,
        name: st.name,
        phone: st.phone,
        email: st.email,
        standard: st.standard,
        section: st.section,
        ridingExperience: st.ridingExperience,
        sessionToken: st.sessionToken,
        createdAt: st.createdAt.toISOString(),
        attempt: attempt
          ? {
              score: attempt.score,
              totalQuestions: attempt.totalQuestions,
              timeTakenSec: attempt.timeTakenSec,
              submittedAt: attempt.submittedAt.toISOString(),
            }
          : null,
      };
    });

    const completionRate = totalStudents > 0 ? Math.round((completedTests / totalStudents) * 100) : 0;
    const averageScore = completedTests > 0 ? Math.round((totalScore / completedTests) * 10) / 10 : 0;

    const activeSlot = await prisma.examSlot.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      school: {
        id: school.id,
        schoolName: school.schoolName,
        schoolCode: school.schoolCode,
        teacherName: school.teacherName,
        phone: school.phone,
        email: school.email,
      },
      metrics: {
        totalStudents,
        completedTests,
        completionRate,
        averageScore,
      },
      students: formattedStudents,
      activeSlot: activeSlot
        ? {
            id: activeSlot.id,
            slotName: activeSlot.slotName,
            videoStartTime: activeSlot.videoStartTime.toISOString(),
            videoEndTime: activeSlot.videoEndTime.toISOString(),
            examStartTime: activeSlot.examStartTime.toISOString(),
            examEndTime: activeSlot.examEndTime.toISOString(),
          }
        : null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to load coordinator data: " + err.message },
      { status: 500 }
    );
  }
}
