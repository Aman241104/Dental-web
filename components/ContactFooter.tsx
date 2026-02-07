"use client";

import { Instagram, Monitor, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";
import { useState } from "react";

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: ""
  });



  const getWhatsAppLink = () => {
     const name = formData.name || "Guest";
     const email = formData.email ? `(${formData.email})` : "";
     const inquiry = formData.inquiry || "I would like to book an appointment.";
     const baseMessage = `Hello, I'm ${name} ${email}. ${inquiry}`;
     return `https://wa.me/916353070793?text=${encodeURIComponent(baseMessage)}`;
  };

  return (
    <footer id="contact" className="w-full bg-slate-50 text-navy">
      {/* 
        Grid Layout matches reference:
        Left: Map (Organic Shape)
        Right: Content (Headline + Form)
      */}
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT COLUMN: Map Area with Leaf Shape */}
        <div className="relative w-full h-[500px] lg:h-auto min-h-[600px] bg-slate-200 overflow-hidden lg:rounded-tr-[120px] lg:rounded-br-[0px]">
             <iframe 
                src="https://maps.google.com/maps?q=Chahana+Dental+Studio+Ahmedabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "grayscale(20%) contrast(1.2) opacity(0.9)" }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Chahana Dental Studio Location"
                className="w-full h-full"
            />
             
             {/* Map Overlay Pattern (Optional: removed for clear view, or keep transparent) */}
             {/* <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] bg-size-[20px_20px] opacity-20 pointer-events-none" /> */}
             
             {/* Custom Marker (Removed as the map has its own pin) */}
        </div>

        {/* RIGHT COLUMN: Contact Form & Info */}
        <div className="flex flex-col justify-between px-6 py-16 md:px-16 lg:py-24 bg-slate-50">
            
            {/* Header */}
            <div className="mb-12">
                <h2 className="text-4xl md:text-6xl font-sans font-bold uppercase tracking-tight text-navy mb-8">
                    Contact Us
                </h2>
                
                {/* Contact Form */}
                <form className="space-y-6 max-w-xl" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-navy/60 pl-1">Name</label>
                        <input 
                            type="text" 
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-transparent border-b border-navy/20 focus:border-blue-600 outline-none py-3 px-1 text-lg placeholder:text-navy/20 transition-colors"
                            placeholder="Your Name"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-navy/60 pl-1">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-transparent border-b border-navy/20 focus:border-blue-600 outline-none py-3 px-1 text-lg placeholder:text-navy/20 transition-colors"
                            placeholder="Your Email"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="inquiry" className="text-sm font-medium text-navy/60 pl-1">Inquiry</label>
                        <textarea 
                            id="inquiry"
                            rows={1}
                            value={formData.inquiry}
                            onChange={(e) => setFormData({...formData, inquiry: e.target.value})}
                            className="w-full bg-transparent border-b border-navy/20 focus:border-blue-600 outline-none py-3 px-1 text-lg placeholder:text-navy/20 transition-colors resize-none"
                            placeholder="How can we help?"
                        />
                    </div>

                    <div className="pt-8">
                         <MagneticButton>
                            <a 
                                href={getWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-blue-600 text-white rounded-full py-4 px-8 text-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
                            >
                                <ArrowUpRight size={20} />
                                Book Appointment
                            </a>
                         </MagneticButton>
                    </div>
                </form>
            </div>

            {/* Bottom Footer Section */}
            <div className="mt-auto pt-20 border-t border-navy/5 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                
                {/* Contact Details */}
                <div className="space-y-4 text-sm font-sans text-navy/80">
                    <div>
                        <h4 className="font-bold text-navy uppercase tracking-wider text-xs mb-1">Visit Us</h4>
                        <p>205, 2nd floor, Shreekar avenue,<br/>Nr. Gopal Chowk Cross Road, Maninagar,<br/>Ahmedabad - 380008</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-navy uppercase tracking-wider text-xs mb-1">Contact</h4>
                        <p>+91 6353 070 793</p>
                        <p className="lowercase">chahanadentalstudio@gmail.com</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex gap-8 text-sm font-medium text-navy uppercase tracking-wide">
                    <Link href="#hero-section" className="hover:text-blue-600 transition-colors">Home</Link>
                    <Link href="#about" className="hover:text-blue-600 transition-colors">About</Link>
                    <Link href="#services" className="hover:text-blue-600 transition-colors">Services</Link>
                    <Link href="#contact" className="hover:text-blue-600 transition-colors">Contact</Link>
                </div>

                {/* Socials */}
                <div className="flex gap-4">
                    <a href="https://www.instagram.com/chahanadentalstudio?igsh=MXVlaWp1dzVxNGZ2bg==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-navy/5 hover:bg-blue-600 hover:text-white transition-all text-navy">
                        <Instagram size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-navy/5 hover:bg-blue-600 hover:text-white transition-all text-navy">
                        <Monitor size={18} />
                    </a>
                </div>

            </div>
        </div>

      </div>
      
      {/* Copyright Bar */}
      <div className="w-full py-4 px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left text-navy/30 text-xs font-mono uppercase tracking-widest bg-slate-100/50 gap-2">
        <span>© 2026 Chahana Dental Studio. All Rights Reserved.</span>
        <a 
            href="https://wa.me/918104933816"
            target="_blank"
            rel="noopener noreferrer" 
            className="hover:text-blue-600 transition-colors"
        >
            Developed by Gravity Media Marketing
        </a>
      </div>
    </footer>
  );
}
