"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function LegacyVideo() {
  const reelUrl = "https://www.facebook.com/reel/1951008582139635";
  const thumbnail = "https://scontent.fmnl30-3.fna.fbcdn.net/v/t15.5256-10/566555308_1460570831895371_8384926446429642079_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5fad0e&_nc_eui2=AeEN4Bs8U7BalC0e8C1eBZy0Ndl0RntTUF012XRGe1NQXWjOLnJKnNNlrif2dV2jA9E7PJABpw1fBrqXcFJVgXby&_nc_ohc=uhGanAjSB0gQ7kNvwHx7nZZ&_nc_oc=AdmSEOmXn9LySDtyl9l64G5mQsPHpFTYo7mXwLPcLEtNk3jbrzrmHWYLCsqPyJmo7MU&_nc_zt=23&_nc_ht=scontent.fmnl30-3.fna&_nc_gid=eZp3ZgOt7QkoPoRIXLUijg&_nc_ss=8&oh=00_AfxcOvMvq_O_T12QoGgRhvM0PqStYY6plJkt2-k-oc20tg&oe=69AE1D75";
  
  const videoRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap && window.ScrollTrigger) {
      window.gsap.fromTo(videoRef.current, 
        { scale: 0.8, opacity: 0, rotationY: 15 },
        { 
          scale: 1, opacity: 1, rotationY: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  return (
    <div ref={videoRef} className="relative group max-w-[500px] mx-auto perspective-1000">
      {/* Decorative Glow */}
      <div className="absolute -inset-1 bg-accent/30 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-lg"></div>
      
      <a 
        href={reelUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="relative block h-[570px] w-full overflow-hidden border border-white/10 rounded-xl bg-secondary shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
      >
        {/* Thumbnail Image */}
        <img
          src={thumbnail}
          alt="David's Betta Care Legacy Video"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors duration-500">
          <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent/10">
            <svg 
              viewBox="0 0 24 24" 
              className="w-10 h-10 text-white fill-current translate-x-1 transition-colors duration-500 group-hover:text-accent"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Watch on Facebook Tag */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="text-[10px] text-white uppercase tracking-[0.2em] whitespace-nowrap">Watch on Facebook</span>
        </div>
      </a>
      
      <p className="mt-6 text-center text-[10px] text-muted font-light tracking-[0.4em] uppercase opacity-40 group-hover:opacity-100 transition-opacity duration-500">
      
      </p>
    </div>
  );
}
