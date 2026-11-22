"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  Award,
  Clock,
  User,
  Shield,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  Bike,
  ShieldAlert,
  AlertOctagon,
  HeartHandshake,
  Gift,
} from "lucide-react";
import confetti from "canvas-confetti";
import { formatSecondsToMMSS } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  studentId: string;
  name: string;
  schoolName: string;
  schoolCode: string;
  score: number;
  totalQuestions: number;
  timeTakenSec: number;
  ridingExperience: string;
  submittedAt: string;
  isCurrentUser: boolean;
}

interface LeaderboardData {
  slot: {
    id: string;
    slotName: string;
    totalAttempts: number;
  };
  currentUser: {
    name: string;
    score: number;
    totalQuestions: number;
    timeTakenSec: number;
    rank: number;
    percentage: number;
    ridingExperience: string;
    schoolName: string;
  } | null;
  topRankers: LeaderboardEntry[];
}

export default function LeaderboardPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const sessionToken = params.sessionToken as string;
  const forcedType = searchParams.get("forced");

  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const res = await fetch(`/api/exam/leaderboard/${sessionToken}`);
        if (res.ok) {
          const result = await res.json();
          setData(result);

          if (result.currentUser && result.currentUser.rank <= 10) {
            try {
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#FF6A00", "#D97706", "#16A34A", "#F59E0B"],
              });
            } catch (e) {
              // Ignore
            }
          }
        } else {
          setError("Failed to fetch slot leaderboard data.");
        }
      } catch (err) {
        setError("Network error while connecting to leaderboard.");
      } finally {
        setLoading(false);
      }
    }
    if (sessionToken) {
      loadLeaderboard();
    }
  }, [sessionToken]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-soft-white text-brand-charcoal">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-wider text-brand-gray font-semibold">
            Compiling Slot Merit &amp; Tie-Breaker Standings...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-soft-white p-4 text-center">
        <div className="card-premium p-8 max-w-md w-full space-y-4">
          <Trophy className="w-10 h-10 text-brand-gray mx-auto" />
          <h2 className="text-xl font-bold text-brand-charcoal">Leaderboard Standby</h2>
          <p className="text-xs text-brand-gray">{error || "Leaderboard standings are being calculated."}</p>
          <Link href={`/portal/${sessionToken}`} className="inline-block px-4 py-2 bg-brand-orange text-white rounded-xl text-xs font-semibold">
            Back to Portal
          </Link>
        </div>
      </div>
    );
  }

  const { currentUser, topRankers, slot } = data;
  const isPassed = currentUser ? currentUser.score >= 18 : false;
  const isUserInTop10 = currentUser ? currentUser.rank <= 10 : false;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 bg-brand-soft-white">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-cream text-brand-orange border border-brand-orange/30">
                <Trophy className="w-3.5 h-3.5" />
                <span>Merit &amp; Tie-Breaker Standings</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal mt-1">
                Mission 3F Examination Leaderboard
              </h1>
              <p className="text-xs text-brand-gray">
                Batch: <strong className="text-brand-charcoal">{slot.slotName}</strong> ({slot.totalAttempts} Submissions)
              </p>
            </div>
          </div>

          <Link
            href={`/portal/${sessionToken}`}
            className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-brand-charcoal hover:border-brand-orange transition-colors"
          >
            Candidate Hub
          </Link>
        </div>

        {/* Forced Submission Security Notices */}
        {forcedType === "violation" && (
          <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300 text-xs text-red-900 flex items-start gap-3 shadow-xs">
            <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-0.5">
              <strong className="block font-bold text-red-800 text-sm">
                Forced Submission: Proctoring Security Rule Violation
              </strong>
              <p className="text-red-700 leading-relaxed font-medium">
                Your examination was automatically and permanently submitted by the Mission 3F Proctoring Engine because multiple tab switches or window focus-loss attempts were detected. All answers recorded prior to the violation have been locked and graded.
              </p>
            </div>
          </div>
        )}

        {forcedType === "timer" && (
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-xs text-amber-900 flex items-start gap-3 shadow-xs">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="block font-bold text-amber-800 text-sm">
                Automatic Submission: Examination Timer Concluded (00:00)
              </strong>
              <p className="text-amber-700 leading-relaxed font-medium">
                The official 20-minute slot countdown ended. All responses completed before time expired were automatically saved and certified on the server.
              </p>
            </div>
          </div>
        )}

        {/* TOP 10 HELMET AWARD CELEBRATION BANNER */}
        {isUserInTop10 && currentUser && (
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-orange-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-center gap-6 relative">
              <div className="w-20 h-20 rounded-3xl bg-white text-brand-orange flex items-center justify-center flex-shrink-0 shadow-md">
                <Award className="w-12 h-12" />
              </div>
              <div className="text-center sm:text-left space-y-1">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-amber-100">
                  🎉 Official Prize Winner
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Congratulations, {currentUser.name}! You are in the TOP 10!
                </h2>
                <p className="text-sm text-amber-100 leading-relaxed">
                  You scored <strong>{currentUser.score} / {currentUser.totalQuestions}</strong> and secured <strong>Rank #{currentUser.rank}</strong> in this batch. An official <strong>Mission 3F ISI Certified Road Safety Helmet</strong> will be dispatched to your registered address!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Current User Score Summary Card */}
        {currentUser && (
          <div className={`card-premium p-6 sm:p-8 border-2 ${
            isPassed ? "border-emerald-400 bg-emerald-50/20" : "border-brand-orange/40 bg-brand-cream/30"
          }`}>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center lg:text-left">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 ${
                  isPassed
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-amber-100 text-amber-800 border border-amber-300"
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isPassed ? "Passed & Certified" : "Assessment Completed"}
                </span>
                <h2 className="text-2xl font-bold text-brand-charcoal">
                  {currentUser.name}
                </h2>
                <p className="text-xs text-brand-gray">
                  {currentUser.schoolName} &bull; {currentUser.ridingExperience}
                </p>
              </div>

              {/* Score Badges */}
              <div className="grid grid-cols-3 gap-3 w-full lg:w-auto text-center">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-bold text-brand-gray uppercase block">Score</span>
                  <span className="text-xl font-bold text-brand-orange">
                    {currentUser.score} / {currentUser.totalQuestions}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-bold text-brand-gray uppercase block">Time Taken</span>
                  <span className="text-xl font-bold text-amber-600 font-mono">
                    {formatSecondsToMMSS(currentUser.timeTakenSec)}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-bold text-brand-gray uppercase block">Batch Rank</span>
                  <span className={`text-xl font-bold ${isUserInTop10 ? "text-amber-600" : "text-emerald-600"}`}>
                    #{currentUser.rank}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOP 10 RANKERS PODIUM / TABLE */}
        <div className="card-premium p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-brand-charcoal flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-orange" />
                <span>Top 10 Rankers Merit List (ISI Helmet Winners)</span>
              </h2>
              <p className="text-xs text-brand-gray">
                Ranked by: <strong>1. Highest Score</strong> &bull; Tie-Breaker: <strong>2. Shortest Completion Time</strong>
              </p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-amber-50 text-xs font-semibold text-amber-900 border border-amber-200 flex items-center gap-1">
              <Gift className="w-3.5 h-3.5 text-amber-600" />
              <span>Certified Helmet Awardees</span>
            </span>
          </div>

          <div className="space-y-3">
            {topRankers.map((entry, index) => {
              const isTop3 = index < 3;
              const medalStyles = [
                "bg-amber-100 border-amber-300 text-amber-800",
                "bg-slate-200 border-slate-300 text-slate-800",
                "bg-orange-100 border-orange-300 text-orange-800",
              ];

              return (
                <div
                  key={entry.studentId}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    entry.isCurrentUser
                      ? "bg-brand-cream border-brand-orange shadow-sm"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Rank Badge */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 border ${
                      isTop3 ? medalStyles[index] : "bg-slate-100 border-slate-200 text-brand-gray"
                    }`}>
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${entry.rank}`}
                    </div>

                    {/* Student Info */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-brand-charcoal">
                          {entry.name}
                        </h4>
                        {entry.isCurrentUser && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-orange text-white">
                            You
                          </span>
                        )}
                        <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300">
                          🏆 ISI Helmet Winner
                        </span>
                      </div>
                      <p className="text-xs text-brand-gray flex items-center gap-2 mt-0.5">
                        <span>{entry.schoolName}</span>
                        <span className="text-slate-300">&bull;</span>
                        <span className="text-slate-500 truncate max-w-[200px]">{entry.ridingExperience}</span>
                      </p>
                    </div>
                  </div>

                  {/* Score & Time */}
                  <div className="flex items-center gap-4 self-end sm:self-center font-mono text-xs">
                    <div className="text-right">
                      <div className="font-bold text-brand-charcoal text-sm">
                        {entry.score} / {entry.totalQuestions}
                      </div>
                      <div className="text-[10px] text-brand-gray">Marks</div>
                    </div>

                    <div className="text-right pl-4 border-l border-slate-200">
                      <div className="font-bold text-amber-600 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-brand-gray" />
                        <span>{formatSecondsToMMSS(entry.timeTakenSec)}</span>
                      </div>
                      <div className="text-[10px] text-brand-gray">Duration</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* VOLUNTEER & AMBASSADOR INVITATION CARD                    */}
        {/* ========================================================= */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Youth Leadership Program
              </span>
              <h3 className="text-xl font-bold text-emerald-950 mt-0.5">
                Join Mission 3F as a Student Road Safety Ambassador!
              </h3>
              <p className="text-xs text-emerald-800 mt-1 max-w-xl leading-relaxed">
                Take road safety leadership into your school and community. Volunteers receive official Mahal Welfare Services commendation certificates, free Mission 3F Ambassador Kits, safety gear, and event gift surprises!
              </p>
            </div>
          </div>

          <Link
            href="/volunteer"
            className="w-full md:w-auto py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            <span>Apply as Volunteer &bull; Ambassador</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
