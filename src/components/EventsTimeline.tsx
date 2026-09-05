import React, { useState } from 'react';
import { EVENTS_TIMELINE } from '../data/tedxData';
import type { EventEdition } from '../types';
import { Calendar, Users, Mic, ArrowRight, Play, X, Sparkles, CheckCircle2 } from 'lucide-react';

export const EventsTimeline: React.FC = () => {
  const [selectedEdition, setSelectedEdition] = useState<EventEdition | null>(null);

  return (
    <section id="events" className="py-24 sm:py-32 bg-[#070708] relative overflow-hidden border-t border-white/5">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-ted-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-ted-red uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conferences & Archive</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Past <span className="text-ted-red">Editions</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
            Explore previous PCUxTEDx conferences, the speakers who took the stage, and the ideas that ignited campus dialogue.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 md:ml-12 pl-6 sm:pl-10 space-y-16 sm:space-y-24">
          {EVENTS_TIMELINE.map((edition) => (
            <div key={edition.year} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#070708] border-2 border-ted-red flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                <div className="w-2 h-2 rounded-full bg-ted-red" />
              </div>

              {/* Event Year & Theme Header */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-3xl sm:text-4xl font-black font-display text-ted-red tracking-tight">
                  {edition.year}
                </span>
                <span className="text-xl sm:text-2xl font-bold font-heading text-white">
                  — {edition.theme}
                </span>
                <span className="text-xs font-mono text-zinc-400 italic">
                  "{edition.tagline}"
                </span>
              </div>

              {/* Editorial Event Card */}
              <div className="rounded-3xl bg-[#0f0f12] border border-white/10 overflow-hidden p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:border-white/20 hover:bg-[#131317]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Photos Grid */}
                  <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
                      <img
                        src={edition.coverImage}
                        alt={`${edition.theme} Stage`}
                        className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
                      <img
                        src={edition.secondaryImage}
                        alt={`${edition.theme} Audience`}
                        className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                  </div>

                  {/* Right Column: Narrative, Metrics & Highlights */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* Metrics Pills */}
                    <div className="flex flex-wrap gap-4 text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-zinc-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                        <Calendar className="w-3.5 h-3.5 text-ted-red" />
                        {edition.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-zinc-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                        <Mic className="w-3.5 h-3.5 text-ted-red" />
                        {edition.speakersCount} Stage Talks
                      </span>
                      <span className="flex items-center gap-1.5 text-zinc-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                        <Users className="w-3.5 h-3.5 text-ted-red" />
                        {edition.attendeesCount}+ Attendees
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                      {edition.description}
                    </p>

                    {/* Talk Highlights List */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block">
                        Landmark Talks Delivered:
                      </span>
                      <div className="space-y-1 text-xs text-zinc-300">
                        {edition.talksHighlight.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-ted-red shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trigger Recap Detail */}
                    <div className="pt-3">
                      <button
                        onClick={() => setSelectedEdition(edition)}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-white hover:text-ted-red transition-colors group/btn"
                      >
                        <Play className="w-3.5 h-3.5 text-ted-red fill-ted-red" />
                        <span>Inspect Edition Archive & Highlights</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edition Recap Modal */}
      {selectedEdition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0f0f12] border border-white/15 p-6 sm:p-8 text-white shadow-2xl">
            <button
              onClick={() => setSelectedEdition(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-ted-red transition-colors"
              aria-label="Close archive modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-ted-red text-white text-xs font-mono font-bold uppercase tracking-wider">
                Archive • {selectedEdition.year}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
                {selectedEdition.theme}
              </h3>
              <p className="text-zinc-400 text-sm font-mono">
                {selectedEdition.date} • {selectedEdition.venue}
              </p>

              <div className="rounded-2xl overflow-hidden aspect-video border border-white/10 my-4">
                <img
                  src={selectedEdition.coverImage}
                  alt={selectedEdition.theme}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed">
                {selectedEdition.description}
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">
                  Global TEDx YouTube Release Verified
                </span>
                <a
                  href="https://www.youtube.com/tedx"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 rounded-full bg-ted-red hover:bg-ted-crimson text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
