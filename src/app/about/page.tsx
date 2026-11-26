import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Award,
  Users,
  Heart,
  Target,
  CheckCircle2,
  ArrowRight,
  Globe2,
  Trees,
  Trash2,
  Sparkles,
  Gift,
} from "lucide-react";

export const metadata = {
  title: "About Us – Mission-3F | Mahal Welfare Society (Nangal 2011 & Canada 2021)",
  description:
    "Mission-3F unites Mahal Welfare Services, Nangal (est. 2011) and Mahal Welfare Society, Canada (est. 2021) to build a safer, greener, and self-reliant society across Environment, Youth, Senior Citizens, Women Empowerment, and Road Safety.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FFFDF9] py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 space-y-16 max-w-6xl">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-brand-orange">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Mahal Welfare Services, Nangal (2011) &amp; Mahal Welfare Society, Canada (2021)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            About Us &ndash; <span className="text-brand-orange">Mission-3F</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Mission-3F unites Mahal Welfare Services, Nangal (est. 2011) and Mahal Welfare Society, Canada (est. 2021) to build a safer, greener, and self-reliant society. Over the last decade, our grassroots work in India and diaspora support in Canada have come together to drive real social change.
          </p>
        </div>

        {/* Global Unity Banner with Photo */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200">
              <Image
                src="/images/mission-3f-global-launch.jpg"
                alt="Mission-3F Global Chapter Launch — Nangal and Canada"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>Our Heritage &amp; Global Alliance</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Turning Community Compassion Into Lasting Worldwide Action
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                What started in 2011 as on-ground civic service in Nangal, Punjab has grown into an international movement supported by diaspora leaders in Canada since 2021.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200 space-y-1">
                  <span className="text-brand-orange text-lg font-bold block">Nangal (Est. 2011)</span>
                  <p className="text-xs text-slate-600">Mahal Welfare Services on-ground grassroots team leading tree plantations, elder care, and school drives.</p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                  <span className="text-amber-800 text-lg font-bold block">Canada (Est. 2021)</span>
                  <p className="text-xs text-slate-600">Mahal Welfare Society global diaspora chapter driving international awareness, resources, and youth engagement.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WHAT WE DO SECTION */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Core Areas of Action</span>
            <h2 className="text-3xl font-extrabold text-slate-900">What We Do</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Environment */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                <Trees className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900">Environment &amp; Cleanliness</h3>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Ek Rukh 100 Sukh:</strong> Massive tree plantation across public and school lands.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Plastic-Free Movement:</strong> Eliminating single-use plastics and promoting cleaner towns.</span>
                </li>
              </ul>
            </div>

            {/* 2. Youth & Elders */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs hover:border-purple-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900">Youth &amp; Elders</h3>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Anti-Drug Awareness:</strong> Youth wellness drives and sports to keep youth fit and focused.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Buzurgan Di Fauj Karegi Mauj:</strong> Celebrating joyful, active living and companionship for senior citizens.</span>
                </li>
              </ul>
            </div>

            {/* 3. Women Empowerment */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs hover:border-pink-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 border border-pink-200 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900">Women Empowerment</h3>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Nari Shakti:</strong> Educational support, health camps, and self-defense initiatives.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Self-Help Groups (SHGs):</strong> Livelihood creation, financial literacy, and entrepreneurial independence.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* JOINT ROAD SAFETY DRIVE: BECOME A TRAFFIC SOLDIER */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white rounded-3xl p-8 sm:p-12 shadow-lg shadow-orange-500/20 space-y-6">
          <div className="space-y-2 max-w-2xl">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider text-amber-100">
              Joint Initiative • Nangal &amp; Canada Teams
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Joint Road Safety Drive: Become a Traffic Soldier
            </h2>
            <p className="text-sm sm:text-base text-amber-100 leading-relaxed">
              Together, our Nangal and Canada teams are leading a nationwide Road Safety Drive to save lives on Indian roads through education, discipline, and community recognition:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-2">
              <h4 className="text-base font-bold text-white">Monthly Tests</h4>
              <p className="text-xs text-amber-100">
                Held on the <strong>9th, 18th, and 27th of every month at 7:00 PM IST</strong> (20-minute digital 30-MCQ assessment).
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-2">
              <h4 className="text-base font-bold text-white">Free ISI Helmets</h4>
              <p className="text-xs text-amber-100">
                Awarded to the <strong>top 10 candidates in every batch</strong> and dispatched directly to their registered home address.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-2">
              <h4 className="text-base font-bold text-white">Traffic Soldier Kit</h4>
              <p className="text-xs text-amber-100">
                Selected volunteers receive a <strong>free cap, T-shirt, tracksuit, shoes, and jacket</strong> to lead on-ground road safety awareness.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link
              href="/students"
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-white text-brand-orange font-bold text-sm shadow-md hover:bg-orange-50 transition-colors text-center"
            >
              Take Monthly Road Safety Exam &rarr;
            </Link>
            <Link
              href="/volunteer"
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-orange-700/80 border border-white/30 text-white font-bold text-sm hover:bg-orange-800 transition-colors text-center"
            >
              Join as a Traffic Soldier
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
