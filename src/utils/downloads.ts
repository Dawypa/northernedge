export function downloadOffSeasonBlueprintPdf(recipientName: string, playingLevel: string) {
  const safeName = recipientName.trim() || 'Northern Edge Athlete';
  const safeLevel = playingLevel.trim() || 'Senior & Junior Pathway';

  const content = `================================================================================
NORTHERN EDGE FOOTY — NORTH-EAST ADELAIDE PERFORMANCE CLINIC
Unit 4, 560 North East Road, Holden Hill SA 5088 · (08) 7099 4210
================================================================================

6-WEEK OFF-SEASON RUNNING (MAS) & CALF RESILIENCE BLUEPRINT
Prepared for: ${safeName} (${safeLevel})
Authored by: Callum Vance (B.HumMov Hons, ASCA L2) & Hannah Lindqvist (M.HPR)

--------------------------------------------------------------------------------
PART 1: CALCULATING YOUR 100% MAXIMAL AEROBIC SPEED (MAS)
--------------------------------------------------------------------------------
1. Warm up thoroughly on a flat Adelaide football oval (e.g. Pertaringa Oval,
   Holden Hill Oval, or Golden Grove Oval).
2. Run a maximal 1,200m time trial (or 2,000m time trial).
3. Formula:
   100% MAS (m/s) = Distance (m) / Time (seconds)
   Example: 1,200m in 4 mins 10 secs (250s) = 4.80 m/s.

--------------------------------------------------------------------------------
PART 2: 6-WEEK OFF-SEASON TURF CONDITIONING PROGRESSION (2x / WEEK)
--------------------------------------------------------------------------------
WEEK 1 & WEEK 2 — AEROBIC POWER FOUNDATION (100% - 105% MAS)
• Session A (Tuesday): 3 sets x (4 reps of 60 sec @ 100% MAS / 60 sec walk recovery)
  3 minutes rest between sets.
• Session B (Friday):  2 sets x (8 reps of 30 sec @ 105% MAS / 30 sec passive recovery)

WEEK 3 & WEEK 4 — EUROFIT SUPRA-MAXIMAL GRIDS (115% MAS)
• Session A (Tuesday): 3 sets x (10 reps of 15 sec @ 115% MAS / 15 sec passive rest)
  Multiply your MAS (m/s) x 15 x 1.15 to set your exact cone distance on turf.
• Session B (Friday):  2 sets x (12 reps of 15 sec @ 115% MAS w/ 1 drop-punt kick
  on the 4th, 8th, and 12th rep).

WEEK 5 & WEEK 6 — REPEAT-SPRINT & DECELERATION SHUTTLES (120% - 125% MAS)
• Session A (Tuesday): 3 sets x (8 reps of 10 sec @ 120% MAS w/ 180-deg turf cut)
  20 sec passive rest between reps.
• Session B (Saturday): Re-test 2km Time Trial + 6x 35m Flying Turf Sprints.

--------------------------------------------------------------------------------
PART 3: BULLETPROOF SOLEUS & HAMSTRING RESILIENCE PROTOCOL (3x / WEEK)
--------------------------------------------------------------------------------
1. SEATED BENT-KNEE SOLEUS ISOMETRIC PUSH OR HEAVY RAISE
   • Why: Absorbs up to 6.5x bodyweight during mid-stance acceleration & kicking plant.
   • Prescription: 4 sets x 45-second isometric hold (or 8 heavy slow reps @ 3s down / 2s up).
   • Benchmark Target: >= 1.85x Bodyweight on Force Plate / Seated Rig.

2. STANDING SINGLE-LEG GASTROCNEMIUS DEFICIT RAISE
   • Prescription: 3 sets x 12 reps per leg off a 5cm plate with full big-toe extension.

3. NORDIC HAMSTRING ECCENTRIC LOWERING + LONG-LEVER BRIDGE
   • Prescription: 3 sets x 5 slow eccentric lowers (4-second descent) +
     3 sets x 30-second single-leg isometric heel bridge at 30-deg knee flexion.

4. COPENHAGEN ADDUCTOR GROIN HOLD
   • Prescription: 3 sets x 25 seconds per side to protect hip/groin during ground-ball cuts.

================================================================================
READY FOR YOUR LIVE 3RM & 240FPS KICKING SCREENING IN HOLDEN HILL?
Book your Initial Trial Assessment online at Northern Edge Footy.
================================================================================
`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Northern-Edge-Footy-6-Week-MAS-and-Calf-Resilience-Blueprint.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadBookingIcs(booking: {
  playerName: string;
  ageGroup: string;
  club: string;
  primaryGoal: string;
  dateIso: string;
  timeRange: string;
  sessionType: string;
  coach: string;
  bay: string;
}) {
  const startHour = booking.timeRange.split('–')[0]?.trim() || '16:30';
  const [hh, mm] = startHour.split(':');
  const dateCompact = booking.dateIso.replace(/-/g, '');
  const dtStart = `${dateCompact}T${hh || '16'}${mm || '30'}00`;
  const endHh = String(Number(hh || 16) + 1).padStart(2, '0');
  const dtEnd = `${dateCompact}T${endHh}${mm || '30'}00`;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Northern Edge Footy//Adelaide Performance Clinic//EN',
    'BEGIN:VEVENT',
    `SUMMARY:Northern Edge Footy: ${booking.sessionType} (${booking.playerName})`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    'LOCATION:Northern Edge Footy Performance Lab\\, Unit 4\\, 560 North East Rd\\, Holden Hill SA 5088',
    `DESCRIPTION:Athlete: ${booking.playerName} (${booking.ageGroup} - ${booking.club})\\nPrimary Goal: ${booking.primaryGoal}\\nCoach: ${booking.coach}\\nZone: ${booking.bay}\\nBring: Footy boots (moulded studs) + flat gym trainers.`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Northern-Edge-Footy-${booking.dateIso}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
