"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Shield } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "School Partnership Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-soft-white py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 space-y-12 max-w-5xl">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-orange/30 text-xs text-brand-orange font-bold uppercase tracking-wider">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-charcoal">
            Contact Mahal Welfare Services
          </h1>
          <p className="text-sm sm:text-base text-brand-gray max-w-lg mx-auto">
            Have questions about Mission 3F, student examinations, or school onboarding? Our team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-premium p-8 space-y-6">
              <h3 className="text-xl font-bold text-brand-charcoal">
                Official Head Office
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-brand-gray">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-cream text-brand-orange flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-brand-charcoal block">Secretariat Address</strong>
                    <span>Mahal Welfare Services HQ, Sector Road Safety Wing, Institutional Area</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-cream text-brand-orange flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-brand-charcoal block">Official Email</strong>
                    <span>contact@mahalwelfare.org</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-cream text-brand-orange flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-brand-charcoal block">Campaign Helpline</strong>
                    <span>+91 98765 43210 (Mon-Sat, 9AM - 6PM)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <strong className="text-brand-charcoal block">Emergency Medical / Accident:</strong>
                <p className="text-brand-orange font-bold text-sm">Call 112 / 108</p>
                <p className="text-brand-gray">National Emergency Response Support System</p>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="card-premium p-8 sm:p-10 space-y-6">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-charcoal">
                    Message Dispatched
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-gray max-w-sm mx-auto">
                    Thank you, <strong className="text-brand-charcoal">{formData.name}</strong>. A campaign officer will review your inquiry and respond via email shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <h3 className="text-xl font-bold text-brand-charcoal">
                    Send An Official Inquiry
                  </h3>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Meera Nambiar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        placeholder="meera@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
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
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                    >
                      <option value="School Partnership Inquiry">School Partnership Inquiry</option>
                      <option value="Student Examination Support">Student Examination Support</option>
                      <option value="Volunteer Programs">Volunteer Programs</option>
                      <option value="Media & CSR Sponsorship">Media &amp; CSR Sponsorship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please write your query..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl uppercase tracking-wider shadow-glow-orange-sm flex items-center justify-center gap-2"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-4 h-4" />
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
