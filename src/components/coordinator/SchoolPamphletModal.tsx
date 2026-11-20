"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  Printer,
  Download,
  Copy,
  Check,
  X,
  QrCode,
  Shield,
  Smartphone,
  Award,
  Video,
  FileQuestion,
  ExternalLink,
} from "lucide-react";

interface SchoolPamphletModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolName: string;
  schoolCode: string;
  teacherName?: string;
  phone?: string;
}

export default function SchoolPamphletModal({
  isOpen,
  onClose,
  schoolName,
  schoolCode,
  teacherName,
  phone,
}: SchoolPamphletModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const qrPngUrl = `/api/school/${schoolCode}/qr`;
  const qrSvgUrl = `/api/school/${schoolCode}/qr?format=svg`;
  const downloadPngUrl = `/api/school/${schoolCode}/qr?download=true`;
  const downloadSvgUrl = `/api/school/${schoolCode}/qr?format=svg&download=true`;
  const registrationPath = `/register/${schoolCode}`;

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${registrationPath}`;
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      {/* Modal Card / Printable A4 Pamphlet */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden print:border-0 print:shadow-none print:w-full print:max-w-none print:rounded-none">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <QrCode className="w-4 h-4 text-brand-orange" />
            <span>School Registration Pamphlet &amp; QR Code</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print A4 Pamphlet</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE PAMPHLET BODY */}
        <div className="p-6 sm:p-10 space-y-6 print:p-8 print:space-y-4 text-slate-800">
          
          {/* Header Lockup */}
          <div className="flex items-start justify-between border-b-2 border-brand-orange pb-4 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                  Mahal Welfare Services • Est. 2011
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Road Safety Education &amp; Digital Examination
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Mission 3F: Fit • Fast • Focused — Certified Youth Road Safety Campaign
              </p>
            </div>

            <Image
              src="/images/mission-3f-logo.png"
              alt="Mission 3F Logo"
              width={160}
              height={100}
              className="h-12 sm:h-14 w-auto object-contain flex-shrink-0"
              priority
            />
          </div>

          {/* School Authorization Banner */}
          <div className="bg-orange-50 border border-brand-orange/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange block">
                Official Partner Institution
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {schoolName}
              </h2>
              {teacherName && (
                <p className="text-xs text-slate-600 mt-0.5">
                  Coordinator In-Charge: <strong className="text-slate-800">{teacherName}</strong> {phone ? `• ${phone}` : ""}
                </p>
              )}
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-white border border-brand-orange/40 text-center flex-shrink-0">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">School Code</span>
              <span className="text-sm sm:text-base font-mono font-extrabold text-brand-orange">{schoolCode}</span>
            </div>
          </div>

          {/* Centerpiece: QR Code & Scan Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-2">
            
            {/* High-Resolution QR Code Block */}
            <div className="md:col-span-5 flex flex-col items-center text-center space-y-2">
              <div className="p-3 bg-white border-2 border-slate-900 rounded-2xl shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrPngUrl}
                  alt={`QR Code to Register for ${schoolName}`}
                  width={220}
                  height={220}
                  className="w-44 h-44 sm:w-52 sm:h-52 object-contain"
                />
              </div>

              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Scan to Register &amp; Begin
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  /register/{schoolCode}
                </span>
              </div>
            </div>

            {/* 4-Step Instructions for Students & Parents */}
            <div className="md:col-span-7 space-y-3.5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-brand-orange" />
                <span>How Students Participate in 4 Steps:</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-800 block font-semibold">Scan QR Code With Any Smartphone</strong>
                    <span className="text-slate-500 text-[11px]">Open camera app on your phone and point at this code, or visit the URL directly.</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-800 block font-semibold">Enter Student Details (2 Minutes)</strong>
                    <span className="text-slate-500 text-[11px]">Fill student name, class standard, contact number, and two-wheeler riding experience.</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-800 block font-semibold">Watch 10-Min Road Safety Video</strong>
                    <span className="text-slate-500 text-[11px]">Learn IS 4151 helmet safety, speed control, zebra crossings, and defensive driving.</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    4
                  </span>
                  <div>
                    <strong className="text-slate-800 block font-semibold">Take 30-MCQ Exam &amp; Earn Certificate</strong>
                    <span className="text-slate-500 text-[11px]">Complete the 20-minute digital test. Top scorers earn official medals &amp; certificates.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>100% Free School Initiative • Zero Commercial Fee • Mahal Welfare Services (Est. 2011)</span>
            </div>

            <div className="font-mono text-slate-600 text-[10px]">
              Print &amp; display on notice boards or distribute as student circulars.
            </div>
          </div>
        </div>

        {/* Bottom Download & Share Bar (Hidden when printing) */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <a
              href={downloadPngUrl}
              download={`Mission3F-QR-${schoolCode}.png`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-brand-orange text-slate-700 hover:text-brand-orange text-xs font-semibold shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PNG (512x512)</span>
            </a>

            <a
              href={downloadSvgUrl}
              download={`Mission3F-QR-${schoolCode}.svg`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-brand-orange text-slate-700 hover:text-brand-orange text-xs font-semibold shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Vector SVG</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-brand-orange text-slate-700 hover:text-brand-orange text-xs font-semibold shadow-2xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Link Copied!" : "Copy Link"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print A4 Pamphlet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
