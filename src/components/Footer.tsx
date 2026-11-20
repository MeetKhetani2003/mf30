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
            <Image
              src="/images/mission-3f-logo.png"
              alt="Mission 3F Logo"
              width={190}
              height={120}
              className="h-12 w-auto object-contain object-left"
            />
            <p className="text-brand-gray text-xs leading-relaxed">
              Mahal Welfare Services (Est. 2011) has spearheaded grassroots youth education, student civic discipline, and road safety drives across educational institutions.
            </p>
            <div className="p-3 bg-brand-cream border border-brand-orange/20 rounded-xl text-xs font-medium text-brand-charcoal flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-orange flex-shrink-0" />
              <span><strong>Mission 3F:</strong> Fit • Fast • Focused</span>
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
              Portals &amp; Engagement
            </h5>
            <ul className="space-y-2 text-xs text-brand-gray">
              <li>
                <Link href="/about" className="hover:text-brand-orange transition-colors">
                  About Mahal Welfare Services
                </Link>
              </li>
              <li>
                <Link href="/mission-3f" className="hover:text-brand-orange transition-colors">
                  Mission 3F Campaign Overview
                </Link>
              </li>
              <li>
                <Link href="/schools" className="hover:text-brand-orange transition-colors">
                  School Onboarding &amp; Partnerships
                </Link>
              </li>
              <li>
                <Link href="/register/XAV-DEL-101" className="hover:text-brand-orange transition-colors">
                  Student Registration Portal
                </Link>
              </li>
              <li>
                <Link href="/coordinator/login" className="hover:text-brand-orange transition-colors">
                  Teacher Coordinator Interface
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-brand-orange transition-colors">
                  Volunteer Application Form
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-brand-orange transition-colors">
                  Super Admin Management
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
                <span>+91 98765 43210 (Campaign Desk)</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-brand-gray">
                <MapPin className="w-3.5 h-3.5 text-brand-gray flex-shrink-0 mt-0.5" />
                <span>Mahal Welfare Services HQ, Sector Road Safety Wing</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-gray">
          <p>© {new Date().getFullYear()} Mahal Welfare Services (Est. 2011). Mission 3F — Fit • Fast • Focused.</p>
          <p className="flex items-center gap-1 font-medium text-brand-charcoal">
            Engineered with <Heart className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" /> for Zero Preventable Road Fatalities.
          </p>
        </div>
      </div>
    </footer>
  );
}
