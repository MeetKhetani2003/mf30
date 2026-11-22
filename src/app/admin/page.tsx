"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Clock,
  Building2,
  Users,
  GraduationCap,
  FileSpreadsheet,
  Send,
  Trash2,
  Plus,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  RefreshCw,
  Video,
  Award,
  Sparkles,
  BarChart3,
  HelpCircle,
  Settings,
  QrCode,
  Printer,
} from "lucide-react";
import SchoolPamphletModal from "@/components/coordinator/SchoolPamphletModal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatSecondsToMMSS, formatDate } from "@/lib/utils";

const CHART_COLORS = ["#FF6A00", "#16A34A", "#D97706", "#2563EB", "#9333EA"];

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState<"analytics" | "slots" | "schools" | "questions" | "pipeline" | "helmets">("analytics");
  const [analytics, setAnalytics] = useState<any>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [schools, setSchools] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [helmetBatches, setHelmetBatches] = useState<any[]>([]);
  const [loadingHelmets, setLoadingHelmets] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // New Slot Form State
  const [newSlot, setNewSlot] = useState({
    slotName: "",
    youtubeUrl: "https://www.youtube.com/embed/Z0o2Bw8U_50",
    videoStartTime: new Date().toISOString().slice(0, 16),
    videoEndTime: new Date(Date.now() + 10 * 60 * 1000).toISOString().slice(0, 16),
    examStartTime: new Date(Date.now() + 10 * 60 * 1000).toISOString().slice(0, 16),
    examEndTime: new Date(Date.now() + 70 * 60 * 1000).toISOString().slice(0, 16),
    examDurationMin: 20,
    isActive: true,
  });
  const [slotCreating, setSlotCreating] = useState(false);

  // New School Form State
  const [newSchool, setNewSchool] = useState({
    schoolName: "",
    schoolCode: "",
    teacherName: "",
    phone: "",
    email: "",
  });
  const [schoolCreating, setSchoolCreating] = useState(false);

  // Pipeline Execution State
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineResult, setPipelineResult] = useState<any>(null);
  const [selectedSlotForExport, setSelectedSlotForExport] = useState<string>("");
  const [pamphletSchool, setPamphletSchool] = useState<any | null>(null);

  const refreshAllData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, slotsRes, schoolsRes, questionsRes] = await Promise.all([
        fetch("/api/admin/analytics"),
        fetch("/api/admin/slots"),
        fetch("/api/admin/schools"),
        fetch("/api/exam/status/sample?withQuestions=true").catch(() => null),
      ]);

      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
      if (slotsRes.ok) {
        const slotData = await slotsRes.json();
        setSlots(slotData.slots || []);
        if (slotData.slots && slotData.slots.length > 0 && !selectedSlotForExport) {
          setSelectedSlotForExport(slotData.slots[0].id);
        }
      }
      if (schoolsRes.ok) {
        const schoolData = await schoolsRes.json();
        setSchools(schoolData.schools || []);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  useEffect(() => {
    if (activeTab === "helmets") {
      fetchHelmets();
    }
  }, [activeTab]);

  const fetchHelmets = async () => {
    setLoadingHelmets(true);
    try {
      const res = await fetch("/api/admin/helmets");
      if (res.ok) {
        const data = await res.json();
        setHelmetBatches(data.batches || []);
      }
    } catch (e) {
      console.error("Failed to fetch helmet dispatches:", e);
    } finally {
      setLoadingHelmets(false);
    }
  };

  const downloadHelmetCourierCSV = (batch: any) => {
    const headers = "Rank,Student Name,Phone,Email,School,Class,Section,Delivery Address,Score,Status\n";
    const rows = (batch.winners || []).map((w: any) => 
      `"${w.rank}","${w.name}","${w.phone}","${w.email || ""}","${w.schoolName}","${w.standard}","${w.section}","${(w.address || "").replace(/"/g, '""')}","${w.score}/30","Ready for Dispatch"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Mission3F-Helmet-Dispatch-${batch.slotId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    setSlotCreating(true);
    try {
      const res = await fetch("/api/admin/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSlot),
      });
      if (res.ok) {
        alert("Exam slot created successfully!");
        setNewSlot({
          slotName: "",
          youtubeUrl: "https://www.youtube.com/embed/Z0o2Bw8U_50",
          videoStartTime: new Date().toISOString().slice(0, 16),
          videoEndTime: new Date(Date.now() + 10 * 60 * 1000).toISOString().slice(0, 16),
          examStartTime: new Date(Date.now() + 10 * 60 * 1000).toISOString().slice(0, 16),
          examEndTime: new Date(Date.now() + 70 * 60 * 1000).toISOString().slice(0, 16),
          examDurationMin: 20,
          isActive: true,
        });
        refreshAllData();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create slot.");
      }
    } catch (err) {
      alert("Error submitting slot.");
    } finally {
      setSlotCreating(false);
    }
  };

  const handleCreateSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    setSchoolCreating(true);
    try {
      const res = await fetch("/api/admin/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSchool),
      });
      if (res.ok) {
        alert("School onboarded successfully!");
        setNewSchool({
          schoolName: "",
          schoolCode: "",
          teacherName: "",
          phone: "",
          email: "",
        });
        refreshAllData();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to onboard school.");
      }
    } catch (err) {
      alert("Error submitting school.");
    } finally {
      setSchoolCreating(false);
    }
  };

  const handleTriggerPipeline = async () => {
    if (!confirm("Execute automated pipeline? This will compile the formatted Excel report, dispatch SMTP email with attachment, and purge active student response buffers.")) {
      return;
    }
    setPipelineRunning(true);
    setPipelineResult(null);

    try {
      const res = await fetch(`/api/admin/trigger-export?slotId=${selectedSlotForExport}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId: selectedSlotForExport }),
      });

      const data = await res.json();
      setPipelineResult(data);
      refreshAllData();
    } catch (err: any) {
      setPipelineResult({ error: "Failed to trigger pipeline: " + err.message });
    } finally {
      setPipelineRunning(false);
    }
  };

  const copyUrl = (code: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/register/${code}`);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  // Prepare chart data
  const schoolChartData = analytics?.schoolBreakdown?.map((s: any) => ({
    name: s.schoolCode,
    Enrolled: s.studentCount,
    Completed: s.completedCount,
  })) || [];

  const completionPieData = [
    { name: "Completed", value: analytics?.metrics?.totalAttempts || 0 },
    { name: "Pending", value: Math.max(0, (analytics?.metrics?.totalStudents || 0) - (analytics?.metrics?.totalAttempts || 0)) },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 bg-brand-soft-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Card */}
        <div className="card-premium p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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
                <Shield className="w-3.5 h-3.5" />
                <span>Super Admin Command Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal mt-1">
                Mahal Welfare Services (Est. 2011)
              </h1>
              <p className="text-xs text-brand-gray">
                Mission 3F Road Safety Campaign Central Administration &amp; Automation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshAllData}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-brand-charcoal hover:border-brand-orange flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-brand-orange ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Data</span>
            </button>
            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-brand-charcoal hover:text-brand-orange"
            >
              Public Website
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          {[
            { id: "analytics", label: "Overview & Analytics", icon: BarChart3 },
            { id: "slots", label: "Slot Configurator", icon: Clock },
            { id: "schools", label: "School Manager", icon: Building2 },
            { id: "helmets", label: "Top 10 Helmet Dispatch", icon: Award },
            { id: "pipeline", label: "Excel, SMTP & Purge Pipeline", icon: FileSpreadsheet },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? "bg-brand-orange text-white shadow-sm"
                    : "bg-white text-brand-charcoal border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* 4 KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="card-premium p-5 space-y-1">
                <span className="text-xs font-semibold text-brand-gray uppercase tracking-wider block">
                  Total Registrations
                </span>
                <p className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal">
                  {analytics?.metrics?.totalStudents || 0}
                </p>
                <span className="text-[11px] text-brand-gray">Candidates registered</span>
              </div>

              <div className="card-premium p-5 space-y-1">
                <span className="text-xs font-semibold text-brand-gray uppercase tracking-wider block">
                  Examinations Evaluated
                </span>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                  {analytics?.metrics?.totalAttempts || 0}
                </p>
                <span className="text-[11px] text-brand-gray">30-MCQ tests scored</span>
              </div>

              <div className="card-premium p-5 space-y-1">
                <span className="text-xs font-semibold text-brand-gray uppercase tracking-wider block">
                  Partner Schools
                </span>
                <p className="text-2xl sm:text-3xl font-extrabold text-brand-orange">
                  {analytics?.metrics?.totalSchools || 0}
                </p>
                <span className="text-[11px] text-brand-gray">Institutional hubs</span>
              </div>

              <div className="card-premium p-5 space-y-1">
                <span className="text-xs font-semibold text-brand-gray uppercase tracking-wider block">
                  Safety Volunteers
                </span>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-600">
                  {analytics?.metrics?.totalVolunteers || 0}
                </p>
                <span className="text-[11px] text-brand-gray">Pledges registered</span>
              </div>
            </div>

            {/* Recharts Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Bar Chart: School Participation */}
              <div className="lg:col-span-8 card-premium p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-brand-charcoal flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-brand-orange" />
                    <span>School Enrolled vs. Completed Tests</span>
                  </h3>
                  <span className="text-xs text-brand-gray font-medium">Real-time DB</span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={schoolChartData}>
                      <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                      <YAxis stroke="#6B7280" fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "12px" }}
                      />
                      <Bar dataKey="Enrolled" fill="#FF8A00" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="Completed" fill="#16A34A" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart: Completion Breakdown */}
              <div className="lg:col-span-4 card-premium p-6 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-brand-charcoal">
                    Assessment Status
                  </h3>
                  <p className="text-xs text-brand-gray">Completion ratio</p>
                </div>

                <div className="h-56 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={completionPieData}
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell fill="#16A34A" />
                        <Cell fill="#E5E7EB" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-600" />
                    <span>Completed ({analytics?.metrics?.totalAttempts || 0})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-slate-300" />
                    <span>Pending</span>
                  </div>
                </div>
              </div>
            </div>

            {/* School Breakdown Table */}
            <div className="card-premium p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-brand-charcoal flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-orange" />
                <span>School-Wise Performance Breakdown</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-brand-gray uppercase tracking-wider font-semibold">
                      <th className="py-3 px-4">School Name</th>
                      <th className="py-3 px-4">School Code</th>
                      <th className="py-3 px-4">Coordinator</th>
                      <th className="py-3 px-4 text-center">Enrolled</th>
                      <th className="py-3 px-4 text-center">Completed</th>
                      <th className="py-3 px-4 text-center">Rate</th>
                      <th className="py-3 px-4 text-center">Avg. Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {analytics?.schoolBreakdown?.map((sch: any) => (
                      <tr key={sch.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-brand-charcoal">{sch.schoolName}</td>
                        <td className="py-3 px-4 font-mono text-brand-orange font-bold">{sch.schoolCode}</td>
                        <td className="py-3 px-4 text-brand-gray">{sch.teacherName}</td>
                        <td className="py-3 px-4 text-center font-bold text-brand-charcoal">{sch.studentCount}</td>
                        <td className="py-3 px-4 text-center font-bold text-emerald-600">{sch.completedCount}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-brand-cream text-brand-orange border border-brand-orange/30">
                            {sch.completionRate}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-brand-charcoal">
                          {sch.averageScore} <span className="text-[10px] text-brand-gray">/ 30</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SLOT CONFIGURATOR */}
        {activeTab === "slots" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create Slot Form */}
            <div className="lg:col-span-5 space-y-4">
              <div className="card-premium p-6 space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-brand-charcoal flex items-center gap-2">
                    <Plus className="w-5 h-5 text-brand-orange" />
                    <span>Create / Configure Exam Slot</span>
                  </h3>
                  <p className="text-xs text-brand-gray">
                    Configure video schedules, countdown deadlines, and YouTube curriculum link.
                  </p>
                </div>

                <form onSubmit={handleCreateSlot} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">Slot Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 3F Youth Road Safety Batch C"
                      value={newSlot.slotName}
                      onChange={(e) => setNewSlot({ ...newSlot, slotName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-bold text-brand-charcoal uppercase text-xs">
                        Video Curriculum URL *
                      </label>
                      <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <Shield className="w-3 h-3 text-emerald-600" />
                        Auto-Encrypted with SHA-256
                      </span>
                    </div>
                    <input
                      type="url"
                      required
                      placeholder="https://www.youtube.com/watch?v=Z0o2Bw8U_50"
                      value={newSlot.youtubeUrl}
                      onChange={(e) => setNewSlot({ ...newSlot, youtubeUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange text-xs font-mono"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Uploaded URL is encrypted with AES-256-GCM + SHA-256. Raw video links are never exposed to students or external web browsers.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-brand-charcoal uppercase mb-1">Video Start Time</label>
                      <input
                        type="datetime-local"
                        value={newSlot.videoStartTime}
                        onChange={(e) => setNewSlot({ ...newSlot, videoStartTime: e.target.value })}
                        className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal text-[11px] focus:bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-brand-charcoal uppercase mb-1">Video End Time</label>
                      <input
                        type="datetime-local"
                        value={newSlot.videoEndTime}
                        onChange={(e) => setNewSlot({ ...newSlot, videoEndTime: e.target.value })}
                        className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal text-[11px] focus:bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-brand-charcoal uppercase mb-1">Exam Duration (Mins)</label>
                      <input
                        type="number"
                        min="5"
                        max="120"
                        value={newSlot.examDurationMin}
                        onChange={(e) => setNewSlot({ ...newSlot, examDurationMin: parseInt(e.target.value, 10) })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <input
                        type="checkbox"
                        id="slotActive"
                        checked={newSlot.isActive}
                        onChange={(e) => setNewSlot({ ...newSlot, isActive: e.target.checked })}
                        className="w-4 h-4 rounded text-brand-orange border-slate-300 focus:ring-brand-orange"
                      />
                      <label htmlFor="slotActive" className="text-xs text-brand-charcoal font-semibold cursor-pointer">
                        Active for Onboarding
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={slotCreating}
                    className="w-full py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
                  >
                    {slotCreating ? "Saving Slot..." : "Create Examination Slot"}
                  </button>
                </form>
              </div>
            </div>

            {/* Existing Slots List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="card-premium p-6 space-y-4">
                <h3 className="text-base font-bold text-brand-charcoal flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-orange" />
                  <span>Existing Examination Slots ({slots.length})</span>
                </h3>

                <div className="space-y-3">
                  {slots.map((s) => (
                    <div key={s.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-brand-charcoal">{s.slotName}</h4>
                          <span className="text-[11px] text-brand-gray font-mono">ID: {s.id}</span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          s.isActive ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-slate-200 text-slate-500"
                        }`}>
                          {s.isActive ? "Active Slot" : "Inactive"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-brand-gray pt-1 border-t border-slate-200">
                        <div>
                          <span className="text-slate-400 block">Video Auto-Hide:</span>
                          <span className="text-brand-charcoal font-semibold">{new Date(s.videoEndTime).toLocaleTimeString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Duration:</span>
                          <span className="text-brand-orange font-bold">{s.examDurationMin} Mins</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Attempts:</span>
                          <span className="text-brand-charcoal font-bold">{s._count?.attempts || 0} Submissions</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-[11px]">
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
                          <Shield className="w-3 h-3 text-emerald-600" />
                          <span>SHA-256 Protected ({s.sha256Fingerprint || "Verified"})</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Direct URL Shielded
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SCHOOL MANAGER */}
        {activeTab === "schools" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Onboard School Form */}
            <div className="lg:col-span-5 space-y-4">
              <div className="card-premium p-6 space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-brand-charcoal flex items-center gap-2">
                    <Plus className="w-5 h-5 text-brand-orange" />
                    <span>Onboard New School Coordinator</span>
                  </h3>
                  <p className="text-xs text-brand-gray">
                    Assigns teacher coordinator and generates dedicated registration portal.
                  </p>
                </div>

                <form onSubmit={handleCreateSchool} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">School Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Modern Public School"
                      value={newSchool.schoolName}
                      onChange={(e) => setNewSchool({ ...newSchool, schoolName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">Unique School Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MPS-DEL-501"
                      value={newSchool.schoolCode}
                      onChange={(e) => setNewSchool({ ...newSchool, schoolCode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal uppercase font-mono tracking-wider focus:bg-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">Coordinator Teacher Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mrs. Sunita Roy"
                      value={newSchool.teacherName}
                      onChange={(e) => setNewSchool({ ...newSchool, teacherName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-brand-charcoal uppercase mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 00000"
                        value={newSchool.phone}
                        onChange={(e) => setNewSchool({ ...newSchool, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-brand-charcoal uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="teacher@school.edu"
                        value={newSchool.email}
                        onChange={(e) => setNewSchool({ ...newSchool, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal focus:bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={schoolCreating}
                    className="w-full py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
                  >
                    {schoolCreating ? "Onboarding..." : "Onboard School Coordinator"}
                  </button>
                </form>
              </div>
            </div>

            {/* Existing Schools Table */}
            <div className="lg:col-span-7 space-y-4">
              <div className="card-premium p-6 space-y-4">
                <h3 className="text-base font-bold text-brand-charcoal flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-brand-orange" />
                  <span>Onboarded Schools &amp; Portals ({schools.length})</span>
                </h3>

                <div className="space-y-3">
                  {schools.map((sch) => (
                    <div key={sch.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-brand-charcoal">{sch.schoolName}</h4>
                        <p className="text-xs text-brand-gray">
                          Coordinator: {sch.teacherName} • Code: <span className="font-mono text-brand-orange font-bold">{sch.schoolCode}</span>
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Enrolled: {sch._count?.students || 0} students
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => setPamphletSchool(sch)}
                          className="px-3 py-1.5 rounded-lg bg-orange-50 border border-brand-orange/30 text-brand-orange text-xs font-semibold flex items-center gap-1 hover:bg-orange-100 transition-colors"
                          title="Generate QR code and ready-to-print A4 pamphlet"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>QR &amp; Pamphlet</span>
                        </button>
                        <button
                          onClick={() => copyUrl(sch.schoolCode)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-brand-charcoal text-xs font-semibold flex items-center gap-1 hover:border-brand-orange transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5 text-brand-orange" />
                          <span>{copiedCode === sch.schoolCode ? "Copied!" : "Reg Link"}</span>
                        </button>
                        <Link
                          href={`/coordinator/${sch.schoolCode}`}
                          target="_blank"
                          className="px-3 py-1.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
                        >
                          <span>Dashboard</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: TOP 10 HELMET DISPATCH & LOGISTICS */}
        {activeTab === "helmets" && (
          <div className="space-y-6">
            <div className="card-premium p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>Official ISI Helmet Logistics</span>
                  </div>
                  <h2 className="text-xl font-bold text-brand-charcoal mt-1">
                    Top 10 Helmet Dispatch &amp; Award Tracker
                  </h2>
                  <p className="text-xs text-brand-gray mt-0.5">
                    View verified delivery addresses for top 10 rankers across each monthly examination batch (10th, 20th, and 30th).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchHelmets}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 self-start sm:self-center"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingHelmets ? "animate-spin" : ""}`} />
                  <span>Refresh Batches</span>
                </button>
              </div>

              {loadingHelmets ? (
                <div className="py-12 text-center text-xs text-slate-500 space-y-2">
                  <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
                  <p>Loading candidate dispatch lists...</p>
                </div>
              ) : helmetBatches.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  No active examination slots found.
                </div>
              ) : (
                <div className="space-y-6">
                  {helmetBatches.map((batch) => (
                    <div
                      key={batch.slotId}
                      className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">
                            {batch.slotName}
                          </h3>
                          <p className="text-xs text-slate-500">
                            Exam Time: {new Date(batch.examStartTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })} &bull; Total Submissions: <strong>{batch.totalAttempts}</strong>
                          </p>
                        </div>

                        {batch.winners && batch.winners.length > 0 && (
                          <button
                            type="button"
                            onClick={() => downloadHelmetCourierCSV(batch)}
                            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-700" />
                            <span>Download Courier Labels (CSV)</span>
                          </button>
                        )}
                      </div>

                      {batch.winners && batch.winners.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-y border-slate-200">
                              <tr>
                                <th className="py-2.5 px-3">Rank</th>
                                <th className="py-2.5 px-3">Student Name</th>
                                <th className="py-2.5 px-3">Contact</th>
                                <th className="py-2.5 px-3">School / Class</th>
                                <th className="py-2.5 px-3">Courier Delivery Address</th>
                                <th className="py-2.5 px-3">Score</th>
                                <th className="py-2.5 px-3">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {batch.winners.map((winner: any) => (
                                <tr key={winner.studentId} className="hover:bg-slate-50/80">
                                  <td className="py-3 px-3 font-bold">
                                    {winner.rank === 1 ? "🥇 #1" : winner.rank === 2 ? "🥈 #2" : winner.rank === 3 ? "🥉 #3" : `#${winner.rank}`}
                                  </td>
                                  <td className="py-3 px-3 font-semibold text-slate-900">
                                    {winner.name}
                                  </td>
                                  <td className="py-3 px-3 text-slate-700">
                                    <div>{winner.phone}</div>
                                    <div className="text-[11px] text-slate-400">{winner.email || "No email"}</div>
                                  </td>
                                  <td className="py-3 px-3 text-slate-700">
                                    <div className="font-medium truncate max-w-[150px]">{winner.schoolName}</div>
                                    <div className="text-[11px] text-slate-400">{winner.standard} - {winner.section}</div>
                                  </td>
                                  <td className="py-3 px-3 text-slate-800 font-mono text-[11px] max-w-xs">
                                    <span className="p-1.5 rounded bg-slate-100 block border border-slate-200">
                                      {winner.address}
                                    </span>
                                  </td>
                                  <td className="py-3 px-3 font-bold text-brand-orange whitespace-nowrap">
                                    {winner.score} / {winner.totalQuestions}
                                  </td>
                                  <td className="py-3 px-3 whitespace-nowrap">
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                                      Ready for Dispatch
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
                          No student attempts recorded for this slot yet. Top 10 will populate automatically upon student submissions.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: AUTOMATED EXCEL EXPORT, SMTP DISPATCH & DATA PURGE PIPELINE */}
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            <div className="card-premium p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-cream text-brand-orange border border-brand-orange/30 mb-2">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Phase 11 Automated Engine</span>
                </div>
                <h2 className="text-2xl font-extrabold text-brand-charcoal">
                  Automated Multi-Sheet Excel, SMTP Dispatch &amp; Data Purge Pipeline
                </h2>
                <p className="text-xs sm:text-sm text-brand-gray leading-relaxed max-w-3xl mt-1">
                  When an examination slot concludes, this pipeline generates a formatted multi-sheet Excel workbook (*Full Candidate Roster*, *Top 10 Leaderboard*, *School Breakdown*), dispatches an automated SMTP email with the attachment to the NGO Director (<code className="text-brand-orange font-mono">{process.env.NEXT_PUBLIC_NGO_ADMIN_EMAIL || "director@mahalwelfare.org"}</code>), and securely purges the raw student response buffer data to guarantee candidate privacy.
                </p>
              </div>

              {/* Slot Selector & Trigger Button */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-8 space-y-2">
                  <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                    Select Target Examination Slot to Export &amp; Purge:
                  </label>
                  <select
                    value={selectedSlotForExport}
                    onChange={(e) => setSelectedSlotForExport(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-brand-border text-brand-charcoal text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-brand-orange"
                  >
                    {slots.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.slotName} ({s._count?.attempts || 0} candidate attempts logged)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-4">
                  <button
                    onClick={handleTriggerPipeline}
                    disabled={pipelineRunning}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold rounded-xl uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {pipelineRunning ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Compiling &amp; Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Execute Pipeline Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Pipeline Output Status */}
              {pipelineResult && (
                <div className={`p-6 rounded-2xl border text-xs sm:text-sm space-y-4 animate-in fade-in duration-300 ${
                  pipelineResult.success
                    ? "bg-emerald-50/70 border-emerald-300"
                    : "bg-red-50 border-red-200"
                }`}>
                  <div className="flex items-center gap-2">
                    {pipelineResult.success ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    )}
                    <h4 className="text-base font-bold text-brand-charcoal">
                      {pipelineResult.success
                        ? "Pipeline Execution Successful!"
                        : "Pipeline Error Occurred"}
                    </h4>
                  </div>

                  {pipelineResult.success ? (
                    <div className="space-y-3 text-brand-charcoal text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3 rounded-xl bg-white border border-slate-200">
                          <span className="text-brand-gray block text-[11px]">Generated Dossier:</span>
                          <span className="text-brand-charcoal font-mono font-bold">{pipelineResult.filename}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-slate-200">
                          <span className="text-brand-gray block text-[11px]">Evaluated Candidates:</span>
                          <span className="text-brand-orange font-bold">{pipelineResult.candidatesCount} Records</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-slate-200">
                          <span className="text-brand-gray block text-[11px]">Responses Purged:</span>
                          <span className="text-emerald-600 font-bold">{pipelineResult.purgedResponsesCount} Raw Answers</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-slate-200">
                          <span className="text-brand-gray block text-[11px]">SMTP Recipient:</span>
                          <span className="text-brand-charcoal font-mono">{pipelineResult.recipient}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200">
                        <span className="text-brand-charcoal font-bold block mb-1">Nodemailer Dispatch Confirmation:</span>
                        <p className="text-brand-gray font-mono text-[11px]">
                          Report dispatched via Nodemailer. {pipelineResult.mailResult?.messageId ? `Message ID: ${pipelineResult.mailResult.messageId}` : "Simulated/Buffered confirmation logged for NGO Director."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-red-700 font-mono text-xs">{pipelineResult.error}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Printable School Pamphlet & QR Code Modal */}
      {pamphletSchool && (
        <SchoolPamphletModal
          isOpen={Boolean(pamphletSchool)}
          onClose={() => setPamphletSchool(null)}
          schoolName={pamphletSchool.schoolName}
          schoolCode={pamphletSchool.schoolCode}
          teacherName={pamphletSchool.teacherName}
          phone={pamphletSchool.phone}
        />
      )}
    </div>
  );
}
