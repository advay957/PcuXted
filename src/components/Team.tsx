import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../data/tedxData';
import type { TeamDepartment } from '../types';
import { Sparkles, Quote } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from './SocialIcons';

export const Team: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<TeamDepartment | 'All'>('All');

  const departments: (TeamDepartment | 'All')[] = [
    'All',
    'Organizing Team',
    'Curators',
    'Creative Team',
    'Marketing & PR',
    'Operations',
    'Sponsorship',
    'Technical Team',
  ];

  const filteredMembers = TEAM_MEMBERS.filter((member) => {
    if (selectedDept === 'All') return true;
    return member.department === selectedDept;
  });

  return (
    <section id="team" className="py-24 sm:py-32 bg-[#0a0a0d] relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-ted-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-ted-red uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Organizing Committee</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              The People Behind <span className="text-ted-red">PCUxTEDx</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
            A student-led committee dedicated to curating ideas, coaching speakers, and orchestrating an unforgettable campus experience.
          </p>
        </div>

        {/* Department Filter Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-200 border ${
                selectedDept === dept
                  ? 'bg-ted-red text-white border-ted-red shadow-lg shadow-ted-red/30 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="group relative rounded-2xl bg-[#121216] border border-white/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-ted-red/60 hover:shadow-2xl hover:shadow-ted-red/20 flex flex-col"
            >
              {/* Member Portrait */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-black/20" />

                {/* Department Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/70 backdrop-blur-md text-zinc-300 border border-white/10">
                    {member.department}
                  </span>
                </div>

                {/* Hover Quote Reveal */}
                {member.quote && (
                  <div className="absolute inset-0 p-6 bg-black/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center">
                    <Quote className="w-5 h-5 text-ted-red mb-3 opacity-90" />
                    <p className="font-serif text-sm text-zinc-100 italic leading-relaxed">
                      “{member.quote}”
                    </p>
                  </div>
                )}
              </div>

              {/* Member Meta */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-ted-red transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    {member.position}
                  </p>
                </div>

                {/* Socials & Connect */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    Connect
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-ted-red text-zinc-400 hover:text-white transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-ted-red text-zinc-400 hover:text-white transition-colors"
                      aria-label={`${member.name} Instagram`}
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Line Accent */}
              <div className="h-0.5 w-0 group-hover:w-full bg-ted-red transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
