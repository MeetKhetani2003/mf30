"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HeartHandshake,
  Shield,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Gift,
  GraduationCap,
  Star,
} from "lucide-react";

export default function VolunteerPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    occupation: "Student / Youth Leader",
    domainInterest: "School Outreach & Classroom Education",
    availability: "Flexible / Weekends",
    motivation: "",
    termsAccepted: true,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setError("Please accept the volunteer commitment terms to proceed.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/volunteer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Failed to submit volunteer application.");
      }
    } catch (err) {
      setError("Network error while submitting application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFDF9] py-10 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 space-y-10 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-brand-orange">
            <HeartHandshake className="w-4 h-4" />
            <span>Mahal Welfare Services (Est. 2011) &bull; Community Leadership</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Volunteer With <span className="text-brand-orange">Mission 3F</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Become a Road Safety Ambassador! Help educate school peers, assist at digital exam drives, and lead the nationwide zero-fatality movement.
          </p>
        </div>

        {/* Perks & Recognition Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mx-auto">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Official Commendation</h4>
            <p className="text-xs text-slate-500">
              Receive a verified Certificate of Appreciation from Mahal Welfare Services.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Gift className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Ambassador Kit &amp; Surprises</h4>
            <p className="text-xs text-slate-500">
              Free 3F Ambassador T-Shirt, safety gear, badges, and special event gift hampers!
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Campus Leadership</h4>
            <p className="text-xs text-slate-500">
              Lead safety sessions in your school or college and gain valuable community hours.
            </p>
          </div>
        </div>

        {/* Multi-Step Application Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Volunteer Application Received!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.fullName}</strong>! We have emailed your onboarding confirmation and the NGO leadership team has been notified. Our coordinator will contact you at <strong className="text-slate-900">{formData.phone}</strong>.
              </p>
              <div className="p-3 bg-orange-50 rounded-xl text-xs font-semibold text-brand-orange max-w-sm mx-auto border border-orange-200">
                Domain: {formData.domainInterest} &bull; Availability: {formData.availability}
              </div>
              <Link
                href="/students"
                className="inline-block mt-4 px-6 py-2.5 rounded-xl bg-brand-orange text-white font-semibold text-xs shadow-sm hover:bg-orange-700 transition-colors"
              >
                Go to Students Program
              </Link>
            </div>
          ) : (
            <div>
              {/* Stepper Indicator */}
              <div className="flex items-center justify-between max-w-md mx-auto mb-8 text-xs font-semibold">
                <div className={`flex items-center gap-2 ${step >= 1 ? "text-brand-orange font-bold" : "text-slate-400"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-brand-orange text-white" : "bg-slate-200"}`}>
                    1
                  </span>
                  <span>Personal</span>
                </div>
                <div className="w-8 h-[1px] bg-slate-200" />
                <div className={`flex items-center gap-2 ${step >= 2 ? "text-brand-orange font-bold" : "text-slate-400"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-brand-orange text-white" : "bg-slate-200"}`}>
                    2
                  </span>
                  <span>Interest</span>
                </div>
                <div className="w-8 h-[1px] bg-slate-200" />
                <div className={`flex items-center gap-2 ${step >= 3 ? "text-brand-orange font-bold" : "text-slate-400"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? "bg-brand-orange text-white" : "bg-slate-200"}`}>
                    3
                  </span>
                  <span>Pledge</span>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
                {/* STEP 1: Personal Details */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Step 1: Personal Details</h3>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pooja Subramanian"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="pooja@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="9876543210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          City / State of Residence *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Delhi NCR / Mumbai"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Category / Role *
                        </label>
                        <select
                          value={formData.occupation}
                          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="School Student Ambassador">School Student Ambassador</option>
                          <option value="College Youth Leader">College Youth Leader</option>
                          <option value="Teacher / Academician">Teacher / Academician</option>
                          <option value="Working Professional">Working Professional</option>
                          <option value="Citizen Road Safety Advocate">Citizen Road Safety Advocate</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!formData.fullName || !formData.email || !formData.phone) {
                            setError("Please complete all personal details before proceeding.");
                            return;
                          }
                          setError(null);
                          setStep(2);
                        }}
                        className="w-full py-3.5 bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] transition-all"
                      >
                        <span>Proceed to Area of Interest &amp; Kits</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Interest & Availability */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Step 2: Area of Interest &amp; Availability</h3>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Select Primary Domain Interest *
                      </label>
                      <select
                        value={formData.domainInterest}
                        onChange={(e) => setFormData({ ...formData, domainInterest: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="School Outreach & Classroom Education">School Outreach &amp; Classroom Education</option>
                        <option value="Pedestrian Safety & Zebra Crossings">Pedestrian Safety &amp; Zebra Line Awareness</option>
                        <option value="Digital Exam Proctoring & Drives">Digital Exam Proctoring &amp; Student Drives</option>
                        <option value="Two-Wheeler Helmet Advocacy">Two-Wheeler Helmet Advocacy &amp; Demonstrations</option>
                        <option value="Social Media & Creative Campaigns">Social Media &amp; Creative Campaigns</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Time Availability *
                      </label>
                      <select
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="Flexible / Weekends">Flexible / Weekends Only</option>
                        <option value="Monthly 9th/18th/27th Exam Days">Monthly 9th / 18th / 27th Exam Days (7:00 PM IST)</option>
                        <option value="Weekdays (After School/Work)">Weekdays (Afternoon/Evening)</option>
                        <option value="Full Time Volunteer">Active Community Campaigner</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Why do you want to volunteer with Mission 3F? (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Tell us why road safety matters to you..."
                        value={formData.motivation}
                        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-1/3 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="w-2/3 py-3.5 bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] transition-all"
                      >
                        <span>Review &amp; Sign Pledge</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Pledge & Confirmation */}
                {step === 3 && (
                  <div className="space-y-5">
                    <h3 className="text-lg font-bold text-slate-900">Step 3: Review &amp; Safety Pledge</h3>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div><strong>Volunteer:</strong> {formData.fullName} ({formData.phone})</div>
                      <div><strong>Role:</strong> {formData.occupation} &bull; {formData.city}</div>
                      <div><strong>Domain:</strong> {formData.domainInterest}</div>
                      <div><strong>Availability:</strong> {formData.availability}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-xs text-brand-charcoal space-y-2">
                      <strong className="block font-bold text-brand-orange">The 3F Safety Pledge:</strong>
                      <p className="leading-relaxed">
                        &quot;I solemnly pledge to uphold the 3F principles of road safety — Fit, Fast, and Focused. I will always wear an ISI helmet with fastened chin-strap, wear seatbelts, never use a mobile phone while riding, and actively advocate defensive road discipline to protect human life.&quot;
                      </p>
                    </div>

                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 select-none">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                        className="mt-0.5 rounded border-slate-300 text-brand-orange focus:ring-brand-orange w-4 h-4"
                      />
                      <span>
                        I commit to representing Mission 3F and Mahal Welfare Services responsibly and accept community terms.
                      </span>
                    </label>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={loading}
                        className="w-1/3 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-2/3 py-3.5 bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] text-white font-bold rounded-xl shadow-md hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                      >
                        {loading ? "Submitting Application..." : "Confirm & Sign Volunteer Pledge"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
