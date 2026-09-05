import React, { useState } from 'react';
import { SPEAKERS_DATA } from '../data/tedxData';
import type { Speaker } from '../types';
import { SpeakerModal } from './SpeakerModal';
import { Sparkles, ArrowRight, ArrowUpRight, Filter } from 'lucide-react';

interface SpeakersProps {
  onOpenRegister: () => void;
}

export const Speakers: React.FC<SpeakersProps> = ({ onOpenRegister }) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [showAll, setShowAll] = useState<boolean>(false);

  const topics = ['All', 'AI & Neuroscience', 'Sustainable Architecture', 'Space Exploration', 'FinTech', 'Biotechnology'];

  const filteredSpeakers = SPEAKERS_DATA.filter((speaker) => {
    if (selectedTopic === 'All') return true;
    return speaker.topic.toLowerCase().includes(selectedTopic.toLowerCase());
  });

  const displayedSpeakers = showAll ? filteredSpeakers : filteredSpeakers.slice(0, 6);

  return (
    <section id="speakers" className="py-24 sm:py-32 bg-[#09090b] relative overflow-hidden">
      {/* Ambient Red Spotlights */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-ted-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-ted-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-ted-red uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TEDx Talks & Curation</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Meet the <span className="text-ted-red">Voices</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
            Diverse thinkers, researchers, and creators stepping into the red circle to share their perspectives with our university.
          </p>
        </div>

        {/* Topic Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mr-2 hidden sm:inline-flex items-center gap-1">
            <Filter className="w-3 h-3" /> Focus:
          </span>
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-200 border ${
                selectedTopic === topic
                  ? 'bg-ted-red text-white border-ted-red shadow-lg shadow-ted-red/25 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Speaker Cards Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedSpeakers.map((speaker) => (
            <div
              key={speaker.id}
              onClick={() => setSelectedSpeaker(speaker)}
              className="group relative rounded-2xl bg-[#121215] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-ted-red hover:shadow-2xl hover:shadow-ted-red/20 flex flex-col justify-between"
            >
              {/* Speaker Photograph Container with elegant zoom */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-108 group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-black/30" />

                {/* Topic Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-black/70 backdrop-blur-md text-zinc-300 border border-white/10 group-hover:border-ted-red/50 group-hover:text-white transition-colors">
                    {speaker.topic}
                  </span>
                </div>

                {/* Red Accent Corner Triangle */}
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                  <div className="w-16 h-16 bg-ted-red rotate-45 transform origin-bottom-left -translate-y-10 translate-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md" />
                </div>

                {/* Hover Action Indicator */}
                <div className="absolute bottom-4 right-4 p-2.5 rounded-full bg-ted-red text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Speaker Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-ted-red transition-colors">
                      {speaker.name}
                    </h3>
                  </div>
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {speaker.profession}
                  </p>
                </div>

                {/* Talk Title */}
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                    Stage Talk:
                  </span>
                  <h4 className="text-sm font-semibold text-zinc-200 line-clamp-2 group-hover:text-white transition-colors">
                    "{speaker.talkTitle}"
                  </h4>
                </div>

                {/* Short Description */}
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {speaker.shortDescription}
                </p>

                {/* Bottom Card Footer */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500 group-hover:text-zinc-400">
                    {speaker.organization}
                  </span>
                  <span className="text-ted-red font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Bio & Abstract →
                  </span>
                </div>
              </div>

              {/* Bottom Subtle Red Accent Bar */}
              <div className="h-0.5 w-0 group-hover:w-full bg-ted-red transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>

        {/* View All Speakers Action */}
        <div className="mt-14 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            id="speakers-view-all-btn"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 hover:border-ted-red bg-white/[0.03] hover:bg-ted-red/10 text-sm font-bold tracking-wider uppercase text-white transition-all duration-300 group"
          >
            <span>{showAll ? 'Show Fewer Speakers' : 'View All Speakers →'}</span>
            <ArrowRight className="w-4 h-4 text-ted-red group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Speaker Detail Lightbox / Modal */}
      <SpeakerModal
        speaker={selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
        onOpenRegister={onOpenRegister}
      />
    </section>
  );
};
