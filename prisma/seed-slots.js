const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const baseDate = new Date();
  const candidateDays = [9, 18, 27];
  const currentYear = baseDate.getFullYear();
  const currentMonth = baseDate.getMonth();

  const foundDates = [];
  for (let m = 0; m <= 2 && foundDates.length < 3; m++) {
    const targetMonth = (currentMonth + m) % 12;
    const targetYear = currentYear + Math.floor((currentMonth + m) / 12);

    for (const day of candidateDays) {
      const slotDate = new Date(targetYear, targetMonth, day, 19, 0, 0, 0); // 7:00 PM IST
      const twentyMinsAfter = new Date(slotDate.getTime() + 20 * 60 * 1000);
      if (twentyMinsAfter.getTime() >= baseDate.getTime()) {
        foundDates.push({ day, date: slotDate });
        if (foundDates.length >= 3) break;
      }
    }
  }

  for (const { day, date } of foundDates) {
    const monthName = date.toLocaleString("en-US", { month: "short" });
    const fullDateStr = `${day}th ${monthName} ${date.getFullYear()}`;
    const slotId = `slot-batch-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const examStart = date;
    const examEnd = new Date(examStart.getTime() + 20 * 60 * 1000);
    const videoStart = new Date(examStart.getTime() - 15 * 60 * 1000);
    const videoEnd = examStart;

    const slot = await prisma.examSlot.upsert({
      where: { id: slotId },
      update: {
        slotName: `Mission 3F Road Safety Exam — ${fullDateStr} (7:00 PM Batch)`,
        examStartTime: examStart,
        examEndTime: examEnd,
        videoStartTime: videoStart,
        videoEndTime: videoEnd,
        examDurationMin: 20,
        isActive: true,
      },
      create: {
        id: slotId,
        slotName: `Mission 3F Road Safety Exam — ${fullDateStr} (7:00 PM Batch)`,
        youtubeUrl: "https://www.youtube.com/embed/Z0o2Bw8U_50",
        videoStartTime: videoStart,
        videoEndTime: videoEnd,
        examStartTime: examStart,
        examEndTime: examEnd,
        examDurationMin: 20,
        isActive: true,
      },
    });

    console.log(`Upserted slot: ${slot.id} -> ${slot.slotName} (${examStart.toISOString()})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
