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
} from "lucide-react";

export default function VolunteerPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    occupation: "",
    domainInterest: "School Education",
    availability: "Weekends",
    experience: "",
    ageConfirmed: true,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ageConfirmed) {
      setError("Volunteers must confirm they are 18 years or older.");
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
        setError(data.error || "Failed to submit volunteer pledge.");
      }
    } catch (err) {
      setError("Network error while submitting application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-soft-white py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 space-y-12 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-orange/30 text-xs text-brand-orange font-bold uppercase tracking-wider">
            Community Safety Advocates
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-charcoal">
            Volunteer With <span className="text-brand-orange">Mission 3F</span>
          </h1>
          <p className="text-sm sm:text-base text-brand-gray max-w-xl mx-auto leading-relaxed">
            Join Mahal Welfare Services (Est. 2011) as a road safety ambassador. Conduct school training, assist at examination drives, and champion the zero-fatality mission.
          </p>
        </div>

        {/* Multi-Step Application Card */}
        <div className="card-premium p-8 sm:p-12 space-y-8">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-brand-charcoal">
                Volunteer Pledge Received!
              </h2>
              <p className="text-sm text-brand-gray max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-brand-charcoal">{formData.fullName}</strong>! You have taken the pledge to make Indian roads safer. Our community coordinator will reach out to you at <strong className="text-brand-charcoal">{formData.phone}</strong> with orientation details.
              </p>
              <div className="p-3 bg-brand-cream rounded-xl text-xs font-semibold text-brand-charcoal max-w-sm mx-auto">
                Domain: {formData.domainInterest} • Availability: {formData.availability}
              </div>
              <Link
                href="/"
                className="inline-block mt-4 px-6 py-2.5 rounded-xl bg-brand-orange text-white font-semibold text-xs"
              >
                Return to Home
              </Link>
            </div>
          ) : (
            <div>
              {/* Stepper Indicator */}
              <div className="flex items-center justify-between max-w-md mx-auto mb-8 text-xs font-semibold">
                <div className={`flex items-center gap-2 ${step >= 1 ? "text-brand-orange font-bold" : "text-brand-gray"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-brand-orange text-white" : "bg-slate-200"}`}>
                    1
                  </span>
                  <span>Personal</span>
                </div>
                <div className="w-8 h-[1px] bg-slate-200" />
                <div className={`flex items-center gap-2 ${step >= 2 ? "text-brand-orange font-bold" : "text-brand-gray"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-brand-orange text-white" : "bg-slate-200"}`}>
                    2
                  </span>
                  <span>Interest</span>
                </div>
                <div className="w-8 h-[1px] bg-slate-200" />
                <div className={`flex items-center gap-2 ${step >= 3 ? "text-brand-orange font-bold" : "text-brand-gray"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? "bg-brand-orange text-white" : "bg-slate-200"}`}>
                    3
                  </span>
                  <span>Confirmation</span>
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
                    <h3 className="text-lg font-bold text-brand-charcoal">Step 1: Personal Details</h3>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Sen"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="ananya@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                          Phone / WhatsApp *
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                          City of Residence *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Pune, Maharashtra"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                          Occupation / College *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Engineering Student / Teacher"
                          value={formData.occupation}
                          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                    </div>

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
                      className="w-full py-3.5 bg-brand-orange text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-orange-hover"
                    >
                      <span>Proceed to Area of Interest</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* STEP 2: Interest & Availability */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-brand-charcoal">Step 2: Area of Interest &amp; Availability</h3>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                        Select Primary Domain Interest *
                      </label>
                      <select
                        value={formData.domainInterest}
                        onChange={(e) => setFormData({ ...formData, domainInterest: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                      >
                        <option value="School Education">School Outreach &amp; Classroom Education</option>
                        <option value="Pedestrian Safety">Pedestrian Safety &amp; Zebra Line Awareness</option>
                        <option value="Event Support">Event Logistics &amp; Assembly Support</option>
                        <option value="Motorcycle Safety">Motorcycle Safety &amp; Helmet Advocacy</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                        Time Availability *
                      </label>
                      <select
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                      >
                        <option value="Weekends">Weekends Only (Saturday/Sunday)</option>
                        <option value="Weekdays">Weekdays (Afternoon/Evening)</option>
                        <option value="Flexible">Flexible / On-Call for Special Drives</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                        Brief Prior Experience or Motivation (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Tell us why road safety matters to you..."
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange resize-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-1/3 py-3.5 rounded-xl border border-slate-200 text-brand-charcoal font-semibold hover:bg-slate-50"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="w-2/3 py-3.5 bg-brand-orange text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-orange-hover"
                      >
                        <span>Review &amp; Pledge</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Pledge & Confirmation */}
                {step === 3 && (
                  <div className="space-y-5">
                    <h3 className="text-lg font-bold text-brand-charcoal">Step 3: Review &amp; Volunteer Pledge</h3>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div><strong>Volunteer:</strong> {formData.fullName} ({formData.phone})</div>
                      <div><strong>Domain:</strong> {formData.domainInterest}</div>
                      <div><strong>Availability:</strong> {formData.availability}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-brand-cream border border-brand-orange/30 text-xs text-brand-charcoal space-y-2">
                      <strong className="block font-bold text-brand-orange">The 3F Safety Pledge:</strong>
                      <p>
                        &quot;I solemnly pledge to uphold the 3F principles of road safety — Fit, Fast, and Focused. I will always wear an ISI helmet with fastened chin-strap, wear seatbelts, never use a mobile phone while riding, and actively advocate defensive road discipline to protect human life.&quot;
                      </p>
                    </div>

                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-brand-charcoal select-none">
                      <input
                        type="checkbox"
                        checked={formData.ageConfirmed}
                        onChange={(e) => setFormData({ ...formData, ageConfirmed: e.target.checked })}
                        className="mt-0.5 rounded border-slate-300 text-brand-orange focus:ring-brand-orange w-4 h-4"
                      />
                      <span>
                        I confirm that I am at least <strong>18 years of age</strong> and accept volunteer terms.
                      </span>
                    </label>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={loading}
                        className="w-1/3 py-3.5 rounded-xl border border-slate-200 text-brand-charcoal font-semibold hover:bg-slate-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-2/3 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl shadow-glow-orange-sm flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading ? "Submitting Pledge..." : "Confirm & Sign Pledge"}
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
