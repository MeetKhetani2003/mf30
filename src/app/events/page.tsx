import React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Award,
  Shield,
  ArrowRight,
  Globe2,
  Gift,
  Trees,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Upcoming & Ongoing Events | Mahal Welfare Society • Mission-3F",
  description:
    "Join our regular Road Safety Assessments on the 9th, 18th, and 27th of every month at 7:00 PM, tree plantation drives, and elder care meetups.",
};

const UPCOMING_EVENTS = [
  {
    title: "Mission-3F Monthly Road Safety Online Assessment",
    date: "9th, 18th & 27th of Every Month",
    time: "7:00 PM IST (20 Mins • 30 MCQs)",
    location: "Online Digital Examination Hall",
    category: "Road Safety",
    description:
      "All registered candidates take the online 30-MCQ test. Top 10 candidates in each batch receive a free ISI-certified helmet delivered to their home address. Selected volunteers receive the full Traffic Soldier Kit (Cap, T-shirt, Tracksuit, Shoes, Jacket).",
    badge: "Recurring Monthly Exam",
    badgeColor: "bg-orange-100 text-brand-orange border-orange-300",
    actionLink: "/students",
    actionText: "Register for Monthly Exam",
  },
  {
    title: "Ek Rukh 100 Sukh — Community Tree Plantation Drive",
    date: "1st Sunday of Every Month",
    time: "8:00 AM - 12:00 PM",
    location: "Nangal & Surrounding Punjab Districts",
    category: "Environment",
    description:
      "Youth and citizen volunteers plant native banyan, neem, peepal, and fruit trees across school grounds and village roads under our green earth initiative.",
    badge: "Environmental Care",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    actionLink: "/volunteer",
    actionText: "Volunteer for Green Drive",
  },
  {
    title: "Buzurgan Di Fauj Karegi Mauj — Senior Citizen Wellness Meet",
    date: "Bi-Weekly Saturdays",
    time: "4:00 PM - 6:30 PM",
    location: "Community Center, Nangal",
    category: "Senior Care",
    description:
      "Bringing laughter, active lifestyle coaching, companionship, and free health checkups to our elders so they celebrate life joyfully.",
    badge: "Elder Care",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    actionLink: "/volunteer",
    actionText: "Support Elder Care",
  },
  {
    title: "Nari Shakti Empowerment & SHG Craft Exhibition",
    date: "Quarterly Showcase",
    time: "10:00 AM - 5:00 PM",
    location: "Town Hall & Partner Venues",
    category: "Women Empowerment",
    description:
      "Showcasing handmade sustainable products, textiles, and foods created by women self-help groups to support self-reliance and financial independence.",
    badge: "Livelihoods",
    badgeColor: "bg-pink-100 text-pink-800 border-pink-300",
    actionLink: "/volunteer",
    actionText: "Volunteer or Partner",
  },
];

export default function EventsPage() {
  return (
    <div className="bg-[#FFFDF9] py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-brand-orange">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Mahal Welfare Society &bull; Community Calendar</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Events &amp; <span className="text-brand-orange">Drives</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Stay informed and participate in our recurring road safety assessments, environmental campaigns, elder wellness meets, and women self-help group programs.
          </p>
        </div>

        {/* Highlighted Banner: Monthly Road Safety Online Exam */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-orange-500/20 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/20 pb-4">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider text-amber-100">
                Flagship Program
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Monthly Road Safety Drive: Become a Traffic Soldier
              </h2>
            </div>
            <div className="text-xs bg-white text-brand-orange font-bold px-3 py-1.5 rounded-xl shadow-xs">
              9th &bull; 18th &bull; 27th &bull; 7:00 PM IST
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-1">
              <span className="text-amber-200 font-bold block uppercase tracking-wider text-[11px]">Assessment Schedule</span>
              <p className="text-white text-sm font-bold">9th, 18th &amp; 27th of Every Month</p>
              <p className="text-white/80 text-[11px]">Exam starts sharply at 7:00 PM IST (20 Mins)</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-1">
              <span className="text-amber-200 font-bold block uppercase tracking-wider text-[11px]">Top 10 Award</span>
              <p className="text-white text-sm font-bold">Free ISI-Certified Helmet</p>
              <p className="text-white/80 text-[11px]">Dispatched to registered home address of top 10 rankers</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-1">
              <span className="text-amber-200 font-bold block uppercase tracking-wider text-[11px]">Traffic Soldier Kit</span>
              <p className="text-white text-sm font-bold">Full Uniform &amp; Gear Kit</p>
              <p className="text-white/80 text-[11px]">Free Cap, T-shirt, Tracksuit, Shoes, and Jacket for selected leaders</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              href="/students"
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-white text-brand-orange font-bold text-sm shadow-md hover:bg-orange-50 transition-colors text-center"
            >
              Register for Next Assessment (9th / 18th / 27th) &rarr;
            </Link>
            <Link
              href="/volunteer"
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-orange-700/80 border border-white/30 text-white font-bold text-sm hover:bg-orange-800 transition-colors text-center"
            >
              Apply to Become a Traffic Soldier
            </Link>
          </div>
        </div>

        {/* All Events List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">All Scheduled Drives &amp; Gatherings</h2>

          <div className="grid grid-cols-1 gap-6">
            {UPCOMING_EVENTS.map((evt, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${evt.badgeColor}`}>
                      {evt.badge}
                    </span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs font-semibold text-slate-600">{evt.category}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {evt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      <Calendar className="w-4 h-4 text-brand-orange" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      <Clock className="w-4 h-4 text-brand-orange" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                </div>

                <div className="self-stretch md:self-center flex md:flex-col justify-end">
                  <Link
                    href={evt.actionLink}
                    className="w-full md:w-auto py-3 px-5 rounded-xl bg-slate-900 hover:bg-brand-orange text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <span>{evt.actionText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
