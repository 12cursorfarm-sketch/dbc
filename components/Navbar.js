"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-serif tracking-tighter text-white">
          DAVID'S <span className="text-accent italic">BETTA CARE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center text-sm uppercase tracking-widest text-muted">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="#collection" className="hover:text-white transition-colors">Collection</Link>
          <Link href="#agents" className="hover:text-white transition-colors">Agents</Link>
          <a 
            href="https://shopee.ph/davidstalisayonline" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary text-xs ml-4 inline-block"
          >
            Shop Shopee
          </a>
          <Link 
            href={user ? "/admin" : "/login"} 
            className="text-xs border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 transition-colors uppercase tracking-widest"
          >
            {user ? "Admin" : "Login"}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "CLOSE" : "MENU"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 px-6 py-8 flex flex-col gap-6 text-center text-lg uppercase tracking-widest">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="#collection" onClick={() => setIsOpen(false)}>Collection</Link>
          <Link href="#agents" onClick={() => setIsOpen(false)}>Agents</Link>
           <a 
            href="https://shopee.ph/davidstalisayonline" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-block text-center"
            onClick={() => setIsOpen(false)}
          >
            Shop Shopee
          </a>
          <Link 
            href={user ? "/admin" : "/login"} 
            className="text-muted hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {user ? "Admin Dashboard" : "Login"}
          </Link>
        </div>
      )}
    </nav>
  );
}
