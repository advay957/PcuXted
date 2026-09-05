import React from 'react';
import { ArrowDown, ArrowRight, Sparkles, Users, Mic, Award, Eye } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onJoin: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onJoin }) => {
  const stats = [
    { label: 'Annual Editions', value: '04', icon: Award },
    { label: 'Visionary Speakers', value: '32+', icon: Mic },
    { label: 'Live Attendees', value: '1.5K+', icon: Users },
    { label: 'Global Video Views', value: '250K+', icon: Eye },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#070708]"
    >
      {/* Immersive Background Visual with TEDx Stage Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Background Image with Dark Vignette */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2000&auto=format&fit=crop')`,
          }}
        />

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070708] via-[#070708]/80 to-[#070708]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070708] via-transparent to-[#070708]" />

        {/* The Iconic Red Carpet Stage Circle Spotlight */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] rounded-full bg-ted-red/20 blur-[130px] -z-10 animate-pulse-slow" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-ted-red/10 blur-[100px] -z-10" />

        {/* Technical Grid Accent */}
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Subtle Horizontal Red Stage Beam */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ted-red/30 to-transparent" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-4xl">
          {/* Subtle Tag / Accreditation */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-ted-red animate-ping" />
            <span className="w-2 h-2 rounded-full bg-ted-red -ml-3" />
            <span className="text-xs font-mono tracking-widest uppercase text-zinc-300">
              x = independently organized TED event
            </span>
          </div>

          {/* Official TEDx Headline Lockup */}
          <div className="space-y-4">
            <div className="flex items-baseline tracking-tighter leading-none select-none">
              <span className="text-white font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter">
                TED
              </span>
              <span className="text-ted-red font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter">
                x
              </span>
              <span className="text-white font-light text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight ml-3 sm:ml-5 border-l-2 sm:border-l-4 border-white/20 pl-3 sm:pl-5">
                PCU
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
              Ideas worth <span className="text-ted-red">spreading.</span>
            </h2>
          </div>

          {/* Narrative Statement */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 font-normal max-w-2xl leading-relaxed">
            PCUxTEDx is a student-driven community built around ideas, conversations, and people who challenge the way we see the world.
          </p>

          {/* Dual CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onExplore}
              id="hero-explore-btn"
              className="px-8 py-4 rounded-full bg-ted-red hover:bg-ted-crimson text-white font-bold text-sm tracking-wider uppercase shadow-2xl shadow-ted-red/40 hover:shadow-ted-red/60 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group"
            >
              <span>Explore PCUxTEDx</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={onJoin}
              id="hero-join-btn"
              className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm tracking-wider uppercase border border-white/15 hover:border-white/30 backdrop-blur-md hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group"
            >
              <Sparkles className="w-4 h-4 text-ted-red group-hover:rotate-12 transition-transform" />
              <span>Join the Community</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Footer Bar: Live Stats & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12">
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 w-full md:w-auto">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center gap-2 text-ted-red mb-1">
                    <Icon className="w-3.5 h-3.5 opacity-80" />
                    <span className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Subtle Animated Scroll Indicator */}
          <button
            onClick={onExplore}
            className="flex items-center gap-3 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors group cursor-pointer"
            aria-label="Scroll to content"
          >
            <span className="font-mono">Discover More</span>
            <div className="w-8 h-12 rounded-full border border-white/20 flex items-start justify-center p-1.5 group-hover:border-ted-red transition-colors">
              <div className="w-1.5 h-2.5 rounded-full bg-ted-red animate-bounce" />
            </div>
            <ArrowDown className="w-4 h-4 text-ted-red group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
