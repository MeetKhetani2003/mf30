"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Award,
  ArrowRight,
  Clock,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Users,
  Video,
  FileQuestion,
  Trophy,
  Building2,
  Bike,
  Activity,
  Zap,
  Target,
  Gauge,
  Dumbbell,
  KeyRound,
  ExternalLink,
  Play,
  Check,
  Flame,
} from "lucide-react";

const CATEGORIES = [
  {
    pillar: "Pillar 01",
    title: "Helmet Safety",
    subtitle: "IS 4151 & Chin-Strap Fastening",
    rule: "Always clip the chin-strap securely. An unbuckled helmet flies off before impact.",
    why: "Over 34% of two-wheeler crash trauma hits the chin and jaw area. Full-face helmets save lives.",
    icon: Bike,
    color: "text-brand-orange bg-brand-cream border-brand-orange/30",
    badge: "Two-Wheeler Safety",
  },
  {
    pillar: "Pillar 02",
    title: "Seatbelt Discipline",
    subtitle: "3-Point Restraint for All Seats",
    rule: "Every passenger must buckle up before moving. Front and rear seatbelts are mandatory.",
    why: "Airbags deploy at 300 km/h. Without seatbelts, hitting an inflating airbag causes fatal impact.",
    icon: Shield,
    color: "text-amber-600 bg-amber-50 border-amber-200",
    badge: "Passenger Protection",
  },
  {
    pillar: "Pillar 03",
    title: "Speed Control",
    subtitle: "School Zones & Stopping Distance",
    rule: "Strict 20-25 km/h limit in school zones. Braking distance quadruples as speed doubles.",
    why: "At 30 km/h, pedestrian survival is 90%. At 50 km/h, pedestrian survival plummets below 20%.",
    icon: Activity,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    badge: "Speed Compliance",
  },
  {
    pillar: "Pillar 04",
    title: "Anti-Distracted Driving",
    subtitle: "Zero Phone & Headphone Use",
    rule: "Never text, call, or use earphones while on the road. Eyes and ears must stay on traffic.",
    why: "Looking at a screen for just 3 seconds at 50 km/h means traveling over 40 meters completely blind.",
    icon: AlertTriangle,
    color: "text-red-600 bg-red-50 border-red-200",
    badge: "Driver Focus",
  },
  {
    pillar: "Pillar 05",
    title: "Pedestrian Safety",
    subtitle: "Zebra Crossing & Walkway Rules",
    rule: "Always cross at zebra markings, make eye contact with drivers, and walk facing oncoming traffic.",
    why: "Pedestrians account for over 20,000 fatal road incidents annually across Indian city roads.",
    icon: Users,
    color: "text-blue-600 bg-blue-50 border-blue-200",
    badge: "Pedestrian Priority",
  },
  {
    pillar: "Pillar 06",
    title: "Sober & Alert Riding",
    subtitle: "Zero Alcohol & Fatigue Awareness",
    rule: "Never ride with or operate vehicles under alcohol, drowsiness, or medication influence.",
    why: "Substance impairment destroys reaction time and depth perception. Zero tolerance is absolute.",
    icon: Target,
    color: "text-purple-600 bg-purple-50 border-purple-200",
    badge: "Zero Tolerance",
  },
];

export default function HomePage() {
  return (
    <div className="bg-brand-soft-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-soft-white to-white border-b border-brand-border py-8 lg:py-12">
        {/* Subtle background ambient mesh lighting */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: NGO Identity, Mission Narrative, CTAs & 3F Pillars */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5 text-center lg:text-left">
              {/* Registered NGO Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cream border border-brand-orange/20 text-xs text-brand-charcoal w-fit mx-auto lg:mx-0 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-brand-orange" />
                <span className="text-brand-orange font-semibold">Mahal Welfare Services</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-normal">Est. 2011 • Road Safety NGO</span>
              </div>

              {/* Main NGO Campaign Headline & Narrative */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-slate-900 tracking-tight leading-[1.25]">
                  Building safer roads through <span className="text-brand-orange">educated young minds.</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
                  Mahal Welfare Services empowers school students across India with life-saving road safety education—teaching helmet discipline, pedestrian safety, and defensive habits before they ever take the road.
                </p>
              </div>

              {/* Primary & Secondary Brand Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/students"
                  className="btn-primary w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2 font-medium"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Students Program &amp; Exam</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </Link>

                <Link
                  href="/volunteer"
                  className="btn-secondary w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2 font-medium"
                >
                  <HeartHandshake className="w-4 h-4 text-brand-orange" />
                  <span>Join as Volunteer (Kits &amp; Perks)</span>
                  <ArrowRight className="w-4 h-4 text-brand-orange ml-0.5" />
                </Link>
              </div>

              {/* Three Pillars of Mission 3F: Fit • Fast • Focused */}
              <div className="pt-3 border-t border-slate-200/80">
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-orange flex-shrink-0">
                      <Shield className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-slate-800">Fit</p>
                      <p className="text-[11px] text-slate-500 font-normal">Helmet Discipline</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-orange flex-shrink-0">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-slate-800">Fast</p>
                      <p className="text-[11px] text-slate-500 font-normal">Quick Reflexes</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-orange flex-shrink-0">
                      <Target className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-slate-800">Focused</p>
                      <p className="text-[11px] text-slate-500 font-normal">Zero Distraction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Unified Workshop Showcase Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-2.5 sm:p-3 space-y-3">
                {/* Authentic Workshop Photo */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src="/images/hero-ngo-road-safety.jpg"
                    alt="Mahal Welfare Services Road Safety Workshop demonstrating helmet safety to school students"
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Top Live Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-1.5 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Live School Workshop</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-brand-orange text-white text-[11px] font-medium shadow-xs">
                      Mahal Welfare Services
                    </span>
                  </div>

                  {/* Bottom Photo Gradient Caption */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3.5 text-white">
                    <div className="flex items-center gap-1.5 text-amber-300 text-xs font-medium uppercase tracking-wider mb-0.5">
                      <Shield className="w-3.5 h-3.5" />
                      <span>School Helmet Demonstration</span>
                    </div>
                    <p className="text-xs text-slate-200 font-normal leading-relaxed">
                      Demonstrating IS 4151 chin-strap fastening to students before they take the road.
                    </p>
                  </div>
                </div>

                {/* Integrated Metric Bar Docked Below Photo */}
                <div className="px-1 py-0.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-cream flex items-center justify-center text-brand-orange flex-shrink-0">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-brand-charcoal text-xs font-semibold">
                        50,000+ Young Lives Educated
                      </span>
                      <span className="text-[11px] text-brand-gray font-normal">
                        Grassroots road safety workshops across India
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex-shrink-0">
                    Free for Schools
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ROAD SAFETY STATISTICAL REALITY */}
      <section className="py-8 sm:py-10 bg-white border-b border-brand-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-semibold text-brand-charcoal font-sans">150,000+</p>
              <p className="text-xs text-brand-gray uppercase tracking-wider font-normal">
                Annual Road Fatalities in India
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-semibold text-brand-orange font-sans">70%</p>
              <p className="text-xs text-brand-gray uppercase tracking-wider font-normal">
                Victims Aged 18 to 35 Years
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-semibold text-brand-charcoal font-sans">34%</p>
              <p className="text-xs text-brand-gray uppercase tracking-wider font-normal">
                Trauma to Chin / Facial Zone
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-semibold text-emerald-600 font-sans">Zero</p>
              <p className="text-xs text-brand-gray uppercase tracking-wider font-normal">
                Mission 3F Fatality Target
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIX MAJOR ROAD SAFETY PILLARS */}
      <section className="py-10 sm:py-14 bg-brand-soft-white">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Header with balanced spacing */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-cream text-brand-orange border border-brand-orange/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              Structured NGO Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Six Road Safety Learning Pillars
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Every workshop, video lesson, and digital assessment maps directly to these 6 core disciplines to build lifelong, life-saving habits.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-card hover:border-brand-orange/40 transition-all p-5 sm:p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3.5">
                    {/* Header: Icon, Pillar Number & Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${cat.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                          {cat.pillar}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {cat.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                        {cat.title}
                      </h3>
                      <p className="text-xs font-medium text-brand-orange mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>

                    {/* Core Rule Box - Highlighting the clear takeaway */}
                    <div className="p-3 rounded-xl bg-orange-50/60 border border-brand-orange/15 text-xs text-slate-700 space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-brand-orange block">
                        Core Life-Saving Rule
                      </span>
                      <p className="font-medium text-slate-800 leading-snug">
                        {cat.rule}
                      </p>
                    </div>

                    {/* Why It Matters (Evidence / Reality) */}
                    <div className="text-xs text-slate-500 leading-relaxed space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
                        Why It Matters
                      </span>
                      <p>{cat.why}</p>
                    </div>
                  </div>

                  {/* Card Footer: Exam Module Tag & Verification */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px] font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Tested in 30-MCQ Exam
                    </span>
                    <Link
                      href="/road-safety"
                      className="text-[11px] font-medium text-brand-orange hover:text-brand-orange-hover flex items-center gap-0.5"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Explore Link */}
          <div className="text-center mt-8 sm:mt-10">
            <Link
              href="/road-safety"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 hover:text-brand-orange hover:border-brand-orange/40 shadow-xs transition-all"
            >
              <span>Explore full educational curriculum &amp; safety standards</span>
              <ArrowRight className="w-4 h-4 text-brand-orange" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. HOW MISSION 3F WORKS (4-STEP JOURNEY) */}
      <section className="py-10 sm:py-14 bg-white border-y border-brand-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-cream text-brand-orange border border-brand-orange/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              Seamless 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              How Students Experience Mission 3F
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Engineered for extreme simplicity and high engagement on smartphones, tablets, and school computer labs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-brand-soft-white border border-slate-200/90 space-y-2.5">
              <span className="text-2xl font-semibold text-brand-orange font-mono">01</span>
              <h4 className="text-sm font-semibold text-slate-900">School Onboarding</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                School coordinator registers their institution and shares a dedicated registration link with students.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-brand-soft-white border border-slate-200/90 space-y-2.5">
              <span className="text-2xl font-semibold text-brand-orange font-mono">02</span>
              <h4 className="text-sm font-semibold text-slate-900">Timed Video Classroom</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Students watch an engaging road safety video during their assigned slot. The player auto-unmounts when done.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-brand-soft-white border border-slate-200/90 space-y-2.5">
              <span className="text-2xl font-semibold text-brand-orange font-mono">03</span>
              <h4 className="text-sm font-semibold text-slate-900">30-MCQ Digital Exam</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                A 20-minute timed assessment with automatic submission at 00:00 and instant server-side score calculation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-brand-soft-white border border-slate-200/90 space-y-2.5">
              <span className="text-2xl font-semibold text-brand-orange font-mono">04</span>
              <h4 className="text-sm font-semibold text-slate-900">Merit &amp; Rewards</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Live slot leaderboard ranks top performers, unlocking official certificates, medals, and road safety gifts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VOLUNTEER & SCHOOL PARTNERSHIP CTA */}
      <section className="py-10 sm:py-14 bg-brand-cream/60 border-b border-brand-orange/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto rounded-3xl bg-white p-6 sm:p-10 border border-brand-orange/25 shadow-card flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-2.5 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-brand-cream text-brand-orange border border-brand-orange/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                Join The Movement
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                Are You an Educator or Safety Advocate?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed font-normal">
                Partner your school with Mission 3F or register as a certified volunteer to conduct life-saving road safety workshops in your city.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
              <Link
                href="/schools"
                className="btn-primary px-5 py-2.5 text-xs sm:text-sm font-medium text-center"
              >
                Onboard School
              </Link>
              <Link
                href="/volunteer"
                className="btn-secondary px-5 py-2.5 text-xs sm:text-sm font-medium text-center"
              >
                Volunteer With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
