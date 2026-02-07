"use client";

import { useState } from "react";
import { X, Calendar, Clock, ArrowRight } from "lucide-react";
import { useBooking } from "@/lib/BookingContext";
import MagneticButton from "./MagneticButton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo("#booking-modal-overlay", 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo("#booking-modal-content", 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)", delay: 0.1 }
      );
    }
  }, { dependencies: [isOpen] });

  if (!isOpen) return null;

  const handleWhatsAppRedirect = () => {
    if (!date || !time || !name.trim()) {
      alert("Please provide your name, preferred date, and time.");
      return;
    }

    // Format date from yyyy-mm-dd to dd-mm-yyyy
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}-${month}-${year}`;

    const message = `Hello, I would like to schedule a visit. My name is ${name}. I am interested in an appointment on ${formattedDate} at ${time}.`;
    const url = `https://wa.me/916353070793?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    closeBooking();
  };

  return (
    <div 
        id="booking-modal-overlay" 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/80 backdrop-blur-sm p-6"
    >
      <div 
        id="booking-modal-content"
        className="relative w-full max-w-md bg-slate-50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-white/20"
      >
        <button 
            onClick={closeBooking}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-navy/5 text-navy hover:bg-navy hover:text-white transition-colors"
        >
            <X size={20} />
        </button>

        <div className="text-center mb-8">
            <h3 className="text-2xl font-serif text-navy mb-2">Schedule Your Visit</h3>
            <p className="text-navy/60 text-sm">Choose a preferred slot and we will confirm shortly.</p>
        </div>

        <div className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy/40 pl-2">Your Name</label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-blue-100 rounded-2xl px-6 py-4 text-navy focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all font-sans"
                    placeholder="John Doe"
                />
            </div>

            {/* Date Input */}
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy/40 pl-2">Preferred Date</label>
                <div className="relative">
                    <input 
                        type="text"
                        onFocus={(e) => {
                            e.target.type = "date";
                            e.target.value = date; // Restore valid date format for picker
                            e.target.showPicker?.();
                        }}
                        onBlur={(e) => {
                             e.target.type = "text";
                             // Format display if date exists
                             if (date) {
                                const [y, m, d] = date.split("-");
                                e.target.value = `${d}-${m}-${y}`;
                             } else {
                                e.target.value = "";
                             }
                        }}
                        onChange={(e) => {
                             setDate(e.target.value);
                        }}
                        placeholder="dd-mm-yyyy"
                        className="w-full bg-white border border-blue-100 rounded-2xl px-6 py-4 text-navy focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all font-sans appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden"
                    />
                    <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" size={20} />
                </div>
            </div>

            {/* Time Select */}
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy/40 pl-2">Preferred Time</label>
                <div className="relative">
                    <select 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-white border border-blue-100 rounded-2xl px-6 py-4 text-navy focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all font-sans appearance-none cursor-pointer"
                    >
                        <option value="">Select a time...</option>
                        <option value="Morning (10AM - 1PM)">Morning (10AM - 1PM)</option>
                        <option value="Afternoon (2PM - 5PM)">Afternoon (2PM - 5PM)</option>
                        <option value="Evening (6PM - 8PM)">Evening (6PM - 8PM)</option>
                    </select>
                    <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" size={20} />
                </div>
            </div>

            <div className="pt-4">
                <MagneticButton className="w-full">
                    <button 
                        onClick={handleWhatsAppRedirect}
                        className="w-full bg-blue-600 text-white font-medium text-lg py-5 rounded-full flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                    >
                        Book on WhatsApp <ArrowRight size={20} />
                    </button>
                </MagneticButton>
            </div>
        </div>
      </div>
    </div>
  );
}
