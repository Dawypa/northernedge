import React, { useState } from 'react';
import { ArrowRight, Calculator, CheckCircle2, Layers } from 'lucide-react';
import { ProgramId, TRAINING_PROGRAMS } from '../data/clinicData';

interface ProgramsViewProps {
  activeProgramId: ProgramId;
  onSelectProgram: (id: ProgramId) => void;
  onStartBookingWithPreset: (preset: {
    ageGroup?: string;
    primaryGoal?: string;
    sessionType?: '3RM & Movement Screening' | '1-on-1 Mentoring' | 'Group Squad';
  }) => void;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({
  activeProgramId,
  onSelectProgram,
  onStartBookingWithPreset,
}) => {
  // Interactive AFL 3RM, MAS & Soleus Benchmark Calculator state
  const [bodyweightKg, setBodyweightKg] = useState<number>(82);
  const [twoKmMinutes, setTwoKmMinutes] = useState<number>(6);
  const [twoKmSeconds, setTwoKmSeconds] = useState<number>(50);
  const [tierMultiplier, setTierMultiplier] = useState<'junior' | 'senior'>('senior');

  const selectedProgram =
    TRAINING_PROGRAMS.find((p) => p.id === activeProgramId) || TRAINING_PROGRAMS[0];

  const totalTwoKmSeconds = Math.max(240, twoKmMinutes * 60 + twoKmSeconds);
  const masMetersPerSec = 2000 / totalTwoKmSeconds;
  const eurofit15sDistance = masMetersPerSec * 1.15 * 15;
  const trapBarTargetKg =
    bodyweightKg * (tierMultiplier === 'senior' ? 2.15 : 1.65);
  const soleusTargetKg = bodyweightKg * 1.85;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header & Service Switcher Tabs */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="text-[#FF5500] font-semibold">2.0 Training Programs</span>
          <span aria-hidden="true">·</span>
          <span>Holden Hill S&amp;C Lab &amp; North-East Adelaide Turf</span>
          <span aria-hidden="true">·</span>
          <span>8-Week Periodized Blocks</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1
              className="font-display text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Evidence-Based Football Conditioning &amp; Skill Labs
            </h1>
            <p className="text-base text-slate-300 mt-2 max-w-2xl">
              Select a specialized training stream below to inspect the 8-week periodized curriculum, biomechanical benchmarks, and session structure.
            </p>
          </div>

          {/* Interactive Service Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#111722] border border-slate-800 rounded-xl">
            {TRAINING_PROGRAMS.map((prog) => (
              <button
                key={prog.id}
                type="button"
                onClick={() => onSelectProgram(prog.id)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeProgramId === prog.id
                    ? 'bg-[#FF5500] text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {prog.id === 'senior-strength'
                  ? '2.1 Senior Pre-Season & 3RM'
                  : prog.id === 'junior-pathway'
                  ? '2.2 Junior Pathway (U14–U18)'
                  : '2.3 Bulletproof Lower-Limb'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Program Deep-Dive Showcase */}
      <div className="rounded-xl bg-[#111722] border border-slate-800 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column: Detailed Program Breakdown */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="font-mono font-semibold text-[#FF5500]">
                  {selectedProgram.code}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedProgram.cadence}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedProgram.duration}</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {selectedProgram.title}
              </h2>

              <div className="text-xs sm:text-sm font-medium text-[#38BDF8]">
                Target Cohort: {selectedProgram.targetGroup}
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedProgram.summary}
              </p>

              {/* Key Outcomes */}
              <div className="pt-2 space-y-2.5">
                <div className="text-xs font-semibold text-slate-400">
                  Guaranteed Performance Focus:
                </div>
                {selectedProgram.keyOutcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 8-Week Phase Progression */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Layers className="w-4 h-4 text-[#38BDF8]" />
                <span>8-Week Periodized Block Progression</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {selectedProgram.curriculumBlocks.map((block) => (
                  <div
                    key={block.phase}
                    className="p-4 rounded-lg bg-[#0B0E14] border border-slate-800/90 space-y-1"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-bold text-white">{block.phase}</span>
                      <span className="text-xs font-mono text-[#FF5500]">{block.focus}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {block.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  onStartBookingWithPreset({
                    ageGroup:
                      selectedProgram.id === 'junior-pathway'
                        ? 'U16 (15–16 yrs)'
                        : 'Senior Amateur / SANFL (18+)',
                    primaryGoal:
                      selectedProgram.id === 'junior-pathway'
                        ? 'Drop-Punt Kicking Distance & Biomechanics'
                        : selectedProgram.id === 'bulletproof-limb'
                        ? 'Bulletproof Calf / Hamstring Resilience'
                        : '3RM Maximal Strength & Contested Power',
                    sessionType: '3RM & Movement Screening',
                  })
                }
                className="px-6 py-3 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Book Trial Screening for {selectedProgram.code}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  onStartBookingWithPreset({
                    ageGroup:
                      selectedProgram.id === 'junior-pathway'
                        ? 'U16 (15–16 yrs)'
                        : 'Senior Amateur / SANFL (18+)',
                    primaryGoal:
                      selectedProgram.id === 'junior-pathway'
                        ? 'Drop-Punt Kicking Distance & Biomechanics'
                        : '3RM Maximal Strength & Contested Power',
                    sessionType: '1-on-1 Mentoring',
                  })
                }
                className="px-4 py-3 rounded-lg bg-[#0B0E14] hover:bg-slate-900 text-slate-200 border border-slate-800 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Book 1-on-1 Mentoring Slot
              </button>
            </div>
          </div>

          {/* Right Column: Bundled Telemetry Visual & Objective Metrics */}
          <div className="lg:col-span-5 bg-[#090D14] border-t lg:border-t-0 lg:border-l border-slate-800 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-400">
                LAB TELEMETRY SCHEMATIC · HOLDEN HILL
              </div>
              <div className="rounded-lg overflow-hidden border border-slate-800 bg-[#0D121B]">
                <img
                  src={selectedProgram.mediaAsset}
                  alt={selectedProgram.mediaAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-3.5 rounded-lg bg-[#111722] border border-slate-800 text-xs font-mono text-slate-300 tabular-nums">
                Benchmark Standard: {selectedProgram.benchmarkFocus}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-400">
                Objective Testing Metrics Recorded (Week 1 vs. Week 8):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProgram.metricsTracked.map((metric) => (
                  <div
                    key={metric}
                    className="p-3 rounded-lg bg-[#111722] border border-slate-800 text-xs font-medium text-slate-200"
                  >
                    {metric}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Pre-Season 3RM, MAS & Calf Resilience Calculator */}
      <div className="rounded-xl bg-[#111722] border border-slate-800 p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF5500]">
              <Calculator className="w-4 h-4" />
              <span>INTERACTIVE BENCHMARK CALCULATOR</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Calculate Your Personal 3RM, MAS Cone Distance &amp; Soleus Target
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Enter your current bodyweight and recent 2km time-trial result to see the exact numbers our sports science team uses to set your Holden Hill gym loads and turf running lanes.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-1 p-1 bg-[#0B0E14] border border-slate-800 rounded-lg w-fit">
                <button
                  type="button"
                  onClick={() => setTierMultiplier('senior')}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    tierMultiplier === 'senior'
                      ? 'bg-[#FF5500] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Senior / Colts (18+)
                </button>
                <button
                  type="button"
                  onClick={() => setTierMultiplier('junior')}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    tierMultiplier === 'junior'
                      ? 'bg-[#2563EB] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Junior Pathway (U14–U17)
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Bodyweight (kg)</label>
                  <input
                    type="number"
                    min={40}
                    max={130}
                    value={bodyweightKg}
                    onChange={(e) => setBodyweightKg(Math.max(40, Number(e.target.value) || 40))}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0E14] border border-slate-700 text-white font-mono text-sm tabular-nums focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">2km Mins</label>
                  <input
                    type="number"
                    min={5}
                    max={12}
                    value={twoKmMinutes}
                    onChange={(e) => setTwoKmMinutes(Math.max(5, Number(e.target.value) || 6))}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0E14] border border-slate-700 text-white font-mono text-sm tabular-nums focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">2km Secs</label>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={twoKmSeconds}
                    onChange={(e) =>
                      setTwoKmSeconds(Math.min(59, Math.max(0, Number(e.target.value) || 0)))
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0E14] border border-slate-700 text-white font-mono text-sm tabular-nums focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono tabular-nums">
            <div className="p-5 rounded-xl bg-[#0B0E14] border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">100% MAS SPEED</div>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {masMetersPerSec.toFixed(2)} <span className="text-sm text-slate-400">m/s</span>
              </div>
              <div className="text-xs text-[#FF5500]">
                15s @ 115% Cone Target: {eurofit15sDistance.toFixed(1)}m
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#0B0E14] border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">TRAP-BAR 3RM TARGET</div>
              <div className="text-2xl sm:text-3xl font-bold text-[#38BDF8]">
                {trapBarTargetKg.toFixed(1)} <span className="text-sm text-slate-400">kg</span>
              </div>
              <div className="text-xs text-slate-400">
                {tierMultiplier === 'senior' ? '2.15x BW Senior Standard' : '1.65x BW Junior Standard'}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#0B0E14] border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">SOLEUS ISO BENCHMARK</div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
                {soleusTargetKg.toFixed(1)} <span className="text-sm text-slate-400">kg</span>
              </div>
              <div className="text-xs text-slate-400">
                1.85x BW Per Limb (Seated 90°)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
