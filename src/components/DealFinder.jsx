import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const CATEGORY_CARDS = [
  { name: 'Tech', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=500&q=80', tag: 'Tech for less' },
  { name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80', tag: 'Immersive Sound' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1609592424104-97d4c4e752a2?auto=format&fit=crop&w=500&q=80', tag: 'Everyday Carry' },
  { name: 'Deals', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80', tag: 'Under $50 Steals' },
];

export default function DealFinder() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function fetchDeals() {
      try {
        const { data, error } = await supabase.from('deals').select('*');
        if (error) console.error('Error fetching deals:', error);
        else setDeals(data || []);
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDeals();
  }, []);

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || deal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 pb-20">
      
      {/* Top Marketplace Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              DealHunter.
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
              Marketplace
            </span>
          </div>

          {/* Search Bar in Nav */}
          <div className="w-full md:w-1/2 relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search millions of products, gear, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition shadow-inner"
            />
          </div>

          <div className="text-xs text-slate-400 hidden lg:block">
            ⚡ Live Database Sync Active
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-8">
        
        {/* Hero Banner Section (Inspired by Amazon's visual grid) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight text-slate-200">Explore Top Categories</h2>
            <span className="text-xs text-amber-400 font-semibold cursor-pointer hover:underline">View all categories →</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORY_CARDS.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCategory(cat.name)}
                className={`group relative h-40 rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                  selectedCategory === cat.name ? 'border-amber-500 shadow-lg shadow-amber-500/20' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">{cat.tag}</span>
                  <h3 className="font-extrabold text-lg text-slate-100">{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {['All', 'Tech', 'Audio', 'Accessories', 'Deals'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-200">
            {selectedCategory === 'All' ? 'Trending Budget Finds' : `${selectedCategory} Deals`}
          </h2>
          <span className="text-xs text-slate-500">{filteredDeals.length} items found</span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400 animate-pulse">Syncing live marketplace inventory...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDeals.length > 0 ? (
              filteredDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="group backdrop-blur-md bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1"
                >
                  <div>
                    {/* Image Frame */}
                    <div className="relative h-48 bg-slate-950 overflow-hidden">
                      <img
                        src={deal.image}
                        alt={deal.title}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                      
                      <span className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-md text-slate-950 text-xs font-black px-2.5 py-1 rounded-xl shadow-lg border border-emerald-400/30">
                        {deal.discount}
                      </span>
                      <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-800">
                        via {deal.source}
                      </span>
                    </div>

                    {/* Body Content */}
                    <div className="p-4">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                        {deal.category}
                      </span>
                      <h3 className="font-bold text-base text-slate-100 mt-1 line-clamp-2 leading-snug group-hover:text-amber-300 transition">
                        {deal.title}
                      </h3>
                    </div>
                  </div>

                  {/* Footer Pricing & CTA */}
                  <div className="p-4 pt-0 flex items-center justify-between mt-2">
                    <div>
                      <span className="text-[11px] text-slate-500 line-through font-medium block">
                        ${Number(deal.original_price).toFixed(2)}
                      </span>
                      <span className="text-xl font-black text-emerald-400 tracking-tight">
                        ${Number(deal.deal_price).toFixed(2)}
                      </span>
                    </div>

                    <a
                      href={deal.affiliate_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group/btn overflow-hidden rounded-xl p-[1px] focus:outline-none"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl transition-all duration-300 group-hover/btn:opacity-90" />
                      <span className="relative px-3.5 py-2 bg-slate-950 rounded-xl text-xs font-bold text-amber-400 flex items-center gap-1 group-hover/btn:bg-transparent group-hover/btn:text-slate-950 transition-all duration-300">
                        Get Deal 🚀
                      </span>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-slate-900/20 border border-slate-800/50 rounded-2xl">
                <p className="text-slate-400 text-base font-medium">No products match your search.</p>
                <p className="text-slate-600 text-sm mt-1">Try searching for a different keyword or category.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}