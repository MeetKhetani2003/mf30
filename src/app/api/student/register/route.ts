import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { schoolCode, name, phone, address, email, standard, section, ridingExperience } = await req.json();

    if (!name || !phone || !address || !standard || !section || !ridingExperience) {
      return NextResponse.json(
        { error: "Please provide all required fields including address and two-wheeler experience." },
        { status: 400 }
      );
    }

    // 1. Find school
    let school = await prisma.schoolCoordinator.findUnique({
      where: { schoolCode: (schoolCode || "").toUpperCase().trim() },
    });

    if (!school) {
      // Fallback to default school if not specified or not found
      school = await prisma.schoolCoordinator.findFirst();
      if (!school) {
        return NextResponse.json(
          { error: "No active school coordinators configured in the database." },
          { status: 404 }
        );
      }
    }

    // 2. Find an active slot for this student
    let activeSlot = await prisma.examSlot.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    if (!activeSlot) {
      // Auto-create default slot if none exists
      const now = new Date();
      activeSlot = await prisma.examSlot.create({
        data: {
          slotName: "3F Youth Road Safety Digital Certification - Standard Slot",
          youtubeUrl: "https://www.youtube.com/embed/Z0o2Bw8U_50",
          videoStartTime: now,
          videoEndTime: new Date(now.getTime() + 10 * 60 * 1000),
          examStartTime: new Date(now.getTime() + 10 * 60 * 1000),
          examEndTime: new Date(now.getTime() + 70 * 60 * 1000),
          examDurationMin: 20,
          isActive: true,
        },
      });
    }

    // 3. Generate unique session token
    const sessionToken = crypto.randomUUID();

    // 4. Create student record
    const student = await prisma.student.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        email: email ? email.trim() : null,
        standard: standard.trim(),
        section: section.trim(),
        ridingExperience: ridingExperience.trim(),
        schoolId: school.id,
        slotId: activeSlot.id,
        sessionToken,
      },
    });

    return NextResponse.json({
      success: true,
      sessionToken: student.sessionToken,
      studentId: student.id,
      schoolName: school.schoolName,
      slotId: activeSlot.id,
    });
  } catch (err: any) {
    console.error("Student registration error:", err);
    return NextResponse.json(
      { error: "Database error during registration: " + err.message },
      { status: 500 }
    );
  }
}
