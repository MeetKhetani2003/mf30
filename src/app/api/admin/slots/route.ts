import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { encryptVideoUrl, decryptVideoUrl, computeSha256 } from "@/lib/video-crypto";

export async function GET() {
  try {
    const rawSlots = await prisma.examSlot.findMany({
      include: {
        _count: {
          select: { attempts: true, students: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const slots = rawSlots.map((s) => {
      const rawDecrypted = decryptVideoUrl(s.youtubeUrl) || s.youtubeUrl;
      const sha256 = computeSha256(rawDecrypted);
      const isEncrypted = s.youtubeUrl.startsWith("enc_v1_");

      return {
        ...s,
        rawUrl: rawDecrypted,
        isEncrypted,
        sha256Fingerprint: sha256.substring(0, 16),
        sha256Full: sha256,
      };
    });

    return NextResponse.json({ slots });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      slotName,
      youtubeUrl,
      videoStartTime,
      videoEndTime,
      examStartTime,
      examEndTime,
      examDurationMin,
      isActive,
    } = body;

    if (!slotName || !youtubeUrl) {
      return NextResponse.json(
        { error: "Slot Name and YouTube URL are required." },
        { status: 400 }
      );
    }

    // Encrypt the Video URL with AES-256-GCM + SHA-256
    const { encryptedToken, sha256Checksum } = encryptVideoUrl(youtubeUrl);

    const payload = {
      slotName,
      youtubeUrl: encryptedToken,
      videoStartTime: videoStartTime ? new Date(videoStartTime) : new Date(),
      videoEndTime: videoEndTime ? new Date(videoEndTime) : new Date(Date.now() + 10 * 60 * 1000),
      examStartTime: examStartTime ? new Date(examStartTime) : new Date(Date.now() + 10 * 60 * 1000),
      examEndTime: examEndTime ? new Date(examEndTime) : new Date(Date.now() + 70 * 60 * 1000),
      examDurationMin: parseInt(examDurationMin || "20", 10),
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    };

    let slot;
    if (id) {
      slot = await prisma.examSlot.update({
        where: { id },
        data: payload,
      });
    } else {
      slot = await prisma.examSlot.create({
        data: payload,
      });
    }

    return NextResponse.json({
      success: true,
      slot: {
        ...slot,
        isEncrypted: true,
        sha256Checksum,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
