"use client";

import { useSearchParams } from 'next/navigation';
import { login } from './actions';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-6">
            Admin Portal
          </div>
          <h1 className="text-4xl font-light tracking-tight mb-2">David's Betta</h1>
          <p className="text-muted/60 font-light">Enter your credentials to manage collection</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50"></div>
          
          <form action={login} className="space-y-6 relative z-10">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-3 animate-shake">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-accent/80 font-bold ml-1">Email Address</label>
              <input
                name="email"
                type="email"
                required
                placeholder="admin@davidbetta.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all text-sm placeholder:text-white/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-accent/80 font-bold ml-1">Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all text-sm placeholder:text-white/20"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-xl uppercase tracking-[0.3em] text-xs font-black transition-all shadow-2xl shadow-accent/20 mt-4 active:scale-[0.98]"
            >
              Authorize
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-muted/40 text-[10px] uppercase tracking-widest font-light">
          &copy; {new Date().getFullYear()} David's Betta Care Paete
        </p>
      </div>
    </main>
  );
}
