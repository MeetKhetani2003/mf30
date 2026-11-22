import prisma from "@/lib/prisma";

export interface MonthlySlotConfig {
  day: number; // 10, 20, or 30
  label: string;
  targetDate: Date;
  slotName: string;
  youtubeUrl: string;
  examDurationMin: number;
}

/**
 * Calculates the next upcoming 10th, 20th, and 30th dates at 5:00 PM (17:00 IST).
 */
export function getUpcomingFixedSlotDates(baseDate = new Date()): MonthlySlotConfig[] {
  const slots: MonthlySlotConfig[] = [];
  const candidateDays = [10, 20, 30];

  // We look across current month and next month to find the next 3 distinct fixed slots
  let currentYear = baseDate.getFullYear();
  let currentMonth = baseDate.getMonth(); // 0-indexed

  const foundDates: { day: number; date: Date }[] = [];

  for (let m = 0; m <= 2 && foundDates.length < 3; m++) {
    const targetMonth = (currentMonth + m) % 12;
    const targetYear = currentYear + Math.floor((currentMonth + m) / 12);

    for (const day of candidateDays) {
      // 17:00 IST = 11:30 UTC. We construct in local/IST time:
      const slotDate = new Date(targetYear, targetMonth, day, 17, 0, 0, 0);

      // Only include if it is in the future or within current 20-min window
      const twentyMinsAfter = new Date(slotDate.getTime() + 20 * 60 * 1000);
      if (twentyMinsAfter.getTime() >= baseDate.getTime()) {
        foundDates.push({ day, date: slotDate });
        if (foundDates.length >= 3) break;
      }
    }
  }

  // Fallback if needed
  if (foundDates.length === 0) {
    foundDates.push(
      { day: 10, date: new Date(currentYear, currentMonth + 1, 10, 17, 0, 0) },
      { day: 20, date: new Date(currentYear, currentMonth + 1, 20, 17, 0, 0) },
      { day: 30, date: new Date(currentYear, currentMonth + 1, 30, 17, 0, 0) }
    );
  }

  return foundDates.map(({ day, date }) => {
    const monthName = date.toLocaleString("en-US", { month: "short" });
    const fullDateStr = `${day}th ${monthName} ${date.getFullYear()}`;
    return {
      day,
      label: `${fullDateStr} • 5:00 PM IST`,
      targetDate: date,
      slotName: `Mission 3F Road Safety Exam — ${fullDateStr} (5:00 PM Batch)`,
      youtubeUrl: "https://www.youtube.com/embed/Z0o2Bw8U_50",
      examDurationMin: 20,
    };
  });
}

/**
 * Ensures the upcoming 10th, 20th, and 30th exam slots exist in the database.
 */
export async function ensureFixedMonthlySlotsExist() {
  const upcomingConfigs = getUpcomingFixedSlotDates();
  const dbSlots = [];

  for (const config of upcomingConfigs) {
    const slotId = `slot-batch-${config.targetDate.getFullYear()}-${String(config.targetDate.getMonth() + 1).padStart(2, "0")}-${String(config.day).padStart(2, "0")}`;

    // Start 10 min before 5:00 PM for video instruction, exam runs 5:00 PM - 5:20 PM
    const examStart = config.targetDate;
    const examEnd = new Date(examStart.getTime() + config.examDurationMin * 60 * 1000);
    const videoStart = new Date(examStart.getTime() - 15 * 60 * 1000);
    const videoEnd = examStart;

    const slot = await prisma.examSlot.upsert({
      where: { id: slotId },
      update: {
        slotName: config.slotName,
        examStartTime: examStart,
        examEndTime: examEnd,
        videoStartTime: videoStart,
        videoEndTime: videoEnd,
        examDurationMin: config.examDurationMin,
        isActive: true,
      },
      create: {
        id: slotId,
        slotName: config.slotName,
        youtubeUrl: config.youtubeUrl,
        videoStartTime: videoStart,
        videoEndTime: videoEnd,
        examStartTime: examStart,
        examEndTime: examEnd,
        examDurationMin: config.examDurationMin,
        isActive: true,
      },
    });

    dbSlots.push(slot);
  }

  return dbSlots;
}
