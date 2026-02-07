"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import clsx from "clsx";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useGSAP(
    () => {
      // Video/Image Enter Animation
      gsap.from(videoContainerRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
        }
      });

      // Text Stagger
      gsap.from(textRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
        }
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMuted(!entry.isIntersecting);
      },
      {
        threshold: 0.6, 
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
        observer.disconnect();
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration) {
          setProgress((current / duration) * 100);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
       const progressBar = e.currentTarget;
       const clickPosition = e.nativeEvent.offsetX;
       const barWidth = progressBar.offsetWidth;
       const seekTime = (clickPosition / barWidth) * videoRef.current.duration;
       videoRef.current.currentTime = seekTime;
    }
  };

  const handleVideoEnd = () => {
      setIsPlaying(false);
      setProgress(0);
      if (videoRef.current) { 
        videoRef.current.currentTime = 0;
      }
  };

  const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
      }
      if (isPlaying) {
          controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2000);
      }
  };

  const handleMouseLeave = () => {
      if (isPlaying) {
          setShowControls(false);
      }
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full min-h-screen flex items-center bg-slate-50 text-navy overflow-hidden py-0"
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Video Player Container */}
        <div ref={videoContainerRef} className="relative h-[600px] w-full flex items-center justify-center">
            <div 
                className="relative w-full h-full rounded-[2.5rem] border border-blue-100 overflow-hidden shadow-2xl shadow-blue-900/10 group bg-black"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={togglePlay}
            >
                <video
                    ref={videoRef}
                    src="/intro.mp4"
                    className="w-full h-full object-cover"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleVideoEnd}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                />
                
                {/* Big Play Button Overlay */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-all duration-300 z-10">
                        <div className="w-20 h-20 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 transform transition-transform hover:scale-110 cursor-pointer">
                            <Play size={32} className="ml-1" fill="currentColor" />
                        </div>
                    </div>
                )}

                {/* Custom Controls Bar */}
                <div 
                    className={clsx(
                        "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pb-6 pt-12 transition-opacity duration-300 z-20",
                        showControls || !isPlaying ? "opacity-100" : "opacity-0"
                    )}
                    onClick={(e) => e.stopPropagation()} // Prevent acting as play/pause toggle for background
                >
                    <div className="flex flex-col gap-3">
                        {/* Progress Bar */}
                        <div 
                            className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer hover:h-2 transition-all group/progress"
                            onClick={handleSeek}
                        >
                            <div 
                                className="h-full bg-blue-500 rounded-full relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full scale-0 group-hover/progress:scale-100 transition-transform shadow" />
                            </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-4">
                                <button onClick={togglePlay} className="hover:text-blue-400 transition-colors p-1">
                                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                                </button>
                                
                                <div className="flex items-center gap-2 group/volume">
                                     <button onClick={toggleMute} className="hover:text-blue-400 transition-colors p-1">
                                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                     </button>
                                </div>
                            </div>
                            
                            <div className="text-xs font-medium opacity-80">
                                Dental Excellence
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Content */}
        <div ref={textRef} className="relative z-10 space-y-8">
            <h5 className="text-blue-600 uppercase tracking-widest font-sans font-bold text-sm">The Specialist</h5>
            <h2 className="text-5xl md:text-7xl font-sans font-bold leading-tight text-navy">
                Dr. Chahana Shah <br/>
                <span className="text-blue-600 font-medium text-3xl block mt-2">Dentist</span>
            </h2>
            <p className="text-xl font-sans text-navy/70 leading-relaxed max-w-lg">
                Dr. Chahana provides comprehensive dental care with a focus on aesthetics and function. She treats every patient with personalization, ensuring a comfortable experience and long-lasting healthy smiles.
            </p>
            
            <div className="flex gap-4 pt-4">
                <a 
                    href={`https://wa.me/916353070793?text=${encodeURIComponent("Hello, I would like to schedule a visit to Chahana Dental Studio.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg shadow-blue-600/20 inline-block"
                >
                    Schedule Your Visit Now
                </a>
            </div>
        </div>

      </div>
    </section>
  );
}
