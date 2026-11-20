"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { KeyRound, Shield, ArrowRight, AlertCircle, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("mws_admin_logged", "true");
        router.push("/admin");
      } else {
        setError(data.error || "Invalid super admin credentials.");
      }
    } catch (err) {
      setError("Network error connecting to auth service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 bg-brand-soft-white flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-3">
          <Image
            src="/images/mission-3f-logo.png"
            alt="Mission 3F Logo"
            width={200}
            height={126}
            className="h-14 sm:h-16 w-auto mx-auto object-contain"
            priority
          />
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Mahal Welfare Services • Est. 2011
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal">
            Super Admin Control Center
          </h1>
          <p className="text-xs text-brand-gray">
            Administrative access for slot orchestration, school management, question bank, and export pipeline.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="card-premium p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1.5">
              Admin Master Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-brand-orange"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5 uppercase tracking-wider disabled:opacity-50 text-xs sm:text-sm"
          >
            <span>{loading ? "Authenticating..." : "Authorize Admin Session"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center">
          <Link href="/" className="text-xs text-brand-gray hover:text-brand-orange">
            ← Return to Public Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
