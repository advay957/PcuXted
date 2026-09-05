import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check sections for active state
      const sections = ['home', 'about', 'event', 'speakers', 'events', 'team', 'gallery', 'join', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Event', href: '#event', id: 'event' },
    { label: 'Speakers', href: '#speakers', id: 'speakers' },
    { label: 'Events', href: '#events', id: 'events' },
    { label: 'Team', href: '#team', id: 'team' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Join Us', href: '#join', id: 'join' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#070708]/85 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/50'
            : 'py-6 bg-transparent border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official TEDx Brand Lockup */}
          <a
            href="#home"
            className="group flex items-baseline tracking-tighter text-xl sm:text-2xl font-black text-white focus:outline-none select-none"
            aria-label="PCUxTEDx Home"
          >
            <span className="text-white font-black tracking-tighter text-2xl sm:text-3xl">TED</span>
            <span className="text-ted-red font-black tracking-tighter text-2xl sm:text-3xl">x</span>
            <span className="font-semibold text-white tracking-tight text-lg sm:text-xl ml-1.5 pl-2 border-l border-white/20">
              PCU
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.href)}
                  className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md relative ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-ted-red rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenRegister}
              id="navbar-register-btn"
              className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-ted-red text-white hover:bg-ted-crimson transition-all duration-300 shadow-lg shadow-ted-red/25 hover:shadow-ted-red/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 opacity-80 group-hover:rotate-12 transition-transform duration-300" />
                Register
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 lg:hidden focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-black/95 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between p-6 pt-24 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-3">
          <div className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-2">
            Navigation Menu
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.href)}
              className={`text-left text-xl sm:text-2xl font-display font-bold py-2 border-b border-white/5 transition-colors flex items-center justify-between ${
                activeSection === link.id ? 'text-ted-red pl-2 border-ted-red/30' : 'text-zinc-200 hover:text-white'
              }`}
            >
              <span>{link.label}</span>
              <span className="text-xs font-mono text-zinc-500">→</span>
            </button>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenRegister();
            }}
            className="w-full py-3.5 rounded-xl bg-ted-red text-white font-bold text-center tracking-wider uppercase text-sm shadow-xl shadow-ted-red/30 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Register for PCUxTEDx 2026
          </button>
          <div className="text-center text-xs text-zinc-500 font-mono">
            Official TEDx Event • License: PCUxTEDx
          </div>
        </div>
      </div>
    </>
  );
};
