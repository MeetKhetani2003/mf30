import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, phone, occupation, city, domainInterest, availability, motivation } = await req.json();

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full Name, Email, and Phone number are required." },
        { status: 400 }
      );
    }

    const volunteer = await prisma.volunteer.create({
      data: {
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        occupation: occupation || "Student / Community Ambassador",
        ageConfirmed: true,
        domainInterest: domainInterest || "School Road Safety Workshops",
        availability: availability || "Flexible / Weekends",
      },
    });

    const ngoEmail = process.env.NGO_ADMIN_EMAIL || "director@mahalwelfare.org";

    // 1. Send Alert Email to NGO Team
    await sendEmail({
      to: ngoEmail,
      subject: `New Mission 3F Volunteer Application: ${fullName} (${city || "India"})`,
      text: `New Volunteer Application Received!\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nOccupation: ${occupation}\nCity: ${city || "Not specified"}\nDomain of Interest: ${domainInterest}\nAvailability: ${availability}\nNotes/Motivation: ${motivation || "None provided"}\n\nRegistered in Database ID: ${volunteer.id}\nMahal Welfare Services (Est. 2011)`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #fed7aa; border-radius: 12px; background-color: #fffaf5;">
          <h2 style="color: #ff6a00; margin: 0 0 16px;">🤝 New Mission 3F Volunteer Application</h2>
          <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0;">
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>City/Location:</strong> ${city || "Not specified"}</p>
            <p><strong>Role / Category:</strong> ${occupation}</p>
            <p><strong>Domain Interest:</strong> ${domainInterest}</p>
            <p><strong>Availability:</strong> ${availability}</p>
            ${motivation ? `<p><strong>Statement of Purpose:</strong> <em>"${motivation}"</em></p>` : ""}
          </div>
          <p style="font-size: 12px; color: #64748b; margin-top: 16px;">System Notification • Mahal Welfare Services (Est. 2011)</p>
        </div>
      `,
    });

    // 2. Send Welcome & Ambassador Kit Email to Volunteer
    await sendEmail({
      to: email.toLowerCase().trim(),
      subject: `Welcome to Mission 3F Volunteer & Ambassador Community, ${fullName}!`,
      text: `Hello ${fullName},\n\nThank you for volunteering with Mission 3F and Mahal Welfare Services (Est. 2011)!\n\nWe are building zero-fatality roads across India through young minds. As a Mission 3F Volunteer & Youth Ambassador, you will receive our Community Ambassador Kit, commendation certificate, and special event surprises.\n\nOur team will connect with you via WhatsApp/Email for the next orientation workshop.\n\nFit • Fast • Focused,\nMahal Welfare Services`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #fed7aa; border-radius: 16px; background-color: #fffaf5;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="color: #ff6a00; margin: 0;">Welcome to Mission 3F Volunteer Community!</h2>
            <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Mahal Welfare Society • Nangal (2011) &amp; Canada (2021)</p>
          </div>

          <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #f1f5f9; margin-bottom: 20px;">
            <p style="font-size: 15px; color: #1e293b; margin: 0 0 14px;">Dear <strong>${fullName}</strong>,</p>
            <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 16px;">
              Thank you for stepping up to make a difference! Your application to volunteer with the <strong>Mission 3F Road Safety Movement</strong> has been warmly received.
            </p>

            <div style="background-color: #fff4e8; border-radius: 10px; padding: 16px; border: 1px solid #fed7aa; margin-bottom: 20px;">
              <h4 style="margin: 0 0 8px; color: #9a3412; font-size: 14px;">🎁 Your Volunteer & Ambassador Perks:</h4>
              <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #c2410c; line-height: 1.6;">
                <li>Official Mahal Welfare Services Commendation Certificate</li>
                <li>Mission 3F Ambassador Kit & Safety Gear</li>
                <li>Special Event Surprises, Gifts, and Recognition Badges</li>
                <li>Opportunities to lead workshops in local schools & communities</li>
              </ul>
            </div>

            <p style="font-size: 13px; color: #475569; line-height: 1.5; margin: 0;">
              Our coordination team will reach out to you via WhatsApp at <strong>${phone}</strong> for your community orientation and schedule details.
            </p>
          </div>

          <div style="text-align: center; font-size: 12px; color: #94a3b8;">
            <p style="margin: 0;">Mahal Welfare Services • Mission 3F: Fit • Fast • Focused</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      volunteerId: volunteer.id,
      message: "Volunteer application registered successfully.",
    });
  } catch (err: any) {
    console.error("Volunteer submit error:", err);
    return NextResponse.json(
      { error: "Failed to submit volunteer form: " + err.message },
      { status: 500 }
    );
  }
}
