"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Check, ArrowRight, Smile, Zap, Activity } from "lucide-react";
import MagneticButton from "./MagneticButton";
import clsx from "clsx";

type Step = "entry" | "goal" | "anxiety" | "timeline" | "success";

export default function SmileAssessment() {
  const [step, setStep] = useState<Step>("entry");
  const [answers, setAnswers] = useState({
    goal: "",
    anxiety: 50,
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

  // Background glow animation based on anxiety
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (step === "anxiety" && glowRef.current) {
        // Map 0-100 to color interpolation logic
        const progress = answers.anxiety / 100;
        const color = gsap.utils.interpolate("#BFDBFE", "#FED7AA", progress); // blue-200 to orange-200
        
        gsap.to(glowRef.current, {
            backgroundColor: color,
            opacity: 0.2 + (progress * 0.1),
            duration: 0.5
        });
    }
  }, [step, answers.anxiety]);


  const handleStart = () => setStep("goal");

  const handleGoalSelect = (goal: string) => {
    setAnswers((prev) => ({ ...prev, goal }));
    setTimeout(() => setStep("anxiety"), 300); // Small delay for feedback
  };

  const handleAnxietyChange = (val: number) => {
    setAnswers((prev) => ({ ...prev, anxiety: val }));
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
    goal: 25,
    anxiety: 50,
    timeline: 75,
    success: 100,
  };

  return (
    <section id="assessment" className="relative w-full py-0 flex items-center justify-center bg-slate-50 overflow-hidden min-h-[80vh]">
      {/* Background Ambience */}
      <div ref={glowRef} className="absolute inset-0 bg-blue-50 transition-colors duration-500 blur-3xl opacity-50" />
      
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
                            What does your <span className="text-blue-600">dream smile</span> look like?
                        </h2>
                        <p className="text-lg text-navy/60 max-w-md mx-auto">
                            Take a quick assessment to discover your personalized treatment path.
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

                {/* STATE: GOAL */}
                {step === "goal" && (
                    <div className="space-y-8">
                        <h3 className="text-3xl font-sans font-bold text-navy text-center">My primary goal is...</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {["Whiter Teeth", "Straighter Smile", "Fix Gaps"].map((goal) => (
                                <button
                                    key={goal}
                                    onClick={() => handleGoalSelect(goal)}
                                    className={clsx(
                                        "p-6 rounded-2xl border transition-all duration-300 text-left hover:scale-[1.02]",
                                        answers.goal === goal 
                                            ? "bg-blue-600 text-white border-blue-600 ring-4 ring-blue-100" 
                                            : "bg-slate-50 border-slate-100 hover:border-blue-200 text-navy"
                                    )}
                                >
                                    <div className="mb-4">
                                        {goal === "Whiter Teeth" && <Zap size={32} className={answers.goal === goal ? "text-white" : "text-blue-300"} />}
                                        {goal === "Straighter Smile" && <Smile size={32} className={answers.goal === goal ? "text-white" : "text-blue-300"} />}
                                        {goal === "Fix Gaps" && <Activity size={32} className={answers.goal === goal ? "text-white" : "text-blue-300"} />}
                                    </div>
                                    <span className="font-semibold text-lg block">{goal}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STATE: ANXIETY */}
                {step === "anxiety" && (
                    <div className="space-y-10 text-center">
                        <h3 className="text-3xl font-sans font-bold text-navy">Dental Anxiety Level</h3>
                        
                        <div className="px-4">
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={answers.anxiety}
                                onChange={(e) => handleAnxietyChange(Number(e.target.value))}
                                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between mt-4 font-medium text-navy/60 text-sm">
                                <span>Zen Master (Relaxed)</span>
                                <span>Very Nervous</span>
                            </div>
                            <div className="mt-8">
                                <span className="inline-block px-4 py-2 rounded-lg bg-blue-50 text-blue-800 font-semibold border border-blue-100">
                                    {answers.anxiety < 30 ? "I'm totally fine." : answers.anxiety < 70 ? "A little jittery." : "I need sedation."}
                                </span>
                            </div>
                        </div>

                        <button 
                            onClick={() => setStep("timeline")}
                            className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                        >
                            Continue
                        </button>
                    </div>
                )}

                {/* STATE: TIMELINE */}
                {step === "timeline" && (
                    <div className="space-y-8">
                        <h3 className="text-3xl font-sans font-bold text-navy text-center">When do you want to start?</h3>
                        <div className="space-y-3">
                             {["Immediately", "Within 3 months", "Just Researching"].map((time) => (
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
                                    <span className="font-medium text-lg">{time}</span>
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
                        <h3 className="text-4xl font-sans font-bold text-navy">Perfect match found.</h3>
                        <p className="text-lg text-navy/70 max-w-sm mx-auto">
                            Based on your goals, we have a curated treatment plan ready for you.
                        </p>
                        <div className="pt-6">
                            <a 
                                href={`https://wa.me/919876543210?text=${encodeURIComponent(
                                    `Hello, I completed the Smile Assessment.\n\n` +
                                    `Goal: ${answers.goal || "Not specified"}\n` +
                                    `Anxiety: ${answers.anxiety}/100\n` +
                                    `Timeline: ${answers.timeline || "Not specified"}\n\n` +
                                    `I would like to discuss my options.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-semibold underline decoration-blue-200 decoration-2 underline-offset-4 hover:text-blue-800"
                            >
                                View Consultation Options
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
