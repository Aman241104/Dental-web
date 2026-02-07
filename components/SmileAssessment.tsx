"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Check, ArrowRight, Activity, Smile, Search, Calendar, AlertCircle } from "lucide-react";
import MagneticButton from "./MagneticButton";
import clsx from "clsx";

type Step = "entry" | "discomfort" | "concern" | "timeline" | "success";

export default function SmileAssessment() {
  const [step, setStep] = useState<Step>("entry");
  const [answers, setAnswers] = useState({
    discomfort: "", // "Yes" | "No"
    concern: "",
    timeline: "",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animation for step transitions
  useGSAP(() => {
    if (!contentRef.current) return;
    
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );
  }, { scope: containerRef, dependencies: [step] });

  const handleStart = () => setStep("discomfort");

  const handleDiscomfortSelect = (val: string) => {
    setAnswers((prev) => ({ ...prev, discomfort: val }));
    setTimeout(() => setStep("concern"), 300);
  };

  const handleConcernSelect = (concern: string) => {
    setAnswers((prev) => ({ ...prev, concern }));
    setTimeout(() => setStep("timeline"), 300);
  };

  const handleTimelineSelect = (timeline: string) => {
    setAnswers((prev) => ({ ...prev, timeline }));
  };

  const handleSubmit = () => {
    // Simulate submission
    setTimeout(() => setStep("success"), 500);
  };

  const progressMap = {
    entry: 0,
    discomfort: 25,
    concern: 50,
    timeline: 75,
    success: 100,
  };

  return (
    <section id="assessment" className="relative w-full py-0 flex items-center justify-center bg-slate-50 overflow-hidden min-h-[80vh]">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-blue-50 transition-colors duration-500 blur-3xl opacity-50" />
      
      <div ref={containerRef} className="relative z-10 w-full max-w-2xl px-6">
        
        {/* Progress Bar */}
        {step !== "entry" && step !== "success" && (
            <div className="w-full h-1 bg-blue-100 rounded-full mb-8 overflow-hidden">
                <div 
                    className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-700 ease-out"
                    style={{ width: `${progressMap[step]}%` }}
                />
            </div>
        )}

        {/* Glass Panel */}
        <div className="bg-white border border-blue-100 shadow-xl shadow-blue-900/5 rounded-[2.5rem] p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
            <div ref={contentRef}>
                
                {/* STATE: ENTRY */}
                {step === "entry" && (
                    <div className="text-center space-y-8">
                        <div className="inline-flex p-4 bg-blue-50 rounded-full mb-4 shadow-sm">
                            <Smile size={48} className="text-blue-600" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-sans font-bold text-navy">
                            Help Us <span className="text-blue-600">Personalize</span> Your Care
                        </h2>
                        <p className="text-lg text-navy/60 max-w-md mx-auto">
                            Answer a few quick questions to help us prioritize your care appropriately.
                        </p>
                        
                        <button 
                            onClick={handleStart}
                            className="group relative inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-full overflow-hidden transition-all hover:shadow-lg hover:shadow-blue-600/20"
                        >
                            <span className="relative z-10 font-medium tracking-wide flex items-center gap-2">
                                Start Assessment <ArrowRight size={18} />
                            </span>
                            <div className="absolute inset-0 bg-navy translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                        </button>
                    </div>
                )}

                {/* STATE: DISCOMFORT */}
                {step === "discomfort" && (
                    <div className="space-y-8">
                         <div className="text-center">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-wider mb-4">QUESTION 1/3</span>
                            <h3 className="text-3xl font-sans font-bold text-navy mb-3">Are you currently experiencing any dental discomfort?</h3>
                            <p className="text-navy/60 text-sm">Your response helps us prioritise care appropriately.</p>
                         </div>
                        <div className="grid grid-cols-2 gap-4">
                            {["Yes", "No"].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleDiscomfortSelect(option)}
                                    className={clsx(
                                        "p-6 rounded-2xl border transition-all duration-300 text-center hover:scale-[1.02]",
                                        answers.discomfort === option 
                                            ? "bg-blue-600 text-white border-blue-600 ring-4 ring-blue-100" 
                                            : "bg-slate-50 border-slate-100 hover:border-blue-200 text-navy"
                                    )}
                                >
                                    <span className="font-semibold text-xl block mb-2">{option}</span>
                                    {option === "Yes" ? <AlertCircle className={clsx("mx-auto", answers.discomfort === option ? "text-white" : "text-red-400")} /> : <Smile className={clsx("mx-auto", answers.discomfort === option ? "text-white" : "text-green-400")} />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STATE: CONCERN */}
                {step === "concern" && (
                    <div className="space-y-8">
                        <div className="text-center">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-wider mb-4">QUESTION 2/3</span>
                            <h3 className="text-3xl font-sans font-bold text-navy">What is your primary concern at this time?</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { label: "Oral discomfort or sensitivity", icon: AlertCircle },
                                { label: "Smile enhancement", icon: Smile },
                                { label: "Replacement of a missing tooth", icon: Activity },
                                { label: "Preventive consultation", icon: Search }
                            ].map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => handleConcernSelect(item.label)}
                                    className={clsx(
                                        "p-4 rounded-xl border transition-all duration-300 text-left hover:scale-[1.02] flex items-center gap-4",
                                        answers.concern === item.label 
                                            ? "bg-blue-600 text-white border-blue-600 ring-2 ring-blue-100" 
                                            : "bg-slate-50 border-slate-100 hover:border-blue-200 text-navy"
                                    )}
                                >
                                    <div className={clsx("p-2 rounded-full", answers.concern === item.label ? "bg-white/20" : "bg-blue-50")}>
                                        <item.icon size={20} className={clsx(answers.concern === item.label ? "text-white" : "text-blue-600")} />
                                    </div>
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STATE: TIMELINE */}
                {step === "timeline" && (
                    <div className="space-y-8">
                        <div className="text-center">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-wider mb-4">QUESTION 3/3</span>
                            <h3 className="text-3xl font-sans font-bold text-navy">When would you like to plan your visit?</h3>
                        </div>
                        <div className="space-y-3">
                             {[
                                "At the earliest convenience",
                                "Within the next week",
                                "Within the next month"
                             ].map((time) => (
                                <button
                                    key={time}
                                    onClick={() => handleTimelineSelect(time)}
                                    className={clsx(
                                        "w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-300",
                                        answers.timeline === time 
                                            ? "bg-blue-600 text-white border-blue-600" 
                                            : "bg-slate-50 border-slate-100 hover:bg-blue-50 hover:border-blue-200 text-navy"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <Calendar size={18} className={clsx(answers.timeline === time ? "text-white/80" : "text-navy/40")} />
                                        <span className="font-medium text-lg">{time}</span>
                                    </div>
                                    {answers.timeline === time && <Check size={20} className="text-white" />}
                                </button>
                             ))}
                        </div>

                        {answers.timeline && (
                            <div className="flex justify-center pt-4">
                                <MagneticButton>
                                    <button 
                                        onClick={handleSubmit}
                                        className="px-10 py-4 bg-navy text-white font-bold rounded-full shadow-lg shadow-navy/30 hover:bg-blue-900 transition-colors"
                                    >
                                        Reveal My Plan
                                    </button>
                                </MagneticButton>
                            </div>
                        )}
                    </div>
                )}

                {/* STATE: SUCCESS */}
                {step === "success" && (
                    <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                            <Check size={40} className="text-blue-600" strokeWidth={3} />
                        </div>
                        <h3 className="text-4xl font-sans font-bold text-navy">Thank you for sharing!</h3>
                        <p className="text-lg text-navy/70 max-w-sm mx-auto">
                            We have noted your preferences and are ready to assist you.
                        </p>
                        <div className="pt-6">
                            <a 
                                href={`https://wa.me/916353070793?text=${encodeURIComponent(
                                    `Hello, I completed the Care Assessment.\n\n` +
                                    `Discomfort: ${answers.discomfort}\n` +
                                    `Concern: ${answers.concern}\n` +
                                    `Timeline: ${answers.timeline}\n\n` +
                                    `I would like to schedule an appointment.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-semibold underline decoration-blue-200 decoration-2 underline-offset-4 hover:text-blue-800"
                            >
                                Continue to Booking on WhatsApp
                            </a>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </div>
    </section>
  );
}
