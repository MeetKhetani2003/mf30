"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Shield,
  Menu,
  X,
  ArrowRight,
  UserCheck,
  KeyRound,
  GraduationCap,
  Sparkles,
  HeartHandshake,
  BookOpen,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [showTokenPrompt, setShowTokenPrompt] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About MWS", href: "/about" },
    { label: "Mission 3F", href: "/mission-3f" },
    { label: "Road Safety", href: "/road-safety" },
    { label: "Schools", href: "/schools" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Contact", href: "/contact" },
  ];

  const handlePortalAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      window.location.href = `/portal/${tokenInput.trim()}`;
    }
  };

  return (
    <>
      {/* Top Institutional Notification Bar */}
      <div className="bg-brand-charcoal text-slate-300 text-xs py-2 px-4 border-b border-slate-700/60 hidden sm:block">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <Shield className="w-3.5 h-3.5 text-brand-orange" />
              <strong>Mahal Welfare Services</strong> (Est. 2011) — Registered Non-Profit NGO
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-brand-orange font-semibold">
              Mission 3F: Fit • Fast • Focused
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs">
            <button
              onClick={() => {
                setShowCredentials(!showCredentials);
                setShowTokenPrompt(false);
              }}
              className="px-2.5 py-0.5 rounded-full bg-brand-orange text-white font-bold hover:bg-brand-orange-hover transition-colors flex items-center gap-1 shadow-sm text-[11px]"
            >
              <KeyRound className="w-3 h-3" />
              <span>Login ID &amp; Pass</span>
            </button>
            <Link
              href="/coordinator/login"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand-orange" />
              <span>School Coordinator Portal</span>
            </Link>
            <Link
              href="/admin/login"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <KeyRound className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Login</span>
            </Link>
            <button
              onClick={() => {
                setShowTokenPrompt(!showTokenPrompt);
                setShowCredentials(false);
              }}
              className="text-amber-400 hover:text-amber-300 font-semibold underline decoration-dotted"
            >
              Resume with Token
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-brand-border shadow-subtle">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
          {/* Single Official Brand Logo */}
          <Link href="/" className="flex items-center group py-1">
            <div className="relative h-12 w-36 sm:h-14 sm:w-44 flex-shrink-0">
              <Image
                src="/images/mission-3f-logo.png"
                alt="Mission 3F — Fit | Fast | Focused"
                fill
                className="object-contain group-hover:scale-[1.02] transition-transform duration-200"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${isActive
                    ? "text-brand-orange font-semibold border-b-2 border-brand-orange pb-1"
                    : "text-brand-charcoal hover:text-brand-orange"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/register/XAV-DEL-101"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] hover:from-[#FF6A00] hover:to-[#E65F00] shadow-glow-orange-sm transition-all duration-200 hover:scale-[1.02]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Registration</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl border border-slate-200 text-brand-charcoal hover:bg-slate-50 transition-colors"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-6 h-6 text-brand-orange" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Quick Credentials Reference Bar */}
        {showCredentials && (
          <div className="bg-brand-cream border-t border-brand-orange/30 px-4 py-3">
            <div className="container mx-auto max-w-5xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-brand-orange flex-shrink-0" />
                  <span className="font-bold text-brand-charcoal">Demo Portal Credentials:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
                  {/* Super Admin */}
                  <div className="bg-white p-2.5 rounded-xl border border-brand-orange/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-orange text-[11px] uppercase">Super Admin</span>
                      <Link href="/admin/login" className="text-[10px] text-blue-600 font-semibold hover:underline">Login →</Link>
                    </div>
                    <p className="text-[11px] font-mono text-brand-charcoal">ID: <strong className="text-brand-orange">admin@mahalwelfare.org</strong></p>
                    <p className="text-[11px] font-mono text-brand-charcoal">Pass: <strong>Admin3F@2026</strong></p>
                  </div>

                  {/* School Coordinator */}
                  <div className="bg-white p-2.5 rounded-xl border border-brand-orange/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-orange text-[11px] uppercase">School Coordinator</span>
                      <Link href="/coordinator/login" className="text-[10px] text-blue-600 font-semibold hover:underline">Lookup →</Link>
                    </div>
                    <p className="text-[11px] text-brand-charcoal">Delhi: <Link href="/coordinator/XAV-DEL-101" className="font-mono font-bold text-brand-orange hover:underline">XAV-DEL-101</Link></p>
                    <p className="text-[11px] text-brand-charcoal">Mumbai: <Link href="/coordinator/DPG-MUM-204" className="font-mono font-bold text-brand-orange hover:underline">DPG-MUM-204</Link></p>
                  </div>

                  {/* Student Magic Link */}
                  <div className="bg-white p-2.5 rounded-xl border border-brand-orange/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-orange text-[11px] uppercase">Student Magic Link</span>
                      <Link href="/register/XAV-DEL-101" className="text-[10px] text-emerald-600 font-semibold hover:underline">Register New →</Link>
                    </div>
                    <p className="text-[11px] text-brand-charcoal">Rohan: <Link href="/portal/demo-session-token-rohan-01" className="font-mono text-brand-orange hover:underline">Open Portal →</Link></p>
                    <p className="text-[11px] text-brand-charcoal">Ananya: <Link href="/portal/demo-session-token-ananya-02" className="font-mono text-brand-orange hover:underline">Open Portal →</Link></p>
                  </div>
                </div>

                <button
                  onClick={() => setShowCredentials(false)}
                  className="text-xs text-brand-gray hover:text-brand-charcoal underline self-end md:self-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Session Token Jump Bar */}
        {showTokenPrompt && (
          <div className="bg-brand-cream border-t border-brand-orange/20 px-4 py-3">
            <form onSubmit={handlePortalAccess} className="container mx-auto flex items-center justify-center gap-2 max-w-lg">
              <input
                type="text"
                placeholder="Paste your 3F Student Session Token to resume..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white border border-brand-border rounded-xl text-brand-charcoal focus:outline-none focus:border-brand-orange"
              />
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-brand-orange hover:bg-brand-orange-hover rounded-xl flex-shrink-0 shadow-sm"
              >
                Access Portal
              </button>
            </form>
          </div>
        )}

        {/* Mobile Slide-down Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-6 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-3">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium py-1.5 ${pathname === item.href ? "text-brand-orange font-bold" : "text-brand-charcoal"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <Link
                href="/register/XAV-DEL-101"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 font-semibold text-white bg-brand-orange rounded-xl shadow-glow-orange-sm text-sm"
              >
                Student Registration &amp; Examination
              </Link>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-center font-medium">
                <Link
                  href="/coordinator/login"
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 rounded-lg border border-slate-200 text-brand-charcoal hover:bg-slate-50"
                >
                  Coordinator Login
                </Link>
                <Link
                  href="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 rounded-lg border border-slate-200 text-brand-charcoal hover:bg-slate-50"
                >
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
