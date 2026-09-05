import React, { useState, useEffect } from 'react';
import { UPCOMING_EVENT } from '../data/tedxData';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';

interface UpcomingEventProps {
  onRegisterClick: () => void;
}

export const UpcomingEvent: React.FC<UpcomingEventProps> = ({ onRegisterClick }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 72,
    hours: 11,
    minutes: 24,
    seconds: 45,
  });

  useEffect(() => {
    const target = new Date(UPCOMING_EVENT.targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="event" className="py-24 sm:py-32 bg-[#070708] relative overflow-hidden">
      {/* TEDx Red Stage Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-ted-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-ted-red uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Annual Conference</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            PCUxTEDx <span className="text-ted-red">2026</span>
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg">
            Join over 500 students, researchers, and creators for an unforgettable day of live stage talks, curated exhibits, and community networking.
          </p>
        </div>

        {/* Visually Distinctive Master Event Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#18181c] via-[#101013] to-[#0a0a0c] border border-white/15 overflow-hidden shadow-2xl shadow-black/80">
          {/* Subtle Top Red Bar Accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-ted-red to-transparent" />

          {/* Card Interior Grid */}
          <div className="p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              {/* Event Badge & Status */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-md bg-ted-red text-white text-xs font-black tracking-widest uppercase font-mono shadow-md shadow-ted-red/30">
                  {UPCOMING_EVENT.edition}
                </span>
                <span className="px-3 py-1.5 rounded-md bg-white/10 text-zinc-300 text-xs font-mono tracking-wider uppercase border border-white/10 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {UPCOMING_EVENT.status}
                </span>
                <span className="text-xs font-mono text-ted-red font-medium tracking-wide">
                  • Only {UPCOMING_EVENT.seatsLeft} Seats Remaining
                </span>
              </div>

              {/* Theme & Tagline */}
              <div>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase leading-none">
                  Ideas Beyond <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-ted-red">
                    Boundaries
                  </span>
                </h3>
                <p className="mt-4 text-zinc-300 text-lg sm:text-xl font-light leading-relaxed">
                  "{UPCOMING_EVENT.tagline}"
                </p>
              </div>

              {/* Key Logistics Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <Calendar className="w-5 h-5 text-ted-red shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs uppercase font-mono text-zinc-400 block">Date</span>
                    <span className="text-sm font-semibold text-white">{UPCOMING_EVENT.date}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <Clock className="w-5 h-5 text-ted-red shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs uppercase font-mono text-zinc-400 block">Time</span>
                    <span className="text-sm font-semibold text-white">{UPCOMING_EVENT.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <MapPin className="w-5 h-5 text-ted-red shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs uppercase font-mono text-zinc-400 block">Venue</span>
                    <span className="text-sm font-semibold text-white">{UPCOMING_EVENT.venue}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <ShieldCheck className="w-5 h-5 text-ted-red shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs uppercase font-mono text-zinc-400 block">Location</span>
                    <span className="text-sm font-semibold text-white">{UPCOMING_EVENT.location}</span>
                  </div>
                </div>
              </div>

              {/* Highlights Bullet List */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                  Delegate Privileges Include:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                  {UPCOMING_EVENT.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ted-red shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Call to Action */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onRegisterClick}
                  id="event-register-now-btn"
                  className="px-8 py-4 rounded-full bg-ted-red hover:bg-ted-crimson text-white font-bold text-sm tracking-wider uppercase shadow-2xl shadow-ted-red/50 hover:shadow-ted-red/70 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Register Now →</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
                <span className="text-xs font-mono text-zinc-400">
                  Early Bird Tiers Ending Soon
                </span>
              </div>
            </div>

            {/* Right Column: Live Countdown Clock & Stage Visual Box */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center">
              <div className="w-full max-w-md p-8 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl shadow-2xl relative">
                {/* Decorative glowing top corner */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-ted-red/40 blur-md pointer-events-none" />

                <div className="text-center mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                    Live Launch Countdown
                  </span>
                  <h4 className="text-xl font-bold font-display text-white mt-1">
                    Clock Ticking to Impact
                  </h4>
                </div>

                {/* 4-Unit Countdown Timer Grid */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center mb-6">
                  <div className="p-3 sm:p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white block">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-zinc-400 mt-1 block">
                      Days
                    </span>
                  </div>

                  <div className="p-3 sm:p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white block">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-zinc-400 mt-1 block">
                      Hours
                    </span>
                  </div>

                  <div className="p-3 sm:p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white block">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-zinc-400 mt-1 block">
                      Mins
                    </span>
                  </div>

                  <div className="p-3 sm:p-4 rounded-xl bg-ted-red/20 border border-ted-red/40">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-ted-red block animate-pulse">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-zinc-300 mt-1 block">
                      Secs
                    </span>
                  </div>
                </div>

                {/* Card Stage Graphic */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-white/10 group">
                  <img
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop"
                    alt="TEDx Stage Hall"
                    className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-300">Auditorium Grand Hall</span>
                    <span className="text-ted-red font-bold">Pune, India</span>
                  </div>
                </div>

                {/* Progress Bar of Seat Bookings */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1.5">
                    <span>Registration Fill Rate</span>
                    <span className="text-white font-bold">86% Booked</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-ted-red to-orange-500 rounded-full w-[86%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
