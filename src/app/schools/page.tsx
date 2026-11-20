"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  CheckCircle2,
  Award,
  ArrowRight,
  Shield,
  FileSpreadsheet,
  Clock,
  Sparkles,
  QrCode,
} from "lucide-react";

export default function SchoolPartnershipPage() {
  const [formData, setFormData] = useState({
    schoolName: "",
    city: "",
    state: "",
    teacherName: "",
    designation: "Head of Physical Education / Senior Teacher",
    phone: "",
    email: "",
    estimatedStudents: "100-250",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-brand-soft-white py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-orange/30 text-xs text-brand-orange font-bold uppercase tracking-wider">
            Institutional Collaboration
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-charcoal">
            Partner Your School With <span className="text-brand-orange">Mission 3F</span>
          </h1>
          <p className="text-sm sm:text-base text-brand-gray leading-relaxed">
            Empower your students with standardized road safety certification, timed examinations, and merit recognition — at zero financial cost to your institution.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 sm:gap-6">
          <div className="card-premium p-6 sm:p-8 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-cream border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-brand-charcoal">Official Certification</h3>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
              Every student scoring 60%+ receives a verified 3F Road Safety Certificate endorsed by Mahal Welfare Services (Est. 2011).
            </p>
          </div>

          <div className="card-premium p-6 sm:p-8 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-brand-charcoal">QR Code &amp; Pamphlets</h3>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
              Instant generation of school QR codes and ready-to-print A4 awareness posters to attach to circulars and notice boards.
            </p>
          </div>

          <div className="card-premium p-6 sm:p-8 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-brand-charcoal">Dedicated Teacher Portal</h3>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
              Assigned school coordinators receive an exclusive dashboard to track student registrations, video watch times, and score breakdowns.
            </p>
          </div>

          <div className="card-premium p-6 sm:p-8 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-3">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-brand-charcoal">Automated Reporting</h3>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
              Instant multi-sheet Excel reports with student rosters, exam performance metrics, and Top 10 rankings for school assemblies.
            </p>
          </div>
        </div>

        {/* Form and Coordinator Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Process */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-premium p-8 space-y-6">
              <h3 className="text-xl font-bold text-brand-charcoal">
                How School Onboarding Works
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="text-brand-charcoal block">Submit School Registration</strong>
                    <span className="text-brand-gray">Provide school details and nominate a coordinator teacher.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="text-brand-charcoal block">Receive Unique School Code</strong>
                    <span className="text-brand-gray">Get a dedicated registration URL like <code className="text-brand-orange">/register/SCHOOL-CODE</code>.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="text-brand-charcoal block">Students Complete Video &amp; Exam</strong>
                    <span className="text-brand-gray">Students watch the training module during their slot and complete 30 MCQs.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    4
                  </div>
                  <div>
                    <strong className="text-brand-charcoal block">Assembly Felicitation</strong>
                    <span className="text-brand-gray">Download merit rosters for medals, certificates, and safety awards.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-brand-gray">
                Already an onboarded school?{" "}
                <Link href="/coordinator/login" className="text-brand-orange font-bold hover:underline">
                  Sign in to Coordinator Portal →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-7">
            <div className="card-premium p-8 sm:p-10 space-y-6">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-charcoal">
                    Partnership Request Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-gray max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-brand-charcoal">{formData.teacherName}</strong>! The Mahal Welfare Services school liaison desk will contact you at <strong className="text-brand-charcoal">{formData.phone}</strong> with your assigned School Code and coordinator credentials.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-brand-orange text-white font-semibold text-xs"
                  >
                    Submit Another Institution
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <h3 className="text-xl font-bold text-brand-charcoal">
                      School Partnership Application
                    </h3>
                    <p className="text-xs text-brand-gray">
                      Fill out this brief form to activate your school on the 3F platform.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                      School / Institution Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cambridge Senior Secondary School"
                      value={formData.schoolName}
                      onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. New Delhi"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Delhi NCR"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                        Teacher / Coordinator Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Prof. Rajiv Nambiar"
                        value={formData.teacherName}
                        onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                        Designation
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Vice Principal / HOD Sports"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                        Contact Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                        Official Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="coordinator@school.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                      Estimated Participating Students
                    </label>
                    <select
                      value={formData.estimatedStudents}
                      onChange={(e) => setFormData({ ...formData, estimatedStudents: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                    >
                      <option value="50-100">50 - 100 Students</option>
                      <option value="100-250">100 - 250 Students</option>
                      <option value="250-500">250 - 500 Students</option>
                      <option value="500+">500+ Students</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl uppercase tracking-wider shadow-glow-orange-sm transition-all disabled:opacity-50"
                  >
                    {submitting ? "Transmitting Application..." : "Submit School Partnership Request"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
