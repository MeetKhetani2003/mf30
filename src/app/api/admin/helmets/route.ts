import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const slots = await prisma.examSlot.findMany({
      orderBy: { examStartTime: "desc" },
      include: {
        attempts: {
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
        },
      },
    });

    const batchDispatches = slots.map((slot) => {
      const top10 = slot.attempts.slice(0, 10).map((att, idx) => ({
        rank: idx + 1,
        attemptId: att.id,
        studentId: att.student.id,
        name: att.student.name,
        phone: att.student.phone,
        email: att.student.email,
        address: att.student.address,
        schoolName: att.student.school.schoolName,
        standard: att.student.standard,
        section: att.student.section,
        score: att.score,
        totalQuestions: att.totalQuestions,
        timeTakenSec: att.timeTakenSec,
        submittedAt: att.submittedAt,
        status: "Pending Dispatch",
      }));

      return {
        slotId: slot.id,
        slotName: slot.slotName,
        examStartTime: slot.examStartTime,
        totalAttempts: slot.attempts.length,
        winners: top10,
      };
    });

    return NextResponse.json({
      success: true,
      batches: batchDispatches,
    });
  } catch (err: any) {
    console.error("Fetch helmets error:", err);
    return NextResponse.json(
      { error: "Failed to fetch helmet dispatch data: " + err.message },
      { status: 500 }
    );
  }
}
