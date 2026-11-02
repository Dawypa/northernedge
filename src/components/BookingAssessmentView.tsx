import React, { useEffect, useState } from 'react';
import { Calendar, CheckCircle2, Clock, Download, MapPin, ShieldCheck, UserCheck } from 'lucide-react';
import { CalendarSlotOption, INITIAL_CALENDAR_SLOTS } from '../data/clinicData';
import { downloadBookingIcs } from '../utils/downloads';

export interface ConfirmedBooking {
  id: string;
  playerName: string;
  contactEmailOrPhone: string;
  ageGroup: string;
  club: string;
  primaryGoal: string;
  slot: CalendarSlotOption;
  createdAt: string;
}

interface BookingAssessmentViewProps {
  presetAgeGroup?: string;
  presetPrimaryGoal?: string;
  presetSessionType?: '3RM & Movement Screening' | '1-on-1 Mentoring' | 'Group Squad';
}

const STORAGE_KEY = 'northern_edge_footy_bookings_v1';

export const BookingAssessmentView: React.FC<BookingAssessmentViewProps> = ({
  presetAgeGroup,
  presetPrimaryGoal,
  presetSessionType,
}) => {
  const [sessionFilter, setSessionFilter] = useState<
    'ALL' | '3RM & Movement Screening' | '1-on-1 Mentoring' | 'Group Squad'
  >(presetSessionType || 'ALL');

  const [slots, setSlots] = useState<CalendarSlotOption[]>(INITIAL_CALENDAR_SLOTS);
  const [selectedSlotId, setSelectedSlotId] = useState<string>(INITIAL_CALENDAR_SLOTS[4].id);

  // 4 Low-friction form fields (+ contact email/mobile)
  const [playerName, setPlayerName] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string>(
    presetAgeGroup || 'Senior Amateur / SANFL (18+)'
  );
  const [club, setClub] = useState<string>('Tea Tree Gully District FC');
  const [primaryGoal, setPrimaryGoal] = useState<string>(
    presetPrimaryGoal || 'Pre-Season 2km Tank & Repeat Speed'
  );

  const [formError, setFormError] = useState<string>('');
  const [confirmedBookings, setConfirmedBookings] = useState<ConfirmedBooking[]>([]);
  const [latestConfirmation, setLatestConfirmation] = useState<ConfirmedBooking | null>(null);

  useEffect(() => {
    if (presetAgeGroup) setAgeGroup(presetAgeGroup);
    if (presetPrimaryGoal) setPrimaryGoal(presetPrimaryGoal);
    if (presetSessionType) {
      setSessionFilter(presetSessionType);
      const matchingSlot = slots.find(
        (s) => s.sessionType === presetSessionType && s.spotsAvailable > 0
      );
      if (matchingSlot) setSelectedSlotId(matchingSlot.id);
    }
  }, [presetAgeGroup, presetPrimaryGoal, presetSessionType]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: ConfirmedBooking[] = JSON.parse(saved);
        setConfirmedBookings(parsed);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const filteredSlots =
    sessionFilter === 'ALL'
      ? slots
      : slots.filter((s) => s.sessionType === sessionFilter);

  const selectedSlot =
    slots.find((s) => s.id === selectedSlotId) || filteredSlots[0] || slots[0];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setFormError('Please enter the Player or Parent full name.');
      return;
    }
    if (!contactInfo.trim() || contactInfo.trim().length < 6) {
      setFormError('Please enter a valid mobile number or email for booking confirmation.');
      return;
    }
    if (!club.trim()) {
      setFormError('Please enter your current football club or school.');
      return;
    }
    if (!selectedSlot || selectedSlot.spotsAvailable <= 0) {
      setFormError('Please select an available calendar time slot.');
      return;
    }

    setFormError('');

    const newBooking: ConfirmedBooking = {
      id: `NEF-${Date.now().toString().slice(-5)}`,
      playerName: playerName.trim(),
      contactEmailOrPhone: contactInfo.trim(),
      ageGroup,
      club: club.trim(),
      primaryGoal,
      slot: selectedSlot,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedBookings = [newBooking, ...confirmedBookings];
    setConfirmedBookings(updatedBookings);
    setLatestConfirmation(newBooking);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
    } catch {
      // ignore storage errors
    }

    // Decrement available capacity on the selected slot
    setSlots((prev) =>
      prev.map((s) =>
        s.id === selectedSlot.id
          ? { ...s, spotsAvailable: Math.max(0, s.spotsAvailable - 1) }
          : s
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="text-[#FF5500] font-semibold">5.0 Book a Trial Assessment &amp; Session</span>
          <span aria-hidden="true">·</span>
          <span>Integrated North-East Adelaide Online Calendar</span>
          <span aria-hidden="true">·</span>
          <span>Unit 4, 560 North East Rd, Holden Hill</span>
        </div>

        <h1
          className="font-display text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Select Your Time Slot &amp; Complete Your 4-Field Athlete Intake
        </h1>

        <p className="text-base text-slate-300 max-w-3xl">
          Choose an upcoming Initial Movement &amp; 3RM Screening, 1-on-1 Kicking Mentoring session, or Group Squad time slot below, then complete the fast 4-field athlete profile to lock in your spot.
        </p>
      </div>

      {/* Main Split: Integrated Calendar Selector (Left) + 4-Field Intake Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Integrated Online Calendar System */}
        <div className="lg:col-span-7 rounded-xl bg-[#111722] border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF5500]">
                <Calendar className="w-4 h-4" />
                <span>STEP 1 · SELECT LIVE CALENDAR TIME SLOT</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mt-0.5">
                Upcoming Holden Hill Lab &amp; Turf Availability
              </h2>
            </div>

            {/* Session Type Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#0B0E14] border border-slate-800 rounded-lg">
              {(
                [
                  { id: 'ALL', label: 'All' },
                  { id: '3RM & Movement Screening', label: '3RM Screen' },
                  { id: '1-on-1 Mentoring', label: '1-on-1' },
                  { id: 'Group Squad', label: 'Squad' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSessionFilter(tab.id)}
                  className={`px-2.5 py-1.5 rounded text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    sessionFilter === tab.id
                      ? 'bg-[#FF5500] text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Grid of Available Slots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredSlots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              const isFull = slot.spotsAvailable <= 0;
              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={isFull}
                  onClick={() => setSelectedSlotId(slot.id)}
                  className={`text-left p-4 rounded-xl border transition-colors flex flex-col justify-between space-y-3 ${
                    isFull
                      ? 'bg-[#0B0E14]/50 border-slate-800/50 opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#152033] border-[#FF5500] cursor-pointer'
                      : 'bg-[#0B0E14] border-slate-800 hover:border-slate-700 cursor-pointer'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-white font-semibold">
                        {slot.dayLabel}, {slot.dateShort}
                      </span>
                      <span
                        className={
                          isFull
                            ? 'text-rose-400'
                            : isSelected
                            ? 'text-[#FF5500] font-semibold'
                            : 'text-[#38BDF8]'
                        }
                      >
                        {isFull ? 'FULL' : `${slot.spotsAvailable} spots left`}
                      </span>
                    </div>

                    <div className="font-mono text-sm font-bold text-white tabular-nums flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FF5500]" />
                      <span>{slot.time}</span>
                    </div>

                    <div className="text-xs font-semibold text-slate-200 pt-1">
                      {slot.sessionType}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-0.5">
                    <div>Coach: {slot.coach}</div>
                    <div className="truncate">{slot.bay}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-lg bg-[#0B0E14] border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF5500] shrink-0" />
              <span>
                All screenings &amp; indoor turf sessions held at{' '}
                <strong className="text-white">Unit 4, 560 North East Rd, Holden Hill SA 5088</strong>
              </span>
            </div>
            <span className="font-mono text-slate-400">Free On-Site Parking</span>
          </div>
        </div>

        {/* Right Column: Low-Friction 4-Field Booking Form */}
        <div className="lg:col-span-5 rounded-xl bg-[#111722] border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
              <UserCheck className="w-4 h-4" />
              <span>STEP 2 · 4-FIELD ATHLETE INTAKE FORM</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white mt-0.5">
              Lock In Your Assessment or Squad Slot
            </h2>
          </div>

          {/* Selected Slot Banner */}
          {selectedSlot && (
            <div className="p-3.5 rounded-lg bg-[#0B0E14] border border-slate-800 space-y-1">
              <div className="text-[11px] font-mono text-slate-400 uppercase">
                Selected Calendar Intake Slot
              </div>
              <div className="text-sm font-bold text-white">
                {selectedSlot.dayLabel} {selectedSlot.dateShort} · {selectedSlot.time}
              </div>
              <div className="text-xs text-[#FF5500] font-medium">
                {selectedSlot.sessionType} · {selectedSlot.coach}
              </div>
            </div>
          )}

          <form onSubmit={handleConfirmBooking} className="space-y-4">
            {/* Field 1: Player / Parent Name & Contact */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  01. Player or Parent Full Name *
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="e.g. Lachlan Dawson (or Parent Name)"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0E14] border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Mobile Number or Email (for Confirmation &amp; Prep Pack) *
                </label>
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="e.g. 0412 345 678 or player@email.com.au"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0E14] border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5500]"
                />
              </div>
            </div>

            {/* Field 2: Age Group */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                02. Athlete Age Group / Pathway *
              </label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0E14] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#FF5500]"
              >
                <option value="U14 (12–14 yrs)">U14 Pathway (12–14 yrs)</option>
                <option value="U16 (15–16 yrs)">U16 Pathway (15–16 yrs)</option>
                <option value="U18 / Colts (17–18 yrs)">U18 / SANFL Colts (17–18 yrs)</option>
                <option value="Senior Amateur / SANFL (18+)">
                  Senior Amateur / SANFL (18+)
                </option>
              </select>
            </div>

            {/* Field 3: Current Club */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                03. Current Football Club or School *
              </label>
              <input
                type="text"
                list="adelaide-northeast-clubs"
                value={club}
                onChange={(e) => setClub(e.target.value)}
                placeholder="e.g. Tea Tree Gully, Modbury, Golden Grove..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0E14] border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5500]"
              />
              <datalist id="adelaide-northeast-clubs">
                <option value="Tea Tree Gully District FC" />
                <option value="Modbury Hawks FC" />
                <option value="Golden Grove FC" />
                <option value="Norwood FC (SANFL)" />
                <option value="Payneham Norwood Union FC" />
                <option value="Hope Valley FC" />
                <option value="Rostrevor College / St Peters" />
              </datalist>
            </div>

            {/* Field 4: Primary Goal */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                04. Primary 8-Week Performance Goal *
              </label>
              <select
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0E14] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#FF5500]"
              >
                <option value="Pre-Season 2km Tank & Repeat Speed">
                  Pre-Season 2km Tank &amp; Repeat Speed (MAS)
                </option>
                <option value="3RM Maximal Strength & Contested Power">
                  3RM Maximal Strength &amp; Contested Stoppage Power
                </option>
                <option value="Drop-Punt Kicking Distance & Biomechanics">
                  Drop-Punt Kicking Distance &amp; 240fps Biomechanics
                </option>
                <option value="Bulletproof Calf / Hamstring Resilience">
                  Bulletproof Calf / Hamstring Lower-Limb Resilience
                </option>
              </select>
            </div>

            {formError && <div className="text-xs text-rose-400 font-medium">{formError}</div>}

            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Confirm Booking Slot ({selectedSlot.dateShort} · {selectedSlot.time.split('–')[0].trim()})
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#38BDF8] shrink-0" />
              <span>
                No upfront card charge required to hold your trial screening slot. Pay on arrival at Holden Hill Lab.
              </span>
            </div>
          </form>

          {/* Confirmation Card when Submitted */}
          {latestConfirmation && (
            <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-700/80 space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-mono text-emerald-300">
                    BOOKING CONFIRMED · REF #{latestConfirmation.id}
                  </div>
                  <div className="text-sm font-bold text-white">
                    {latestConfirmation.playerName} ({latestConfirmation.ageGroup})
                  </div>
                  <div className="text-xs text-slate-200">
                    {latestConfirmation.slot.dayLabel}, {latestConfirmation.slot.dateShort} at{' '}
                    {latestConfirmation.slot.time} · {latestConfirmation.slot.sessionType}
                  </div>
                  <div className="text-xs text-slate-300">
                    Club: {latestConfirmation.club} · Goal: {latestConfirmation.primaryGoal}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  downloadBookingIcs({
                    playerName: latestConfirmation.playerName,
                    ageGroup: latestConfirmation.ageGroup,
                    club: latestConfirmation.club,
                    primaryGoal: latestConfirmation.primaryGoal,
                    dateIso: latestConfirmation.slot.dateIso,
                    timeRange: latestConfirmation.slot.time,
                    sessionType: latestConfirmation.slot.sessionType,
                    coach: latestConfirmation.slot.coach,
                    bay: latestConfirmation.slot.bay,
                  })
                }
                className="w-full py-2 px-3 rounded bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .ICS Calendar Invite (Apple / Google / Outlook)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
