"use client";

const agents = [
  { name: "DBC Faith", url: "https://www.facebook.com/photo/?fbid=122096433309217116&set=a.122096345151217116", img: "/1.jpg" },
  { name: "Dbc Joseph", url: "https://www.facebook.com/josh.cadapan", img: "/2.jpg" },
  { name: "Dbc Tuni", url: "https://www.facebook.com/profile.php?id=100038673711616", img: "/3.jpg" },
  { name: "Dbc Ryann", url: "https://www.facebook.com/profile.php?id=61586562297621", img: "/4.jpg" },
  { name: "Dbc Kath", url: "https://www.facebook.com/profile.php?id=61580860149925", img: "/5.jpg" },
  { name: "Dbc Toneth", url: "https://www.facebook.com/tonyangss", img: "/6.jpg" },
  { name: "Dbc Mark", url: "https://www.facebook.com/profile.php?id=61568498116866", img: "/7.jpg" },
  { name: "Dbc Janine", url: "https://www.facebook.com/search/people/?q=dbc", img: "/8.jpg" },
];

import { useEffect, useRef } from "react";

export default function AgentGrid() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap && window.ScrollTrigger && gridRef.current) {
      window.gsap.fromTo(gridRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, []);
  return (
    <div id="agents" ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
      {agents.map((agent, index) => (
        <a 
          key={index} 
          href={agent.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative block aspect-[4/5] overflow-hidden bg-secondary rounded-[2rem] border border-white/5 opacity-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20"
        >
          <img 
            src={agent.img} 
            alt={agent.name}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
            <p className="text-white text-base md:text-lg font-serif uppercase tracking-wider mb-1">{agent.name}</p>
            <p className="text-accent text-[10px] uppercase tracking-[0.2em] font-bold group-hover:opacity-100 opacity-70 transition-opacity flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
              Contact on Facebook
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
