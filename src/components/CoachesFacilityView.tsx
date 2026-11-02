import React, { useState } from 'react';
import { ArrowRight, Award, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import {
  BUNDLED_MEDIA,
  COACH_PROFILES,
  PLAYER_CASE_STUDIES,
  PRICING_TIERS,
  TimetableSlot,
  WEEKLY_TIMETABLE,
} from '../data/clinicData';

interface CoachesFacilityViewProps {
  onBookFromTimetableOrPricing: (preset: {
    ageGroup?: string;
    primaryGoal?: string;
    sessionType?: '3RM & Movement Screening' | '1-on-1 Mentoring' | 'Group Squad';
  }) => void;
}

export const CoachesFacilityView: React.FC<CoachesFacilityViewProps> = ({
  onBookFromTimetableOrPricing,
}) => {
  const [timetableFilter, setTimetableFilter] = useState<
    'ALL' | 'Group Squad' | '1-on-1 Mentoring' | '3RM & Movement Screening'
  >('ALL');
  const [activeFacilityZone, setActiveFacilityZone] = useState<'A' | 'B' | 'C'>('A');

  const filteredTimetable: TimetableSlot[] =
    timetableFilter === 'ALL'
      ? WEEKLY_TIMETABLE
      : WEEKLY_TIMETABLE.filter((slot) => slot.sessionType === timetableFilter);

  const facilityZoneDetails = {
    A: {
      title: 'Zone A: 30m Indoor Mondo Sprint Track & 240fps Kicking Net Bay',
      specs: 'Dual Wireless Laser Timing Gates (5m/10m/20m/30m) · Ball Exit Radar · High-Speed Sagittal & Frontal Cameras',
      description:
        'Allows year-round speed mechanics, deceleration cutting drills, and technical drop-punt ball-drop analysis unaffected by wet Adelaide winter evenings.',
    },
    B: {
      title: 'Zone B: 6x Heavy S&C Combo Racks & Velocity-Based Training (VBT) Bays',
      specs: 'Calibrated Bumper Plates · High/Low Hex Trap Bars · GymAware Optical Encoders · Keiser Cable Columns',
      description:
        'Purpose-built for our Senior 3RM Strength and Junior Maturation squads—enabling French contrast training (heavy lift straight into turf sprint or hurdle jump).',
    },
    C: {
      title: 'Zone C: VALD ForceDecks, NordBord & Seated Soleus Isometric Diagnostics',
      specs: 'Dual Uniaxial Force Plates · Seated 90° Calf Rig · Hand-Held Groin Squeeze Dynamometry',
      description:
        'Every athlete is benchmarked here in Week 1 and Week 8 to quantify left-to-right limb symmetry, eccentric hamstring torque, and calf load tolerance.',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* SECTION 1: BACHELOR OF HUMAN MOVEMENT & COACHING CREDENTIALS */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="text-[#FF5500] font-semibold">3.0 Coaches, Facility &amp; Results</span>
            <span aria-hidden="true">·</span>
            <span>University-Qualified Exercise Scientists &amp; ASCA Accredited Coaches</span>
          </div>
          <h1
            className="font-display text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Led by Human Movement Graduates &amp; Senior SANFL / Div 1 Practitioners
          </h1>
          <p className="text-base text-slate-300 max-w-3xl">
            No generic fitness influencers or guesswork sets. Every session at Northern Edge Footy is programmed and coached on the floor by degree-qualified sports scientists with real South Australian football pedigree.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {COACH_PROFILES.map((coach) => (
            <div
              key={coach.id}
              className="rounded-xl bg-[#111722] border border-slate-800 p-6 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-mono text-[#FF5500]">{coach.role}</div>
                  <h2 className="font-display text-2xl font-bold text-white mt-0.5">
                    {coach.name}
                  </h2>
                  <div className="text-xs text-[#38BDF8] font-medium mt-1">{coach.degree}</div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{coach.bio}</p>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-slate-400">
                    Verified Accreditations &amp; Clearances:
                  </div>
                  {coach.accreditations.map((acc) => (
                    <div key={acc} className="flex items-start gap-2 text-xs text-slate-200">
                      <Award className="w-3.5 h-3.5 text-[#FF5500] shrink-0 mt-0.5" />
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-1 text-xs text-slate-400">
                <div>
                  <span className="text-slate-300 font-medium">Specialty: </span>
                  {coach.specialty}
                </div>
                <div>
                  <span className="text-slate-300 font-medium">Footy Background: </span>
                  {coach.playingBackground}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: PLAYER CASE STUDIES (2KM TIME-TRIAL & 3RM IMPROVEMENTS) */}
      <section className="space-y-8">
        <div>
          <div className="text-xs font-medium text-slate-400 mb-1">
            Quantified North-East Adelaide Athlete Outcomes
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
            Verified Player Case Studies: Week 1 Baseline vs. Week 8 Re-Test
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PLAYER_CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="rounded-xl bg-[#111722] border border-slate-800 p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-2xl font-bold text-white">{cs.playerName}</h3>
                    <span className="text-xs font-mono text-slate-400">{cs.timeframe}</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {cs.ageAndLevel} · {cs.club}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-[#0B0E14] border border-slate-800 font-mono tabular-nums">
                  <div>
                    <div className="text-[11px] text-slate-400">2KM TIME-TRIAL</div>
                    <div className="text-lg font-bold text-white mt-0.5">
                      {cs.twoKmBefore} → <span className="text-[#FF5500]">{cs.twoKmAfter}</span>
                    </div>
                    <div className="text-xs text-emerald-400 mt-0.5">{cs.twoKmDelta}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 truncate">{cs.threeRmLift}</div>
                    <div className="text-lg font-bold text-white mt-0.5">
                      {cs.threeRmBefore} → <span className="text-[#38BDF8]">{cs.threeRmAfter}</span>
                    </div>
                    <div className="text-xs text-emerald-400 mt-0.5">{cs.threeRmDelta}</div>
                  </div>
                </div>

                <div className="p-3 rounded bg-[#0B0E14] border border-slate-800/80 text-xs font-mono text-slate-200 tabular-nums">
                  {cs.kickingOrLimbMetric}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic">“{cs.quote}”</p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                Program: {cs.programCompleted}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: HOLDEN HILL PERFORMANCE LAB GALLERY & ZONE INSPECTOR */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>Unit 4, 560 North East Road, Holden Hill SA 5088</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
              Inside the North-East Adelaide Performance Facility
            </h2>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#111722] border border-slate-800 rounded-lg self-start">
            {(['A', 'B', 'C'] as const).map((z) => (
              <button
                key={z}
                type="button"
                onClick={() => setActiveFacilityZone(z)}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFacilityZone === z
                    ? 'bg-[#FF5500] text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Zone {z}:{' '}
                {z === 'A' ? '30m Turf & Kicking' : z === 'B' ? '6x S&C Racks' : 'Force Plate Lab'}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-[#111722] border border-slate-800 overflow-hidden">
          <div className="bg-[#090D14] border-b border-slate-800">
            <img
              src={BUNDLED_MEDIA.facilityHoldenHillSvg}
              alt="Holden Hill Performance Lab Architectural Floorplan and Equipment Zones"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="text-xs font-mono text-[#38BDF8]">
                {facilityZoneDetails[activeFacilityZone].specs}
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                {facilityZoneDetails[activeFacilityZone].title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {facilityZoneDetails[activeFacilityZone].description}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onBookFromTimetableOrPricing({
                  sessionType: '3RM & Movement Screening',
                })
              }
              className="px-5 py-3 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start lg:self-center"
            >
              Book Lab Tour &amp; Screening
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE WEEKLY TIMETABLE */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-slate-400 mb-1">
              Live Squad &amp; Mentoring Schedule · Click Any Session to Book
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
              Weekly Training Timetable (Holden Hill &amp; Turf)
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#111722] border border-slate-800 rounded-lg">
            {(
              [
                { id: 'ALL', label: 'All Sessions' },
                { id: 'Group Squad', label: 'Group Squads' },
                { id: '1-on-1 Mentoring', label: '1-on-1 Mentoring' },
                { id: '3RM & Movement Screening', label: 'Trial Screenings' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTimetableFilter(tab.id)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  timetableFilter === tab.id
                    ? 'bg-[#2563EB] text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-[#111722] border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#0B0E14] text-[11px] font-mono text-slate-400 uppercase">
                  <th className="py-3.5 px-4">Day &amp; Time</th>
                  <th className="py-3.5 px-4">Session &amp; Program</th>
                  <th className="py-3.5 px-4">Cohort · Type</th>
                  <th className="py-3.5 px-4">Lead Coach</th>
                  <th className="py-3.5 px-4 text-right">Capacity</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-sm">
                {filteredTimetable.map((slot) => (
                  <tr key={slot.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-semibold text-white">{slot.day}</div>
                      <div className="text-xs font-mono text-slate-400 tabular-nums">
                        {slot.time}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-white">{slot.programTitle}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-300">
                      <span>{slot.ageBracket}</span>
                      <span aria-hidden="true"> · </span>
                      <span className="text-slate-400">{slot.sessionType}</span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-300">
                      {slot.coach}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-right font-mono text-xs tabular-nums">
                      <span className="text-[#FF5500] font-semibold">
                        {slot.spotsLeft} spots left
                      </span>{' '}
                      <span className="text-slate-500">/ {slot.maxCapacity}</span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-right">
                      <button
                        type="button"
                        onClick={() =>
                          onBookFromTimetableOrPricing({
                            ageGroup:
                              slot.ageBracket.includes('U14') || slot.ageBracket.includes('U16')
                                ? 'U16 (15–16 yrs)'
                                : 'Senior Amateur / SANFL (18+)',
                            sessionType: slot.sessionType,
                          })
                        }
                        className="px-3 py-1.5 rounded bg-[#1B2434] hover:bg-[#FF5500] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Select Slot
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 5: TRANSPARENT SQUAD & MENTORING PRICING */}
      <section className="space-y-8">
        <div>
          <div className="text-xs font-medium text-slate-400 mb-1">
            Zero Hidden Registration Fees · Full Diagnostic Included
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
            Transparent Squad &amp; 1-on-1 Mentoring Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PRICING_TIERS.map((tier, idx) => (
            <div
              key={tier.id}
              className={`rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border ${
                idx === 1
                  ? 'bg-[#131C2B] border-[#FF5500]/70'
                  : 'bg-[#111722] border-slate-800'
              }`}
            >
              <div className="space-y-4">
                <div className="text-xs font-mono text-slate-400">{tier.cadence}</div>
                <h3 className="font-display text-2xl font-bold text-white">{tier.name}</h3>
                <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                  <span className="text-4xl font-bold text-white">${tier.priceAud}</span>
                  <span className="text-xs text-slate-400">AUD</span>
                </div>
                <p className="text-xs text-[#38BDF8]">{tier.billingNote}</p>
                <p className="text-xs text-slate-300">Ideal for: {tier.idealFor}</p>

                <div className="pt-3 border-t border-slate-800 space-y-2.5">
                  {tier.inclusions.map((inc) => (
                    <div key={inc} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onBookFromTimetableOrPricing({
                    sessionType: tier.defaultSessionType,
                  })
                }
                className={`w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                  idx === 1
                    ? 'bg-[#FF5500] hover:bg-[#E04B00] text-white'
                    : 'bg-[#1B2434] hover:bg-slate-700 text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{tier.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
