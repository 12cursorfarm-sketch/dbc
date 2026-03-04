export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Background Image Placeholder / Light Effect */}
      <div className="absolute inset-0 z-0 opacity-60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-radial from-accent/20 to-transparent blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl animate-fade-in">
        <span className="text-accent font-semibold tracking-[0.3em] uppercase text-sm mb-4 block">
          PAETE'S FINEST BETTA FISH
        </span>
        <h1 className="text-5xl md:text-8xl leading-tight mb-8">
          Excellence in <br />
          <span className="italic">Every Scale</span>
        </h1>
        <p className="text-muted text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
          From the heart of the Philippines to the rest of the world. 
          Discover our curated collection of competition-grade Betta fish.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="btn-primary text-base px-10 py-4">Explore Collection</button>
          <a 
            href="https://shopee.ph/davidstalisayonline" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-10 py-4 border border-white/20 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all inline-block"
          >
            Shop Now
          </a>
        </div>
      </div>
      
      {/* Down arrow indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-[1px] h-12 bg-white"></div>
      </div>
    </section>
  );
}
