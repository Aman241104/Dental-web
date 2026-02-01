"use client";

import { MapPin, Phone, Instagram, Facebook, Monitor } from "lucide-react";

import MagneticButton from "@/components/MagneticButton";

export default function Location() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-navy">
        {/* Background Map Placeholder */}
        <div className="absolute inset-0 z-0">
             {/* Replace with actual Styled Google Map or Mapbox */}
             <div className="w-full h-full bg-[url('/map-dark-placeholder.jpg')] bg-cover bg-center opacity-40 grayscale contrast-125" />
             {/* Fallback pattern for now */}
             <div className="w-full h-full absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-size-[16px_16px] opacity-20" />
             <div className="absolute inset-0 bg-navy/60" /> {/* Overlay to darken */}
        </div>

        <div className="relative z-10 w-full max-w-7xl px-6 grid md:grid-cols-2 gap-8 items-center">
            
            {/* Glass Card - Location */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl hover:bg-white/10 transition-colors duration-300">
                <h3 className="text-3xl font-serif text-pearl mb-6">Find Us</h3>
                <div className="space-y-6">
                    <div className="flex items-start gap-4 text-pearl/80">
                         <div className="p-2 bg-mint/10 rounded-full text-mint"><MapPin size={24} /></div>
                         <div>
                             <p className="font-sans">Celestia Dental Studio</p>
                             <p className="font-sans font-light">Satellite Road, Near Iscon Cross Roads,</p>
                             <p className="font-sans font-light">Ahmedabad, Gujarat 380015</p>
                         </div>
                    </div>
                    <div className="flex items-start gap-4 text-pearl/80">
                         <div className="p-2 bg-mint/10 rounded-full text-mint"><Phone size={24} /></div>
                         <div>
                             <p className="font-sans">+91 98765 43210</p>
                             <p className="font-sans font-light text-sm">Mon - Sat: 10:00 AM - 8:00 PM</p>
                         </div>
                    </div>
                </div>
            </div>

            {/* Glass Card - Socials & Action */}
            <div className="space-y-6">
                 <div className="bg-navy/40 backdrop-blur-lg border border-white/5 p-8 rounded-3xl">
                     <h3 className="text-2xl font-serif text-mint mb-4">Connect</h3>
                     <div className="flex gap-4">
                        <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-mint hover:text-navy transition-all duration-300">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-mint hover:text-navy transition-all duration-300">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-mint hover:text-navy transition-all duration-300">
                            <Monitor size={20} />
                        </a>
                     </div>
                 </div>

                 <MagneticButton className="w-full">
                    <div className="bg-mint text-navy p-8 rounded-3xl hover:shadow-[0_0_40px_rgba(0,255,171,0.4)] transition-shadow duration-300 cursor-pointer">
                        <h3 className="text-3xl font-serif mb-2">Book Appointment</h3>
                        <p className="opacity-80 mb-4">Experience the boutique difference.</p>
                        <div className="flex items-center gap-2 font-mono uppercase text-sm tracking-widest border-b border-navy/20 pb-1 w-max">
                            Reserve Now
                            <span>→</span>
                        </div>
                    </div>
                 </MagneticButton>
            </div>

        </div>
    </section>
  );
}
