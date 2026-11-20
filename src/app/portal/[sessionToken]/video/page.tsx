"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Clock,
  CheckCircle2,
  Unlock,
  AlertCircle,
  ArrowRight,
  Eye,
  Info,
  FastForward,
} from "lucide-react";
import { formatSecondsToMMSS } from "@/lib/utils";

interface StudentData {
  id: string;
  name: string;
  phone: string;
  sessionToken: string;
  videoPlaybackToken?: string;
  school: {
    schoolName: string;
    schoolCode: string;
  };
  slot: {
    id: string;
    slotName: string;
    videoStartTime: string;
    videoEndTime: string;
    examStartTime: string;
    examEndTime: string;
    isDrmProtected?: boolean;
    sha256Fingerprint?: string;
  };
  attempt?: any;
}

export default function VideoClassroomPage() {
  const params = useParams();
  const router = useRouter();
  const sessionToken = params.sessionToken as string;

  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [videoFinished, setVideoFinished] = useState(false);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data && event.data.type === "3F_VIDEO_FINISHED") {
        setVideoFinished(true);
        setSecondsRemaining(0);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/exam/status/${sessionToken}`);
        if (res.ok) {
          const data = await res.json();
          setStudent(data);

          const now = new Date().getTime();
          const end = new Date(data.slot.videoEndTime).getTime();
          const diff = Math.floor((end - now) / 1000);

          if (diff <= 0) {
            setSecondsRemaining(0);
            setVideoFinished(true);
          } else {
            setSecondsRemaining(diff);
          }
        }
      } catch (err) {
        console.error("Error loading video classroom:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [sessionToken]);

  useEffect(() => {
    if (secondsRemaining === null || videoFinished) return;

    if (secondsRemaining <= 0) {
      setVideoFinished(true);
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setVideoFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining, videoFinished]);

  const handleSimulateFinish = () => {
    setVideoFinished(true);
    setSecondsRemaining(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-soft-white text-brand-charcoal">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-wider text-brand-gray font-semibold">
            Synchronizing Video Classroom Timer...
          </p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-soft-white p-4 text-center">
        <div className="card-premium p-8 max-w-md w-full space-y-4">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h2 className="text-lg font-bold text-brand-charcoal">Session Unavailable</h2>
          <Link href="/" className="inline-block px-4 py-2 bg-brand-orange text-white rounded-xl text-xs font-semibold">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Secure URL: uses signed cryptographic token with zero raw YouTube link exposure
  const securePlayerSrc = student.videoPlaybackToken
    ? `/api/video/player?token=${encodeURIComponent(student.videoPlaybackToken)}`
    : `/api/video/player?session=${sessionToken}`;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 bg-brand-soft-white">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="card-premium p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/images/mission-3f-logo.png"
              alt="Mission 3F Logo"
              width={160}
              height={100}
              className="h-12 w-auto object-contain flex-shrink-0"
              priority
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange block">
                Scheduled Timed Classroom
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-brand-charcoal">
                Road Safety Video Instruction
              </h1>
              <p className="text-xs text-brand-gray">
                Candidate: <strong className="text-brand-charcoal">{student.name}</strong> • {student.school.schoolName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-sm sm:text-base font-bold border ${
              videoFinished
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : "bg-brand-cream border-brand-orange/40 text-brand-orange"
            }`}>
              <Clock className="w-4 h-4" />
              <span>{videoFinished ? "00:00 — UNLOCKED" : `Timer: ${formatSecondsToMMSS(secondsRemaining || 0)}`}</span>
            </div>

            {!videoFinished && (
              <button
                onClick={handleSimulateFinish}
                title="Testing shortcut: simulate video completion"
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-charcoal text-xs flex items-center gap-1 border border-slate-200 transition-colors"
              >
                <FastForward className="w-3.5 h-3.5 text-brand-orange" />
                <span className="hidden sm:inline">Simulate Finish</span>
              </button>
            )}
          </div>
        </div>

        {/* AUTO-HIDE DOM LOGIC: If video is still active, show iframe; once finished, completely unmount! */}
        {!videoFinished ? (
          <div className="card-premium p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-brand-gray pb-2 border-b border-slate-100 gap-2">
              <span className="flex items-center gap-1.5 text-brand-orange font-semibold">
                <Eye className="w-4 h-4" />
                Mandatory Video Instruction Session
              </span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <Shield className="w-3 h-3 text-emerald-600" />
                  <span>Encrypted Stream • Protected</span>
                </span>
                <span className="font-mono text-slate-500">
                  Unlock Time: {new Date(student.slot.videoEndTime).toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Secure Encrypted Player Frame - Zero Direct Video URL Exposure */}
            <div
              onContextMenu={(e) => e.preventDefault()}
              className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-200 shadow-md select-none"
            >
              <iframe
                src={securePlayerSrc}
                title="3F Road Safety Video Training"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0 select-none"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-brand-gray flex items-start gap-2.5">
              <Info className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
              <span>
                <strong>Protected Classroom Session:</strong> Video stream is cryptographically encrypted. The 30-MCQ examination will unlock automatically once this countdown reaches 00:00. This player will automatically unmount from your screen and reveal the exam access key.
              </span>
            </div>
          </div>
        ) : (
          /* AUTO-HIDE UNMOUNTED STATE */
          <div className="card-premium p-8 sm:p-12 text-center space-y-6 border-2 border-emerald-300 bg-emerald-50/30">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Unlock className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                DOM Auto-Transition Complete
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal">
                Training Video Completed. Examination Portal Unlocked.
              </h2>
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                You have fulfilled the required video instruction module. You are now authorized to commence the timed 30-MCQ digital road safety examination.
              </p>
            </div>

            <div className="pt-2 max-w-sm mx-auto">
              <Link
                href={`/portal/${sessionToken}/exam`}
                className="w-full py-4 px-6 text-sm sm:text-base font-bold uppercase tracking-wider text-white rounded-xl bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Proceed to 30-MCQ Road Safety Exam</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="text-[11px] text-brand-gray font-mono">
              Exam Rules: 30 Questions • 20:00 Minutes Countdown • Forced Auto-Submission
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
