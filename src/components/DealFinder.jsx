import React, { useState } from 'react';

const INITIAL_DEALS = [
  {
    id: 1,
    title: 'Anker Soundcore Space Q45 Wireless Noise Cancelling Headphones',
    category: 'Audio',
    originalPrice: 149.99,
    dealPrice: 79.99,
    discount: '47% OFF',
    source: 'Amazon',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    affiliateLink: 'https://amazon.com/your-affiliate-tag-here',
  },
  {
    id: 2,
    title: 'Keychron K2 V2 Wireless Mechanical Gaming Keyboard',
    category: 'Tech',
    originalPrice: 99.99,
    dealPrice: 69.99,
    discount: '30% OFF',
    source: 'Amazon',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    affiliateLink: 'https://amazon.com/your-affiliate-tag-here',
  },
  {
    id: 3,
    title: 'Ugreen 145W Power Bank 25,000mAh Fast Portable Charger',
    category: 'Accessories',
    originalPrice: 149.99,
    dealPrice: 99.99,
    discount: '33% OFF',
    source: 'AliExpress',
    image: 'https://images.unsplash.com/photo-1609592424104-97d4c4e752a2?auto=format&fit=crop&w=600&q=80',
    affiliateLink: 'https://aliexpress.com/your-affiliate-tag-here',
  },
];

export default function DealFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDeals = INITIAL_DEALS.filter((deal) => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || deal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4 tracking-wide uppercase">
            ⚡ Verified Arbitrage & Price Hacker
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Never Overpay Again.
          </h1>
          <p className="text-slate-400 mt-3 text-base md:text-lg">
            Instantly filter out inflated prices. We track down reliable, budget-friendly alternatives across top retail networks.
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 shadow-2xl mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-2/3">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search expensive items or paste product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition shadow-inner"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {['All', 'Tech', 'Audio', 'Accessories'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.length > 0 ? (
            filteredDeals.map((deal) => (
              <div
                key={deal.id}
                className="group backdrop-blur-md bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1"
              >
                <div>
                  {/* Image Frame */}
                  <div className="relative h-52 bg-slate-950 overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                    
                    <span className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-md text-slate-950 text-xs font-black px-3 py-1.5 rounded-xl shadow-lg border border-emerald-400/30">
                      {deal.discount}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-slate-300 text-xs px-2.5 py-1 rounded-lg border border-slate-800">
                      via {deal.source}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                      {deal.category}
                    </span>
                    <h3 className="font-bold text-lg text-slate-100 mt-1.5 line-clamp-2 leading-snug group-hover:text-amber-300 transition">
                      {deal.title}
                    </h3>
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="p-5 pt-0 flex items-center justify-between mt-4">
                  <div>
                    <span className="text-xs text-slate-500 line-through font-medium block">
                      ${deal.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-2xl font-black text-emerald-400 tracking-tight">
                      ${deal.dealPrice.toFixed(2)}
                    </span>
                  </div>

                  <a
                    href={deal.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group/btn overflow-hidden rounded-xl p-[1px] focus:outline-none"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl transition-all duration-300 group-hover/btn:opacity-90" />
                    <span className="relative px-4 py-2.5 bg-slate-950 rounded-xl text-xs font-bold text-amber-400 flex items-center gap-1.5 group-hover/btn:bg-transparent group-hover/btn:text-slate-950 transition-all duration-300">
                      Get Deal 🚀
                    </span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-slate-900/20 border border-slate-800/50 rounded-2xl">
              <p className="text-slate-400 text-base font-medium">No budget alternatives found for "{searchTerm}".</p>
              <p className="text-slate-600 text-sm mt-1">Try searching for a different item keyword.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}