import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/tedxData';
import type { GalleryCategory, GalleryItem } from '../types';
import { LightboxModal } from './LightboxModal';
import { Maximize2, Camera } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories: GalleryCategory[] = [
    'all',
    'stage',
    'speakers',
    'audience',
    'team',
    'behind the scenes',
    'workshops',
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#070708] relative overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-ted-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-ted-red uppercase mb-4">
              <Camera className="w-3.5 h-3.5" />
              <span>Photo Gallery</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Conference <span className="text-ted-red">Moments</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
            Highlights from the stage, backstage prep, audience reactions, and interactive workshops across our events.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider capitalize whitespace-nowrap transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-ted-red text-white border-ted-red shadow-lg shadow-ted-red/30 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cinematic Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className={`group relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer bg-zinc-900 transition-all duration-500 hover:border-ted-red hover:shadow-2xl hover:shadow-ted-red/20 ${item.aspectRatio}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-108 transition-all duration-700 ease-out"
                loading="lazy"
              />

              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
                {/* Top Badge */}
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-ted-red text-white font-bold">
                    {item.category}
                  </span>
                  <div className="p-2 rounded-full bg-black/60 text-white backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Caption */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>

              {/* Minimal Red Corner Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-ted-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        item={activeLightboxItem}
        items={filteredItems}
        onClose={() => setActiveLightboxItem(null)}
        onSelect={(item) => setActiveLightboxItem(item)}
      />
    </section>
  );
};
