import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifySignedPlaybackToken, decryptVideoUrl, extractYouTubeVideoId, computeSha256 } from "@/lib/video-crypto";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return new NextResponse(
        renderErrorPage("Playback Token Missing", "A cryptographically signed playback token is required to access this video instruction."),
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    const payload = verifySignedPlaybackToken(token);
    if (!payload) {
      return new NextResponse(
        renderErrorPage("Session Token Invalid or Expired", "This video playback token has expired or failed cryptographic SHA verification. Please refresh your classroom portal."),
        { status: 403, headers: { "Content-Type": "text/html" } }
      );
    }

    const student = await prisma.student.findUnique({
      where: { sessionToken: payload.sessionToken },
      include: {
        school: true,
        slot: true,
      },
    });

    if (!student || !student.slot) {
      return new NextResponse(
        renderErrorPage("Candidate Record Not Found", "No registered candidate or active exam slot corresponds to this playback token."),
        { status: 404, headers: { "Content-Type": "text/html" } }
      );
    }

    // Decrypt the video URL securely on server-side
    const rawUrl = decryptVideoUrl(student.slot.youtubeUrl);
    if (!rawUrl) {
      return new NextResponse(
        renderErrorPage("Decryption Error", "Failed to decrypt the video stream URL from the encrypted database cipher."),
        { status: 500, headers: { "Content-Type": "text/html" } }
      );
    }

    const videoId = extractYouTubeVideoId(rawUrl) || "Z0o2Bw8U_50";
    const shaFingerprint = computeSha256(rawUrl).substring(0, 16);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mission 3F Secure Video Player</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      background: #000;
      overflow: hidden;
      user-select: none;
      -webkit-user-select: none;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #player-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000;
    }
    #player {
      width: 100%;
      height: 100%;
      border: 0;
    }
    /* Anti-Clickjacking Header Shield to prevent clicking YouTube title / watch on YouTube */
    .top-click-shield {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;
      z-index: 10;
      cursor: default;
      background: transparent;
    }
    /* Anti-Clickjacking Logo Shield to cover the bottom-right YouTube logo */
    .bottom-logo-shield {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 110px;
      height: 48px;
      z-index: 10;
      cursor: default;
      background: transparent;
    }
    /* Dynamic Floating Watermark across screen to prevent piracy */
    .watermark {
      position: absolute;
      pointer-events: none;
      z-index: 15;
      color: rgba(255, 255, 255, 0.35);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
      padding: 4px 8px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.2);
      animation: drift 30s ease-in-out infinite alternate;
    }
    @keyframes drift {
      0% { top: 15%; left: 10%; }
      25% { top: 60%; left: 40%; }
      50% { top: 30%; left: 65%; }
      75% { top: 70%; left: 20%; }
      100% { top: 40%; left: 50%; }
    }
    /* Security Badge */
    .security-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 20;
      background: rgba(31, 41, 55, 0.85);
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 106, 0, 0.4);
      color: #FFF;
      font-size: 10px;
      padding: 3px 8px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 5px;
      pointer-events: none;
    }
    .security-badge .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10B981;
    }
  </style>
</head>
<body oncontextmenu="return false;">
  <div id="player-container">
    <div class="security-badge">
      <span class="dot"></span>
      <span>SHA-256 Protected • DRM Verified (${shaFingerprint})</span>
    </div>

    <div class="top-click-shield" title="Mission 3F Road Safety Video Platform"></div>
    <div class="bottom-logo-shield" title="Mission 3F DRM Protection"></div>

    <div class="watermark" id="watermark">
      ${escapeHtml(student.name)} • ${escapeHtml(student.school.schoolCode)} • MWS Mission 3F
    </div>

    <div id="player"></div>
  </div>

  <script src="https://www.youtube.com/iframe_api"></script>
  <script>
    // Suppress context menu & shortcuts
    document.addEventListener('contextmenu', function(e) { e.preventDefault(); return false; });
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 's' || e.key === 'p')) {
        e.preventDefault();
        return false;
      }
    });

    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        videoId: '${videoId}',
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          fs: 1,
          disablekb: 0,
          iv_load_policy: 3,
          playsinline: 1
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }

    function onPlayerReady(event) {
      event.target.playVideo();
    }

    function onPlayerStateChange(event) {
      // 0 = YT.PlayerState.ENDED
      if (event.data === 0) {
        if (window.parent) {
          window.parent.postMessage({ type: '3F_VIDEO_FINISHED' }, '*');
        }
      }
    }
  </script>
</body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Frame-Options": "SAMEORIGIN",
        "Content-Security-Policy": "frame-ancestors 'self'",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (err: any) {
    return new NextResponse(
      renderErrorPage("Playback Engine Error", err.message || "An unexpected error occurred while initializing secure video player."),
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}

function renderErrorPage(title: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
  <style>
    body { background: #F8FAFC; color: #1F2937; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; }
    .card { background: #FFF; border: 1px solid #E5E7EB; border-radius: 16px; padding: 32px; max-width: 480px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    h2 { color: #DC2626; font-size: 18px; margin-bottom: 8px; }
    p { color: #6B7280; font-size: 13px; line-height: 1.5; margin-bottom: 16px; }
    .badge { display: inline-block; background: #FFF4E8; color: #FF6A00; border: 1px solid #FF6A00; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Mission 3F Security Guard</span>
    <h2 style="margin-top:16px;">${escapeHtml(title)}</h2>
    <p>${escapeHtml(message)}</p>
  </div>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
