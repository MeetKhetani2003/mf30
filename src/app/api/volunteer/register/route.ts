import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, phone, occupation, ageConfirmed, domainInterest, availability } = await req.json();

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full Name, Email, and Phone number are required." },
        { status: 400 }
      );
    }

    if (!ageConfirmed) {
      return NextResponse.json(
        { error: "Volunteers must be 18 years of age or older." },
        { status: 400 }
      );
    }

    const volunteer = await prisma.volunteer.create({
      data: {
        fullName,
        email: email.toLowerCase().trim(),
        phone,
        occupation: occupation || "Not specified",
        ageConfirmed: true,
        domainInterest: domainInterest || "School Education",
        availability: availability || "Weekends",
      },
    });

    return NextResponse.json({
      success: true,
      volunteerId: volunteer.id,
      message: "Volunteer application registered successfully.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to submit volunteer form: " + err.message },
      { status: 500 }
    );
  }
}
