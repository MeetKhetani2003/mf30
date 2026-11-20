"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Building2, ArrowRight, Shield, Search } from "lucide-react";

export default function CoordinatorDirectoryPage() {
  const router = useRouter();
  const [schoolCode, setSchoolCode] = useState("");
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch("/api/admin/schools");
        if (res.ok) {
          const data = await res.json();
          setSchools(data.schools || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSchools();
  }, []);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (schoolCode.trim()) {
      router.push(`/coordinator/${schoolCode.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 bg-brand-soft-white flex items-center justify-center">
      <div className="max-w-xl w-full space-y-8">
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
            School Partner Network
          </span>
          <h1 className="text-3xl font-extrabold text-brand-charcoal">
            School Coordinator Access
          </h1>
          <p className="text-xs sm:text-sm text-brand-gray">
            Access your institution&apos;s real-time candidate roster, slot timers, and examination stats.
          </p>
        </div>

        {/* School Code Entry */}
        <form onSubmit={handleLookup} className="card-premium p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
              Enter Your School Code
            </label>

            <input
              type="text"
              required
              value={schoolCode}
              onChange={(e) => setSchoolCode(e.target.value)}
              placeholder="e.g. XAV-DEL-101, DPG-MUM-204"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal text-xs sm:text-sm uppercase tracking-wider font-mono focus:bg-white focus:outline-none focus:border-brand-orange"
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-3.5 uppercase tracking-wider text-xs sm:text-sm"
          >
            <span>Open School Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Directory of active partner schools */}
        <div className="card-premium p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-orange" />
              <span>Active Partner Schools Directory</span>
            </h3>
            <span className="text-[11px] text-brand-gray font-semibold">Quick Access</span>
          </div>

          <div className="space-y-2.5">
            {schools.map((sch) => (
              <Link
                key={sch.id}
                href={`/coordinator/${sch.schoolCode}`}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-orange text-left flex items-center justify-between group transition-all"
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal group-hover:text-brand-orange transition-colors">
                    {sch.schoolName}
                  </h4>
                  <p className="text-[11px] text-brand-gray">
                    Coordinator: {sch.teacherName} • Code: <span className="font-mono text-brand-orange font-bold">{sch.schoolCode}</span>
                  </p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-bold uppercase text-brand-charcoal group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  Open
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
