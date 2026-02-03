"use client";

import { MapPin, Phone, Instagram, Facebook, Monitor } from "lucide-react";

import MagneticButton from "@/components/MagneticButton";

export default function Location() {
  return (
    <section className="relative w-full h-auto min-h-[80vh] flex items-center justify-center overflow-hidden bg-navy py-12 md:py-0">
        {/* Background Map/Facility */}
        <div className="absolute inset-0 z-0">
             {/* Facility Image Background */}
             <div className="w-full h-full bg-[url('/our-facility.jpg')] bg-cover bg-center opacity-30" />
             <div className="absolute inset-0 bg-navy/80 mix-blend-multiply" /> 
        </div>

        <div className="relative z-10 w-full max-w-7xl px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            
            {/* Left Column: Contact Info & Booking */}
            <div className="flex flex-col gap-6 justify-center">
                {/* Find Us Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <h3 className="text-3xl font-serif text-pearl mb-6">Visit Our Studio</h3>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 text-pearl/80">
                             <div className="p-3 bg-mint/10 rounded-full text-mint"><MapPin size={24} /></div>
                             <div>
                                 <p className="font-sans font-medium text-lg text-white">Chahana Dental Studio</p>
                                 <p className="font-sans font-light text-pearl/70 leading-relaxed">
                                    205, 2nd floor, Shreekar avenue,<br/>
                                    Nr. Gopal Chowk Cross Road, Maninagar,<br/>
                                    Ahmedabad - 380008
                                 </p>
                             </div>
                        </div>
                        <div className="flex items-start gap-4 text-pearl/80">
                             <div className="p-3 bg-mint/10 rounded-full text-mint"><Phone size={24} /></div>
                             <div>
                                 <p className="font-sans font-medium text-lg text-white">+91 6353 070 793</p>
                                 <p className="font-sans font-light text-sm text-pearl/60">Mon - Sat: 10:00 AM - 8:00 PM</p>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Socials & Book wrapper */}
                <div className="grid sm:grid-cols-2 gap-4">
                     <div className="bg-navy/40 backdrop-blur-lg border border-white/5 p-6 rounded-3xl flex flex-col justify-center items-center gap-4">
                         <span className="text-pearl/60 text-sm uppercase tracking-widest text-center">Follow Us</span>
                         <div className="flex gap-4">
                            <a href="https://www.instagram.com/chahanadentalstudio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-mint hover:text-navy transition-all duration-300">
                                <Instagram size={18} />
                            </a>
                            <a href="https://www.facebook.com/chahanadentalstudio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-mint hover:text-navy transition-all duration-300">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-mint hover:text-navy transition-all duration-300">
                                <Monitor size={18} />
                            </a>
                         </div>
                     </div>

                     <MagneticButton className="w-full h-full min-h-[140px]">
                        <div className="w-full h-full bg-mint text-navy p-6 rounded-3xl hover:shadow-[0_0_40px_rgba(0,255,171,0.4)] transition-shadow duration-300 cursor-pointer flex flex-col justify-center relative overflow-hidden group">
                             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            <h3 className="text-xl font-serif font-bold relative z-10">Book Visit</h3>
                            <div className="flex items-center gap-2 font-mono uppercase text-xs tracking-widest border-b border-navy/20 pb-1 w-max mt-2 relative z-10">
                                Reserve Now <span>→</span>
                            </div>
                        </div>
                    </MagneticButton>
                </div>
            </div>

            {/* Right Column: Google Maps */}
            <div className="relative h-[400px] lg:h-auto min-h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm">
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
                
                {/* Overlay Detail */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-navy px-4 py-2 rounded-full text-xs font-bold shadow-lg pointer-events-none">
                    Navigate via Google Maps
                </div>
            </div>

        </div>
    </section>
  );
}
