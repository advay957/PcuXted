import React, { useState } from 'react';
import { PILLARS_DATA } from '../data/tedxData';
import { CheckCircle2, Globe, Compass, Users2, Lightbulb } from 'lucide-react';

export const About: React.FC = () => {
  const [activePillar, setActivePillar] = useState(0);

  const pillarIcons = [Compass, Globe, Users2, Lightbulb];

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#0a0a0c] relative overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ted-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-ted-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-ted-red uppercase mb-4">
              <span>Section 01</span>
              <span>/</span>
              <span>About Us</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              About <span className="text-ted-red">PCUxTEDx</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
            An independently organized TED event rooted in university curiosity and broadcast to a global community.
          </p>
        </div>

        {/* Split Screen Layout: Photography on one side, Narrative & Pillars on the other */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Photography with Layered Stage Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image */}
              <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop"
                  alt="PCUxTEDx Stage and Speaker"
                  className="w-full aspect-[4/5] object-cover filter grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Overlaid Red Stage Dot Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-black/85 backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-3 h-3 rounded-full bg-ted-red" />
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
                      The 18-Minute Talk
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Long enough to explain an important idea; short enough to hold undivided human attention.
                  </p>
                </div>
              </div>

              {/* Decorative Accent Frame */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-ted-red/60 pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-white/20 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Editorial Text & Interactive Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* The Main Editorial Quotation with Classic TED Magazine Serif */}
            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-zinc-100 italic font-normal leading-relaxed border-l-2 border-ted-red pl-6 sm:pl-8 mb-8">
              “PCUxTEDx brings together students, creators, entrepreneurs, researchers, artists, professionals, and changemakers to share ideas that have the potential to inspire action.”
            </blockquote>

            <p className="text-zinc-300 leading-relaxed text-base sm:text-lg mb-10">
              Founded on the belief that college campuses are rich with fresh perspectives, PCUxTEDx provides a dedicated stage for original thinking. We bring together speakers across technology, humanities, science, and the arts to share ideas that challenge conventional wisdom and encourage meaningful conversation.
            </p>

            {/* Interactive Pillars (Vision, Mission, Community, Ideas Worth Spreading) */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ted-red" />
                <span>Explore Core Strategic Pillars</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PILLARS_DATA.map((pillar, idx) => {
                  const Icon = pillarIcons[idx];
                  const isSelected = activePillar === idx;

                  return (
                    <button
                      key={pillar.id}
                      onClick={() => setActivePillar(idx)}
                      className={`text-left p-4 rounded-xl border transition-all duration-300 relative ${
                        isSelected
                          ? 'bg-white/10 border-ted-red shadow-lg shadow-ted-red/10'
                          : 'bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-ted-red' : 'text-zinc-400'}`} />
                          <span className="text-xs font-mono text-zinc-400">{pillar.number}</span>
                        </div>
                        <span className={`text-xs font-mono uppercase tracking-wider ${isSelected ? 'text-ted-red font-bold' : 'text-zinc-400'}`}>
                          {isSelected ? 'Active' : 'View'}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-1 font-display">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-zinc-400 line-clamp-2">
                        {pillar.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active Pillar Statement Card */}
              <div className="mt-6 p-6 rounded-2xl bg-zinc-900/90 border border-white/10 backdrop-blur-md transition-all duration-500">
                <div className="flex items-center gap-2 text-ted-red text-xs font-mono uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pillar {PILLARS_DATA[activePillar].number} • {PILLARS_DATA[activePillar].subtitle}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-display">
                  {PILLARS_DATA[activePillar].title}
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {PILLARS_DATA[activePillar].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
