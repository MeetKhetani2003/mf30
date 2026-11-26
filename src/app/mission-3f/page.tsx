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
  HeartHandshake,
  Globe2,
  Gift,
} from "lucide-react";

export const metadata = {
  title: "Mission-3F — Fit | Fast | Focused | Mahal Welfare Society",
  description:
    "Discover Mission-3F by Mahal Welfare Society: Fit, Fast, and Focused road safety education, monthly online assessments (9th, 18th, 27th), and our Traffic Soldier movement.",
};

export default function Mission3FPage() {
  return (
    <div className="bg-[#FFFDF9] py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 space-y-16 max-w-6xl">
        {/* Header Hero Lockup */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden shadow-md border-2 border-orange-200">
            <Image
              src="/images/mahal-welfare-logo.png"
              alt="Mission-3F &bull; Mahal Welfare Society"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-brand-orange">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Mahal Welfare Services, Nangal (2011) &amp; Mahal Welfare Society, Canada (2021)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            The Three Pillars of <span className="text-brand-orange">Mission-3F</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Mission-3F unites grassroots action in India with international diaspora reach in Canada to foster a zero-fatality road culture. We combine interactive multimedia training with monthly objective certifications and on-ground Traffic Soldiers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/students"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] text-white text-xs sm:text-sm font-bold hover:scale-[1.01] shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Register for Exam (9th / 18th / 27th)</span>
            </Link>
            <Link
              href="/volunteer"
              className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold hover:bg-slate-50 flex items-center gap-2 transition-colors"
            >
              <HeartHandshake className="w-4 h-4 text-brand-orange" />
              <span>Join as a Traffic Soldier</span>
            </Link>
          </div>
        </div>

        {/* The 3 Pillars In Detail */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: FIT */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4 border-t-4 border-t-brand-orange shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-brand-orange">
              <Activity className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Pillar 01
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              FIT &mdash; Helmet Discipline
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Equipping oneself with certified protective equipment. A rider is only road-ready when their helmet is ISI-certified (IS 4151) with a fastened chin-strap, or when car occupants are restrained by three-point seatbelts.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2">
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
          <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4 border-t-4 border-t-amber-500 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Zap className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Pillar 02
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              FAST &mdash; Quick Reflexes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Cognitive speed over vehicular speed. Fast means quick hazard perception, situational anticipation, recognizing amber light transitions, and defensive stopping before potential collisions occur.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2">
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
                <span>Understanding stopping distance physics (v&sup2;)</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: FOCUSED */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4 border-t-4 border-t-emerald-500 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Target className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Pillar 03
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              FOCUSED &mdash; Zero Distraction
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Uncompromising road concentration. Total elimination of mobile phone calls, texting, and earbuds while riding or driving. Unwavering pedestrian yielding and strict adherence to zero-alcohol sober driving.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2">
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

        {/* ROAD SAFETY DRIVE: BECOME A TRAFFIC SOLDIER */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white rounded-3xl p-8 sm:p-12 shadow-lg shadow-orange-500/20 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/20 pb-4">
            <div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider text-amber-100">
                Joint Nangal &amp; Canada Drive
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Road Safety Drive: Become a Traffic Soldier
              </h3>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white text-brand-orange">
              9th &bull; 18th &bull; 27th at 7:00 PM
            </span>
          </div>

          <p className="text-sm sm:text-base text-amber-100 leading-relaxed max-w-2xl">
            Led jointly by our Nangal and Canada teams, our Road Safety Drive runs regular assessments on the 9th, 18th, and 27th of every month at 7:00 PM. Each batch&apos;s top 10 candidates receive a free ISI-certified helmet, and selected Traffic Soldiers receive a free cap, T-shirt, tracksuit, shoes, and jacket to help promote safer roads.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-1">
              <span className="text-xs font-bold text-amber-200 block uppercase">For Students</span>
              <h4 className="text-lg font-bold text-white">Free ISI Helmet to Top 10</h4>
              <p className="text-xs text-white/80">Take the 20-minute 30-MCQ test on the 9th, 18th, or 27th at 7:00 PM.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-1">
              <span className="text-xs font-bold text-amber-200 block uppercase">For Volunteers</span>
              <h4 className="text-lg font-bold text-white">Traffic Soldier Kit</h4>
              <p className="text-xs text-white/80">Selected volunteers receive a free cap, T-shirt, tracksuit, shoes, and jacket.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              href="/students"
              className="py-3 px-6 rounded-xl bg-white text-brand-orange font-bold text-xs shadow-md hover:bg-orange-50 transition-colors"
            >
              Take Monthly Road Safety Exam &rarr;
            </Link>
            <Link
              href="/volunteer"
              className="py-3 px-6 rounded-xl bg-orange-700/80 border border-white/30 text-white font-bold text-xs hover:bg-orange-800 transition-colors"
            >
              Apply as a Traffic Soldier
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
