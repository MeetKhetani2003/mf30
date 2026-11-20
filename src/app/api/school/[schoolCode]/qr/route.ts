import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { schoolCode: string } }
) {
  try {
    const rawCode = (params.schoolCode || "").trim().toUpperCase();
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "png";
    const download = searchParams.get("download") === "true";

    // Optional verification from DB (if code exists, grab full school name)
    const school = await prisma.schoolCoordinator.findUnique({
      where: { schoolCode: rawCode },
      select: { schoolName: true, schoolCode: true },
    });

    const codeToUse = school?.schoolCode || rawCode;
    // Determine host
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
    const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
    const registrationUrl = `${proto}://${host}/register/${codeToUse}`;

    if (format === "svg") {
      const svg = await QRCode.toString(registrationUrl, {
        type: "svg",
        margin: 2,
        color: {
          dark: "#1F2937",
          light: "#FFFFFF",
        },
      });

      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
          ...(download
            ? { "Content-Disposition": `attachment; filename="Mission3F-QR-${codeToUse}.svg"` }
            : {}),
        },
      });
    }

    // Default: High-Resolution 512x512 PNG
    const buffer = await QRCode.toBuffer(registrationUrl, {
      type: "png",
      width: 512,
      margin: 2,
      errorCorrectionLevel: "H", // High error correction for reliable scanning on printed flyers
      color: {
        dark: "#1F2937",
        light: "#FFFFFF",
      },
    });

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
        ...(download
          ? { "Content-Disposition": `attachment; filename="Mission3F-QR-${codeToUse}.png"` }
          : {}),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to generate QR code: " + err.message },
      { status: 500 }
    );
  }
}
