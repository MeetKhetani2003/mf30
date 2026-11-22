"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Clock,
  Video,
  FileQuestion,
  Trophy,
  User,
  Phone,
  MapPin,
  Bike,
  Building2,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Copy,
  ExternalLink,
  Award,
  Lock,
  Unlock,
  Sparkles,
} from "lucide-react";

interface SlotData {
  id: string;
  slotName: string;
  youtubeUrl: string;
  videoStartTime: string;
  videoEndTime: string;
  examStartTime: string;
  examEndTime: string;
  examDurationMin: number;
}

interface StudentData {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string | null;
  standard: string;
  section: string;
  ridingExperience: string;
  sessionToken: string;
  school: {
    schoolName: string;
    schoolCode: string;
    teacherName: string;
  };
  slot: SlotData;
  attempt?: {
    score: number;
    totalQuestions: number;
    timeTakenSec: number;
    submittedAt: string;
  } | null;
}

export default function StudentPortalHub() {
  const params = useParams();
  const router = useRouter();
  const sessionToken = params.sessionToken as string;

  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Lock & Verification State
  const [testBypassLock, setTestBypassLock] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [detailsConfirmed, setDetailsConfirmed] = useState(false);

  // Time Countdown
  const [timeLeftStr, setTimeLeftStr] = useState<string>("");
  const [isSlotLocked, setIsSlotLocked] = useState<boolean>(true);

  useEffect(() => {
    async function loadPortal() {
      try {
        const res = await fetch(`/api/exam/status/${sessionToken}`);
        if (res.ok) {
          const data = await res.json();
          setStudent(data);
        } else {
          setError("Session link invalid or expired.");
        }
      } catch (err) {
        setError("Error connecting to server.");
      } finally {
        setLoading(false);
      }
    }
    if (sessionToken) {
      loadPortal();
    }
  }, [sessionToken]);

  // Live Slot Countdown Engine
  useEffect(() => {
    if (!student?.slot?.examStartTime) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const examStart = new Date(student.slot.examStartTime).getTime();
      const diff = examStart - now;

      if (diff <= 0 || testBypassLock) {
        setIsSlotLocked(false);
        setTimeLeftStr("00:00:00 (Unlocked)");
      } else {
        setIsSlotLocked(true);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeLeftStr(`${days}d ${hours}h ${mins}m ${secs}s`);
        } else {
          setTimeLeftStr(
            `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
          );
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [student, testBypassLock]);

  const copyMagicLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLaunchExam = () => {
    router.push(`/portal/${sessionToken}/exam`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-soft-white text-brand-charcoal">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-wider text-brand-gray font-semibold">
            Loading Candidate Portal...
          </p>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-brand-soft-white">
        <div className="card-premium p-8 max-w-md w-full text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-brand-charcoal">Session Link Error</h2>
          <p className="text-xs text-brand-gray">{error || "Student record not found."}</p>
          <Link
            href="/students"
            className="inline-block px-5 py-2.5 rounded-xl bg-brand-orange text-white font-semibold text-xs"
          >
            Go to Student Registration
          </Link>
        </div>
      </div>
    );
  }

  const isExamAttempted = !!student.attempt;
  const examStartTimeObj = new Date(student.slot.examStartTime);
  const examDateFormatted = examStartTimeObj.toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 bg-brand-soft-white">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="card-premium p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left">
            <Image
              src="/images/mission-3f-logo.png"
              alt="Mission 3F Logo"
              width={180}
              height={113}
              className="h-14 sm:h-16 w-auto object-contain flex-shrink-0"
              priority
            />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Candidate Dashboard &bull; Mission 3F
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal">
                Welcome, {student.name}
              </h1>
              <p className="text-xs text-brand-gray">
                {student.school.schoolName} ({student.school.schoolCode}) &bull; {student.standard} - {student.section}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyMagicLink}
              className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-brand-charcoal hover:border-brand-orange flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-brand-orange" />
              <span>{copied ? "Link Copied!" : "Copy Portal Link"}</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PRIZE & TOP 10 HELMET DISPATCH BANNER                     */}
        {/* ========================================================= */}
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-300 rounded-2xl p-5 flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-amber-950">
                Top 10 Batch Prize: Official Mission 3F ISI Certified Helmet!
              </h3>
              <p className="text-xs text-amber-800">
                Your registered delivery address: <strong className="text-slate-900">{student.address}</strong>
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 bg-white text-amber-800 border border-amber-300 rounded-full text-xs font-bold">
            10 / 20 / 30 Batches
          </span>
        </div>

        {/* ========================================================= */}
        {/* EXAM STATUS & TIMING CONTROLLER                           */}
        {/* ========================================================= */}
        <div className="card-premium p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Scheduled Examination
              </span>
              <h2 className="text-xl font-bold text-brand-charcoal mt-0.5">
                {student.slot.slotName}
              </h2>
              <p className="text-xs text-brand-gray mt-0.5">
                Official Date &amp; Time: <strong className="text-brand-charcoal">{examDateFormatted}</strong>
              </p>
            </div>

            {/* Test Simulation Toggle */}
            <button
              onClick={() => setTestBypassLock(!testBypassLock)}
              className="text-xs font-medium text-slate-500 hover:text-brand-orange bg-slate-50 hover:bg-orange-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 self-end sm:self-center"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span>{testBypassLock ? "Re-lock (Testing Mode Active)" : "Simulate 5:00 PM Unlock (Tester)"}</span>
            </button>
          </div>

          {/* If Exam has already been submitted */}
          {isExamAttempted ? (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-950">
                  Examination Successfully Submitted!
                </h3>
                <p className="text-xs text-emerald-800 mt-1">
                  Score: <strong>{student.attempt?.score} / {student.attempt?.totalQuestions}</strong>
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/portal/${sessionToken}/leaderboard`}
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Trophy className="w-4 h-4" />
                  <span>View Slot Leaderboard &amp; Batch Standing →</span>
                </Link>
              </div>
            </div>
          ) : isSlotLocked ? (
            /* LOCKED UNTIL 5:00 PM */
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 sm:p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-200 text-slate-600 flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Examination Room Locked Until Scheduled Time
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                  {timeLeftStr || "Calculating..."}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  The examination room unlocks automatically at <strong>5:00 PM IST</strong> on your scheduled exam day ({examDateFormatted}).
                </p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl max-w-md mx-auto text-xs text-slate-500 text-left space-y-1">
                <p className="font-semibold text-slate-700">Exam Instructions &amp; Rules:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  <li>30 Multiple Choice Questions (MCQs) covering the 6 pillars.</li>
                  <li>Fixed 20-minute timer with forced auto-submit at 00:00.</li>
                  <li>Tab switching or window minimization triggers anti-cheat strikes.</li>
                  <li>Top 10 candidates in this batch win a Mission 3F ISI Safety Helmet.</li>
                </ul>
              </div>
            </div>
          ) : (
            /* UNLOCKED: DETAIL VERIFICATION & EXAM LAUNCH */
            <div className="bg-orange-50/50 border-2 border-brand-orange/50 rounded-2xl p-6 sm:p-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-brand-orange text-white flex items-center justify-center mx-auto shadow-md">
                <Unlock className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Examination Hall Unlocked!
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  Ready to Start Your 30-MCQ Exam?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Please verify your candidate details and delivery address below before launching the test.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowVerifyModal(true)}
                className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] hover:from-[#FF6A00] hover:to-[#E65F00] text-white font-bold text-sm shadow-md shadow-orange-500/20 inline-flex items-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>Verify Details &amp; Start Examination</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Candidate Dossier Card */}
        <div className="card-premium p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
              <User className="w-4 h-4 text-brand-orange" />
              <span>Registered Candidate Profile</span>
            </h3>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Registered
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-brand-gray font-medium block">Candidate Name</span>
              <p className="text-brand-charcoal font-semibold">{student.name}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-brand-gray font-medium block">Contact Number</span>
              <p className="text-brand-charcoal font-semibold">{student.phone}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-brand-gray font-medium block">Class &amp; Section</span>
              <p className="text-brand-charcoal font-semibold">{student.standard} - {student.section}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-brand-gray font-medium block">Riding Level</span>
              <p className="text-brand-orange font-semibold truncate" title={student.ridingExperience}>
                {student.ridingExperience}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-brand-gray font-medium block mb-0.5">Helmet Courier Delivery Address:</span>
            <p className="text-brand-charcoal font-semibold">{student.address}</p>
          </div>
        </div>

        {/* Quick Links Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-slate-500">
          <Link href="/volunteer" className="text-brand-orange font-semibold hover:underline">
            🤝 Want to Volunteer &amp; become an Ambassador? Apply here →
          </Link>

          <Link href={`/portal/${sessionToken}/leaderboard`} className="text-slate-600 hover:text-brand-orange">
            View Current Slot Leaderboard →
          </Link>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CANDIDATE VERIFICATION MODAL BEFORE ENTERING EXAM         */}
      {/* ========================================================= */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-orange-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-brand-orange flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Verify Your Candidate Details
              </h3>
              <p className="text-xs text-slate-500">
                Please verify your information before the examination commences.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Candidate Name:</span>
                <strong className="text-slate-900">{student.name}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">School:</span>
                <strong className="text-slate-900">{student.school.schoolName}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Class &amp; Section:</span>
                <strong className="text-slate-900">{student.standard} - {student.section}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Contact Number:</span>
                <strong className="text-slate-900">{student.phone}</strong>
              </div>
              <div className="pt-1">
                <span className="text-slate-500 block mb-1">Confirmed Delivery Address for ISI Helmet:</span>
                <p className="font-semibold text-slate-900 bg-white p-2 rounded-lg border border-slate-200">
                  {student.address}
                </p>
              </div>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={detailsConfirmed}
                onChange={(e) => setDetailsConfirmed(e.target.checked)}
                className="mt-0.5 rounded text-orange-600 focus:ring-orange-500 h-4 w-4"
              />
              <span>
                I verify that my candidate details and delivery address are accurate for official certificate generation and ISI helmet dispatch.
              </span>
            </label>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowVerifyModal(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!detailsConfirmed}
                onClick={handleLaunchExam}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] hover:from-[#FF6A00] hover:to-[#E65F00] text-white font-bold text-xs shadow-md transition-all disabled:opacity-40 flex items-center gap-1.5"
              >
                <span>Enter Examination Hall (30 MCQs)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
