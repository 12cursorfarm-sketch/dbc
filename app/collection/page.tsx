"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CollectionPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('fish')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching fish:', error.message);
        } else if (data) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-in">
          <span className="text-accent font-semibold tracking-widest uppercase text-xs mb-6 block">Our Entire Vault</span>
          <h1 className="text-4xl md:text-7xl mb-8 leading-tight font-light">The Full Collection</h1>
          <p className="text-muted max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Explore our complete gallery of premium Betta fish specimens. 
            Each one is hand-selected for its unique beauty and vitality.
          </p>
          <div className="h-[1px] w-24 bg-accent/40 mx-auto mt-12"></div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted animate-pulse">
            Unveiling Collection...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted italic">
            Our vault is currently empty. Please check back later for new arrivals.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="aspect-[3/4] bg-white/5 overflow-hidden border border-white/5 relative mb-6">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x800/1a1a1a/ffffff?text=Premium+Betta';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {product.is_featured && (
                    <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-md text-[9px] px-3 py-1 text-white uppercase font-black tracking-widest shadow-2xl">
                      Featured
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-light mb-1 tracking-tight">{product.name}</h3>
                <p className="text-accent font-bold text-sm tracking-tighter mb-4">{product.price}</p>
                {product.shopee_link && (
                  <a 
                    href={product.shopee_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] text-muted hover:text-white uppercase tracking-[0.2em] inline-block border-b border-white/10 transition-colors"
                  >
                    View on Shopee
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
