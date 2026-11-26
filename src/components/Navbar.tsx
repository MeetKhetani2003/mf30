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
  Globe2,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [showTokenPrompt, setShowTokenPrompt] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Mission-3F", href: "/mission-3f" },
    { label: "Gallery", href: "/gallery" },
    { label: "Events", href: "/events" },
    { label: "Contact us", href: "/contact" },
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
              <Globe2 className="w-3.5 h-3.5 text-brand-orange" />
              <strong>Mahal Welfare Society</strong> &bull; Nangal (Est. 2011) &amp; Canada (Est. 2021)
            </span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-brand-orange font-semibold">
              Mission-3F: Grassroots Service &bull; Global Reach &bull; Safer Roads
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs">
            <Link
              href="/coordinator/login"
              className="hover:text-white transition-colors flex items-center gap-1 text-slate-300"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand-orange" />
              <span>School Coordinator</span>
            </Link>
            <Link
              href="/admin/login"
              className="hover:text-white transition-colors flex items-center gap-1 text-slate-300"
            >
              <KeyRound className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Login</span>
            </Link>
            <button
              onClick={() => setShowTokenPrompt(!showTokenPrompt)}
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
          {/* Official Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group py-1">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-slate-200 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/images/mahal-welfare-logo.png"
                alt="Mahal Welfare Society Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight group-hover:text-brand-orange transition-colors">
                Mahal Welfare Society
              </span>
              <span className="text-[11px] font-semibold text-brand-orange tracking-wide">
                Mission-3F &bull; Global Action
              </span>
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
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-brand-orange font-bold border-b-2 border-brand-orange pb-1"
                      : "text-brand-charcoal hover:text-brand-orange"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs: Traffic Soldier & Students Exam */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/volunteer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-brand-orange rounded-xl border border-slate-300 hover:border-brand-orange bg-white hover:bg-orange-50/50 transition-all duration-200"
            >
              <HeartHandshake className="w-4 h-4 text-brand-orange" />
              <span>Traffic Soldier</span>
            </Link>

            <Link
              href="/students"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] hover:from-[#FF6A00] hover:to-[#E65F00] shadow-glow-orange-sm transition-all duration-200 hover:scale-[1.02]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Students Exam</span>
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

        {/* Resume Session Token Drawer */}
        {showTokenPrompt && (
          <div className="bg-brand-cream border-t border-brand-orange/30 px-4 py-3">
            <div className="container mx-auto max-w-xl">
              <form onSubmit={handlePortalAccess} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste your candidate session token..."
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  className="flex-1 px-4 py-2 text-xs rounded-xl border border-brand-orange/40 focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white text-brand-charcoal"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-orange text-white text-xs font-semibold rounded-xl hover:bg-brand-orange-hover transition-colors whitespace-nowrap"
                >
                  Resume Exam
                </button>
                <button
                  type="button"
                  onClick={() => setShowTokenPrompt(false)}
                  className="px-3 py-2 bg-slate-200 text-slate-700 text-xs rounded-xl hover:bg-slate-300"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden border-t border-brand-border bg-white px-4 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-brand-cream text-brand-orange font-bold"
                        : "text-brand-charcoal hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                <Link
                  href="/students"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] text-white font-bold text-center text-sm shadow-md"
                >
                  Students Exam &bull; Watch Video &amp; Test
                </Link>

                <Link
                  href="/volunteer"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-800 font-semibold text-center text-sm hover:bg-slate-200"
                >
                  Become a Traffic Soldier &bull; Volunteer
                </Link>

                <div className="flex items-center justify-between pt-2 px-2 text-xs text-slate-500">
                  <Link href="/coordinator/login" onClick={() => setIsOpen(false)}>
                    Coordinator Portal
                  </Link>
                  <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                    Admin Login
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
