/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId, PathwayType, ProgramId } from './data/clinicData';
import { HomeView } from './components/HomeView';
import { ProgramsView } from './components/ProgramsView';
import { CoachesFacilityView } from './components/CoachesFacilityView';
import { PerformanceHubView } from './components/PerformanceHubView';
import { BookingAssessmentView } from './components/BookingAssessmentView';
import { LocalSeoRetentionSection } from './components/LocalSeoRetentionSection';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedPathway, setSelectedPathway] = useState<PathwayType>('senior');
  const [activeProgramId, setActiveProgramId] = useState<ProgramId>('senior-strength');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Presets passed when routing from any program, timetable slot, or pathway into 5.0 Book Assessment
  const [bookingPreset, setBookingPreset] = useState<{
    ageGroup?: string;
    primaryGoal?: string;
    sessionType?: '3RM & Movement Screening' | '1-on-1 Mentoring' | 'Group Squad';
  }>({});

  useEffect(() => {
    const titles: Record<PageId, string> = {
      home: 'Northern Edge Footy – Adelaide AFL Skills & S&C Clinic',
      programs: 'Training Programs (3RM, Junior Pathway & Lower-Limb) – Northern Edge Footy',
      coaches: 'Coaches, Holden Hill Lab & Player Results – Northern Edge Footy',
      hub: 'Footy Performance Hub (MAS Running & Rehab Blog) – Northern Edge Footy',
      book: 'Book a Trial Assessment & Calendar Intake – Northern Edge Footy',
    };
    document.title = titles[activePage];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const handleNavigate = (page: PageId, programId?: ProgramId) => {
    if (programId) {
      setActiveProgramId(programId);
    }
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  const handleStartBookingWithPreset = (preset: {
    ageGroup?: string;
    primaryGoal?: string;
    sessionType?: '3RM & Movement Screening' | '1-on-1 Mentoring' | 'Group Squad';
  }) => {
    setBookingPreset(preset);
    setActivePage('book');
    setMobileMenuOpen(false);
  };

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'programs', label: 'Programs' },
    { id: 'coaches', label: 'Coaches & Lab' },
    { id: 'hub', label: 'Performance Hub' },
    { id: 'book', label: 'Calendar Intake' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0E14] text-slate-100">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#0B0E14]/95 backdrop-blur-md border-b border-slate-800/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="font-display text-2xl font-bold uppercase tracking-wider text-white whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Northern Edge Footy
          </button>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium"
          >
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 cursor-pointer ${
                    isActive
                      ? 'text-white border-[#FF5500]'
                      : 'text-slate-300 border-transparent hover:text-white hover:border-slate-600'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action (+ mobile menu trigger on small screens) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                handleStartBookingWithPreset({
                  sessionType: '3RM & Movement Screening',
                })
              }
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#FF5500] rounded-lg hover:bg-[#E04B00] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Trial Screening
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#0D121B] px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer block ${
                  activePage === item.id
                    ? 'bg-[#FF5500] text-white'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Page Router Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            selectedPathway={selectedPathway}
            onSelectPathway={(pathway) => {
              setSelectedPathway(pathway);
              setActiveProgramId(
                pathway === 'senior' ? 'senior-strength' : 'junior-pathway'
              );
            }}
            onNavigate={handleNavigate}
            onStartBookingWithPreset={handleStartBookingWithPreset}
          />
        )}

        {activePage === 'programs' && (
          <ProgramsView
            activeProgramId={activeProgramId}
            onSelectProgram={setActiveProgramId}
            onStartBookingWithPreset={handleStartBookingWithPreset}
          />
        )}

        {activePage === 'coaches' && (
          <CoachesFacilityView
            onBookFromTimetableOrPricing={handleStartBookingWithPreset}
          />
        )}

        {activePage === 'hub' && (
          <PerformanceHubView
            onBookScreening={(goal) =>
              handleStartBookingWithPreset({
                primaryGoal: goal,
                sessionType: '3RM & Movement Screening',
              })
            }
          />
        )}

        {activePage === 'book' && (
          <BookingAssessmentView
            presetAgeGroup={bookingPreset.ageGroup}
            presetPrimaryGoal={bookingPreset.primaryGoal}
            presetSessionType={bookingPreset.sessionType}
          />
        )}

        {/* Persistent Local SEO & Retention Integration Section */}
        <LocalSeoRetentionSection />
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800/90 bg-[#070A0F] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-display text-xl font-bold uppercase tracking-wider text-white">
              Northern Edge Footy
            </div>
            <p className="text-xs text-slate-400">
              Unit 4, 560 North East Road, Holden Hill SA 5088 · Serving Tea Tree Gully, Modbury, Golden Grove, Campbelltown &amp; Norwood
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 whitespace-nowrap">
            © {new Date().getFullYear()} Northern Edge Footy Pty Ltd · ABN 48 612 904 318
          </div>
        </div>
      </footer>
    </div>
  );
}
