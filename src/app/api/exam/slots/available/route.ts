import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureFixedMonthlySlotsExist } from "@/lib/slots";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Ensure the fixed 10th, 20th, 30th slots exist in DB
    const slots = await ensureFixedMonthlySlotsExist();

    // 2. Fetch schools for selection dropdown
    const schools = await prisma.schoolCoordinator.findMany({
      select: {
        id: true,
        schoolName: true,
        schoolCode: true,
        teacherName: true,
      },
      orderBy: { schoolName: "asc" },
    });

    // 3. Format slot details with participant counts
    const formattedSlots = await Promise.all(
      slots.map(async (slot) => {
        const studentCount = await prisma.student.count({
          where: { slotId: slot.id },
        });

        const examDate = new Date(slot.examStartTime);
        const day = examDate.getDate();
        const month = examDate.toLocaleString("en-US", { month: "short" });
        const year = examDate.getFullYear();

        return {
          id: slot.id,
          day,
          dateLabel: `${day}th ${month} ${year}`,
          timeLabel: "7:00 PM IST",
          durationMin: slot.examDurationMin,
          slotName: slot.slotName,
          studentCount,
          examStartTime: slot.examStartTime,
          isLocked: new Date() < new Date(slot.examStartTime),
        };
      })
    );

    return NextResponse.json({
      success: true,
      slots: formattedSlots,
      schools,
    });
  } catch (err: any) {
    console.error("Fetch available slots error:", err);
    return NextResponse.json(
      { error: "Failed to fetch available slots: " + err.message },
      { status: 500 }
    );
  }
}
