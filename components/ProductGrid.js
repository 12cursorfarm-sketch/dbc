"use client";

import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!loading && typeof window !== "undefined" && window.gsap && window.ScrollTrigger) {
      if (headerRef.current) {
        window.gsap.fromTo(headerRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%" } }
        );
      }
      if (gridRef.current && gridRef.current.children.length > 0) {
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
    }
  }, [loading, products]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('fish')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching fish:', error.message, error);
          // Fallback if table doesn't exist or error occurs
          setProducts([
            { id: 1, name: "Super Red Halfmoon", price: "₱1,200", image_url: "/b1.webp" },
            { id: 2, name: "Avatar Crowntail", price: "₱1,500", image_url: "/b2.webp" },
            { id: 3, name: "Blue Rim Plakat", price: "₱2,000", image_url: "/b3.webp" },
            { id: 4, name: "Koi Galaxy Nemo", price: "₱1,800", image_url: "/b4.webp" },
          ]);
        } else if (data && data.length > 0) {
          setProducts(data);
        } else {
          // If table is empty
          setProducts([]);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section id="collection" className="py-20 px-6 max-w-7xl mx-auto text-center">
        <div className="animate-pulse text-muted">Loading Collection...</div>
      </section>
    );
  }

  return (
    <section id="collection" className="py-20 px-6 max-w-7xl mx-auto overflow-hidden">
      <div ref={headerRef} className="flex justify-between items-end mb-16 opacity-0">
        <div>
          <h2 className="text-3xl md:text-5xl mb-4">Featured Collection</h2>
          <p className="text-muted">Hand-picked competition grade specimens.</p>
        </div>
        <a 
          href="/collection"
          className="hidden md:block text-accent uppercase tracking-widest text-sm font-semibold border-b border-accent pb-1"
        >
          View All Collection
        </a>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-muted italic">
          No featured specimens currently available. Check back soon.
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {products.slice(0, 4).map((product, index) => (
            <div 
              key={product.id} 
              className="group flex flex-col items-center text-center opacity-0"
            >
              <div className="w-full aspect-square bg-white/5 overflow-hidden rounded-[2.5rem] border-2 border-white/5 relative mb-6 transition-all duration-500 group-hover:border-accent/30 group-hover:shadow-[0_20px_50px_rgba(251,129,34,0.15)]">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/600x600/1a1a1a/ffffff?text=Premium+Betta';
                  }}
                />
                <div className="absolute top-4 right-4 bg-accent text-[10px] px-3 py-1.5 text-white uppercase font-black tracking-widest rounded-full shadow-lg animate-bounce">
                  Sale
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-serif mb-2 tracking-wider group-hover:text-accent transition-colors">{product.name}</h3>
              <p className="text-accent font-black text-lg mb-3">
                <span className="text-muted text-xs font-normal line-through mr-2 opacity-50">₱2,500</span>
                {product.price}
              </p>
              {product.shopee_link ? (
                <a 
                  href={product.shopee_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary text-[10px] px-6 py-2 tracking-[0.2em]"
                >
                  Buy Now
                </a>
              ) : (
                <div className="text-[10px] text-muted uppercase tracking-[0.2em] opacity-40">Coming Soon</div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <a 
        href="/collection"
        className="md:hidden block text-center w-full mt-10 border border-white/20 py-4 uppercase tracking-[0.2em] text-xs"
      >
        View All Collection
      </a>
    </section>
  );
}
