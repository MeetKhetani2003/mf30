import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [totalStudents, totalAttempts, totalSchools, totalVolunteers, schools] = await Promise.all([
      prisma.student.count(),
      prisma.examAttempt.count(),
      prisma.schoolCoordinator.count(),
      prisma.volunteer.count(),
      prisma.schoolCoordinator.findMany({
        include: {
          students: {
            include: {
              attempts: true,
            },
          },
        },
      }),
    ]);

    const schoolBreakdown = schools.map((sch) => {
      const studentCount = sch.students.length;
      let completedCount = 0;
      let totalScore = 0;

      sch.students.forEach((st) => {
        if (st.attempts.length > 0) {
          completedCount++;
          totalScore += st.attempts[0].score;
        }
      });

      return {
        id: sch.id,
        schoolName: sch.schoolName,
        schoolCode: sch.schoolCode,
        teacherName: sch.teacherName,
        studentCount,
        completedCount,
        completionRate: studentCount > 0 ? Math.round((completedCount / studentCount) * 100) : 0,
        averageScore: completedCount > 0 ? Math.round((totalScore / completedCount) * 10) / 10 : 0,
      };
    });

    const completionRate = totalStudents > 0 ? Math.round((totalAttempts / totalStudents) * 100) : 0;

    return NextResponse.json({
      metrics: {
        totalStudents,
        totalAttempts,
        completionRate,
        totalSchools,
        totalVolunteers,
      },
      schoolBreakdown,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
