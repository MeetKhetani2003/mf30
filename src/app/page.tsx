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
  Trees,
  Trash2,
  Heart,
  Gift,
  Globe2,
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
    <div className="bg-[#FFFDF9]">
      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/20 to-white border-b border-brand-border py-10 lg:py-16">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 cols: Headline & Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-brand-orange w-fit mx-auto lg:mx-0">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Mahal Welfare Society &bull; Nangal (2011) &amp; Canada (2021)</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                  Mission-3F: <span className="text-brand-orange">Grassroots Service</span> &bull; Global Reach &bull; Safer Roads
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                  Mission-3F unites Mahal Welfare Services, Nangal (est. 2011) and Mahal Welfare Society, Canada (est. 2021) to turn community compassion into lasting action worldwide. Together, we support environmental care, youth well-being, women&apos;s leadership, senior citizens, and road safety.
                </p>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/students"
                  className="btn-primary w-full sm:w-auto px-6 py-3 text-xs sm:text-sm flex items-center justify-center gap-2 font-semibold shadow-md shadow-orange-500/20"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Register for Monthly Exam (9th, 18th, 27th)</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </Link>

                <Link
                  href="/volunteer"
                  className="btn-secondary w-full sm:w-auto px-6 py-3 text-xs sm:text-sm flex items-center justify-center gap-2 font-semibold"
                >
                  <HeartHandshake className="w-4 h-4 text-brand-orange" />
                  <span>Become a Traffic Soldier</span>
                  <ArrowRight className="w-4 h-4 text-brand-orange ml-0.5" />
                </Link>
              </div>

              {/* Three Pillars: Fit • Fast • Focused */}
              <div className="pt-4 border-t border-slate-200">
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-orange flex-shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">Fit</p>
                      <p className="text-[11px] text-slate-500">Helmet Discipline</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-orange flex-shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">Fast</p>
                      <p className="text-[11px] text-slate-500">Quick Reflexes</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-orange flex-shrink-0">
                      <Target className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">Focused</p>
                      <p className="text-[11px] text-slate-500">Zero Distraction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Official Global Launch Visual */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-3 sm:p-4 space-y-3">
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="/images/mission-3f-global-launch.jpg"
                    alt="Mission-3F Global Chapter Launch"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Global Launch: Mission-3F.org</span>
                  </div>
                </div>

                <div className="p-2 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Mahal Welfare Society</span>
                    <span className="font-semibold text-brand-orange">Est. 2011 &amp; 2021</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">
                    Grassroots teams in Nangal, Punjab and diaspora champions in Canada driving road safety, clean environments, and youth leadership.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. WHO WE ARE SECTION                                     */}
      {/* ========================================================= */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold uppercase tracking-wider text-brand-orange">
              Global Humanitarian Alliance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Who We Are</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Mission-3F unites Mahal Welfare Services, Nangal (est. 2011) and Mahal Welfare Society, Canada (est. 2021) to turn community compassion into lasting action worldwide. Together, we support environmental care, youth well-being, women&apos;s leadership, senior citizens, and road safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-orange-50/50 rounded-2xl p-6 border border-orange-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">India Chapter</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-orange-200">Est. 2011</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Mahal Welfare Services, Nangal</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Over 15 years of continuous on-ground grassroots service across Punjab. Spearheading helmet awareness, tree plantations in schools, senior citizen health camps, and anti-drug youth initiatives.
              </p>
            </div>

            <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">International Chapter</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-amber-200">Est. 2021</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Mahal Welfare Society, Canada</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Uniting the global Indian diaspora to amplify impact. Mobilizing resources, international road safety advocacy, technological platforms, and youth leadership worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. CORE MOVEMENTS SECTION                                 */}
      {/* ========================================================= */}
      <section className="py-16 bg-[#FFFDF9] border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Key Pillars of Action</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Core Movements</h2>
            <p className="text-sm text-slate-600">
              Our multifaceted initiatives address critical societal challenges through structured programs and community engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Movement 1: Environment & Cleanliness */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                  <Trees className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Green Society
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Environment &amp; Cleanliness</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tree plantation through <strong>Ek Rukh 100 Sukh</strong> and community action under our <strong>Plastic-Free Movement</strong> to restore nature and preserve urban hygiene.
              </p>
              <div className="pt-2">
                <Link href="/gallery" className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1">
                  <span>View Plantation Drives</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Movement 2: Youth & Elders */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs hover:border-purple-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  Intergenerational Care
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Youth &amp; Elders</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong>Anti-Drug awareness</strong> for young people and <strong>Buzurgan Di Fauj Karegi Mauj</strong> celebrating active, joyful living, wellness, and companionship for senior citizens.
              </p>
              <div className="pt-2">
                <Link href="/events" className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1">
                  <span>Explore Senior Care &amp; Youth Meets</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Movement 3: Women Empowerment */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs hover:border-pink-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 border border-pink-200 flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200">
                  Self-Reliance
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Women Empowerment</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong>Nari Shakti</strong>, <strong>Self-Help Groups (SHGs)</strong>, and self-help empowerment initiatives that build financial independence, craft skills, and dignified livelihoods.
              </p>
              <div className="pt-2">
                <Link href="/about" className="text-xs font-bold text-pink-700 hover:underline flex items-center gap-1">
                  <span>Learn About SHG Initiatives</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Movement 4: Road Safety Drive: Become a Traffic Soldier */}
            <div className="bg-white rounded-3xl border-2 border-brand-orange/40 p-6 sm:p-8 space-y-4 shadow-sm bg-gradient-to-br from-white via-orange-50/20 to-orange-50/40">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange text-white flex items-center justify-center shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-brand-orange border border-orange-300">
                  9th &bull; 18th &bull; 27th &bull; 7 PM
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Road Safety Drive: Become a Traffic Soldier</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Led jointly by our Nangal and Canada teams, our Road Safety Drive runs regular assessments on the <strong>9th, 18th, and 27th of every month at 7:00 PM</strong>. Each batch&apos;s <strong>top 10 candidates receive a free ISI-certified helmet</strong>, and selected Traffic Soldiers receive a <strong>free cap, T-shirt, tracksuit, shoes, and jacket</strong> to help promote safer roads.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href="/students"
                  className="py-2.5 px-4 rounded-xl bg-brand-orange text-white font-bold text-xs shadow-sm hover:bg-orange-700 transition-colors"
                >
                  Register for Exam &rarr;
                </Link>
                <Link
                  href="/volunteer"
                  className="py-2.5 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Join Traffic Soldiers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SIX ROAD SAFETY PILLARS                                */}
      {/* ========================================================= */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Road Safety Curriculum
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Six Road Safety Learning Pillars</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Every video session and digital examination MCQ maps directly to these 6 core disciplines to build lifelong safe habits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs hover:border-orange-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-slate-400">{cat.pillar}</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {cat.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{cat.title}</h4>
                      <p className="text-xs text-brand-orange font-medium">{cat.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                    <span className="font-semibold block text-slate-900 mb-0.5">Core Rule:</span>
                    {cat.rule}
                  </div>

                  <p className="text-[11px] text-slate-500 leading-normal">
                    <strong>Why it matters:</strong> {cat.why}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. CALL TO ACTION: PARTICIPATE & VOLUNTEER                */}
      {/* ========================================================= */}
      <section className="py-16 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-white">
            <Globe2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Join the Mission-3F Movement Today
            </h2>
            <p className="text-sm sm:text-base text-orange-100 max-w-xl mx-auto leading-relaxed">
              Whether you are a student preparing for the upcoming monthly assessment (9th, 18th, 27th), an aspiring Traffic Soldier, or a partner school coordinator &mdash; let&apos;s build a safer, greener future together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/students"
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-white text-brand-orange font-bold text-sm shadow-lg hover:bg-orange-50 transition-colors"
            >
              Take Student Road Safety Exam &rarr;
            </Link>

            <Link
              href="/volunteer"
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-orange-700/80 border border-white/30 text-white font-bold text-sm hover:bg-orange-800 transition-colors"
            >
              Become a Traffic Soldier
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
