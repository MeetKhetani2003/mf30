"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  QrCode,
  Download,
  Play,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Bike,
  Building2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Copy,
  ExternalLink,
  Award,
  AlertCircle,
  Lock,
} from "lucide-react";

interface SlotOption {
  id: string;
  day: number;
  dateLabel: string;
  timeLabel: string;
  durationMin: number;
  slotName: string;
  studentCount: number;
  isLocked: boolean;
}

interface SchoolItem {
  id: string;
  schoolName: string;
  schoolCode: string;
  teacherName: string;
}

interface Props {
  initialSchoolCode?: string;
}

export default function StudentRegistrationFlow({ initialSchoolCode }: Props) {
  // Phase 1: Video -> Video Completion Modal -> Phase 2: Form -> Phase 3: Slot Pick -> Phase 4: Confirmed
  const [phase, setPhase] = useState<"video" | "form" | "slot" | "success">("video");

  // Video State
  const [videoWatched, setVideoWatched] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(true);

  // Available Slots & Schools
  const [slots, setSlots] = useState<SlotOption[]>([]);
  const [schools, setSchools] = useState<SchoolItem[]>([]);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");

  // Registration Form State
  const [schoolChoice, setSchoolChoice] = useState(initialSchoolCode || "XAV-DEL-101");
  const [customSchoolName, setCustomSchoolName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [standard, setStandard] = useState("Class 10");
  const [section, setSection] = useState("A");
  const [ridingExperience, setRidingExperience] = useState("Learner (Practicing / Cycle)");
  const [consentConfirmed, setConsentConfirmed] = useState(true);

  // Submission & Result State
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedData, setConfirmedData] = useState<{
    sessionToken: string;
    candidateCode: string;
    studentName: string;
    schoolName: string;
    slotDateStr: string;
    portalUrl: string;
    deliveryAddress: string;
  } | null>(null);

  const [copiedLink, setCopiedLink] = useState(false);

  // QR Code URL
  const qrTargetUrl = typeof window !== "undefined" ? window.location.href : "https://mission3f.org/students";
  const qrEndpoint = `/api/school/${schoolChoice || "XAV-DEL-101"}/qr?format=png`;

  // Fetch slots and schools on mount
  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch("/api/exam/slots/available");
        if (res.ok) {
          const data = await res.json();
          setSlots(data.slots || []);
          setSchools(data.schools || []);
          if (data.slots && data.slots.length > 0) {
            setSelectedSlotId(data.slots[0].id);
          }
        }
      } catch (err) {
        console.error("Config fetch error:", err);
      } finally {
        setLoadingConfig(false);
      }
    }
    loadConfig();
  }, []);

  // Simulate video playback progress timer
  useEffect(() => {
    if (phase !== "video" || videoWatched) return;

    const interval = setInterval(() => {
      setVideoProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setVideoWatched(true);
          setShowVideoModal(true);
          return 100;
        }
        return prev + 1.5; // ~65 seconds for full bar, or user can click simulate
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, videoWatched]);

  // Handler: video finished modal confirmation
  const handleReadyToRegister = () => {
    setShowVideoModal(false);
    setPhase("form");
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleReplayVideo = () => {
    setShowVideoModal(false);
    setVideoProgress(0);
    setVideoWatched(false);
    setVideoPlaying(true);
  };

  // Skip video for testing evaluator
  const handleQuickPreviewVideo = () => {
    setVideoProgress(100);
    setVideoWatched(true);
    setShowVideoModal(true);
  };

  // Submit Registration Form -> Proceed to Slot
  const handleFormNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setErrorMessage("Please fill all required fields (Name, Phone, Delivery Address).");
      return;
    }
    if (!consentConfirmed) {
      setErrorMessage("Please confirm parent/guardian consent to proceed.");
      return;
    }
    setErrorMessage(null);
    setPhase("slot");
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // Confirm Slot & Finalize Registration
  const handleFinalSubmit = async () => {
    if (!selectedSlotId) {
      setErrorMessage("Please select an examination slot date.");
      return;
    }
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/student/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolCode: schoolChoice === "OTHER" ? "" : schoolChoice,
          schoolNameCustom: schoolChoice === "OTHER" ? customSchoolName : undefined,
          name: fullName,
          phone,
          email,
          address,
          standard,
          section,
          ridingExperience,
          slotId: selectedSlotId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to complete registration");
      }

      setConfirmedData(data);
      setPhase("success");
      window.scrollTo({ top: 200, behavior: "smooth" });
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred during registration.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyLink = () => {
    if (confirmedData?.portalUrl) {
      navigator.clipboard.writeText(confirmedData.portalUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ========================================================= */}
        {/* TOP INSTITUTIONAL BANNER & DOWNLOADABLE / SCANNABLE QR    */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left 8 cols: Campaign & Prize Info */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-brand-orange">
                <Shield className="w-3.5 h-3.5" />
                <span>Mahal Welfare Society • Nangal (2011) &amp; Canada (2021) • Student Program</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Mission 3F Road Safety <span className="text-brand-orange">Digital Examination</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Watch the mandatory road safety training video, register your student profile, and select your monthly examination slot. 
              </p>

              {/* Prize Highlight Box */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-amber-950 uppercase tracking-wide">
                    🏆 Top 10 Scorers Win an Official Mission 3F ISI Safety Helmet!
                  </h4>
                  <p className="text-xs text-amber-800 mt-1 leading-normal">
                    In every monthly batch (9th, 18th &amp; 27th at 7:00 PM IST), the top 10 scoring students receive a certified ISI helmet dispatched directly to their registered home delivery address.
                  </p>
                </div>
              </div>

              {/* Progress Step Pills */}
              <div className="pt-2 flex items-center gap-2 sm:gap-3 text-xs font-medium text-slate-500 overflow-x-auto">
                <span className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${phase === "video" ? "bg-brand-orange text-white font-bold" : "bg-slate-100 text-slate-700"}`}>
                  <Play className="w-3 h-3" />
                  <span>1. Watch Video</span>
                </span>
                <span className="text-slate-300">→</span>
                <span className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${phase === "form" ? "bg-brand-orange text-white font-bold" : "bg-slate-100 text-slate-700"}`}>
                  <User className="w-3 h-3" />
                  <span>2. Student Form</span>
                </span>
                <span className="text-slate-300">→</span>
                <span className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${phase === "slot" ? "bg-brand-orange text-white font-bold" : "bg-slate-100 text-slate-700"}`}>
                  <Calendar className="w-3 h-3" />
                  <span>3. Pick 10/20/30 Slot</span>
                </span>
                <span className="text-slate-300">→</span>
                <span className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${phase === "success" ? "bg-emerald-600 text-white font-bold" : "bg-slate-100 text-slate-700"}`}>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>4. Exam Link Sent</span>
                </span>
              </div>
            </div>

            {/* Right 4 cols: Scannable & Downloadable QR Card */}
            <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center flex flex-col items-center justify-center space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <QrCode className="w-4 h-4 text-brand-orange" />
                <span>School &amp; Notice Board QR Code</span>
              </div>

              {/* QR Image */}
              <div className="relative w-36 h-36 bg-white p-2 rounded-xl shadow-xs border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrEndpoint}
                  alt="Student Registration QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-[11px] text-slate-500 max-w-[200px]">
                Scan with mobile camera to register or print on school circulars.
              </p>

              <a
                href={`${qrEndpoint}&download=true`}
                download={`Mission-3F-Registration-QR-${schoolChoice || "School"}.png`}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-slate-100 text-brand-charcoal text-xs font-semibold rounded-xl border border-slate-300 shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-brand-orange" />
                <span>Download QR (PNG)</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PHASE 1: MANDATORY VIDEO FIRST (FORM HIDDEN INITIALLY)    */}
        {/* ========================================================= */}
        {phase === "video" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Step 1 of 3 • Mandatory Training</span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Road Safety Orientation Video
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  You must watch this certified instruction module completely before unlocking student registration.
                </p>
              </div>

              {/* Evaluator Quick Skip Button */}
              <button
                type="button"
                onClick={handleQuickPreviewVideo}
                className="text-xs font-medium text-slate-500 hover:text-brand-orange bg-slate-50 hover:bg-orange-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 self-end sm:self-center"
              >
                <Sparkles className="w-3 h-3 text-brand-orange" />
                <span>Simulate Finish (Tester)</span>
              </button>
            </div>

            {/* Video Container with DRM & Anti-Share Overlay Protection */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-800">
              <iframe
                src="https://www.youtube.com/embed/Z0o2Bw8U_50?enablejsapi=1&rel=0&modestbranding=1&controls=1"
                title="Mission 3F Road Safety Video Session"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* Watermark Protection Shield */}
              <div className="absolute top-4 left-4 pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-white text-xs font-medium tracking-wide">
                  Mission 3F • Protected Road Safety Stream
                </span>
              </div>
            </div>

            {/* Progress Bar & Status */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Orientation Progress</span>
                </span>
                <span className="font-mono text-brand-orange font-bold">
                  {Math.min(100, Math.round(videoProgress))}%
                </span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-brand-orange h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, videoProgress)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Registration form unlocks automatically when video ends.</span>
                {videoWatched && (
                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="text-brand-orange font-bold underline hover:text-orange-700"
                  >
                    Open Confirmation Modal →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIDEO COMPLETION CONFIRMATION MODAL                       */}
        {/* ========================================================= */}
        {showVideoModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-orange-100 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Instruction Module Completed
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Ready for Student Registration?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed bg-orange-50/70 p-4 rounded-xl border border-orange-200 text-brand-charcoal italic">
                  &ldquo;Maine video jo hai, wo dekh li hai. Ab main aage proceed karne ke liye ready hoon, registration ke liye ready hoon.&rdquo;
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleReadyToRegister}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] hover:from-[#FF6A00] hover:to-[#E65F00] text-white font-bold text-sm shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <span>I am Ready — Proceed to Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleReplayVideo}
                  className="w-full py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Watch Video Again / Not Ready Yet</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PHASE 2: STUDENT REGISTRATION FORM                        */}
        {/* ========================================================= */}
        {phase === "form" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Step 2 of 3 • Student Enrollment</span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Candidate Registration Details
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Provide your official details. Delivery address is required for ISI helmet dispatch (Top 10 winners).
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPhase("video")}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Re-watch Video</span>
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleFormNext} className="space-y-5">
              {/* Row 1: School Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  School / Educational Institute *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    value={schoolChoice}
                    onChange={(e) => setSchoolChoice(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {schools.map((sch) => (
                      <option key={sch.schoolCode} value={sch.schoolCode}>
                        {sch.schoolName} ({sch.schoolCode})
                      </option>
                    ))}
                    <option value="OTHER">Other / My School is not listed</option>
                  </select>

                  {schoolChoice === "OTHER" && (
                    <input
                      type="text"
                      placeholder="Enter Full School Name"
                      value={customSchoolName}
                      onChange={(e) => setCustomSchoolName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  )}
                </div>
              </div>

              {/* Row 2: Student Name & Standard/Class */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-6">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Student Full Name (for Certificate &amp; Award) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Varma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Class / Standard *
                  </label>
                  <select
                    value={standard}
                    onChange={(e) => setStandard(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Class 8">Class 8th</option>
                    <option value="Class 9">Class 9th</option>
                    <option value="Class 10">Class 10th</option>
                    <option value="Class 11">Class 11th</option>
                    <option value="Class 12">Class 12th</option>
                    <option value="College / Youth">College / Youth</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Section / Roll No *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. A / 24"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Row 3: Email (Student or Parent/Guardian) & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address (Student or Parent / Guardian) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@gmail.com or parent@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Exam link, personalized code, and result card will be sent to this email.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mobile / WhatsApp Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Used for courier dispatch contact and slot reminders.
                  </span>
                </div>
              </div>

              {/* Row 4: Full Delivery Address for Helmet Dispatch */}
              <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 space-y-2">
                <label className="block text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Full Courier Delivery Address (For ISI Helmet Dispatch to Top 10) *</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House/Flat No, Apartment/Street, Landmark, City, State, Pincode"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-[11px] text-amber-800">
                  Please provide a complete address. Top 10 scorers in each monthly batch receive a certified Mission 3F ISI Helmet shipped to this address!
                </p>
              </div>

              {/* Row 5: Two Wheeler Riding Experience */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Current Two-Wheeler Experience Level *
                </label>
                <select
                  value={ridingExperience}
                  onChange={(e) => setRidingExperience(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Learner (Practicing / Cycle)">Learner (Practicing on bicycle or learning)</option>
                  <option value="Regular Pillion Rider">Regular Pillion Rider (Rides behind parents/friends)</option>
                  <option value="Active Two-Wheeler Rider">Active Two-Wheeler Rider (Scooter / Bike with helmet)</option>
                  <option value="Non-Rider (Pedestrian only)">Non-Rider (Pedestrian &amp; public transport)</option>
                </select>
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={consentConfirmed}
                  onChange={(e) => setConsentConfirmed(e.target.checked)}
                  className="mt-0.5 rounded text-orange-600 focus:ring-orange-500 h-4 w-4"
                />
                <span>
                  I confirm that the details provided are accurate and my parent/guardian has consented to my participation in the Mission 3F Road Safety Digital Certification.
                </span>
              </label>

              {/* Form Action */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="py-3 px-8 rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] hover:from-[#FF6A00] hover:to-[#E65F00] text-white font-bold text-sm shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <span>Proceed to Select Exam Date (9th, 18th &amp; 27th @ 7:00 PM)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* PHASE 3: FIXED EXAM SLOT PICKER (9th, 18th, 27th @ 7 PM) */}
        {/* ========================================================= */}
        {phase === "slot" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Step 3 of 3 • Pick Your Examination Slot</span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Fixed Date &amp; Time Selection
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Examinations are conducted exclusively on the <strong>9th</strong>, <strong>18th</strong>, and <strong>27th</strong> of every month at <strong>7:00 PM IST</strong> (Duration: 20 Minutes • 30 MCQs).
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPhase("form")}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Form</span>
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Candidate Summary Pill */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-500">Candidate:</span>{" "}
                <strong className="text-slate-900">{fullName}</strong> ({standard})
              </div>
              <div>
                <span className="text-slate-500">Contact:</span>{" "}
                <strong className="text-slate-900">{phone}</strong> | {email}
              </div>
              <div>
                <span className="text-slate-500">Delivery Address:</span>{" "}
                <strong className="text-slate-900 truncate max-w-xs">{address}</strong>
              </div>
            </div>

            {/* Slot Options: 9th, 18th, 27th */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Select Your Preferred Exam Date (7:00 PM IST):
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {slots.map((s) => {
                  const isSelected = selectedSlotId === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedSlotId(s.id)}
                      className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative ${
                        isSelected
                          ? "border-brand-orange bg-orange-50/60 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-8 h-8 rounded-xl bg-orange-100 text-brand-orange font-bold text-sm flex items-center justify-center">
                          {s.day}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {s.durationMin} Mins
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-base">{s.dateLabel}</h4>
                      <p className="text-xs font-semibold text-brand-orange mt-0.5 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{s.timeLabel}</span>
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                        <span>30 MCQs</span>
                        <span className="font-medium text-slate-700">{s.studentCount} enrolled</span>
                      </div>

                      {isSelected && (
                        <div className="absolute top-3 right-3 text-brand-orange">
                          <CheckCircle2 className="w-5 h-5 fill-brand-orange text-white" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lock Explanation Note */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-slate-800">Exam Room Lock Rule:</strong> Your examination link will be sent to your email immediately upon confirmation. The exam portal remains securely locked until <strong>7:00 PM IST</strong> on your chosen exam day. Once 7:00 PM arrives, you can verify your details and begin the 30-MCQ test.
              </div>
            </div>

            {/* Confirm & Send Button */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPhase("form")}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                ← Back to Details
              </button>

              <button
                type="button"
                disabled={submitting}
                onClick={handleFinalSubmit}
                className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] hover:from-[#FF6A00] hover:to-[#E65F00] text-white font-bold text-sm shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
              >
                {submitting ? (
                  <span>Generating Code &amp; Sending Email...</span>
                ) : (
                  <>
                    <span>Confirm Slot &amp; Send Invitation Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PHASE 4: SUCCESS CONFIRMATION & MAGIC LINK ACCESS         */}
        {/* ========================================================= */}
        {phase === "success" && confirmedData && (
          <div className="bg-white rounded-2xl border border-emerald-200 shadow-md p-6 sm:p-10 space-y-6 text-center">
            <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Registration Confirmed &bull; Invitation Dispatched
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                You are registered for Mission 3F!
              </h2>
              <p className="text-sm text-slate-600">
                We have emailed your personalized examination link and access code to <strong>{email}</strong>.
              </p>
            </div>

            {/* Candidate Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-lg mx-auto text-left space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500 uppercase font-semibold">Candidate Code</span>
                <span className="font-mono font-bold text-brand-orange text-lg tracking-wider">
                  {confirmedData.candidateCode}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-bold text-slate-900">{confirmedData.studentName}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Scheduled Exam Date:</span>
                <span className="font-bold text-slate-900">{confirmedData.slotDateStr}</span>
              </div>

              <div className="flex items-start justify-between text-xs pt-1 border-t border-slate-200/60">
                <span className="text-slate-500">Helmet Dispatch Address:</span>
                <span className="font-medium text-slate-800 text-right max-w-xs">{confirmedData.deliveryAddress}</span>
              </div>
            </div>

            {/* Direct Link Box */}
            <div className="max-w-lg mx-auto space-y-3">
              <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-xl border border-slate-300">
                <input
                  type="text"
                  readOnly
                  value={confirmedData.portalUrl}
                  className="bg-transparent text-xs text-slate-700 font-mono w-full px-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={copyLink}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1 transition-colors flex-shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>

              <Link
                href={confirmedData.portalUrl}
                className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] hover:from-[#FF6A00] hover:to-[#E65F00] text-white font-bold text-base shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>Open Candidate Examination Portal Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="pt-4 text-xs text-slate-500">
              Mahal Welfare Services &bull; Save this URL to access your examination on your scheduled day.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
