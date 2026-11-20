"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Users,
  GraduationCap,
  Clock,
  CheckCircle2,
  Copy,
  ExternalLink,
  Shield,
  Search,
  Bike,
  FileSpreadsheet,
  AlertCircle,
  Phone,
  Mail,
  QrCode,
  Printer,
  Download,
} from "lucide-react";
import { formatSecondsToMMSS, formatDate } from "@/lib/utils";
import SchoolPamphletModal from "@/components/coordinator/SchoolPamphletModal";

interface StudentRosterItem {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  standard: string;
  section: string;
  ridingExperience: string;
  sessionToken: string;
  createdAt: string;
  attempt?: {
    score: number;
    totalQuestions: number;
    timeTakenSec: number;
    submittedAt: string;
  } | null;
}

interface SchoolCoordinatorData {
  school: {
    id: string;
    schoolName: string;
    schoolCode: string;
    teacherName: string;
    phone: string;
    email: string;
  };
  metrics: {
    totalStudents: number;
    completedTests: number;
    completionRate: number;
    averageScore: number;
  };
  students: StudentRosterItem[];
  activeSlot?: {
    id: string;
    slotName: string;
    videoStartTime: string;
    videoEndTime: string;
    examStartTime: string;
    examEndTime: string;
  } | null;
}

export default function CoordinatorDashboardPage() {
  const params = useParams();
  const schoolCode = (params.schoolCode as string)?.toUpperCase();

  const [data, setData] = useState<SchoolCoordinatorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPamphlet, setShowPamphlet] = useState(false);

  useEffect(() => {
    async function fetchCoordinatorData() {
      try {
        const res = await fetch(`/api/coordinator/${schoolCode}`);
        if (res.ok) {
          const result = await res.json();
          setData(result);
        } else {
          setError(`No school coordinator found for code: ${schoolCode}`);
        }
      } catch (err) {
        setError("Error connecting to coordinator server.");
      } finally {
        setLoading(false);
      }
    }
    if (schoolCode) {
      fetchCoordinatorData();
    }
  }, [schoolCode]);

  const copyRegistrationUrl = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/register/${schoolCode}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-soft-white text-brand-charcoal">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-wider text-brand-gray font-semibold">
            Loading Coordinator Portal for [{schoolCode}]...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-soft-white p-4 text-center">
        <div className="card-premium p-8 max-w-md w-full space-y-4">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-brand-charcoal">Coordinator Portal Notice</h2>
          <p className="text-xs text-brand-gray">{error || "School not found."}</p>
          <div className="space-y-2 pt-2">
            <Link
              href="/coordinator/login"
              className="w-full inline-block px-4 py-2.5 bg-brand-orange rounded-xl text-xs font-semibold text-white shadow-sm"
            >
              Coordinator Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { school, metrics, students, activeSlot } = data;

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 bg-brand-soft-white">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header Card */}
        <div className="card-premium p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Image
              src="/images/mission-3f-logo.png"
              alt="Mission 3F Logo"
              width={180}
              height={113}
              className="h-14 sm:h-16 w-auto object-contain flex-shrink-0"
              priority
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-cream text-brand-orange border border-brand-orange/30">
                <Building2 className="w-3.5 h-3.5" />
                <span>School Coordinator Interface</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-charcoal mt-1">
                {school.schoolName}
              </h1>
              <p className="text-xs text-brand-gray flex flex-wrap items-center gap-3 mt-1">
                <span>Code: <strong className="text-brand-orange font-mono">{school.schoolCode}</strong></span>
                <span>•</span>
                <span>Coordinator: <strong className="text-brand-charcoal">{school.teacherName}</strong></span>
                <span>•</span>
                <span>{school.phone}</span>
              </p>
            </div>
          </div>

          {/* Quick Registration Link & QR Box */}
          <div className="w-full lg:w-auto p-4 rounded-2xl bg-brand-cream border border-brand-orange/30 space-y-2.5">
            <span className="text-[11px] font-bold uppercase text-brand-charcoal block">
              Direct Student Registration
            </span>
            <div className="flex items-center gap-2">
              <code className="px-3 py-1.5 rounded-lg bg-white border border-brand-border text-xs text-brand-charcoal font-mono truncate max-w-[200px]">
                /register/{school.schoolCode}
              </code>
              <button
                onClick={copyRegistrationUrl}
                className="px-3 py-1.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            <button
              onClick={() => setShowPamphlet(true)}
              className="w-full px-3 py-1.5 rounded-lg bg-white border border-brand-orange/40 hover:bg-orange-50 text-brand-orange text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-all"
            >
              <QrCode className="w-3.5 h-3.5 text-brand-orange" />
              <span>Generate QR &amp; Print Pamphlet</span>
            </button>
          </div>
        </div>

        {/* PRINTABLE PAMPHLET & QR CODE BANNER */}
        <div className="card-premium p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-brand-orange bg-gradient-to-r from-orange-50/50 via-white to-white">
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="p-2 bg-white rounded-2xl border border-slate-200 shadow-xs flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/school/${school.schoolCode}/qr`}
                alt="School Registration QR"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange block">
                Printable Material for Notice Boards &amp; Flyers
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                School Registration QR Code &amp; Ready-to-Print Pamphlet
              </h3>
              <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
                Download the high-resolution QR code to attach to school circulars, or click below to print our official A4 awareness flyer for school bulletin boards.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto flex-shrink-0">
            <button
              onClick={() => setShowPamphlet(true)}
              className="btn-primary w-full sm:w-auto px-4 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>View &amp; Print A4 Pamphlet</span>
            </button>
            <a
              href={`/api/school/${school.schoolCode}/qr?download=true`}
              download={`Mission3F-QR-${school.schoolCode}.png`}
              className="btn-secondary w-full sm:w-auto px-4 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4 text-brand-orange" />
              <span>Download QR (PNG)</span>
            </a>
          </div>
        </div>

        {/* Live Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="card-premium p-5 space-y-1">
            <span className="text-xs font-semibold text-brand-gray uppercase tracking-wider block">
              Total Enrolled
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal">
              {metrics.totalStudents}
            </p>
            <span className="text-[11px] text-brand-gray">Candidates registered</span>
          </div>

          <div className="card-premium p-5 space-y-1">
            <span className="text-xs font-semibold text-brand-gray uppercase tracking-wider block">
              Exams Completed
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {metrics.completedTests}
            </p>
            <span className="text-[11px] text-brand-gray">Submissions verified</span>
          </div>

          <div className="card-premium p-5 space-y-1">
            <span className="text-xs font-semibold text-brand-gray uppercase tracking-wider block">
              Completion Rate
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-brand-orange">
              {metrics.completionRate}%
            </p>
            <span className="text-[11px] text-brand-gray">Cohort participation</span>
          </div>

          <div className="card-premium p-5 space-y-1">
            <span className="text-xs font-semibold text-brand-gray uppercase tracking-wider block">
              Average Score
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600">
              {metrics.averageScore} / 30
            </p>
            <span className="text-[11px] text-brand-gray">Road safety score</span>
          </div>
        </div>

        {/* Student Roster Table */}
        <div className="card-premium p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-brand-charcoal flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-orange" />
                <span>Student Roster &amp; Examination Log</span>
              </h2>
              <p className="text-xs text-brand-gray">
                Live candidate progress, two-wheeler experience tracking, and examination scores.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="text-center py-12 text-brand-gray space-y-2">
              <GraduationCap className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-brand-charcoal">No candidates enrolled yet for this school.</p>
              <p className="text-xs">
                Share your school registration link to begin onboarding students!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-brand-gray uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Class &amp; Section</th>
                    <th className="py-3 px-4">Contact Phone</th>
                    <th className="py-3 px-4">Two-Wheeler Experience</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Score</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-brand-charcoal whitespace-nowrap">
                        {st.name}
                      </td>
                      <td className="py-3 px-4 text-brand-gray whitespace-nowrap">
                        {st.standard} - {st.section}
                      </td>
                      <td className="py-3 px-4 text-brand-gray whitespace-nowrap">
                        {st.phone}
                      </td>
                      <td className="py-3 px-4 text-brand-orange max-w-[200px] truncate" title={st.ridingExperience}>
                        {st.ridingExperience}
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {st.attempt ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                            Completed
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold whitespace-nowrap">
                        {st.attempt ? (
                          <span className="text-brand-charcoal">
                            {st.attempt.score} <span className="text-brand-gray text-[10px]">/ 30</span>
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <Link
                          href={`/portal/${st.sessionToken}`}
                          target="_blank"
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-brand-charcoal inline-flex items-center gap-1 transition-colors font-medium"
                        >
                          <span>Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Printable School Pamphlet & QR Modal */}
      <SchoolPamphletModal
        isOpen={showPamphlet}
        onClose={() => setShowPamphlet(false)}
        schoolName={school.schoolName}
        schoolCode={school.schoolCode}
        teacherName={school.teacherName}
        phone={school.phone}
      />
    </div>
  );
}
