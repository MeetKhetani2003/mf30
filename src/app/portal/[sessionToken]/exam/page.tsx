"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Clock,
  User,
  Phone,
  Bike,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Send,
  HelpCircle,
  Bookmark,
  RotateCcw,
  AlertOctagon,
  Maximize2,
  Minimize2,
  Lock,
  Eye,
  ShieldAlert,
} from "lucide-react";
import { formatSecondsToMMSS } from "@/lib/utils";

interface Question {
  id: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  category?: string;
}

interface StudentData {
  id: string;
  name: string;
  phone: string;
  address: string;
  ridingExperience: string;
  standard: string;
  section: string;
  school: {
    schoolName: string;
    schoolCode: string;
  };
  slot: {
    id: string;
    slotName: string;
    examDurationMin: number;
  };
  attempt?: any;
}

export default function ExamEnginePage() {
  const params = useParams();
  const router = useRouter();
  const sessionToken = params.sessionToken as string;

  const [student, setStudent] = useState<StudentData | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Exam state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const submittedRef = useRef(false);

  // Anti-Cheating & Proctoring States
  const [violations, setViolations] = useState<number>(0);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const violationsRef = useRef<number>(0);
  const answersRef = useRef<Record<string, string>>({});

  // Keep answersRef synced for non-stale callbacks
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    async function initExam() {
      try {
        const res = await fetch(`/api/exam/status/${sessionToken}?withQuestions=true`);
        if (res.ok) {
          const data = await res.json();
          if (data.attempt) {
            router.push(`/portal/${sessionToken}/leaderboard`);
            return;
          }
          setStudent(data);
          setQuestions(data.questions || []);

          const durationSec = (data.slot?.examDurationMin || 20) * 60;
          setTimeLeft(durationSec);
          startTimeRef.current = Date.now();
        } else {
          setError("Session token invalid or exam already concluded.");
        }
      } catch (err) {
        setError("Network error while connecting to exam engine.");
      } finally {
        setLoading(false);
      }
    }
    if (sessionToken) {
      initExam();
    }
  }, [sessionToken, router]);

  const handleSelectOption = (questionId: string, option: string) => {
    if (isSubmitting || isTimeUp) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleClearResponse = (questionId: string) => {
    if (isSubmitting || isTimeUp) return;
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const handleToggleMarkReview = (questionId: string) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  /**
   * Main submission handler
   * Supports normal submission, timer auto-submit, and forced security-violation submission
   */
  const submitExam = async (
    forcedByTimer = false,
    forcedByViolation = false,
    violationReason = ""
  ) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setIsSubmitting(true);
    if (forcedByTimer) setIsTimeUp(true);

    const timeTakenSec = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000));
    const currentAnswers = answersRef.current;

    try {
      const res = await fetch("/api/exam/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionToken,
          answers: currentAnswers,
          timeTakenSec,
          forcedByTimer,
          forcedByViolation,
          violationReason,
        }),
      });

      const data = await res.json();
      const redirectQuery = forcedByViolation
        ? "?forced=violation"
        : forcedByTimer
        ? "?forced=timer"
        : "";

      router.push(`/portal/${sessionToken}/leaderboard${redirectQuery}`);
    } catch (err) {
      const redirectQuery = forcedByViolation ? "?forced=violation" : "";
      router.push(`/portal/${sessionToken}/leaderboard${redirectQuery}`);
    }
  };

  /**
   * Proctoring Violation Handler:
   * Strike 1: Displays mandatory Emergency Warning Modal
   * Strike 2+: IMMEDIATELY FORCED AUTO-SUBMITS THE EXAM
   */
  const triggerViolation = (type: string, description: string) => {
    if (submittedRef.current || isSubmitting || isTimeUp) return;

    const count = violationsRef.current + 1;
    violationsRef.current = count;
    setViolations(count);

    if (count === 1) {
      // Strike 1: Urgent warning
      setWarningMessage(description);
      setShowWarningModal(true);
    } else if (count >= 2) {
      // Strike 2: Immediate forced auto-submit!
      setShowWarningModal(false);
      submitExam(
        false,
        true,
        `Proctoring Security Violation: Repeated tab switching / window focus loss (${type})`
      );
    }
  };

  // 1. Anti-Tab Switching & Window Focus Detection
  useEffect(() => {
    if (loading || isSubmitting || isTimeUp || !student) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        triggerViolation(
          "TAB_SWITCH",
          "You switched away from the examination tab. Opening new tabs, switching tabs, or minimizing the browser is strictly forbidden."
        );
      }
    };

    const handleWindowBlur = () => {
      // Lost browser window focus (alt-tabbing or clicking outside)
      triggerViolation(
        "WINDOW_BLUR",
        "Examination window lost focus. Multi-window navigation or external applications are prohibited."
      );
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [loading, isSubmitting, isTimeUp, student]);

  // 2. Prevent Leaving Page (`beforeunload` & Back Button `popstate`)
  useEffect(() => {
    if (loading || isSubmitting || isTimeUp) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Leaving this page will immediately submit your examination and finalize your score.";
      return e.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Prevent history back button
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      triggerViolation("BACK_NAVIGATION", "Browser back-navigation is strictly blocked during the examination.");
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [loading, isSubmitting, isTimeUp]);

  // 3. Block Shortcuts, Inspect & Context Menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) ||
        (e.ctrlKey && (e.key === "u" || e.key === "U" || e.key === "s" || e.key === "S" || e.key === "p" || e.key === "P"))
      ) {
        e.preventDefault();
        triggerViolation("INSPECT_SHORTCUT", "Developer tools and inspection shortcuts are blocked.");
        return false;
      }

      // Block Ctrl+N, Ctrl+T (new tab attempt)
      if (e.ctrlKey && (e.key === "t" || e.key === "T" || e.key === "n" || e.key === "N")) {
        e.preventDefault();
        triggerViolation("NEW_TAB_SHORTCUT", "Opening new browser tabs is prohibited during the exam.");
        return false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleClipboard = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("copy", handleClipboard);
    window.addEventListener("cut", handleClipboard);
    window.addEventListener("paste", handleClipboard);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("copy", handleClipboard);
      window.removeEventListener("cut", handleClipboard);
      window.removeEventListener("paste", handleClipboard);
    };
  }, []);

  // 4. Timer Countdown with Forced Auto-Submit at 00:00
  useEffect(() => {
    if (loading || isSubmitting || isTimeUp || !student) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          submitExam(true, false, "Time expired (00:00)");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, isSubmitting, isTimeUp, student]);

  // Fullscreen toggle helper
  const toggleFullscreen = () => {
    if (typeof document !== "undefined") {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
          setIsFullscreen(false);
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-soft-white text-brand-charcoal">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-wider text-brand-gray font-semibold">
            Configuring 30-MCQ Digital Exam Interface...
          </p>
        </div>
      </div>
    );
  }

  if (error || !student || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-soft-white p-4 text-center">
        <div className="card-premium p-8 max-w-md w-full space-y-4">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
          <h2 className="text-lg font-bold text-brand-charcoal">Exam Access Notice</h2>
          <p className="text-xs text-brand-gray">{error || "No active questions found."}</p>
          <Link href={`/portal/${sessionToken}`} className="inline-block px-4 py-2 bg-brand-orange text-white rounded-xl text-xs font-semibold">
            Return to Candidate Hub
          </Link>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const markedCount = Object.keys(markedForReview).filter((k) => markedForReview[k]).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);
  const isTimeCritical = timeLeft < 180;

  return (
    <div className="min-h-screen pb-16 bg-brand-soft-white select-none">
      {/* 1. STICKY TOP BAR: Student Credentials + Prominent Timer */}
      <div className="sticky top-0 z-40 w-full bg-white border-b border-brand-border shadow-sm">
        {/* Anti-Cheating & Proctoring Status Sub-Bar */}
        <div className={`px-4 py-1.5 text-xs border-b flex flex-wrap items-center justify-between gap-2 transition-colors ${
          violations === 0
            ? "bg-slate-900 text-slate-200 border-slate-800"
            : "bg-red-600 text-white border-red-700 animate-pulse font-bold"
        }`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${violations === 0 ? "bg-emerald-400 animate-pulse" : "bg-white"}`} />
            <span className="font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Proctoring Guard Active</span>
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-[11px] font-mono">
              {violations === 0 ? (
                <span className="text-emerald-300">Tab Switch Detection: Strike 0/2 (Strike 2 = Forced Auto-Submit)</span>
              ) : (
                <span className="text-yellow-200 uppercase tracking-wider font-extrabold">
                  ⚠️ STRIKE 1 WARNING: 1/2 Tab Switches! (Next Switch = Forced Auto-Submit)
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-1 hover:text-brand-orange transition-colors underline decoration-dotted"
            >
              {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}</span>
            </button>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">No Tab Switching Allowed</span>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            {/* Student Credentials */}
            <div className="flex flex-wrap items-center gap-2 text-xs w-full lg:w-auto">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 font-bold text-brand-charcoal border border-slate-200">
                <User className="w-3.5 h-3.5 text-brand-orange" />
                <span>{student.name}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-brand-gray border border-slate-200">
                <Phone className="w-3.5 h-3.5" />
                <span>{student.phone}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-cream text-brand-orange border border-brand-orange/20 font-medium">
                <Bike className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate max-w-xs">{student.ridingExperience}</span>
              </div>
            </div>

            {/* Countdown Clock & Actions */}
            <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-brand-gray uppercase tracking-wider hidden sm:inline">
                  Time Remaining:
                </span>
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl font-mono text-base font-extrabold tracking-widest border ${
                  isTimeCritical
                    ? "bg-red-50 border-red-300 text-red-600 animate-pulse"
                    : "bg-brand-cream border-brand-orange/40 text-brand-orange"
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{formatSecondsToMMSS(timeLeft)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (confirm(`Submit examination now? You answered ${answeredCount} of ${questions.length} questions.`)) {
                    submitExam(false);
                  }
                }}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Exam</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-1">
          <div
            className="bg-brand-orange h-1 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Question Screen */}
          <div className="lg:col-span-8 space-y-6">
            <div className="card-premium p-6 sm:p-8 space-y-6">
              {/* Question Header & Category */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-brand-cream text-brand-orange font-mono font-bold text-sm border border-brand-orange/30">
                    Q {currentIndex + 1} of {questions.length}
                  </span>
                  {currentQ.category && (
                    <span className="text-xs text-brand-gray font-medium hidden sm:inline">
                      • {currentQ.category}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleMarkReview(currentQ.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 border transition-colors ${
                      markedForReview[currentQ.id]
                        ? "bg-amber-100 border-amber-300 text-amber-800"
                        : "bg-slate-50 border-slate-200 text-brand-gray hover:bg-slate-100"
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{markedForReview[currentQ.id] ? "Marked" : "Mark Review"}</span>
                  </button>

                  {answers[currentQ.id] && (
                    <button
                      onClick={() => handleClearResponse(currentQ.id)}
                      className="px-2.5 py-1 rounded-lg text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 flex items-center gap-1 transition-colors"
                      title="Clear selected option"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span className="hidden sm:inline">Clear</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <h2 className="text-base sm:text-lg font-bold text-brand-charcoal leading-relaxed">
                {currentQ.questionText}
              </h2>

              {/* 4 Answer Options */}
              <div className="space-y-3 pt-2">
                {[
                  { key: "A", text: currentQ.optionA },
                  { key: "B", text: currentQ.optionB },
                  { key: "C", text: currentQ.optionC },
                  { key: "D", text: currentQ.optionD },
                ].map((opt) => {
                  const isSelected = answers[currentQ.id] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(currentQ.id, opt.key)}
                      disabled={isSubmitting || isTimeUp}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium flex items-center gap-3.5 transition-all ${
                        isSelected
                          ? "bg-brand-cream border-brand-orange text-brand-charcoal shadow-sm"
                          : "bg-white border-slate-200 text-brand-charcoal hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                        isSelected
                          ? "bg-brand-orange text-white"
                          : "bg-slate-100 text-brand-gray border border-slate-300"
                      }`}>
                        {opt.key}
                      </div>
                      <span className="leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0 || isSubmitting}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-brand-charcoal hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-xs font-semibold text-white shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (confirm(`Submit examination? You answered ${answeredCount} of ${questions.length} questions.`)) {
                        submitExam(false);
                      }
                    }}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <span>Finish &amp; Submit</span>
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Question Navigation Grid */}
          <div className="lg:col-span-4 space-y-4">
            <div className="card-premium p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-orange" />
                  <span>Question Navigator (30)</span>
                </h3>
                <span className="text-xs font-mono font-bold text-brand-charcoal">
                  {answeredCount}/{questions.length} Done
                </span>
              </div>

              {/* 30 Question Buttons */}
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = !!answers[q.id];
                  const isMarked = !!markedForReview[q.id];

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      disabled={isSubmitting}
                      className={`h-9 rounded-lg text-xs font-bold font-mono transition-all ${
                        isCurrent
                          ? "ring-2 ring-brand-orange bg-brand-orange text-white shadow-sm scale-105"
                          : isMarked
                          ? "bg-amber-100 border border-amber-400 text-amber-800"
                          : isAnswered
                          ? "bg-emerald-100 border border-emerald-400 text-emerald-800"
                          : "bg-slate-100 border border-slate-200 text-brand-gray hover:bg-slate-200"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-1 text-[10px] text-brand-gray">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-amber-400" />
                  <span>Marked</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-slate-200" />
                  <span>Unanswered</span>
                </div>
              </div>
            </div>

            {/* Exam Rules Pill */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-brand-gray space-y-1">
              <strong className="text-brand-charcoal block">Assessment Regulations:</strong>
              <p>• 1 Mark per question, zero negative marking.</p>
              <p>• Tie-breaker for Top 10 rankers is determined by shortest completion time.</p>
              <p>• The exam automatically submits when the countdown clock strikes 00:00.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 1. PROCTORING EMERGENCY WARNING MODAL (STRIKE 1 OF 2) */}
      {showWarningModal && !isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-5 border-4 border-red-500 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto border-2 border-red-200 animate-bounce">
              <AlertOctagon className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
                Security Alert: Strike 1 of 2
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Tab Switching Detected!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {warningMessage || "You navigated away from the examination tab or minimized the window. Opening new tabs, consulting outside resources, or switching windows is strictly forbidden."}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold text-left space-y-1">
              <strong className="block text-red-700 uppercase tracking-wider">Crucial Warning:</strong>
              <p>
                You have received <strong>1 violation strike</strong>. If you switch tabs, minimize, or navigate away <strong>ONE MORE TIME</strong>, the system will <strong>IMMEDIATELY &amp; PERMANENTLY AUTO-SUBMIT</strong> your examination.
              </p>
            </div>

            <button
              onClick={() => {
                setShowWarningModal(false);
                toggleFullscreen();
              }}
              className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all"
            >
              I Understand &amp; Acknowledge — Return to Exam
            </button>
          </div>
        </div>
      )}

      {/* 2. AUTO-SUBMIT FREEZE MODAL */}
      {(isTimeUp || isSubmitting) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="w-14 h-14 rounded-full bg-brand-cream border border-brand-orange/30 flex items-center justify-center mx-auto text-brand-orange animate-spin">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {isTimeUp ? "Time Concluded (00:00)" : "Submitting Responses..."}
            </h3>
            <p className="text-xs text-slate-500">
              {violationsRef.current >= 2
                ? "Auto-submitting due to security proctoring violation..."
                : "Calculating score and recording verified attempt on server..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
