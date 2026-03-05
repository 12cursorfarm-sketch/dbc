import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      
      const tl = gsap.timeline();
      tl.fromTo(contentRef.current.children, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5 }
      );

      if (ScrollTrigger) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }
  }, []);

  return (
    <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* YouTube Background Video */}
      <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none scale-[1.2]">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-[177.78vh] h-[56.25vw] object-cover scale-150 opacity-40"
          src="https://www.youtube.com/embed/34MDwL-WkXg?autoplay=1&mute=1&loop=1&playlist=34MDwL-WkXg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
          title="YouTube Video Background"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60"></div>
      </div>

      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-4xl">
        <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-6 block bg-accent/10 py-2 px-4 rounded-full w-fit mx-auto">
          PAETE'S FINEST BETTA FISH
        </span>
        <h1 className="text-5xl md:text-8xl leading-tight mb-8">
          Excellence in <br />
          <span className="italic text-accent">Every Scale</span>
        </h1>
        <p className="text-muted text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
          From the heart of the Philippines to the rest of the world. 
          Discover our curated collection of competition-grade Betta fish.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <a href="#collection" className="btn-primary text-lg px-12 py-5 shadow-lg shadow-accent/20">Explore Collection</a>
          <a 
            href="https://shopee.ph/davidstalisayonline" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-12 py-5 border-2 border-white/10 rounded-[2rem] uppercase tracking-widest text-sm hover:border-accent hover:text-accent transition-all duration-300 font-semibold"
          >
            Shop Now
          </a>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/10 inline-flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-sm text-muted tracking-wider">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopee_logo.svg" alt="Shopee" className="w-6 h-6 object-contain" />
          <div className="flex items-center gap-1">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-bold text-white ml-1">4.8/5</span>
          </div>
          <span className="hidden sm:inline text-white/20 px-1">•</span>
          <span><span className="font-bold text-white">14.7K</span> RATINGS</span>
          <span className="hidden sm:inline text-white/20 px-1">•</span>
          <span><span className="font-bold text-white">4.7K</span> FOLLOWERS</span>
        </div>
      </div>
      
      {/* Down arrow indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-[1px] h-12 bg-white"></div>
      </div>
    </section>
  );
}
