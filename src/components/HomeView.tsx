import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, CheckCircle2, Clock, ShieldCheck, Users } from 'lucide-react';
import {
  LOCAL_CLUB_PARTNERS,
  PATHWAY_ROUTING_DATA,
  PLAYER_CASE_STUDIES,
  PageId,
  PathwayType,
  ProgramId,
  TRAINING_PROGRAMS,
} from '../data/clinicData';
import { HeroVideoPlayer } from './HeroVideoPlayer';

interface HomeViewProps {
  selectedPathway: PathwayType;
  onSelectPathway: (pathway: PathwayType) => void;
  onNavigate: (page: PageId, programId?: ProgramId) => void;
  onStartBookingWithPreset: (preset: {
    ageGroup?: string;
    primaryGoal?: string;
    sessionType?: '3RM & Movement Screening' | '1-on-1 Mentoring' | 'Group Squad';
  }) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  selectedPathway,
  onSelectPathway,
  onNavigate,
  onStartBookingWithPreset,
}) => {
  // Live countdown to the next 8-Week Intake (11 days, 14 hours, 28 mins from load)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(11 * 86400 + 14 * 3600 + 28 * 60 + 42);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 11 * 86400));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const days = Math.floor(secondsRemaining / 86400);
  const hours = Math.floor((secondsRemaining % 86400) / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  const activePathway = PATHWAY_ROUTING_DATA[selectedPathway];

  return (
    <div className="space-y-20 pb-16">
      {/* 1.0 HERO SECTION + FULL-WIDTH INTAKE COUNTDOWN STRIP */}
      <section className="pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Brand Value Proposition */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
                  <span className="text-[#FF5500] font-semibold">North-East Adelaide Performance Clinic</span>
                  <span aria-hidden="true">·</span>
                  <span>Holden Hill Lab &amp; Local Turf</span>
                  <span aria-hidden="true">·</span>
                  <span>U14 to Senior SANFL / Div 1</span>
                </div>

                <h1
                  className="font-display font-bold uppercase tracking-tight text-white leading-[1.03]"
                  style={{ fontSize: 'clamp(2.35rem, 4.2vw, 3.75rem)', textWrap: 'balance' }}
                >
                  Build a Faster 2km Tank, Heavy 3RM Stoppage Power &amp; Precision 50m Foot Skills.
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Northern Edge Footy is North-East Adelaide’s dedicated Australian Rules Football athletic development and kicking biomechanics clinic. Degree-qualified Human Movement coaches delivering small-group S&amp;C squads and 1-on-1 mentoring for aspiring U14–U18 juniors and senior club athletes.
                </p>
              </div>

              {/* Dual Pathway Quick-Toggle inside Hero */}
              <div className="p-4 rounded-xl bg-[#111722] border border-slate-800/90 space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                  <span>Select Athlete Pathway to Tailor Recommendations</span>
                  <span className="font-mono text-slate-300 tabular-nums">Next Intake: 16 Nov 2026</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#0B0E14] rounded-lg border border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => onSelectPathway('senior')}
                    className={`py-2 px-3 rounded-md text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 truncate cursor-pointer ${
                      selectedPathway === 'senior'
                        ? 'bg-[#FF5500] text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Senior Players (18+ / Colts)
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectPathway('junior')}
                    className={`py-2 px-3 rounded-md text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 truncate cursor-pointer ${
                      selectedPathway === 'junior'
                        ? 'bg-[#2563EB] text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Junior Parents (U14–U18)
                  </button>
                </div>
              </div>

              {/* Primary CTA + Secondary Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    onStartBookingWithPreset({
                      ageGroup: activePathway.defaultAgeBracket,
                      primaryGoal: activePathway.recommendedGoal,
                      sessionType: '3RM & Movement Screening',
                    })
                  }
                  className="px-6 py-3.5 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                >
                  <span>Book Initial Movement &amp; 3RM Screening</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('programs', activePathway.primaryProgramId)}
                  className="px-5 py-3.5 rounded-lg bg-[#151D2A] hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-medium text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Explore 8-Week Programs
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Hero Video Highlight Player */}
            <div className="lg:col-span-6 flex flex-col">
              <HeroVideoPlayer />
            </div>
          </div>

          {/* Full-Width Row Below Hero Split: Next 8-Week Intake Countdown & Local Club Trust Strip */}
          <div className="mt-8 rounded-xl bg-[#111722] border border-slate-800 p-5 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Countdown Timer */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 lg:border-r lg:border-slate-800 lg:pr-6">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#FF5500] font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Next 8-Week Intake Closes In</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Capped at 12 athletes per squad · Holden Hill Lab
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono tabular-nums">
                  <div className="px-2.5 py-1.5 rounded bg-[#0B0E14] border border-slate-800 text-center min-w-[52px]">
                    <div className="text-lg font-bold text-white">{String(days).padStart(2, '0')}</div>
                    <div className="text-[10px] text-slate-400">DAYS</div>
                  </div>
                  <span className="text-slate-600 font-bold">:</span>
                  <div className="px-2.5 py-1.5 rounded bg-[#0B0E14] border border-slate-800 text-center min-w-[52px]">
                    <div className="text-lg font-bold text-white">{String(hours).padStart(2, '0')}</div>
                    <div className="text-[10px] text-slate-400">HRS</div>
                  </div>
                  <span className="text-slate-600 font-bold">:</span>
                  <div className="px-2.5 py-1.5 rounded bg-[#0B0E14] border border-slate-800 text-center min-w-[52px]">
                    <div className="text-lg font-bold text-white">{String(minutes).padStart(2, '0')}</div>
                    <div className="text-[10px] text-slate-400">MIN</div>
                  </div>
                  <span className="text-slate-600 font-bold">:</span>
                  <div className="px-2.5 py-1.5 rounded bg-[#0B0E14] border border-slate-800 text-center min-w-[52px]">
                    <div className="text-lg font-bold text-[#FF5500]">{String(seconds).padStart(2, '0')}</div>
                    <div className="text-[10px] text-slate-400">SEC</div>
                  </div>
                </div>
              </div>

              {/* North-East Adelaide Local Club Representation */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <span>Trusted by 150+ Local Athletes Across North-East Adelaide Clubs</span>
                  <span className="font-mono text-slate-300 tabular-nums">16 Spots Remaining Across 3 Tiers</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-slate-200 font-medium">
                  {LOCAL_CLUB_PARTNERS.map((club, index) => (
                    <React.Fragment key={club.name}>
                      <span className="whitespace-nowrap">
                        {club.name}{' '}
                        <span className="font-mono text-xs text-slate-400 tabular-nums">
                          ({club.athletesCount})
                        </span>
                      </span>
                      {index < LOCAL_CLUB_PARTNERS.length - 1 && (
                        <span aria-hidden="true" className="text-slate-600">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL PATHWAY ROUTING: SENIOR PLAYERS VS. JUNIOR PARENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-medium text-slate-400 mb-1">
              01. Dual Pathway Architecture · Age &amp; Maturation Specific
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
              Select Your Pathway: Senior Performance vs. Junior Development
            </h2>
          </div>

          {/* Functional Segmented Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-[#111722] border border-slate-800 rounded-lg self-start">
            <button
              type="button"
              onClick={() => onSelectPathway('senior')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedPathway === 'senior'
                  ? 'bg-[#FF5500] text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Senior Players (18+ &amp; SANFL)
            </button>
            <button
              type="button"
              onClick={() => onSelectPathway('junior')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedPathway === 'junior'
                  ? 'bg-[#2563EB] text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Junior Parents &amp; Athletes (U14–U18)
            </button>
          </div>
        </div>

        {/* Active Pathway Deep-Dive Panel */}
        <div className="rounded-xl bg-[#111722] border border-slate-800 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs font-mono text-[#FF5500]">{activePathway.badgeLabel}</div>
              <h3
                className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                {activePathway.heading}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activePathway.subheading}
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-semibold text-slate-400">
                  Key On-Field Problems Solved in 8 Weeks:
                </div>
                {activePathway.keyProblemsSolved.map((problem) => (
                  <div key={problem} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                    <span>{problem}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    onStartBookingWithPreset({
                      ageGroup: activePathway.defaultAgeBracket,
                      primaryGoal: activePathway.recommendedGoal,
                      sessionType: '3RM & Movement Screening',
                    })
                  }
                  className="px-5 py-2.5 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    Book {selectedPathway === 'senior' ? 'Senior 3RM & MAS' : 'Junior Movement & Kicking'} Screen
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('programs', activePathway.primaryProgramId)}
                  className="px-4 py-2.5 rounded-lg bg-[#0B0E14] hover:bg-slate-900 text-slate-200 border border-slate-800 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  View Full Program Syllabus
                </button>
              </div>
            </div>

            {/* Right Column: Initial Screening Protocol & Weekly Cadence */}
            <div className="lg:col-span-5 rounded-lg bg-[#0B0E14] border border-slate-800/90 p-5 space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Initial 60-Min Diagnostic Protocol</span>
                  <span className="font-mono text-slate-300">Holden Hill Lab</span>
                </div>
                <div className="space-y-2.5">
                  {activePathway.screeningProtocol.map((step, i) => (
                    <div
                      key={step}
                      className="p-3 rounded bg-[#111722] border border-slate-800/70 flex items-start gap-3"
                    >
                      <span className="font-mono text-xs font-semibold text-[#38BDF8] tabular-nums mt-0.5">
                        0{i + 1}.
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200 font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                <div className="text-xs text-slate-400">Recommended Weekly Structure</div>
                <div className="text-xs sm:text-sm font-medium text-white">
                  {activePathway.typicalSchedule}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.0 TRAINING PROGRAMS OVERVIEW (ASYMMETRIC BENTO GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-medium text-slate-400 mb-1">
              02. Specialist AFL Service Architecture
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
              Three Targeted Training Programs
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('programs')}
            className="text-sm font-semibold text-[#FF5500] hover:text-orange-400 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Compare All 3 Syllabi &amp; Calculators</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TRAINING_PROGRAMS.map((program) => (
            <div
              key={program.id}
              className="rounded-xl bg-[#111722] border border-slate-800 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] w-full bg-[#090D14] border-b border-slate-800 overflow-hidden relative">
                  <img
                    src={program.mediaAsset}
                    alt={program.mediaAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono text-[#FF5500] font-semibold">{program.code}</span>
                    <span aria-hidden="true">·</span>
                    <span>{program.duration}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                    {program.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{program.summary}</p>
                  <div className="pt-2 text-xs font-mono text-slate-400 tabular-nums">
                    Target: {program.benchmarkFocus}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('programs', program.id)}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-[#1B2434] hover:bg-slate-700 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer text-center"
                >
                  Inspect Syllabus
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onStartBookingWithPreset({
                      ageGroup:
                        program.id === 'junior-pathway'
                          ? 'U16 (15–16 yrs)'
                          : 'Senior Amateur / SANFL (18+)',
                      primaryGoal:
                        program.id === 'junior-pathway'
                          ? 'Drop-Punt Kicking Distance & Biomechanics'
                          : program.id === 'bulletproof-limb'
                          ? 'Bulletproof Calf / Hamstring Resilience'
                          : '3RM Maximal Strength & Contested Power',
                      sessionType: '3RM & Movement Screening',
                    })
                  }
                  className="py-2.5 px-4 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Book Trial
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ADJACENT PROOF OF IMPACT: QUANTIFIED NORTH-EAST ADELAIDE PLAYER RESULTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-medium text-slate-400 mb-1">
              03. Verified Pre- &amp; Post-Block Telemetry
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
              Quantified Player Case Studies (2km &amp; 3RM Gains)
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('coaches')}
            className="text-sm font-semibold text-[#38BDF8] hover:text-blue-300 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Meet Our Human Movement Coaches &amp; View Timetable</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PLAYER_CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="rounded-xl bg-[#111722] border border-slate-800 p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="text-xs text-slate-400">
                  <span className="text-white font-semibold">{cs.playerName}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{cs.ageAndLevel}</span>
                  <div className="text-slate-400 mt-0.5">{cs.club}</div>
                </div>

                {/* Tabular Numeral Before/After Comparison Grid */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-[#0B0E14] border border-slate-800/90 font-mono tabular-nums">
                  <div>
                    <div className="text-[11px] text-slate-400">2KM TIME-TRIAL</div>
                    <div className="text-base font-bold text-white mt-0.5">
                      {cs.twoKmBefore} → <span className="text-[#FF5500]">{cs.twoKmAfter}</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">{cs.twoKmDelta}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 truncate">{cs.threeRmLift}</div>
                    <div className="text-base font-bold text-white mt-0.5">
                      {cs.threeRmBefore} → <span className="text-[#38BDF8]">{cs.threeRmAfter}</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">{cs.threeRmDelta}</div>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-300 tabular-nums">
                  {cs.kickingOrLimbMetric}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic">“{cs.quote}”</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                Completed: {cs.programCompleted}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
