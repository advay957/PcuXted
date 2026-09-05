import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { UpcomingEvent } from './components/UpcomingEvent';
import { Speakers } from './components/Speakers';
import { EventsTimeline } from './components/EventsTimeline';
import { Team } from './components/Team';
import { Gallery } from './components/Gallery';
import { JoinUs } from './components/JoinUs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { RegisterModal } from './components/RegisterModal';
import { ToastContainer } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import { ScrollToTop } from './components/ScrollToTop';

export const App: React.FC = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col selection:bg-ted-red selection:text-white font-sans">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenRegister={() => setIsRegisterOpen(true)} />

      {/* Main Page Landmark Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExplore={() => scrollToSection('about')}
          onJoin={() => scrollToSection('join')}
        />

        {/* 2. Editorial About Section */}
        <About />

        {/* 3. Featured Upcoming Event: PCUxTEDx 2026 */}
        <UpcomingEvent onRegisterClick={() => setIsRegisterOpen(true)} />

        {/* 4. Speakers Section ("Meet the Voices") */}
        <Speakers onOpenRegister={() => setIsRegisterOpen(true)} />

        {/* 5. Events Timeline (Previous Editions) */}
        <EventsTimeline />

        {/* 6. Team ("The People Behind PCUxTEDx") */}
        <Team />

        {/* 7. Cinematic Masonry Gallery */}
        <Gallery />

        {/* 8. Call for Changemakers / Join Us */}
        <JoinUs onShowToast={addToast} />

        {/* 9. Contact & Secretariat */}
        <Contact onShowToast={addToast} />
      </main>

      {/* 10. Architectural Black Footer */}
      <Footer onShowToast={addToast} />

      {/* Interactive Registration Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onShowToast={addToast}
      />

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default App;
