import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, Sparkles, CheckCircle2, HeartHandshake, UserPlus, FileText } from 'lucide-react';
import type { ApplicationFormData } from '../types';

interface JoinUsProps {
  onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export const JoinUs: React.FC<JoinUsProps> = ({ onShowToast }) => {
  const [roleMode, setRoleMode] = useState<'core' | 'volunteer'>('core');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    year: '2nd Year',
    department: 'Engineering & Technology',
    areaOfInterest: 'Curation & Speaker Coaching',
    whyJoin: '',
    portfolioOrLinkedIn: '',
  });

  const departmentOptions = [
    'Engineering & Technology',
    'Design & Architecture',
    'Management & Commerce',
    'Media & Mass Communication',
    'Basic & Applied Sciences',
    'Liberal Arts & Humanities',
  ];

  const interestOptions = [
    'Curation & Speaker Coaching',
    'Creative & Visual Design',
    'Web Architecture & Tech Ops',
    'Logistics & Venue Operations',
    'Marketing, PR & Social Broadcast',
    'Corporate Sponsorship & Partnerships',
    'AV Production & Cinematography',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.whyJoin) {
      onShowToast('Please fill in all mandatory fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#EB0028', '#ffffff', '#222222']
        });
      } catch {
        // fallback if canvas not available
      }

      onShowToast('Application received! Our curation team will review your submission.', 'success');
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      course: '',
      year: '2nd Year',
      department: 'Engineering & Technology',
      areaOfInterest: 'Curation & Speaker Coaching',
      whyJoin: '',
      portfolioOrLinkedIn: '',
    });
  };

  return (
    <section id="join" className="py-24 sm:py-32 bg-[#09090c] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-ted-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Strong CTA Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-ted-red uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Call for Changemakers</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Have an idea <br />
            <span className="text-ted-red">worth spreading?</span>
          </h2>

          <p className="mt-4 text-zinc-300 text-base sm:text-lg">
            Become part of the student team that curates speakers, designs the stage, and brings TEDx to our university campus.
          </p>

          {/* Role Mode Toggle */}
          <div className="mt-8 inline-flex p-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setRoleMode('core')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                roleMode === 'core'
                  ? 'bg-ted-red text-white shadow-lg shadow-ted-red/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Join PCUxTEDx</span>
            </button>

            <button
              onClick={() => setRoleMode('volunteer')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                roleMode === 'volunteer'
                  ? 'bg-ted-red text-white shadow-lg shadow-ted-red/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Become a Volunteer</span>
            </button>
          </div>
        </div>

        {/* Application Form Box */}
        <div className="rounded-3xl bg-[#111115] border border-white/15 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-6 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-ted-red/20 border-2 border-ted-red text-ted-red flex items-center justify-center mx-auto shadow-xl shadow-ted-red/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
                  Application Successfully Submitted
                </h3>
                <p className="text-zinc-300 text-sm max-w-md mx-auto">
                  Thank you for stepping up, <strong className="text-white">{formData.fullName}</strong>. Our executive panel reviews every submission rigorously. Expect to hear from us via email within 5 business days.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 max-w-md mx-auto text-left text-xs font-mono text-zinc-400 space-y-1">
                <div>Applied For: <span className="text-white">{roleMode === 'core' ? 'Core Organizing Team' : 'Event Volunteer'}</span></div>
                <div>Domain: <span className="text-white">{formData.areaOfInterest}</span></div>
                <div>Applicant Email: <span className="text-white">{formData.email}</span></div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-ted-red" />
                  <span>Application Form • {roleMode === 'core' ? 'Core Committee Track' : 'Volunteer Cohort Track'}</span>
                </div>
                <span className="text-[11px] font-mono text-ted-red">* Required Fields</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Advait Kulkarni"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ted-red text-sm transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                    Institutional / Personal Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. advait@pcu.edu.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ted-red text-sm transition-colors"
                  />
                </div>

                {/* Course */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                    Degree / Course *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. B.Tech Computer Science / B.Des"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ted-red text-sm transition-colors"
                  />
                </div>

                {/* Academic Year */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                    Current Academic Year *
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-ted-red text-sm transition-colors"
                  >
                    <option value="1st Year">1st Year (Freshman)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                    <option value="Postgraduate">Postgraduate / Research Scholar</option>
                  </select>
                </div>

                {/* Department */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-ted-red text-sm transition-colors"
                  >
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Area of Interest */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                    Area of Interest *
                  </label>
                  <select
                    value={formData.areaOfInterest}
                    onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-ted-red text-sm transition-colors"
                  >
                    {interestOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Portfolio or LinkedIn Link */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                  Portfolio / GitHub / LinkedIn URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.portfolioOrLinkedIn}
                  onChange={(e) => setFormData({ ...formData, portfolioOrLinkedIn: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ted-red text-sm transition-colors"
                />
              </div>

              {/* Why do you want to join PCUxTEDx? */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                  Why do you want to join PCUxTEDx? *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what excites you about TEDx, a problem you care deeply about, or what unique energy you bring to the community..."
                  value={formData.whyJoin}
                  onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ted-red text-sm transition-colors resize-none"
                />
              </div>

              {/* Submit Application Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                id="join-submit-btn"
                className="w-full py-4 rounded-xl bg-ted-red hover:bg-ted-crimson disabled:opacity-50 text-white font-bold text-sm tracking-wider uppercase shadow-xl shadow-ted-red/30 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
