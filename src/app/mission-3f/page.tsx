import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Zap,
  Target,
  Activity,
  CheckCircle2,
  Award,
  Video,
  FileQuestion,
  Trophy,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

export const metadata = {
  title: "Mission 3F — Fit | Fast | Focused | Road Safety Campaign",
  description:
    "Discover Mission 3F by Mahal Welfare Services: Fit, Fast, and Focused road safety education, timed classroom videos, and digital certification exams.",
};

export default function Mission3FPage() {
  return (
    <div className="bg-brand-soft-white py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 space-y-16">
        {/* Header Hero Lockup */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Image
            src="/images/mission-3f-logo.png"
            alt="Mission 3F — Fit Fast Focused"
            width={240}
            height={150}
            className="h-20 sm:h-24 w-auto mx-auto object-contain"
            priority
          />

          <span className="px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-orange/30 text-xs text-brand-orange font-bold uppercase tracking-wider">
            Signature Road Safety Education LMS
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-charcoal">
            The Three Pillars of <span className="text-brand-orange">Mission 3F</span>
          </h1>

          <p className="text-sm sm:text-base text-brand-gray max-w-2xl mx-auto leading-relaxed">
            Mission 3F represents a paradigm shift in youth road safety education. We reject passive lectures in favor of interactive multimedia classrooms, synchronized examinations, and merit-based motivation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/register/XAV-DEL-101"
              className="px-6 py-3 rounded-xl bg-brand-orange text-white text-xs sm:text-sm font-semibold hover:bg-brand-orange-hover shadow-glow-orange-sm flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Registration</span>
            </Link>
            <Link
              href="/schools"
              className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-brand-charcoal text-xs sm:text-sm font-semibold hover:bg-slate-50"
            >
              School Partnership
            </Link>
          </div>
        </div>

        {/* The 3 Pillars In Detail */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: FIT */}
          <div className="card-premium p-8 space-y-4 border-t-4 border-t-brand-orange">
            <div className="w-14 h-14 rounded-2xl bg-brand-cream border border-brand-orange/30 flex items-center justify-center text-brand-orange">
              <Activity className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Pillar 01
            </span>
            <h2 className="text-2xl font-bold text-brand-charcoal">
              FIT — Responsible Users
            </h2>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
              Equipping oneself with certified protective equipment. A rider or pillion is only road-ready when their helmet is ISI-certified (IS 4151) with a fastened two-finger chin-strap, or when car occupants are restrained by three-point seatbelts.
            </p>
            <ul className="space-y-2 text-xs text-brand-charcoal pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Full-face helmet chin-strap security</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>High-visibility reflective safety apparel</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Routine tyre tread &amp; brake pad inspections</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: FAST */}
          <div className="card-premium p-8 space-y-4 border-t-4 border-t-amber-500">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Zap className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Pillar 02
            </span>
            <h2 className="text-2xl font-bold text-brand-charcoal">
              FAST — Alert Decisions
            </h2>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
              Cognitive speed over vehicular speed. Fast means quick hazard perception, situational anticipation, recognizing amber light transitions, and defensive stopping before potential collisions occur.
            </p>
            <ul className="space-y-2 text-xs text-brand-charcoal pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Perception-reaction buffer mastery</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>School zone speed ceilings (20-25 km/h)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Understanding stopping distance physics (v²)</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: FOCUSED */}
          <div className="card-premium p-8 space-y-4 border-t-4 border-t-emerald-500">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Target className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Pillar 03
            </span>
            <h2 className="text-2xl font-bold text-brand-charcoal">
              FOCUSED — Zero Distraction
            </h2>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
              Uncompromising road concentration. Total elimination of mobile phone calls, texting, and earbuds while riding or driving. Unwavering pedestrian yielding and strict adherence to zero-alcohol sober driving.
            </p>
            <ul className="space-y-2 text-xs text-brand-charcoal pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero phone usage while in transit</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Unquestioned zebra crossing right-of-way</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Anti-DUI &amp; Section 185 compliance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning, Exam, & Reward Workflow */}
        <div className="card-premium p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-charcoal">
              The Digital Assessment Pipeline
            </h3>
            <p className="text-xs sm:text-sm text-brand-gray">
              Engineered with server-synchronized timers and automated evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-brand-soft-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-cream border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                <Video className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-brand-charcoal">1. Timed Video Classroom</h4>
              <p className="text-xs text-brand-gray leading-relaxed">
                Embedded YouTube training curriculum configured for each slot. Real-time countdown clock synchronizes learning; the video auto-unmounts from the DOM upon completion.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-soft-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <FileQuestion className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-brand-charcoal">2. 30-MCQ Digital Exam</h4>
              <p className="text-xs text-brand-gray leading-relaxed">
                20-minute countdown with forced server auto-submission at 00:00. Questions span helmet laws, speed limits, right-of-way, and two-wheeler dynamics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-soft-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Trophy className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-brand-charcoal">3. Slot Merit Leaderboard</h4>
              <p className="text-xs text-brand-gray leading-relaxed">
                Deterministic rankings based on highest score with shortest completion time as tie-breaker. Top 10 rankers receive customized shield medals and certified helmets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
