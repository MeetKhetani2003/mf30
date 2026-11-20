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
} from "lucide-react";
import { formatSecondsToMMSS } from "@/lib/utils";

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

  const copyMagicLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
            href="/register/XAV-DEL-101"
            className="inline-block px-5 py-2.5 rounded-xl bg-brand-orange text-white font-semibold text-xs"
          >
            Go to Student Registration
          </Link>
        </div>
      </div>
    );
  }

  const now = new Date();
  const videoEnd = new Date(student.slot.videoEndTime);
  const isVideoDone = now >= videoEnd;
  const isExamAttempted = !!student.attempt;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-brand-soft-white">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Header */}
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
                Candidate Certification Dashboard
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal">
                Welcome, {student.name}
              </h1>
              <p className="text-xs text-brand-gray">
                {student.school.schoolName} ({student.school.schoolCode}) • {student.standard} - {student.section}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyMagicLink}
              className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-brand-charcoal hover:border-brand-orange flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-brand-orange" />
              <span>{copied ? "Link Copied!" : "Bookmark Session"}</span>
            </button>
          </div>
        </div>

        {/* Candidate Dossier Card */}
        <div className="card-premium p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
              <User className="w-4 h-4 text-brand-orange" />
              <span>Verified Onboarding Dossier</span>
            </h3>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Active Candidate
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-brand-gray font-medium block">Phone Number</span>
              <p className="text-brand-charcoal font-semibold">{student.phone}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-brand-gray font-medium block">School Coordinator</span>
              <p className="text-brand-charcoal font-semibold">{student.school.teacherName}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-brand-gray font-medium block">Two-Wheeler Experience</span>
              <p className="text-brand-orange font-semibold truncate" title={student.ridingExperience}>
                {student.ridingExperience}
              </p>
            </div>
          </div>
        </div>

        {/* 3-Step Road Safety Progression */}
        <div className="card-premium p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Assigned Examination Slot
              </span>
              <h2 className="text-xl font-bold text-brand-charcoal">
                {student.slot.slotName}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-brand-gray bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-brand-orange" />
              <span>Duration: {student.slot.examDurationMin} Mins</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Step 1: Video Classroom */}
            <div className={`p-5 rounded-2xl border transition-all ${
              isVideoDone ? "bg-emerald-50/50 border-emerald-200" : "bg-white border-brand-orange/50 shadow-sm"
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl ${isVideoDone ? "bg-emerald-100 text-emerald-700" : "bg-brand-cream text-brand-orange"}`}>
                  <Video className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-brand-gray">Step 1</span>
              </div>
              <h4 className="text-base font-bold text-brand-charcoal mb-1">
                Timed Video Classroom
              </h4>
              <p className="text-xs text-brand-gray leading-relaxed mb-4">
                Watch mandatory road safety training video until the timer expires.
              </p>
              <Link
                href={`/portal/${sessionToken}/video`}
                className={`w-full py-2.5 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  isVideoDone
                    ? "bg-slate-100 hover:bg-slate-200 text-brand-charcoal"
                    : "bg-brand-orange hover:bg-brand-orange-hover text-white shadow-sm"
                }`}
              >
                <span>{isVideoDone ? "Review Classroom" : "Enter Video Classroom"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Step 2: 30-MCQ Digital Exam */}
            <div className={`p-5 rounded-2xl border transition-all ${
              isExamAttempted
                ? "bg-emerald-50/50 border-emerald-200"
                : isVideoDone
                ? "bg-white border-brand-orange shadow-glow-orange-sm"
                : "bg-slate-50 border-slate-200 opacity-60"
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl ${isExamAttempted ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  <FileQuestion className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-brand-gray">Step 2</span>
              </div>
              <h4 className="text-base font-bold text-brand-charcoal mb-1">
                30-MCQ Digital Exam
              </h4>
              <p className="text-xs text-brand-gray leading-relaxed mb-4">
                {isExamAttempted
                  ? `Completed! Score: ${student.attempt?.score} / 30`
                  : "Timed 20-minute test with auto-submission at 00:00."}
              </p>
              {isExamAttempted ? (
                <div className="w-full py-2.5 px-4 text-xs font-bold rounded-xl bg-emerald-100 text-emerald-800 text-center border border-emerald-300">
                  Exam Submitted
                </div>
              ) : (
                <Link
                  href={`/portal/${sessionToken}/exam`}
                  className={`w-full py-2.5 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                    isVideoDone
                      ? "bg-brand-orange hover:bg-brand-orange-hover text-white shadow-sm"
                      : "bg-slate-200 text-slate-400 pointer-events-none"
                  }`}
                >
                  <span>{isVideoDone ? "Launch 30-MCQ Exam" : "Locked (Watch Video)"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            {/* Step 3: Slot Leaderboard */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-brand-gray">Step 3</span>
                </div>
                <h4 className="text-base font-bold text-brand-charcoal mb-1">
                  Slot Leaderboard &amp; Top 10
                </h4>
                <p className="text-xs text-brand-gray leading-relaxed mb-4">
                  Merit list ranked by highest score and completion time tie-breaker.
                </p>
              </div>
              <Link
                href={`/portal/${sessionToken}/leaderboard`}
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-charcoal flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Standings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
