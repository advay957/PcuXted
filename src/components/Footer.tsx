import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, YoutubeIcon, TwitterIcon } from './SocialIcons';

interface FooterProps {
  onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowToast }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    onShowToast('Subscribed to PCUxTEDx Gazette & Early Announcements!', 'success');
    setNewsletterEmail('');
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'Events', href: '#events' },
    { label: 'Team', href: '#team' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Join Us', href: '#join' },
  ];

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
      {/* Background Top Red Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-ted-red/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-baseline tracking-tighter leading-none select-none">
              <span className="text-white font-black text-3xl sm:text-4xl tracking-tighter">TED</span>
              <span className="text-ted-red font-black text-3xl sm:text-4xl tracking-tighter">x</span>
              <span className="font-light text-white tracking-tight text-2xl sm:text-3xl ml-2 pl-3 border-l-2 border-white/20">
                PCU
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Ideas worth <span className="text-ted-red">spreading.</span>
            </div>

            <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
              PCUxTEDx is an independently organized TED event at Pimpri Chinchwad University, operated under official license from TED conferences.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-ted-red text-zinc-400 hover:text-white transition-all duration-200"
                aria-label="PCUxTEDx Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-ted-red text-zinc-400 hover:text-white transition-all duration-200"
                aria-label="PCUxTEDx LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/tedx"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-ted-red text-zinc-400 hover:text-white transition-all duration-200"
                aria-label="TEDx YouTube"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-ted-red text-zinc-400 hover:text-white transition-all duration-200"
                aria-label="Twitter / X"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
              Quick Navigation
            </span>
            <ul className="space-y-2.5 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-ted-red transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Bulletin */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
              Intellectual Dispatch
            </span>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Receive quarterly long-reads, talk recordings, and advance speaker notifications.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ted-red text-xs transition-colors pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-ted-red text-white hover:bg-ted-crimson transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
            <span className="text-[10px] font-mono text-zinc-400 block">
              Zero spam. Unsubscribe with a single click.
            </span>
          </div>
        </div>

        {/* Bottom Legal & Mandatory TEDx License Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-400 font-mono">
          <div className="text-center md:text-left space-y-1">
            <p>© 2026 PCUxTEDx. All rights reserved.</p>
            <p className="text-[11px] text-zinc-400">
              This independent TEDx event is operated under license from TED.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#about" className="hover:text-white transition-colors">Code of Conduct</a>
            <span>•</span>
            <a href="#about" className="hover:text-white transition-colors">TED Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
