import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendEmail } from "@/lib/mailer";
import { ensureFixedMonthlySlotsExist } from "@/lib/slots";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      schoolCode,
      schoolNameCustom,
      name,
      phone,
      address,
      email,
      standard,
      section,
      ridingExperience,
      slotId: requestedSlotId,
    } = body;

    if (!name || !phone || !address || !standard || !section) {
      return NextResponse.json(
        { error: "Please provide all required fields: Name, Phone, Delivery Address, Class, and Section." },
        { status: 400 }
      );
    }

    // 1. Resolve school: by code, or create/find generic
    let school = null;
    const cleanCode = (schoolCode || "").toUpperCase().trim();

    if (cleanCode) {
      school = await prisma.schoolCoordinator.findUnique({
        where: { schoolCode: cleanCode },
      });
    }

    if (!school) {
      // Check if custom name provided or fallback to default
      if (schoolNameCustom && schoolNameCustom.trim()) {
        const generatedCode = `SCH-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
        school = await prisma.schoolCoordinator.create({
          data: {
            schoolName: schoolNameCustom.trim(),
            schoolCode: generatedCode,
            teacherName: "School In-Charge",
            phone: phone.trim(),
            email: email ? email.trim() : "coordinator@school.edu",
          },
        });
      } else {
        school = await prisma.schoolCoordinator.findFirst();
        if (!school) {
          school = await prisma.schoolCoordinator.create({
            data: {
              schoolName: "Mission 3F Open Community Candidate",
              schoolCode: "M3F-OPEN-01",
              teacherName: "Community Coordinator",
              phone: "9876543210",
              email: "support@mahalwelfare.org",
            },
          });
        }
      }
    }

    // 2. Resolve Slot (10th, 20th, or 30th monthly slot)
    let targetSlot = null;
    if (requestedSlotId) {
      targetSlot = await prisma.examSlot.findUnique({
        where: { id: requestedSlotId },
      });
    }

    if (!targetSlot) {
      const fixedSlots = await ensureFixedMonthlySlotsExist();
      targetSlot = fixedSlots[0];
    }

    // 3. Generate session token & registration code
    const sessionToken = crypto.randomUUID();
    const candidateCode = `M3F-${school.schoolCode.split("-")[0] || "CAN"}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 4. Create Student
    const student = await prisma.student.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        email: email ? email.trim() : null,
        standard: standard.trim(),
        section: section.trim(),
        ridingExperience: (ridingExperience || "Learner").trim(),
        schoolId: school.id,
        slotId: targetSlot?.id || null,
        sessionToken,
      },
    });

    // 5. Send confirmation email with invitation link & registration code
    const recipientEmail = email ? email.trim() : null;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const portalUrl = `${appUrl}/portal/${sessionToken}`;

    const slotDateStr = targetSlot
      ? new Date(targetSlot.examStartTime).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "10th / 20th / 30th at 5:00 PM IST";

    if (recipientEmail) {
      await sendEmail({
        to: recipientEmail,
        subject: `Your Mission 3F Examination Session Link — ${name} (${candidateCode})`,
        text: `Hello ${name},\n\nYour registration for the Mission 3F Road Safety Digital Certification is confirmed!\n\nScheduled Exam Slot: ${slotDateStr}\nYour Candidate Code: ${candidateCode}\nPersonalized Exam Portal Link: ${portalUrl}\n\nTop 10 candidates in each batch win a certified Mission 3F ISI Safety Helmet delivered to your home address!\n\nMahal Welfare Services (Est. 2011)`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #fed7aa; border-radius: 16px; background-color: #fffaf5;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #ff6a00; margin: 0; font-size: 24px;">Mission 3F • Road Safety Digital Exam</h2>
              <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Mahal Welfare Services (Est. 2011) — Registered Non-Profit NGO</p>
            </div>

            <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #f1f5f9; margin-bottom: 20px;">
              <p style="font-size: 15px; color: #1e293b; margin: 0 0 12px;">Dear <strong>${name}</strong>,</p>
              <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 16px;">
                Your registration for the Mission 3F Digital Road Safety Examination has been successfully recorded. Please save this email and your personal exam access link.
              </p>

              <div style="background-color: #f8fafc; border-left: 4px solid #ff6a00; padding: 12px 16px; margin-bottom: 16px;">
                <p style="margin: 0 0 4px; font-size: 13px; color: #64748b;">Scheduled Examination Slot:</p>
                <p style="margin: 0; font-size: 16px; font-weight: bold; color: #1e293b;">${slotDateStr}</p>
                <p style="margin: 6px 0 0; font-size: 12px; color: #94a3b8;">(Exam is locked until 5:00 PM on your scheduled exam day)</p>
              </div>

              <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 12px; text-align: center; margin-bottom: 20px;">
                <span style="font-size: 12px; color: #64748b; display: block; margin-bottom: 4px;">Your Official Candidate Code:</span>
                <span style="font-family: monospace; font-size: 20px; font-weight: bold; color: #ff6a00; letter-spacing: 2px;">${candidateCode}</span>
              </div>

              <div style="text-align: center; margin: 24px 0;">
                <a href="${portalUrl}" style="background-color: #ff6a00; color: white; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 15px; display: inline-block;">
                  Open My Examination Portal →
                </a>
              </div>

              <div style="background: #fff4e8; border-radius: 8px; padding: 14px; border: 1px solid #fed7aa; margin-top: 16px;">
                <p style="margin: 0; font-size: 13px; color: #9a3412; font-weight: bold;">
                  🏆 Prize Announcement: Top 10 Scorers Win ISI Helmets!
                </p>
                <p style="margin: 4px 0 0; font-size: 12px; color: #c2410c;">
                  The top 10 scoring students in each monthly batch will have an official Mission 3F ISI Safety Helmet dispatched directly to their registered address: <strong>${address}</strong>.
                </p>
              </div>
            </div>

            <div style="text-align: center; font-size: 12px; color: #94a3b8;">
              <p style="margin: 0;">Mahal Welfare Services • Mission 3F (Fit • Fast • Focused)</p>
              <p style="margin: 4px 0 0;">Dedicated to Zero Fatalities on Indian Roads.</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      sessionToken: student.sessionToken,
      candidateCode,
      studentId: student.id,
      studentName: student.name,
      schoolName: school.schoolName,
      slotId: targetSlot?.id || null,
      slotDateStr,
      portalUrl,
      deliveryAddress: student.address,
    });
  } catch (err: any) {
    console.error("Student registration error:", err);
    return NextResponse.json(
      { error: "Database error during registration: " + err.message },
      { status: 500 }
    );
  }
}
