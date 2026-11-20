import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const schools = await prisma.schoolCoordinator.findMany({
      include: {
        _count: {
          select: { students: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ schools });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { schoolName, schoolCode, teacherName, phone, email } = body;

    if (!schoolName || !schoolCode || !teacherName) {
      return NextResponse.json(
        { error: "School Name, School Code, and Teacher Name are required." },
        { status: 400 }
      );
    }

    const formattedCode = schoolCode.toUpperCase().trim();

    const existing = await prisma.schoolCoordinator.findUnique({
      where: { schoolCode: formattedCode },
    });

    if (existing) {
      return NextResponse.json(
        { error: `School code ${formattedCode} already exists.` },
        { status: 409 }
      );
    }

    const school = await prisma.schoolCoordinator.create({
      data: {
        schoolName: schoolName.trim(),
        schoolCode: formattedCode,
        teacherName: teacherName.trim(),
        phone: phone ? phone.trim() : "",
        email: email ? email.trim() : "",
      },
    });

    return NextResponse.json({ success: true, school });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
