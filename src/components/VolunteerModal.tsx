"use client";

import React, { useState } from "react";
import { X, HeartHandshake, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VolunteerModal({ isOpen, onClose }: VolunteerModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    occupation: "",
    ageConfirmed: false,
    domainInterest: "School Education",
    availability: "Weekends",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ageConfirmed) {
      setError("You must confirm you are 18 years or older to volunteer.");
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
        setError(data.error || "Failed to register volunteer profile.");
      }
    } catch (err: any) {
      setError("Network error while submitting application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSuccess(false);
    setError(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      occupation: "",
      ageConfirmed: false,
      domainInterest: "School Education",
      availability: "Weekends",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-brand-border bg-[#161c24] p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-glow-emerald">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">Application Received!</h3>
            <p className="text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-white">{formData.fullName}</span>! Mahal Welfare Services road safety team will reach out to you via phone and email.
            </p>
            <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 text-xs text-brand-yellow font-medium">
              Registered for: {formData.domainInterest} • {formData.availability}
            </div>
            <button
              onClick={resetAndClose}
              className="mt-4 px-6 py-2.5 bg-brand-orange text-white font-bold rounded-lg shadow-glow-orange hover:bg-brand-orange-glow transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-brand-orange/15 border border-brand-orange/40 text-brand-orange">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Join 3F Safety Volunteers</h3>
                <p className="text-xs text-zinc-400">Mahal Welfare Services • Est. 2011</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800/80 flex items-center gap-2 text-red-200 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Vikramaditya Rathore"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/90 border border-brand-border text-white placeholder-zinc-500 focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/90 border border-brand-border text-white placeholder-zinc-500 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/90 border border-brand-border text-white placeholder-zinc-500 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Occupation / Profession *
                </label>
                <input
                  type="text"
                  required
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  placeholder="e.g. College Student / Software Engineer / Educator"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/90 border border-brand-border text-white placeholder-zinc-500 focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Domain Interest *
                  </label>
                  <select
                    value={formData.domainInterest}
                    onChange={(e) => setFormData({ ...formData, domainInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-brand-border text-white focus:outline-none focus:border-brand-orange"
                  >
                    <option value="School Education">School Education</option>
                    <option value="Pedestrian Safety">Pedestrian Safety</option>
                    <option value="Event Support">Event Support</option>
                    <option value="Motorcycle Safety">Motorcycle Safety</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Availability *
                  </label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-brand-border text-white focus:outline-none focus:border-brand-orange"
                  >
                    <option value="Weekends">Weekends Only</option>
                    <option value="Weekdays">Weekdays (Afternoons/Evenings)</option>
                    <option value="Both">Flexible / Any Time</option>
                  </select>
                </div>
              </div>

              {/* Age confirmation checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-zinc-300 select-none">
                  <input
                    type="checkbox"
                    checked={formData.ageConfirmed}
                    onChange={(e) => setFormData({ ...formData, ageConfirmed: e.target.checked })}
                    className="mt-0.5 rounded border-zinc-700 text-brand-orange focus:ring-brand-orange w-4 h-4"
                  />
                  <span>
                    I confirm that I am at least <strong className="text-white">18 years of age</strong> and pledge to uphold safety standards as a Mahal Welfare Services ambassador.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-glow hover:to-brand-orange text-white font-bold rounded-xl shadow-glow-orange transition-all disabled:opacity-50"
              >
                {loading ? "Submitting Registration..." : "Confirm Volunteer Pledge"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
