import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare, ExternalLink, PhoneCall } from 'lucide-react';

interface ContactProps {
  onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export const Contact: React.FC<ContactProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('Please fill out all required contact fields.', 'error');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onShowToast('Thank you! Your message has been routed to our PR Secretariat.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#070708] relative overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-ted-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-ted-red uppercase mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Contact & <span className="text-ted-red">Venue</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
            Have questions about PCUxTEDx? Reach out to our organizing committee for attendee queries, sponsorship, or media passes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Contact Metadata & Map Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl bg-[#101014] border border-white/10 p-8 space-y-6">
              <h3 className="text-xl font-bold font-display text-white">
                Event Secretariat & Venue
              </h3>

              <div className="space-y-4 text-sm">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-ted-red/10 border border-ted-red/20 text-ted-red">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-zinc-500 block">Official Inquiries</span>
                    <a
                      href="mailto:tedx@pcu.edu.in"
                      className="text-white hover:text-ted-red font-medium transition-colors"
                    >
                      tedx@pcu.edu.in
                    </a>
                  </div>
                </div>

                {/* College Address */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-zinc-500 block">College Campus Venue</span>
                    <p className="text-zinc-300 leading-relaxed">
                      Pimpri Chinchwad University (PCU Campus)<br />
                      Sate, Maval, Pune – 410506<br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-zinc-500 block">Secretariat Desk</span>
                    <span className="text-zinc-300 font-mono">+91 (020) 2765-TEDX</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Dark Map Card Placeholder */}
            <div className="rounded-3xl bg-[#101014] border border-white/10 overflow-hidden relative group">
              <div className="relative h-64 w-full bg-zinc-900">
                {/* Stylized dark map illustration */}
                <div 
                  className="w-full h-full bg-cover bg-center filter grayscale contrast-150 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent" />

                {/* Centered Pulsing Pin on Campus */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full bg-ted-red/40 animate-ping absolute" />
                    <span className="w-4 h-4 rounded-full bg-ted-red border-2 border-white relative z-10 shadow-lg" />
                  </div>
                  <div className="mt-2 px-3 py-1 rounded-full bg-black/90 text-[11px] font-mono font-bold text-white border border-white/20 whitespace-nowrap shadow-xl">
                    PCU Grand Auditorium
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Directions & Campus Map</span>
                  <span className="text-[11px] font-mono text-zinc-400">Pune-Mumbai Expressway Corridor</span>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-ted-red text-white text-xs font-mono tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#101014] border border-white/15 p-8 sm:p-12 shadow-2xl">
              <h3 className="text-2xl font-bold font-display text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-sm text-zinc-400 mb-8">
                Our communications desk replies within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ted-red text-sm transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. maya@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ted-red text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                    Inquiry Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Corporate Sponsorship / Press Accreditation"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ted-red text-sm transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can PCUxTEDx collaborate with or support you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ted-red text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  id="contact-submit-btn"
                  className="w-full py-4 rounded-xl bg-ted-red hover:bg-ted-crimson disabled:opacity-50 text-white font-bold text-sm tracking-wider uppercase shadow-xl shadow-ted-red/30 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {isSending ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
