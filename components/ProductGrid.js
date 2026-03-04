"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

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
    <section id="collection" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16 animate-fade-in">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {products.slice(0, 4).map((product, index) => (
            <div 
              key={product.id} 
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square bg-white/5 overflow-hidden border border-white/5 relative mb-4">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/600x600/1a1a1a/ffffff?text=Premium+Betta';
                  }}
                />
                <div className="absolute top-4 right-4 bg-accent text-[10px] px-2 py-1 text-white uppercase font-bold tracking-tighter shadow-lg">
                  Sale
                </div>
              </div>
              <h3 className="text-sm md:text-base font-serif mb-1 tracking-wider">{product.name}</h3>
              <p className="text-accent font-bold text-sm">{product.price}</p>
              {product.shopee_link && (
                <a 
                  href={product.shopee_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 text-[10px] text-muted hover:text-white uppercase tracking-widest inline-block border-b border-white/10"
                >
                  View on Shopee
                </a>
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
