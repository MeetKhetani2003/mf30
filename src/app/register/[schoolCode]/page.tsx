"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  User,
  Phone,
  MapPin,
  Mail,
  GraduationCap,
  Bike,
  ArrowRight,
  AlertCircle,
  Building2,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Lock,
} from "lucide-react";

interface SchoolInfo {
  id: string;
  schoolName: string;
  schoolCode: string;
  teacherName: string;
  phone: string;
  email: string;
}

export default function StudentRegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const schoolCode = (params.schoolCode as string)?.toUpperCase();

  const [step, setStep] = useState(1);
  const [school, setSchool] = useState<SchoolInfo | null>(null);
  const [loadingSchool, setLoadingSchool] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    standard: "Class 11",
    section: "A",
    ridingCategory: "Learner",
    ridingDetails: "",
    guardianConsent: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSchool() {
      if (!schoolCode) return;
      try {
        const res = await fetch(`/api/coordinator/${schoolCode}`);
        if (res.ok) {
          const data = await res.json();
          setSchool(data.school);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSchool(false);
      }
    }
    fetchSchool();
  }, [schoolCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guardianConsent) {
      setError("Please confirm student and guardian consent before submitting.");
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const combinedExperience = `${formData.ridingCategory}: ${formData.ridingDetails.trim() || "No extra notes provided"}`;

      const res = await fetch("/api/student/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolCode,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          email: formData.email,
          standard: formData.standard,
          section: formData.section,
          ridingExperience: combinedExperience,
        }),
      });

      const data = await res.json();
      if (res.ok && data.sessionToken) {
        router.push(`/portal/${data.sessionToken}`);
      } else {
        setError(data.error || "Failed to register candidate record.");
      }
    } catch (err) {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-brand-soft-white">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Top Header Card */}
        <div className="card-premium p-6 sm:p-8 flex items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-cream text-brand-orange border border-brand-orange/30">
              <Shield className="w-3.5 h-3.5" />
              <span>Student Onboarding</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal">
              Mission 3F Road Safety Registration
            </h1>
            <p className="text-xs text-brand-gray">
              Mahal Welfare Services (Est. 2011) • Fit • Fast • Focused
            </p>
          </div>

          <Image
            src="/images/mission-3f-logo.png"
            alt="Mission 3F Logo"
            width={180}
            height={113}
            className="h-14 sm:h-16 w-auto object-contain flex-shrink-0"
            priority
          />
        </div>

        {/* Assigned School Banner */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-brand-cream text-brand-orange">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-brand-gray tracking-wider block">
                Assigned Examination Hub
              </span>
              {loadingSchool ? (
                <p className="text-xs text-brand-gray animate-pulse">Verifying school code...</p>
              ) : school ? (
                <p className="text-xs sm:text-sm font-bold text-brand-charcoal">
                  {school.schoolName} <span className="font-mono text-brand-orange font-semibold">[{school.schoolCode}]</span>
                </p>
              ) : (
                <p className="text-xs text-amber-600 font-semibold">
                  School Code: {schoolCode} (Default Open Slot)
                </p>
              )}
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
          </span>
        </div>

        {/* Multi-Step Registration Card */}
        <div className="card-premium p-6 sm:p-10 space-y-6">
          {/* Stepper Bar */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold pb-4 border-b border-slate-100">
            <div className={step >= 1 ? "text-brand-orange font-bold" : "text-slate-400"}>
              <span className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center text-[10px] mb-1 ${step >= 1 ? "bg-brand-orange text-white" : "bg-slate-200"}`}>
                1
              </span>
              <span>Personal</span>
            </div>
            <div className={step >= 2 ? "text-brand-orange font-bold" : "text-slate-400"}>
              <span className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center text-[10px] mb-1 ${step >= 2 ? "bg-brand-orange text-white" : "bg-slate-200"}`}>
                2
              </span>
              <span>Academic</span>
            </div>
            <div className={step >= 3 ? "text-brand-orange font-bold" : "text-slate-400"}>
              <span className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center text-[10px] mb-1 ${step >= 3 ? "bg-brand-orange text-white" : "bg-slate-200"}`}>
                3
              </span>
              <span>Riding Exp.</span>
            </div>
            <div className={step >= 4 ? "text-brand-orange font-bold" : "text-slate-400"}>
              <span className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center text-[10px] mb-1 ${step >= 4 ? "bg-brand-orange text-white" : "bg-slate-200"}`}>
                4
              </span>
              <span>Confirm</span>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
            {/* STEP 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-brand-charcoal">Step 1: Student Information</h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                    Student Full Name (as per School Register) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Mehra"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                      Phone Number *
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
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                    Complete Residential Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House/Flat No., Street, Colony, City, Pin Code"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
                      setError("Please provide student name, phone, and residential address.");
                      return;
                    }
                    setError(null);
                    setStep(2);
                  }}
                  className="w-full py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Continue to Academic Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Academic Information */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-brand-charcoal">Step 2: Grade &amp; Class Section</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                      Standard / Grade *
                    </label>
                    <select
                      value={formData.standard}
                      onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                    >
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                      <option value="College Undergraduate">College Undergraduate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                      Section *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. A, B, Science, Commerce"
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>
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
                    className="w-2/3 py-3.5 bg-brand-orange text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-orange-hover shadow-sm"
                  >
                    <span>Proceed to Riding Exp.</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Two-Wheeler Experience */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Bike className="w-5 h-5 text-brand-orange" />
                  <h3 className="text-base font-bold text-brand-charcoal">Step 3: Two-Wheeler Driving Experience</h3>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                    Riding Experience Category *
                  </label>
                  <select
                    value={formData.ridingCategory}
                    onChange={(e) => setFormData({ ...formData, ridingCategory: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                  >
                    <option value="None">None (Bicycle rider / Passenger only)</option>
                    <option value="Learner">Learner (Currently practicing / Holds learner licence)</option>
                    <option value="Regular Rider">Regular Rider (Rides scooter or motorcycle regularly)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                    Vehicle Model &amp; Riding Habits (Optional notes)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Activa 6G / Pulsar 150; Commutes 4 km daily to tuition; wears ISI helmet."
                    value={formData.ridingDetails}
                    onChange={(e) => setFormData({ ...formData, ridingDetails: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 py-3.5 rounded-xl border border-slate-200 text-brand-charcoal font-semibold hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="w-2/3 py-3.5 bg-brand-orange text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-orange-hover shadow-sm"
                  >
                    <span>Proceed to Confirmation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Review, Guardian Consent & Submission */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-brand-charcoal">Step 4: Verify Dossier &amp; Consent</h3>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div><strong>Student Name:</strong> {formData.name}</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                  <div><strong>Standard:</strong> {formData.standard} - Section {formData.section}</div>
                  <div><strong>Riding Experience:</strong> {formData.ridingCategory}</div>
                  <div><strong>Residential Address:</strong> {formData.address}</div>
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-brand-charcoal select-none pt-2">
                  <input
                    type="checkbox"
                    checked={formData.guardianConsent}
                    onChange={(e) => setFormData({ ...formData, guardianConsent: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-brand-orange focus:ring-brand-orange w-4 h-4"
                  />
                  <span>
                    I confirm that the submitted details are accurate, and I have obtained applicable parent/guardian consent for participation in the Mission 3F Road Safety Digital Assessment.
                  </span>
                </label>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={submitting}
                    className="w-1/3 py-3.5 rounded-xl border border-slate-200 text-brand-charcoal font-semibold hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-2/3 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl uppercase tracking-wider shadow-glow-orange-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? "Issuing Session..." : "Complete & Enter Portal"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
