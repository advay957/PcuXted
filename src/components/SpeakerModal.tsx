import React, { useEffect } from 'react';
import type { Speaker } from '../types';
import { X, Clock, Quote, CheckCircle2, ExternalLink } from 'lucide-react';
import { LinkedinIcon, TwitterIcon, InstagramIcon } from './SocialIcons';

interface SpeakerModalProps {
  speaker: Speaker | null;
  onClose: () => void;
  onOpenRegister: () => void;
}

export const SpeakerModal: React.FC<SpeakerModalProps> = ({ speaker, onClose, onOpenRegister }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (speaker) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [speaker, onClose]);

  if (!speaker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e0e11] border border-white/15 text-white shadow-2xl shadow-black custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 border border-white/10 text-zinc-400 hover:text-white hover:bg-ted-red transition-all duration-200"
          aria-label="Close speaker modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Banner */}
        <div className="relative h-48 sm:h-64 overflow-hidden bg-zinc-900">
          <img
            src={speaker.image}
            alt={speaker.name}
            className="w-full h-full object-cover filter blur-md opacity-40 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <span className="px-3 py-1 rounded-full bg-ted-red text-white text-xs font-mono font-bold tracking-widest uppercase">
              {speaker.topic}
            </span>
            {speaker.sessionTime && (
              <span className="text-xs font-mono text-zinc-300 flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                <Clock className="w-3.5 h-3.5 text-ted-red" />
                {speaker.sessionTime}
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 -mt-12 relative z-10 space-y-8">
          {/* Speaker Header Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-white/10">
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-ted-red shadow-xl"
            />
            <div className="space-y-1 flex-1">
              <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
                {speaker.name}
              </h3>
              <p className="text-ted-red font-medium text-sm sm:text-base">
                {speaker.profession}
              </p>
              <p className="text-zinc-400 text-xs font-mono">
                {speaker.organization}
              </p>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-2">
              {speaker.socialLinks.linkedin && (
                <a
                  href={speaker.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-ted-red text-zinc-300 hover:text-white transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {speaker.socialLinks.twitter && (
                <a
                  href={speaker.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-ted-red text-zinc-300 hover:text-white transition-colors"
                  aria-label="Twitter profile"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
              {speaker.socialLinks.instagram && (
                <a
                  href={speaker.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-ted-red text-zinc-300 hover:text-white transition-colors"
                  aria-label="Instagram profile"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Talk Title & Abstract */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                Official Talk Title
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-display text-white leading-snug">
                "{speaker.talkTitle}"
              </h4>
            </div>

            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base font-light">
              {speaker.fullAbstract}
            </p>
          </div>

          {/* Speaker Direct Quote Callout */}
          <div className="p-5 rounded-2xl bg-zinc-900/90 border-l-4 border-ted-red border-white/5 flex gap-4 items-start">
            <Quote className="w-5 h-5 text-ted-red shrink-0 mt-1 opacity-90" />
            <p className="font-serif text-base sm:text-lg italic text-zinc-100 leading-relaxed">
              “{speaker.quote}”
            </p>
          </div>

          {/* Key Takeaways */}
          {speaker.keyTakeaways && speaker.keyTakeaways.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                Audience Key Takeaways:
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {speaker.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-ted-red shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-400 font-mono">
              Live Stage Appearance • Limited Auditorium Seating
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-ted-red hover:bg-ted-crimson text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-ted-red/30 transition-colors flex items-center justify-center gap-2"
            >
              <span>Reserve Seat For This Talk</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
