import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Phone, Mail, MapPin, Heart, ExternalLink, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-border text-brand-charcoal text-xs sm:text-sm">
      {/* Safety Stripe Accent */}
      <div className="safety-stripe w-full" />

      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Organization & Campaign Identity */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-14 w-14 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-slate-200 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/images/mahal-welfare-logo.png"
                  alt="Mahal Welfare Society Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-slate-900 leading-tight group-hover:text-brand-orange transition-colors">
                  Mahal Welfare Society
                </span>
                <span className="text-[11px] font-semibold text-brand-orange tracking-wide">
                  Mission-3F &bull; Global Action
                </span>
              </div>
            </Link>

            <p className="text-brand-gray text-xs leading-relaxed">
              Mahal Welfare Services, Nangal (est. 2011) &amp; Mahal Welfare Society, Canada (est. 2021) — turning community compassion into lasting action across environment, youth well-being, women&apos;s leadership, and road safety.
            </p>
            <div className="p-3 bg-brand-cream border border-brand-orange/20 rounded-xl text-xs font-medium text-brand-charcoal flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-orange flex-shrink-0" />
              <span><strong>Mission 3F:</strong> Fit &bull; Fast &bull; Focused</span>
            </div>
          </div>

          {/* Column 2: 3F Campaign & Curriculum */}
          <div className="space-y-3">
            <h5 className="text-brand-charcoal font-bold tracking-wide uppercase text-xs">
              Road Safety Curriculum
            </h5>
            <ul className="space-y-2 text-xs text-brand-gray">
              <li>
                <Link href="/road-safety" className="hover:text-brand-orange transition-colors">
                  • 100% ISI Helmet &amp; Chin-Strap Mandate
                </Link>
              </li>
              <li>
                <Link href="/road-safety" className="hover:text-brand-orange transition-colors">
                  • Three-Point Seatbelt &amp; Airbag Safety
                </Link>
              </li>
              <li>
                <Link href="/road-safety" className="hover:text-brand-orange transition-colors">
                  • School Zone &amp; Speed Limit Awareness
                </Link>
              </li>
              <li>
                <Link href="/road-safety" className="hover:text-brand-orange transition-colors">
                  • Anti-Distracted Driving &amp; Zero Mobile
                </Link>
              </li>
              <li>
                <Link href="/road-safety" className="hover:text-brand-orange transition-colors">
                  • Pedestrian Zebra Crossing Yield
                </Link>
              </li>
              <li>
                <Link href="/road-safety" className="hover:text-brand-orange transition-colors">
                  • Sober Driving &amp; Section 185 Advocacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Navigation */}
          <div className="space-y-3">
            <h5 className="text-brand-charcoal font-bold tracking-wide uppercase text-xs">
              Pages &amp; Initiatives
            </h5>
            <ul className="space-y-2 text-xs text-brand-gray">
              <li>
                <Link href="/" className="hover:text-brand-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-orange transition-colors">
                  About Us (Nangal &amp; Canada)
                </Link>
              </li>
              <li>
                <Link href="/mission-3f" className="hover:text-brand-orange transition-colors">
                  Mission-3F Campaign
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-orange transition-colors">
                  Initiatives Gallery
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-brand-orange transition-colors">
                  Events &amp; Monthly Exams (9th, 18th, 27th)
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-brand-orange transition-colors">
                  Become a Traffic Soldier
                </Link>
              </li>
              <li>
                <Link href="/students" className="hover:text-brand-orange transition-colors">
                  Students Examination Portal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-orange transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency Helplines & Contact */}
          <div className="space-y-3">
            <h5 className="text-brand-charcoal font-bold tracking-wide uppercase text-xs">
              Emergency &amp; Support
            </h5>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-brand-charcoal flex items-center justify-between">
                <span>National Emergency</span>
                <span className="font-bold text-brand-orange text-sm">112 / 108</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-gray">
                <Mail className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                <span>contact@mahalwelfare.org</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-gray">
                <Phone className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                <span>+91 98765 43210 / Canada: +1 604 000 0000</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-brand-gray">
                <MapPin className="w-3.5 h-3.5 text-brand-gray flex-shrink-0 mt-0.5" />
                <span>Nangal, Punjab (India) &amp; Vancouver, BC (Canada)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-gray">
          <p>© {new Date().getFullYear()} Mahal Welfare Society • Nangal (Est. 2011) &amp; Canada (Est. 2021). All rights reserved.</p>
          <p className="flex items-center gap-1 font-medium text-brand-charcoal">
            Mission-3F &bull; Grassroots Service &bull; Global Reach &bull; Safer Roads
          </p>
        </div>
      </div>
    </footer>
  );
}
