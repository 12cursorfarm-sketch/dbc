"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AgentGrid from "../components/AgentGrid";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import LegacyVideo from "../components/LegacyVideo";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      <Hero />
      
      <section className="py-32 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <span className="text-accent font-semibold tracking-widest uppercase text-xs mb-6 block">Our Heritage</span>
            <h2 className="text-4xl md:text-6xl mb-8 leading-tight">Our Legacy</h2>
            <p className="text-muted max-w-xl text-lg md:text-xl font-light leading-relaxed mb-8">
              Dedicated to providing the finest Betta fish from the heart of Paete, Laguna. 
              David's Betta Care combines passion with expertise to bring you vibrant, healthy, 
              and rare specimens directly to your doorstep.
            </p>
            <div className="h-[1px] w-24 bg-accent/40 mb-8"></div>
            <p className="text-sm text-muted uppercase tracking-[0.2em]">Established Excellence</p>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <LegacyVideo />
          </div>
        </div>
      </section>

      <ProductGrid />
      
      <section className="bg-secondary py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl mb-4">Our Professional Agents</h2>
            <p className="text-muted">Directly contact our authorized agents on Facebook.</p>
          </div>
          <AgentGrid />
        </div>
      </section>

      <section id="guarantee" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-5xl mb-8 leading-tight">Notice: <span className="text-accent">[TAKE YOUR OWN RISK]</span></h2>
            
            <div className="space-y-6 text-muted text-lg leading-relaxed mb-8 font-light">
              <p>Greetings,</p>
              <p>
                For customers please be informed that we can only assure a refund of <span className="text-white font-medium">20-30%</span> in the event that shipping proves unsuccessful or if the Betta fish is delivered deceased within your area, Specially customers residing around <span className="text-white font-medium">VISAYAS AND MINDANAO</span>.
              </p>
              <p>
                This is due to the inherent risk posed by heat conditions prevalent in our country and your region. We appreciate your understanding and cooperation.
              </p>
              <p>
                Moreover, If you prefer replacement of the Betta fish instead of a refund, we are more than willing to accommodate your request.
              </p>
              <div>
                <p className="text-white font-medium">Best regards,</p>
                <p className="text-accent tracking-widest uppercase text-sm mt-1">DAVID'S BETTA CARE</p>
              </div>
            </div>
            
          </div>
          
          <div className="animate-fade-in relative group" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-4 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative aspect-square overflow-hidden border border-white/10 bg-white/5 rounded-2xl">
              <img 
                src="./tyor.jpg" 
                alt="David's Betta Care Premium Specimen" 
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 right-6">
               
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
