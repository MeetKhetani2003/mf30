import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trees,
  Trash2,
  Users,
  Shield,
  Heart,
  Award,
  Sparkles,
  ArrowRight,
  Globe2,
} from "lucide-react";

export const metadata = {
  title: "Community Gallery | Mahal Welfare Society • Mission-3F",
  description:
    "Explore the visual journey of Mahal Welfare Society (Nangal 2011 & Canada 2021) across Environment, Youth, Senior Citizens, Women Empowerment, and Road Safety.",
};

const GALLERY_ITEMS = [
  {
    title: "Joint Road Safety Drive & Helmet Demonstrations",
    category: "Road Safety",
    description: "Demonstrating IS 4151 helmet chin-strap fastening to students before they take the road.",
    image: "/images/about-ngo-classroom.jpg",
    tag: "Traffic Soldiers",
    badgeColor: "bg-orange-50 text-brand-orange border-orange-200",
  },
  {
    title: "Ek Rukh 100 Sukh — Massive Tree Plantation Drive",
    category: "Environment",
    description: "Planting native shade and fruit trees across school compounds, village roads, and public parks.",
    image: "/images/hero-ngo-road-safety.jpg",
    tag: "Green Movement",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    title: "Mission-3F Global Chapter Launch",
    category: "Mission-3F",
    description: "Uniting Mahal Welfare Services, Nangal (est. 2011) and Mahal Welfare Society, Canada (est. 2021).",
    image: "/images/mission-3f-global-launch.jpg",
    tag: "Nangal • Canada",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    title: "Plastic-Free Movement & Cleanliness Rallies",
    category: "Environment",
    description: "Youth volunteers mobilizing marketplaces and residential sectors to eliminate single-use plastics.",
    image: "/images/about-ngo-classroom.jpg",
    tag: "Swachh Bharat",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    title: "Buzurgan Di Fauj Karegi Mauj — Senior Citizen Gatherings",
    category: "Youth & Elders",
    description: "Celebrating active, joyful living, companionship, and health checkup camps for senior citizens.",
    image: "/images/hero-ngo-road-safety.jpg",
    tag: "Elder Respect",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    title: "Nari Shakti & Women Self-Help Groups (SHGs)",
    category: "Women Empowerment",
    description: "Skill workshops, craft cooperatives, and financial literacy sessions creating women micro-entrepreneurs.",
    image: "/images/about-ngo-classroom.jpg",
    tag: "Self-Reliance",
    badgeColor: "bg-pink-50 text-pink-700 border-pink-200",
  },
];

export default function GalleryPage() {
  return (
    <div className="bg-[#FFFDF9] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-brand-orange">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Mahal Welfare Society &bull; Nangal (2011) &amp; Canada (2021)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Work in <span className="text-brand-orange">Action</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From grassroots tree plantations in Punjab to international diaspora support in Canada, take a look at our community compassion in motion across India and worldwide.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${item.badgeColor}`}>
                  {item.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-mono">
                  {item.tag}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-orange transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-lg shadow-orange-500/20">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 fill-white" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Be Part of Our Next Drive
            </h2>
            <p className="text-sm text-orange-100">
              Join Mahal Welfare Society as a Traffic Soldier, tree plantation volunteer, or community educator in your city.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/volunteer"
              className="py-3 px-6 rounded-xl bg-white text-brand-orange font-bold text-sm shadow-md hover:bg-orange-50 transition-colors"
            >
              Join as Traffic Soldier &bull; Volunteer
            </Link>
            <Link
              href="/students"
              className="py-3 px-6 rounded-xl bg-orange-600/80 border border-white/30 text-white font-bold text-sm hover:bg-orange-700 transition-colors"
            >
              Students Road Safety Exam &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
