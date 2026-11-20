import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Award, Users, Heart, Target, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | Mahal Welfare Services (Est. 2011)",
  description: "Learn about Mahal Welfare Services, established in 2011, dedicated to grassroots youth welfare, road safety education, and civic discipline.",
};

export default function AboutPage() {
  return (
    <div className="bg-brand-soft-white py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 space-y-16">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-cream border border-brand-orange/20 text-xs text-brand-orange font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            Non-Profit Heritage • Established 2011
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-slate-900 tracking-tight leading-tight">
            About Mahal Welfare Services
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            For over 15 years, Mahal Welfare Services has spearheaded civic consciousness, child protection, and youth-driven road safety campaigns across schools and educational institutions.
          </p>
        </div>

        {/* Story & Workshop Lockup */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-sm group bg-slate-100">
                <Image
                  src="/images/about-ngo-classroom.jpg"
                  alt="Mahal Welfare Services Road Safety Classroom Seminar with school students"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                    Classroom Road Safety Seminar
                  </span>
                  <p className="text-xs font-medium leading-snug mt-1 text-slate-100">
                    NGO educators teaching traffic signs and pedestrian rules in an Indian secondary school
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 text-slate-800">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange">
                <Shield className="w-4 h-4" />
                <span>Our Founding Story</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                Dedicated to Saving Young Lives Since 2011
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Founded in 2011, Mahal Welfare Services began as a grassroots initiative responding to alarming statistics: motor vehicle crashes, particularly involving two-wheeler riders, had become the single largest cause of accidental death and permanent trauma among teenagers and young adults in India.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Rather than treating road safety as a dry punitive regulation, we recognized that lasting behavioral change starts in the school classroom. Through engaging visual training, teacher coordinator mentorship, and objective digital assessments, we instill defensive driving and passenger habits before students ever turn an ignition key.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-brand-orange text-xl font-semibold block font-sans">15+ Years</strong>
                  <span className="text-xs text-slate-500 font-normal">Continuous Community Service</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-800 text-xl font-semibold block font-sans">Zero-Fatality</strong>
                  <span className="text-xs text-slate-500 font-normal">Vision &amp; Advocacy Target</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision, Mission, & Core Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-cream border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              An India where every school student, two-wheeler rider, and pedestrian embraces defensive road discipline, creating zero-fatality communities through structured education.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              To deliver practical, standardized road safety LMS portals and video classrooms into 1,000+ secondary schools, certifying students through objective 30-MCQ examinations.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Core Values</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Institutional integrity, non-profit transparency, student data privacy, evidence-based defensive driving techniques, and compassionate community service.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-brand-cream/60 rounded-3xl border border-brand-orange/25 p-6 sm:p-10 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
            Join Us in Fostering Safe Communities
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-normal leading-relaxed">
            Whether as a participating school, a teacher coordinator, or a certified volunteer, your contribution saves lives on Indian roads.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/schools"
              className="btn-primary px-6 py-2.5 text-xs sm:text-sm font-medium"
            >
              School Partnership
            </Link>
            <Link
              href="/volunteer"
              className="btn-secondary px-6 py-2.5 text-xs sm:text-sm font-medium"
            >
              Volunteer With Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
