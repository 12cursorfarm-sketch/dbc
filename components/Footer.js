export default function Footer() {
  return (
    <footer className="bg-black py-20 px-6 border-t border-white/20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 md:gap-8">
        <div className="animate-fade-in">
          <h3 className="text-3xl font-serif mb-6 text-white uppercase tracking-tighter">David's <span className="text-accent">Betta Care</span></h3>
          <p className="text-muted text-sm leading-relaxed max-w-xs mb-8 font-light">
            The Philippines' premier source for high-quality, competition-grade Betta fish. 
            Directly from Paete's finest breeders.
          </p>
          <div className="flex gap-6">
            <a href="https://www.facebook.com/Davidsbettacare" className="group w-12 h-12 rounded-2xl border-2 border-white/10 flex items-center justify-center hover:border-[#1877f2] hover:bg-[#1877f2]/10 transition-all duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" className="w-6 h-6 object-contain transition-all duration-300" />
            </a>
            <a href="https://shopee.ph/davidstalisayonline" className="group w-12 h-12 rounded-2xl border-2 border-white/10 flex items-center justify-center hover:border-[#ee4d2d] hover:bg-[#ee4d2d]/10 transition-all duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopee_logo.svg" alt="Shopee" className="w-6 h-6 object-contain transition-all duration-300" />
            </a>
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-accent mb-8 bg-accent/5 py-1 px-3 rounded-full w-fit">Location</h4>
          <p className="text-muted text-sm leading-relaxed font-light">
            Paete Town Bridge, <br />
            9F7H+HMF, Paete, Laguna <br />
            Philippines
          </p>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-accent mb-8 bg-accent/5 py-1 px-3 rounded-full w-fit">Contact</h4>
          <p className="text-white text-sm mb-4 font-serif">Messenger: David's Betta Care</p>
          <p className="text-muted text-sm mb-4 font-light">Available via Shopee for secure checkout.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-[10px] text-center text-muted uppercase tracking-[0.5em]">
        © 2026 David's Betta Care Paete. All Rights Reserved.
      </div>
    </footer>
  );
}
