"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { signout } from '@/app/login/actions';

interface Fish {
  id: string;
  name: string;
  price: string;
  shopee_link: string | null;
  image_url: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [fishList, setFishList] = useState<Fish[]>([]);
  const [editingFish, setEditingFish] = useState<Fish | null>(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    shopee_link: '',
  });
  const [image, setImage] = useState<File | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchFish();
  }, []);

  const fetchFish = async () => {
    const { data, error } = await supabase
      .from('fish')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setFishList(data);
    if (error) console.error('Error fetching fish:', error);
  };

  const handleReset = () => {
    setFormData({ name: '', price: '', shopee_link: '' });
    setImage(null);
    setEditingFish(null);
    setView('list');
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this specimen?')) return;
    
    const { error } = await supabase.from('fish').delete().eq('id', id);
    if (error) {
      setMessage({ type: 'error', text: 'Failed to delete: ' + error.message });
    } else {
      setFishList(fishList.filter(f => f.id !== id));
      setMessage({ type: 'success', text: 'Specimen removed from collection.' });
    }
  };

  const handleEdit = (fish: Fish) => {
    setEditingFish(fish);
    setFormData({
      name: fish.name,
      price: fish.price,
      shopee_link: fish.shopee_link || '',
    });
    setView('edit');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let imageUrl = editingFish?.image_url || '';

      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('fish-images')
          .upload(filePath, image);

        if (uploadError) throw new Error('Upload error: ' + uploadError.message);

        const { data: { publicUrl } } = supabase.storage
          .from('fish-images')
          .getPublicUrl(filePath);
        
        imageUrl = publicUrl;
      }

      const fishData = {
        name: formData.name,
        price: formData.price,
        shopee_link: formData.shopee_link,
        image_url: imageUrl,
      };

      if (view === 'edit' && editingFish) {
        const { error } = await supabase
          .from('fish')
          .update(fishData)
          .eq('id', editingFish.id);
        if (error) throw error;
        setMessage({ type: 'success', text: 'Updated successfully!' });
      } else {
        const { error } = await supabase.from('fish').insert([fishData]);
        if (error) throw error;
        setMessage({ type: 'success', text: 'Added to collection!' });
      }

      fetchFish();
      setTimeout(() => handleReset(), 1500);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl flex flex-col fixed inset-y-0 z-50">
        <div className="p-8">
          <h2 className="text-xl font-light tracking-tighter text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            David's Betta
          </h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted/40 mt-1">Management Console</p>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          <button 
            onClick={() => setView('list')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${view === 'list' ? 'bg-accent/10 text-accent border border-accent/20' : 'text-muted hover:bg-white/5 hover:text-white'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            Collection List
          </button>
          <button 
            onClick={() => { handleReset(); setView('add'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${view === 'add' ? 'bg-accent/10 text-accent border border-accent/20' : 'text-muted hover:bg-white/5 hover:text-white'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add New Specimen
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => signout()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 animate-fade-in">
            <div>
              <h1 className="text-4xl font-light tracking-tight mb-2">
                {view === 'list' ? 'Fish Collection' : view === 'add' ? 'Add Specimen' : 'Edit Specimen'}
              </h1>
              <p className="text-muted/60 font-light">
                {view === 'list' ? `Showing ${fishList.length} unique specimens in your vault.` : 'Provide the details for the premium collection.'}
              </p>
            </div>
            {view === 'list' && (
              <button 
                onClick={() => setView('add')}
                className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-accent/20"
              >
                Add Specimen
              </button>
            )}
          </header>

          {/* List View */}
          {view === 'list' && (
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-accent/80">Specimen</th>
                      <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-accent/80">Pricing</th>
                      <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-accent/80">Market Link</th>
                      <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-accent/80 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {fishList.map((fish, i) => (
                      <tr key={fish.id} className="group hover:bg-white/[0.02] transition-colors" style={{ animationDelay: `${i * 0.05}s` }}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                              {fish.image_url ? (
                                <img src={fish.image_url} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] text-muted/20">NO IMG</div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-sm text-zinc-100">{fish.name}</div>
                              <div className="text-[10px] text-muted/40 uppercase tracking-tighter">ID: {fish.id.slice(0, 8)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-light text-zinc-400">{fish.price}</td>
                        <td className="px-6 py-4">
                          {fish.shopee_link ? (
                            <a href={fish.shopee_link} target="_blank" className="text-accent/60 hover:text-accent text-xs underline underline-offset-4 decoration-accent/20 transition-all">Shopee Store</a>
                          ) : (
                            <span className="text-muted/20 text-xs">Direct Only</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(fish)} className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                            <button onClick={() => handleDelete(fish.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400/60 hover:text-red-400 transition-all">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {fishList.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-20 text-center text-muted/30 font-light italic">
                          No specimens found. Start by adding your first Betta.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Form View (Add/Edit) */}
          {(view === 'add' || view === 'edit') && (
            <div className="animate-fade-in max-w-2xl" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-30"></div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-accent/80 font-bold ml-1">Specimen Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Blue Rim Fancy"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent/40 focus:bg-white/5 transition-all text-sm"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-accent/80 font-bold ml-1">Display Price</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ₱1,500"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent/40 focus:bg-white/5 transition-all text-sm"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-accent/80 font-bold ml-1">Shopee Product URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://shopee.ph/product/..."
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent/40 focus:bg-white/5 transition-all text-sm"
                      value={formData.shopee_link}
                      onChange={(e) => setFormData({ ...formData, shopee_link: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-accent/80 font-bold ml-1">Visual Reference</label>
                    <div className="relative group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className={`border-2 border-dashed border-white/5 rounded-2xl p-10 text-center transition-all ${image ? 'border-accent/30 bg-accent/5' : 'group-hover:border-white/10 group-hover:bg-white/[0.02]'}`}>
                        {image ? (
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-accent text-sm font-medium">{image.name}</span>
                            <span className="text-[10px] text-muted/40 uppercase">Ready for upload</span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="w-10 h-10 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4">
                              <svg className="w-5 h-5 text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <p className="text-xs text-muted/60">Drop image here or click to browse</p>
                            <p className="text-[9px] uppercase tracking-widest text-muted/30">PNG, JPG, WEBP (MAX 5MB)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {message.text && (
                    <div className={`p-4 rounded-xl text-xs flex items-center gap-3 animate-fade-in ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/10' : 'bg-red-500/10 text-red-400 border border-red-500/10'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
                      {message.text}
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => handleReset()}
                      className="px-8 py-4 rounded-xl uppercase tracking-widest text-[10px] font-black border border-white/10 hover:bg-white/5 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-grow bg-accent hover:bg-accent/90 disabled:opacity-50 text-white py-4 rounded-xl uppercase tracking-[0.2em] text-[10px] font-black transition-all shadow-xl shadow-accent/20"
                    >
                      {loading ? 'Processing...' : view === 'add' ? 'Add Specimen' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
