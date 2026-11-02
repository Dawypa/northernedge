import heroTurfSvg from '../assets/media/hero-adelaide-turf.svg';
import seniorStrengthSvg from '../assets/media/program-senior-strength.svg';
import juniorKickingSvg from '../assets/media/program-junior-kicking.svg';
import lowerLimbSvg from '../assets/media/program-lower-limb.svg';
import facilityHoldenHillSvg from '../assets/media/facility-holden-hill.svg';

export type PageId = 'home' | 'programs' | 'coaches' | 'hub' | 'book';

export type PathwayType = 'senior' | 'junior';

export type ProgramId = 'senior-strength' | 'junior-pathway' | 'bulletproof-limb';

export type BlogCategory = 'All' | 'Strength' | 'Running' | 'Kicking' | 'Recovery';

export interface HighlightClip {
  id: string;
  title: string;
  location: string;
  focus: string;
  duration: string;
  metrics: {
    label: string;
    value: string;
  }[];
  telemetryNote: string;
}

export interface ProgramDetail {
  id: ProgramId;
  code: string;
  title: string;
  subtitle: string;
  targetGroup: string;
  pathway: PathwayType | 'both';
  summary: string;
  mediaAsset: string;
  mediaAlt: string;
  cadence: string;
  duration: string;
  benchmarkFocus: string;
  keyOutcomes: string[];
  curriculumBlocks: {
    phase: string;
    focus: string;
    details: string;
  }[];
  metricsTracked: string[];
}

export interface CoachProfile {
  id: string;
  name: string;
  role: string;
  degree: string;
  accreditations: string[];
  playingBackground: string;
  specialty: string;
  bio: string;
}

export interface PlayerCaseStudy {
  id: string;
  playerName: string;
  ageAndLevel: string;
  club: string;
  programCompleted: string;
  timeframe: string;
  twoKmBefore: string;
  twoKmAfter: string;
  twoKmDelta: string;
  threeRmLift: string;
  threeRmBefore: string;
  threeRmAfter: string;
  threeRmDelta: string;
  kickingOrLimbMetric: string;
  quote: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  programTitle: string;
  programId: ProgramId;
  sessionType: 'Group Squad' | '1-on-1 Mentoring' | '3RM & Movement Screening';
  ageBracket: string;
  coach: string;
  spotsLeft: number;
  maxCapacity: number;
}

export interface PricingTier {
  id: string;
  name: string;
  cadence: string;
  priceAud: number;
  billingNote: string;
  idealFor: string;
  inclusions: string[];
  ctaLabel: string;
  defaultSessionType: '3RM & Movement Screening' | '1-on-1 Mentoring' | 'Group Squad';
}

export interface BlogArticle {
  id: string;
  title: string;
  category: Exclude<BlogCategory, 'All'>;
  publishedDate: string;
  readTime: string;
  author: string;
  excerpt: string;
  keyTakeaway: string;
  contentSections: {
    heading: string;
    body: string;
    prescriptionTable?: {
      variable: string;
      target: string;
    }[];
  }[];
}

export interface CalendarSlotOption {
  id: string;
  dateIso: string;
  dayLabel: string;
  dateShort: string;
  time: string;
  sessionType: '3RM & Movement Screening' | '1-on-1 Mentoring' | 'Group Squad';
  coach: string;
  bay: string;
  spotsAvailable: number;
}

export const BUNDLED_MEDIA = {
  heroTurfSvg,
  seniorStrengthSvg,
  juniorKickingSvg,
  lowerLimbSvg,
  facilityHoldenHillSvg,
};

export const HERO_HIGHLIGHT_CLIPS: HighlightClip[] = [
  {
    id: 'clip-turf',
    title: 'Campbelltown & Holden Hill Turf: High-Velocity Kicking & Repeat Sprint',
    location: 'North-East Adelaide Turf Pitch',
    focus: '45m–55m Drop-Punt Entry Under Fatigue',
    duration: '0:42 Loop',
    metrics: [
      { label: 'Ball Exit Velocity', value: '61.8 km/h' },
      { label: 'Peak Sprint Speed', value: '8.94 m/s' },
      { label: 'Support Plant Force', value: '3.4x BW' },
    ],
    telemetryNote: '240fps sagittal capture · Final step braking impulse & hip-shoulder separation',
  },
  {
    id: 'clip-gym',
    title: 'Holden Hill S&C Lab: 3RM Trap-Bar Force & GymAware Velocity',
    location: 'Zone B Heavy Strength Bays',
    focus: 'Maximal Lower-Body Force & Rate of Force Development',
    duration: '0:38 Loop',
    metrics: [
      { label: 'Trap-Bar 3RM Load', value: '177.5 kg' },
      { label: 'Mean Bar Velocity', value: '0.68 m/s' },
      { label: 'Concentric Peak Power', value: '1,490 W' },
    ],
    telemetryNote: 'Dual VALD ForceDecks + optical encoder bar velocity tracking',
  },
  {
    id: 'clip-resilience',
    title: 'Bulletproof Lower-Limb: Seated Soleus Isometric & Nordic Eccentric',
    location: 'Zone C Biomechanics & Rehab Deck',
    focus: 'Late-Stance Calf Stiffness & Biceps Femoris Fascicle Length',
    duration: '0:35 Loop',
    metrics: [
      { label: 'Soleus Peak Iso', value: '2.12x BW' },
      { label: 'Nordic Eccentric Torque', value: '462 N' },
      { label: 'Limb Asymmetry', value: '1.9% L/R' },
    ],
    telemetryNote: 'Isometric mid-shin dynamometry · 90-degree knee flexion protocol',
  },
];

export const LOCAL_CLUB_PARTNERS = [
  { name: 'Tea Tree Gully District FC', division: 'Adelaide Footy League Div 1 & Juniors', athletesCount: 34 },
  { name: 'Modbury Hawks FC', division: 'Adelaide Footy League & SANFL Juniors', athletesCount: 28 },
  { name: 'Golden Grove FC', division: 'Senior & Junior Kookaburras Pathway', athletesCount: 31 },
  { name: 'Norwood FC Pathway', division: 'SANFL U16 / U18 & Development', athletesCount: 19 },
  { name: 'Payneham Norwood Union', division: 'Adelaide Footy League Div 1', athletesCount: 22 },
  { name: 'Hope Valley FC', division: 'North-East Senior & Junior Demons', athletesCount: 18 },
];

export const PATHWAY_ROUTING_DATA: Record<
  PathwayType,
  {
    badgeLabel: string;
    heading: string;
    subheading: string;
    primaryProgramId: ProgramId;
    secondaryProgramId: ProgramId;
    keyProblemsSolved: string[];
    screeningProtocol: string[];
    typicalSchedule: string;
    recommendedGoal: string;
    defaultAgeBracket: string;
  }
> = {
  senior: {
    badgeLabel: 'Pathway 01 · Senior Amateur & SANFL Players (18+)',
    heading: 'Build a 6:20 2km Tank, Contested 3RM Power & Soft-Tissue Armour',
    subheading:
      'Designed for North-East Adelaide senior footballers who want to dominate fourth-quarter midfield stoppages, add 20–35kg to their trap-bar 3RM, and eliminate recurring calf or hamstring strains.',
    primaryProgramId: 'senior-strength',
    secondaryProgramId: 'bulletproof-limb',
    keyProblemsSolved: [
      'Fading in Q3/Q4 repeat-sprint transition efforts due to poorly programmed slow off-season road runs',
      'Getting out-leveraged in contested ground-ball and ruck/stoppage grapples',
      'Missing 3–6 rounds mid-season with soleus tightness or high-speed biceps femoris strains',
    ],
    screeningProtocol: [
      'Trap-Bar Deadlift & Back Squat 3RM Force-Velocity Profile',
      '1.2km / 2km Shuttle MAS (Maximal Aerobic Speed) Assessment',
      'Seated Soleus Isometric (>1.85x BW target) & Nordic Hamstring Force',
    ],
    typicalSchedule: '2x Heavy Gym + Ballistic Power sessions/wk · 1x Turf MAS & High-Speed Running session/wk',
    recommendedGoal: 'Pre-Season 2km Tank & Repeat Speed',
    defaultAgeBracket: 'Senior Amateur / SANFL (18+)',
  },
  junior: {
    badgeLabel: 'Pathway 02 · Junior Athletes & Parents (U14–U18)',
    heading: 'Safe Maturation S&C, High-Speed Kicking Lab & Talent Pathway Readiness',
    subheading:
      'Coach-supervised movement literacy, growth-spurt safe strength development, and 240fps kicking biomechanics for aspiring U14, U16, and U18 players trialling for SANFL development squads or dominating local club footy.',
    primaryProgramId: 'junior-pathway',
    secondaryProgramId: 'bulletproof-limb',
    keyProblemsSolved: [
      'Inconsistent drop-punt kicking penetration or high ball drop under match pressure',
      'Osgood-Schlatter knee soreness or Sever’s heel pain during rapid adolescent growth spurts',
      'Lack of structured, form-first gym supervision before entering SANFL U16/U18 combine testing',
    ],
    screeningProtocol: [
      'Peak Height Velocity (PHV) Growth & Landing Mechanics Screen',
      '240fps Dual-Angle Drop-Punt Kicking & Non-Preferred Foot Audit',
      '20m Sprint Split (5m / 10m / 20m timing gates) & Agility Cut Profile',
    ],
    typicalSchedule: '2x After-School Turf Kicking + Safe S&C Squads/wk · Optional 1-on-1 Mentoring',
    recommendedGoal: 'Drop-Punt Kicking Distance & Biomechanics',
    defaultAgeBracket: 'U16 (15–16 yrs)',
  },
};

export const TRAINING_PROGRAMS: ProgramDetail[] = [
  {
    id: 'senior-strength',
    code: '01. Program 2.1',
    title: 'Senior Pre-Season & 3RM Strength: Power & Tank',
    subtitle: 'Maximal Force Production · MAS Running Conditioning · Contested Stoppage Power',
    targetGroup: 'Senior Amateur (Adelaide Footy League), SANFL League/Reserves & U18 Colts (17+)',
    pathway: 'senior',
    summary:
      'An 8-week periodized performance block combining velocity-tracked 3RM compound lifting in our Holden Hill gym with GPS-measured Maximal Aerobic Speed (MAS) conditioning and repeat-sprint ability on North-East Adelaide turf.',
    mediaAsset: seniorStrengthSvg,
    mediaAlt: 'Senior Pre-Season 3RM Force-Velocity Curve and Trap-Bar Strength Progression Chart',
    cadence: '2–3 Sessions / Week (Gym + Turf)',
    duration: '8-Week Intake Block',
    benchmarkFocus: 'Trap-Bar 3RM ≥ 2.1x BW · 2km Time-Trial < 6:35 · 30m Sprint < 4.12s',
    keyOutcomes: [
      'Increase 3RM Trap-Bar Deadlift and Back Squat force output by 18–28% without adding dead non-functional bulk',
      'Shave 25–50 seconds off your 2km time-trial using individualized 100%–120% MAS interval grids',
      'Translate gym strength into explosive first-3-step acceleration and contested tackle momentum',
    ],
    curriculumBlocks: [
      {
        phase: 'Weeks 1–2: Baseline Screening & Eccentric Capacity',
        focus: '3RM profiling, tendon stiffness, and aerobic power ceiling',
        details:
          'Force plate jump testing, 3RM velocity-load profiling, and baseline 2km MAS shuttle calibration to set exact running lane speeds.',
      },
      {
        phase: 'Weeks 3–5: Maximal Force (3RM) & Supra-Maximal MAS',
        focus: 'Heavy compound loading (85–92% 1RM) + Eurofit 15s/15s turf conditioning',
        details:
          'Contrast training pairing heavy trap-bar deadlifts with hurdle hops, followed by position-specific midfield/half-back repeat-effort running.',
      },
      {
        phase: 'Weeks 6–8: Ballistic Rate of Force Development & Match Speed',
        focus: 'Velocity-based power peaking & contested ground-ball transfer',
        details:
          'High-velocity trap-bar jumps, rotational med-ball grapples, fatigued 50m drop-punt execution, and final Week 8 re-testing.',
      },
    ],
    metricsTracked: [
      'Trap-Bar & Squat 3RM (kg & xBW)',
      '2km Time-Trial & MAS (m/s)',
      'Countermovement Jump Peak Power (W/kg)',
      '5m / 10m / 30m Laser Gate Splits',
    ],
  },
  {
    id: 'junior-pathway',
    code: '02. Program 2.2',
    title: 'Junior Pathway (U14–U18): Safe S&C & Kicking Lab',
    subtitle: '240fps Kicking Biomechanics · Growth-Spurt Safe Strength · 1-on-1 Mentoring',
    targetGroup: 'Aspiring Juniors: U14 (12–14 yrs), U16 (15–16 yrs) & U18 SANFL Pathway',
    pathway: 'junior',
    summary:
      'Built by university-qualified Human Movement specialists to guide young Adelaide footballers through adolescent growth spurts while sharpening bilateral drop-punt kicking accuracy, clean ground-ball craft, and foundational barbell technique.',
    mediaAsset: juniorKickingSvg,
    mediaAlt: 'Junior Pathway U14 to U18 Kicking Lab 240fps Angular Velocity and Hip-Knee Kinematics',
    cadence: '2x Squad Sessions / Week + Optional 1-on-1 Kicking Mentoring',
    duration: '8-Week Term Block',
    benchmarkFocus: '45m+ Flat Drop-Punt Accuracy · Bilateral Efficiency · Technical Barbell Mastery',
    keyOutcomes: [
      'Eliminate two-handed ball-drop drift and lock in a repeatable, single-hand guide release under closing pressure',
      'Add 8–12 metres to kicking penetration by optimizing support-leg braking and hip-to-shoulder separation',
      'Build safe, progressive relative strength and landing mechanics that protect growing knees, hips, and growth plates',
    ],
    curriculumBlocks: [
      {
        phase: 'Weeks 1–2: Kicking Video Audit & Movement Literacy',
        focus: '240fps sagittal/frontal capture & fundamental hinge/squat/land mechanics',
        details:
          'Every junior athlete receives a split-screen biomechanical kicking breakdown identifying ball-drop height, plant-foot alignment, and shank whip.',
      },
      {
        phase: 'Weeks 3–5: Bilateral Skill Acquisition & Relative Strength',
        focus: 'Non-preferred foot confidence, deceleration cuts & progressive resistance',
        details:
          'High-rep technical kicking constraints (hitting 35m–45m low-trajectory targets on the run) paired with goblet squats, trap-bar pulls, and isometric calf work.',
      },
      {
        phase: 'Weeks 6–8: Decision-Making Under Pressure & Combine Testing',
        focus: 'Contested exit kicks, reactive agility & SANFL combine benchmark re-test',
        details:
          'Live 1v1 and 2v2 exit scenarios on turf, 20m sprint and agility re-testing, and an updated parent/player progress portfolio.',
      },
    ],
    metricsTracked: [
      'Preferred & Non-Preferred Kicking Efficiency (%)',
      'Ball Exit Velocity & Launch Angle (deg)',
      '20m Sprint & SANFL Agility Time (s)',
      'Movement Competency & Landing RSI Score',
    ],
  },
  {
    id: 'bulletproof-limb',
    code: '03. Program 2.3',
    title: 'Bulletproof Lower-Limb: Calf & Hamstring Resilience',
    subtitle: 'Soleus Isometric Capacity · BFlh Fascicle Length · Return-to-High-Speed Running',
    targetGroup: 'Senior & Junior Athletes with Recurring Calf, Hamstring, Shin, or Groin History',
    pathway: 'both',
    summary:
      'Australian Rules Football demands up to 14km of running and 150+ high-speed accelerations per game. Our lower-limb resilience clinic targets the exact tissues that fail in Q3 and Q4: the deep soleus, proximal hamstring tendon, and adductor complex.',
    mediaAsset: lowerLimbSvg,
    mediaAlt: 'Bulletproof Lower-Limb Soleus Isometric Force and Nordic Eccentric Torque Asymmetry Diagnostic',
    cadence: '2x Rehab & Resilience Sessions / Week (1-on-1 or Small Pod)',
    duration: '6- to 8-Week Targeted Block',
    benchmarkFocus: 'Soleus Iso > 1.85x BW · Nordic Eccentric > 420N · Limb Asymmetry < 5%',
    keyOutcomes: [
      'Resolve chronic calf tightness and medial tibial shin splints by rebuilding seated bent-knee soleus force capacity',
      'Increase biceps femoris long head (BFlh) fascicle length and eccentric braking torque during high-speed ground-ball reach',
      'Bridge the gap between clinical physio clearance and 100% max-velocity sprinting on North-East Adelaide winter turf',
    ],
    curriculumBlocks: [
      {
        phase: 'Weeks 1–2: Diagnostic Force Profiling & Tissue Capacity',
        focus: 'Seated soleus dynamometry, Nordic torque & Copenhagen adductor squeeze',
        details:
          'Pinpoint hidden left-to-right deficits that standard calf raises miss, establishing safe isometric and heavy slow resistance (HSR) loads.',
      },
      {
        phase: 'Weeks 3–5: Eccentric Overload & Plyometric Tendon Spring',
        focus: 'Nordic/Razor progressions, single-leg pogo stiffness & >85% Vmax exposure',
        details:
          'Progressive lengthening under load combined with timed turf acceleration mechanics and controlled deceleration braking.',
      },
      {
        phase: 'Weeks 6–8: Max-Velocity Inoculation & Match Clearance',
        focus: '>95% max sprint exposure under fatigue + chaos ground-ball Pickups',
        details:
          'Full speed inoculation (2x weekly max-velocity hits) and objective <5% limb asymmetry sign-off for unrestricted club training.',
      },
    ],
    metricsTracked: [
      'Seated Soleus Isometric Peak Force (% BW)',
      'Nordic Hamstring Eccentric Force (Newtons & L/R %)',
      'Adductor:Abductor Hip Force Ratio',
      '10/5 Reactive Strength Index (RSI)',
    ],
  },
];

export const COACH_PROFILES: CoachProfile[] = [
  {
    id: 'coach-callum',
    name: 'Callum Vance, B.HumMov (Hons), ASCA L2',
    role: 'Founder & Head of Athletic Performance',
    degree: 'Bachelor of Human Movement (Honours) — University of South Australia',
    accreditations: [
      'ASCA Level 2 Professional Strength & Conditioning Coach',
      'SANFL & AFL Level 2 Talent Pathway Coaching Accreditation',
      'VALD ForceDecks & NordBord Certified Practitioner',
    ],
    playingBackground: '140+ Senior Games (SANFL League/Reserves & Adelaide Footy League Div 1)',
    specialty: 'Maximal 3RM Force Transfer, MAS Conditioning & High-Speed Hamstring Mechanics',
    bio: 'Born and raised in Adelaide’s North-East, Callum founded Northern Edge Footy after seeing talented local juniors and Div 1 senior players break down with preventable soft-tissue injuries or plateau from generic bodybuilder gym programs.',
  },
  {
    id: 'coach-lachlan',
    name: 'Lachlan Mercer, B.ExSportSc',
    role: 'Lead Skills Acquisition & Kicking Biomechanist',
    degree: 'Bachelor of Exercise & Sport Science — UniSA',
    accreditations: [
      'AFL Level 2 Specialist Kicking & Decision-Making Coach',
      'ASCA Level 1 Strength & Conditioning Coach',
      'Working With Children Check (WWCC SA) & Senior First Aid',
    ],
    playingBackground: 'Former SANFL U18 Captain & Current North-East Senior Midfielder',
    specialty: '240fps Kicking Kinematics, Non-Preferred Foot Craft & Stoppage Exit Skills',
    bio: 'Lachlan leads our 1-on-1 Kicking Lab and U14–U18 Junior Pathway. He translates complex sagittal and frontal camera angles into two simple, actionable external cues that immediately clean up ball drop and field kicking penetration.',
  },
  {
    id: 'coach-hannah',
    name: 'Hannah Lindqvist, M.HPR, B.HumMov',
    role: 'Lower-Limb Resilience & Return-to-Perform Specialist',
    degree: 'Bachelor of Human Movement & Master of High Performance Sport',
    accreditations: [
      'ESSA Accredited Exercise Scientist (AES)',
      'ASCA Level 2 S&C Specialist — Lower-Limb Tendon & Calf Rehab',
      'SANFLW & Amateur Women’s ACL / Lower-Limb Prevention Lead',
    ],
    playingBackground: 'SANFLW Senior Midfielder & State Athletics 400m/800m Finalist',
    specialty: 'Soleus Isometric Reconditioning, ACL Deceleration Mechanics & Running Economy',
    bio: 'Hannah bridges the gap between clinical rehabilitation and full-flight football speed. She oversees our Bulletproof Lower-Limb squad and running mechanics clinic for male and female footballers across the North-East.',
  },
];

export const PLAYER_CASE_STUDIES: PlayerCaseStudy[] = [
  {
    id: 'case-1',
    playerName: 'Mitch H.',
    ageAndLevel: '22 yrs · Senior Inside Midfielder',
    club: 'Tea Tree Gully District FC (Adelaide Footy League)',
    programCompleted: '2.1 Senior Pre-Season & 3RM Strength (8-Week Intake)',
    timeframe: '8 Weeks (Nov–Jan Pre-Season Block)',
    twoKmBefore: '7:14',
    twoKmAfter: '6:27',
    twoKmDelta: '-47 sec (-10.8%)',
    threeRmLift: 'Trap-Bar Deadlift 3RM',
    threeRmBefore: '140.0 kg',
    threeRmAfter: '182.5 kg',
    threeRmDelta: '+42.5 kg (+30.4%)',
    kickingOrLimbMetric: '10m Burst Split: 1.81s → 1.66s · Zero soft-tissue games missed in 18-round season',
    quote:
      'I used to slog through 5km pavement runs every off-season and still blow up in the third quarter. Switching to calibrated MAS turf grids and heavy trap-bar 3RM work took 47 seconds off my 2km time trial and gave me real separation out of centre bounces.',
  },
  {
    id: 'case-2',
    playerName: 'Xavier T.',
    ageAndLevel: '16 yrs · U16 / U18 SANFL Pathway Wing & Half-Back',
    club: 'Modbury Hawks FC / Norwood U16 Development Squad',
    programCompleted: '2.2 Junior Pathway (U14–U18) + 1-on-1 Kicking Lab',
    timeframe: '8 Weeks (Term 4 Development Intake)',
    twoKmBefore: '6:58',
    twoKmAfter: '6:22',
    twoKmDelta: '-36 sec (-8.6%)',
    threeRmLift: ' Trap-Bar Technical 3RM',
    threeRmBefore: '85.0 kg',
    threeRmAfter: '115.0 kg',
    threeRmDelta: '+30.0 kg (+35.3%)',
    kickingOrLimbMetric: 'Drop-Punt Effective Range: 38m → 51m · Non-Preferred Efficiency: 45% → 82%',
    quote:
      'Seeing my ball drop on the 240fps camera showed me why my kicks were floating right whenever I was sprinting. Fixing my guide hand and plant foot stability added 13 metres to my kick and helped me make the final SANFL U16 squad cut.',
  },
  {
    id: 'case-3',
    playerName: 'Declan R.',
    ageAndLevel: '26 yrs · Senior Key Half-Forward',
    club: 'Golden Grove FC',
    programCompleted: '2.3 Bulletproof Lower-Limb + Senior Strength',
    timeframe: '8 Weeks (Late Off-Season Rehab-to-Perform)',
    twoKmBefore: '7:28',
    twoKmAfter: '6:44',
    twoKmDelta: '-44 sec (-9.8%)',
    threeRmLift: 'Back Squat 3RM',
    threeRmBefore: '112.5 kg',
    threeRmAfter: '145.0 kg',
    threeRmDelta: '+32.5 kg (+28.9%)',
    kickingOrLimbMetric: 'Seated Soleus Isometric: 1.32x BW (L) → 2.04x BW (L) · Asymmetry reduced from 21.4% to 2.6%',
    quote:
      'After tearing my left soleus twice in two seasons, I thought my body just couldn’t handle senior footy anymore. The seated isometric testing exposed a massive 21% calf deficit. Eight weeks later I hit top speed with complete confidence.',
  },
];

export const WEEKLY_TIMETABLE: TimetableSlot[] = [
  {
    id: 'tt-mon-1',
    day: 'Monday',
    time: '16:30 – 17:30',
    programTitle: '2.2 Junior Pathway (U14–U16) Safe S&C + Kicking Lab',
    programId: 'junior-pathway',
    sessionType: 'Group Squad',
    ageBracket: 'U14–U16',
    coach: 'Lachlan Mercer',
    spotsLeft: 3,
    maxCapacity: 10,
  },
  {
    id: 'tt-mon-2',
    day: 'Monday',
    time: '18:00 – 19:15',
    programTitle: '2.1 Senior Pre-Season: 3RM Lower-Body Force & Contrast Power',
    programId: 'senior-strength',
    sessionType: 'Group Squad',
    ageBracket: 'Senior & U18',
    coach: 'Callum Vance',
    spotsLeft: 2,
    maxCapacity: 12,
  },
  {
    id: 'tt-tue-1',
    day: 'Tuesday',
    time: '16:30 – 17:30',
    programTitle: '1-on-1 Kicking Biomechanics & Video Mentoring Pod',
    programId: 'junior-pathway',
    sessionType: '1-on-1 Mentoring',
    ageBracket: 'U14–Senior',
    coach: 'Lachlan Mercer',
    spotsLeft: 1,
    maxCapacity: 2,
  },
  {
    id: 'tt-tue-2',
    day: 'Tuesday',
    time: '17:45 – 18:45',
    programTitle: '2.3 Bulletproof Lower-Limb: Soleus Iso & Nordic Eccentric Pod',
    programId: 'bulletproof-limb',
    sessionType: 'Group Squad',
    ageBracket: 'All Ages',
    coach: 'Hannah Lindqvist',
    spotsLeft: 4,
    maxCapacity: 8,
  },
  {
    id: 'tt-wed-1',
    day: 'Wednesday',
    time: '16:30 – 17:45',
    programTitle: '2.2 Junior Pathway (U16–U18) SANFL Combine Speed & Kicking',
    programId: 'junior-pathway',
    sessionType: 'Group Squad',
    ageBracket: 'U16–U18',
    coach: 'Callum Vance & Lachlan Mercer',
    spotsLeft: 2,
    maxCapacity: 10,
  },
  {
    id: 'tt-wed-2',
    day: 'Wednesday',
    time: '18:15 – 19:30',
    programTitle: '2.1 Senior Turf Session: MAS Conditioning Grids & Fatigued Skill',
    programId: 'senior-strength',
    sessionType: 'Group Squad',
    ageBracket: 'Senior & U18',
    coach: 'Callum Vance',
    spotsLeft: 3,
    maxCapacity: 14,
  },
  {
    id: 'tt-thu-1',
    day: 'Thursday',
    time: '16:30 – 17:30',
    programTitle: 'Initial Movement, Force Plate & 3RM Assessment Intake',
    programId: 'senior-strength',
    sessionType: '3RM & Movement Screening',
    ageBracket: 'U14–Senior',
    coach: 'Hannah Lindqvist',
    spotsLeft: 2,
    maxCapacity: 4,
  },
  {
    id: 'tt-thu-2',
    day: 'Thursday',
    time: '18:00 – 19:15',
    programTitle: '2.1 Senior Upper/Rotational Grapple Power + Hamstring Speed',
    programId: 'senior-strength',
    sessionType: 'Group Squad',
    ageBracket: 'Senior & U18',
    coach: 'Callum Vance',
    spotsLeft: 4,
    maxCapacity: 12,
  },
  {
    id: 'tt-fri-1',
    day: 'Friday',
    time: '16:00 – 17:00',
    programTitle: '1-on-1 Position-Specific Midfield / Forward Craft Mentoring',
    programId: 'junior-pathway',
    sessionType: '1-on-1 Mentoring',
    ageBracket: 'U14–Senior',
    coach: 'Lachlan Mercer',
    spotsLeft: 2,
    maxCapacity: 2,
  },
  {
    id: 'tt-sat-1',
    day: 'Saturday',
    time: '08:00 – 09:15',
    programTitle: 'North-East Adelaide Combined Turf Sprint, MAS & Kicking Lab',
    programId: 'senior-strength',
    sessionType: 'Group Squad',
    ageBracket: 'U16–Senior',
    coach: 'Full Coaching Team',
    spotsLeft: 5,
    maxCapacity: 16,
  },
  {
    id: 'tt-sat-2',
    day: 'Saturday',
    time: '09:30 – 10:30',
    programTitle: 'Weekend Trial Assessment: Movement, Kicking & 3RM Screening',
    programId: 'junior-pathway',
    sessionType: '3RM & Movement Screening',
    ageBracket: 'U14–Senior',
    coach: 'Callum Vance & Hannah Lindqvist',
    spotsLeft: 3,
    maxCapacity: 4,
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'tier-screening',
    name: 'Initial Trial Movement & 3RM Assessment',
    cadence: 'Single 60-Min Diagnostic Session',
    priceAud: 89,
    billingNote: 'Credited in full toward any 8-Week Intake Squad if you enrol within 7 days',
    idealFor: 'New Senior or Junior athletes starting with Northern Edge Footy',
    inclusions: [
      '60-min 1-on-1 assessment at our Holden Hill Performance Lab',
      'Dual Force Plate jump profile & Seated Soleus Isometric test',
      'Age-appropriate 3RM Strength or 240fps Kicking Video baseline',
      'Individualized 8-Week North-East Adelaide training roadmap report',
    ],
    ctaLabel: 'Book $89 Trial Assessment',
    defaultSessionType: '3RM & Movement Screening',
  },
  {
    id: 'tier-squad',
    name: '8-Week Development Squad (2x / Week)',
    cadence: 'Per Week · 8-Week Block Commitment',
    priceAud: 68,
    billingNote: 'Billed weekly ($544 total block) · Capped at 10–12 athletes per squad',
    idealFor: 'Senior Pre-Season (2.1), Junior Pathway (2.2), or Bulletproof Lower-Limb (2.3)',
    inclusions: [
      '2x Coach-led small-group sessions per week (Gym S&C + Turf Speed/Kicking)',
      'Week 1 & Week 8 2km MAS time-trial and 3RM strength testing included',
      'Individualized load prescriptions delivered via mobile athlete portal',
      'Complimentary access to Saturday morning North-East turf running group',
    ],
    ctaLabel: 'Reserve Squad Spot',
    defaultSessionType: 'Group Squad',
  },
  {
    id: 'tier-mentoring',
    name: '1-on-1 Skills & Athletic Mentoring Pack',
    cadence: 'Per 45-Min Private Session (or $420 for 4-Pack)',
    priceAud: 115,
    billingNote: 'Flexible calendar booking · Ideal alongside local club training',
    idealFor: 'Targeted kicking biomechanics overhaul, combine prep, or return-to-run rehab',
    inclusions: [
      '45-min private 1-on-1 session with Lachlan, Callum, or Hannah',
      '240fps high-speed video voiceover breakdown sent to player & parent after every session',
      'Position-specific stoppage craft, leading patterns, or lower-limb dynamometry',
      'Direct WhatsApp/email check-ins with your mentor between club matches',
    ],
    ctaLabel: 'Book 1-on-1 Mentoring Slot',
    defaultSessionType: '1-on-1 Mentoring',
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'mas-running-2km-time-trial',
    title: 'Maximal Aerobic Speed (MAS) vs. Pavement Plodding: How to Cut 40 Seconds Off Your 2km Time Trial',
    category: 'Running',
    publishedDate: '18 October 2026',
    readTime: '6 min read',
    author: 'Callum Vance, B.HumMov (Hons)',
    excerpt:
      'Why running continuous 5km road loops in November leaves Adelaide footballers slow at centre bounces—and how 110–120% MAS shuttle grids build a genuine four-quarter engine.',
    keyTakeaway:
      'A 6:30 2km time-trial requires an average speed of 5.13 m/s. Training exclusively at 3.8 m/s on suburban footpaths never recruits the fast-twitch oxidative fibres required in AFL transition.',
    contentSections: [
      {
        heading: 'The Physiology of the AFL 2km Time Trial',
        body: 'Across SANFL and Adelaide Footy League Division 1 clubs, the 2km time trial remains the gold-standard pre-season gatekeeper. However, match GPS telemetry shows that footballers rarely run at a steady state. Instead, midfielders and half-backs perform 120 to 160 high-intensity surging efforts (>19.8 km/h) interspersed with walking or jogging recovery.',
      },
      {
        heading: 'Calculating Your 100% MAS Speed on North-East Turf',
        body: 'To calculate your Maximal Aerobic Speed, divide your 1.2km shuttle distance (1,200m) by your completion time in seconds. For example, completing 1,200m in 250 seconds yields a 100% MAS of 4.80 m/s. Once we know your exact MAS, we program supramaximal Eurofit grids where you run at 115% MAS for 15 seconds, followed by 15 seconds passive rest.',
        prescriptionTable: [
          { variable: 'Weeks 1–2 (Long Intervals)', target: '3 sets x (4 reps of 60s @ 100% MAS / 60s active jog)' },
          { variable: 'Weeks 3–5 (Eurofit 15/15 Grids)', target: '2 sets x (12 reps of 15s @ 115% MAS / 15s passive rest)' },
          { variable: 'Weeks 6–8 (Repeat-Sprint Shuttle)', target: '2 sets x (10 reps of 10s @ 125% MAS w/ 180° turf cut)' },
        ],
      },
    ],
  },
  {
    id: 'soleus-strength-fourth-quarter-calf',
    title: 'Why Seated Soleus Force Dictates Fourth-Quarter Kicking Penetration & Calf Survival',
    category: 'Recovery',
    publishedDate: '09 October 2026',
    readTime: '5 min read',
    author: 'Hannah Lindqvist, M.HPR, B.HumMov',
    excerpt:
      'During mid-stance acceleration and ground-ball deceleration, the bent-knee soleus absorbs up to 6.5x bodyweight. Standing straight-leg calf raises leave half your lower limb unconditioned.',
    keyTakeaway:
      'Athletes testing below 1.65x bodyweight on our seated 90-degree isometric calf rig are 3.4x more likely to suffer mid-season calf tightness or Achilles overload.',
    contentSections: [
      {
        heading: 'Gastrocnemius vs. Soleus Mechanics in Football',
        body: 'Whenever a footballer decelerates into a contested ground ball or plants their support leg to launch a 50-metre drop punt, the knee is flexed between 25 and 45 degrees. At flexed knee angles, the bi-articular gastrocnemius slackens, placing the overwhelming majority of tendon load squarely onto the deep soleus muscle.',
      },
      {
        heading: 'The 1.85x Bodyweight Benchmark',
        body: 'At Northern Edge Footy in Holden Hill, every incoming athlete completes a seated isometric calf push on our force rig. Before progressing to high-volume reactive plyometrics, we build baseline tissue capacity using Heavy Slow Resistance (HSR) and 5-second maximal isometric holds.',
        prescriptionTable: [
          { variable: 'Diagnostic Benchmark', target: '≥ 1.85x Bodyweight Peak Force (< 5% L/R Asymmetry)' },
          { variable: 'Pre-Turf Potentiation', target: '4 sets x 6-second Seated Isometric Push @ 85% Max Effort' },
          { variable: 'Gym Strength Block', target: '3 sets x 8 reps Seated Calf Raise (3s eccentric, 1s pause)' },
        ],
      },
    ],
  },
  {
    id: 'biomechanics-50m-drop-punt-kicking',
    title: 'The Biomechanics of the 50-Metre Drop Punt: Support-Leg Braking & Shank Angular Velocity',
    category: 'Kicking',
    publishedDate: '27 September 2026',
    readTime: '7 min read',
    author: 'Lachlan Mercer, B.ExSportSc',
    excerpt:
      'Kicking distance is not generated by swinging harder with your upper body. High-speed 240fps analysis of U16 and U18 players reveals the 3 kinematic levers that add 10 metres effortlessly.',
    keyTakeaway:
      'A firm, braced plant leg acts as a catapult hinge—converting linear run-up momentum into angular shank velocity exceeding 1,450 degrees per second.',
    contentSections: [
      {
        heading: 'Fix #1: Single-Hand Guide Control & Ball Drop Alignment',
        body: 'The most common fault we film in U14–U18 players across North-East Adelaide is pulling the non-guiding hand off the football asymmetrically while leaning backward. This tilts the nose of the Sherrin upward, creating floaters that hang in the breeze. Training a vertical torso lean with a single-hand guide down the kicking line stabilizes impact.',
      },
      {
        heading: 'Fix #2: Plant-Leg Braking Impulse & Hip Extension',
        body: 'If your support knee collapses excessively (>35° flexion) after ground contact, energy leaks into the turf instead of transferring through the pelvis into the kicking thigh. Combining unilateral split-squat isometrics with constraint-based kicking drills immediately sharpens ball exit speed.',
        prescriptionTable: [
          { variable: 'Ball Drop Release Window', target: 'Hip of kicking leg in peak extension (tension bow)' },
          { variable: 'Support Knee Collapse', target: '< 22° flexion yield from heel strike to ball contact' },
          { variable: 'Ankle Plantarflexion Rigidity', target: 'Locked rigid foot/ankle complex through 12ms contact window' },
        ],
      },
    ],
  },
  {
    id: 'trap-bar-3rm-contested-stoppage-power',
    title: 'Why the Trap-Bar 3RM Is the Ultimate Strength Indicator for Inside Midfielders & Key Position Players',
    category: 'Strength',
    publishedDate: '14 September 2026',
    readTime: '5 min read',
    author: 'Callum Vance, B.HumMov (Hons)',
    excerpt:
      'How axial force production translates directly to first-3-step burst out of stoppages, fending tacklers, and surviving 22 rounds of senior contact.',
    keyTakeaway:
      'Moving a senior midfielder from a 1.5x bodyweight to a 2.1x bodyweight Trap-Bar 3RM consistently correlates with a 0.10s–0.16s improvement over the first 10 metres.',
    contentSections: [
      {
        heading: 'Force-Velocity Profiling Without Lower-Back Shear',
        body: 'Unlike conventional straight-bar deadlifts that place high shear torque on the lumbar spine—an area already taxed by constant bending for ground balls—the high-handle hex/trap bar aligns the load closer to the athlete’s centre of mass. This allows safer expression of maximal concentric force and seamless pairing with velocity-tracked jumps.',
      },
      {
        heading: 'French Contrast Pairing for Match Transfer',
        body: 'Lifting heavy alone only builds half the equation. Inside our Zone B strength bays, we pair heavy 3RM trap-bar sets with unloaded countermovement jumps and 10-metre laser-timed turf bursts within 90 seconds to harness Post-Activation Potentiation (PAP).',
        prescriptionTable: [
          { variable: 'Junior U16 Benchmark', target: '1.65x Bodyweight Trap-Bar 3RM with crisp neutral spine' },
          { variable: 'U18 / Colts Benchmark', target: '1.90x Bodyweight Trap-Bar 3RM + 0.75 m/s @ 1.2x BW' },
          { variable: 'Senior Div 1 / SANFL Target', target: '2.15x – 2.35x Bodyweight Trap-Bar 3RM' },
        ],
      },
    ],
  },
];

export const AUTOMATED_EMAIL_SEQUENCE = [
  {
    day: 'Day 0 (Immediate Delivery)',
    subject: '[PDF Enclosed] Your 6-Week Off-Season Running & Calf Resilience Blueprint',
    summary: 'Delivers the complete 6-week MAS calculator spreadsheet, turf cone layout diagrams, and seated/standing calf capacity progression.',
  },
  {
    day: 'Day 2 (Diagnostic Self-Test)',
    subject: 'How to Run the Single-Leg Knee-to-Wall & 30-Second Calf Capacity Self-Audit at Home',
    summary: 'Walks players and parents through a 4-minute living-room mobility and endurance test to flag hidden left-to-right ankle deficits.',
  },
  {
    day: 'Day 5 (North-East Turf Video Breakdown)',
    subject: 'Case Study: How Mitch Shaved 47s Off His 2km at Tea Tree Gully',
    summary: 'Breaks down the exact Tuesday/Thursday running & 3RM split used by local North-East Adelaide senior midfielders.',
  },
  {
    day: 'Day 8 (Priority Assessment Invite)',
    subject: 'Priority Slot: Lock In Your Initial Movement & 3RM Screening in Holden Hill',
    summary: 'Provides a direct priority calendar link to claim one of the remaining screening slots before the 8-Week Intake closes.',
  },
];

export const SUBURB_PROXIMITY_LIST = [
  { suburb: 'Holden Hill (Facility HQ)', distanceKm: '0.0 km', driveTime: 'On-Site · 560 North East Rd', clubsNearby: 'North-East Corridor Hub' },
  { suburb: 'Modbury & Tea Tree Gully', distanceKm: '5.4 km', driveTime: '7–9 mins via North East Rd', clubsNearby: 'Modbury Hawks · TTG District FC' },
  { suburb: 'Golden Grove & Wynn Vale', distanceKm: '8.8 km', driveTime: '11 mins via McIntyre Rd', clubsNearby: 'Golden Grove Kookaburras' },
  { suburb: 'Campbelltown & Paradise', distanceKm: '4.1 km', driveTime: '6 mins via Lower North East Rd', clubsNearby: 'Payneham NU · Rostrevor / Norwood' },
  { suburb: 'Norwood & St Peters', distanceKm: '7.9 km', driveTime: '12 mins via Portrush Rd', clubsNearby: 'Norwood Redlegs SANFL Zone' },
];

export const STRAVA_COMMUNITY_LEADERBOARD = [
  { rank: 1, athlete: 'Mitch H. (TTG Div 1)', session: '1.2km MAS Turf Time-Trial', metric: '3:44 (5.35 m/s)', elevationOrHr: '186 bpm Peak · Holden Hill Oval' },
  { rank: 2, athlete: 'Sam K. (Norwood U18)', session: 'Eurofit 15s/15s @ 115% MAS', metric: '4.42 km Volume', elevationOrHr: '24 Shuttles Completed @ 6.1 m/s' },
  { rank: 3, athlete: 'Xavier T. (Modbury U16)', session: '2km Pre-Season Benchmark', metric: '6:22 Personal Best', elevationOrHr: '-36s vs Oct Baseline' },
  { rank: 4, athlete: 'Liam B. (Golden Grove)', session: 'Saturday Morning Turf Repeat Sprint', metric: '8.89 m/s Top Speed', elevationOrHr: '16x 40m Decel Efforts' },
];

export const INSTAGRAM_REEL_HIGHLIGHTS = [
  {
    id: 'ig-1',
    handle: '@northernedgefooty',
    postedAgo: '2 days ago',
    title: 'U16 Kicking Lab: Fixing the Two-Handed Ball Drop Drift in 20 Minutes',
    stats: '4,820 plays · 312 saves · Filmed at Holden Hill Zone A Turf',
    takeaway: 'Notice how keeping the right elbow tucked over the hip line stops the ball nose tilting sideways at release.',
  },
  {
    id: 'ig-2',
    handle: '@northernedgefooty',
    postedAgo: '5 days ago',
    title: 'Friday Night Senior Squad: 180kg Trap-Bar Triples into 10m Laser Hurdle Bursts',
    stats: '6,190 plays · 428 saves · Zone B Heavy Strength Bays',
    takeaway: 'Contrast pairing heavy axial force with immediate unweighted acceleration—mean bar velocity held above 0.64 m/s.',
  },
  {
    id: 'ig-3',
    handle: '@northernedgefooty',
    postedAgo: '1 week ago',
    title: 'Why Your Calves Cramp in Round 1 (And the Seated 2.0x BW Fix)',
    stats: '5,410 plays · 519 saves · Zone C VALD Force Deck',
    takeaway: 'Hannah breaks down why bent-knee soleus isometric testing is non-negotiable before ramping high-speed running.',
  },
];

export const INITIAL_CALENDAR_SLOTS: CalendarSlotOption[] = [
  {
    id: 'slot-1',
    dateIso: '2026-11-03',
    dayLabel: 'Tuesday',
    dateShort: '03 Nov',
    time: '16:30 – 17:30',
    sessionType: '1-on-1 Mentoring',
    coach: 'Lachlan Mercer',
    bay: 'Zone A Kicking Radar Bay',
    spotsAvailable: 1,
  },
  {
    id: 'slot-2',
    dateIso: '2026-11-03',
    dayLabel: 'Tuesday',
    dateShort: '03 Nov',
    time: '17:45 – 18:45',
    sessionType: 'Group Squad',
    coach: 'Hannah Lindqvist',
    bay: 'Zone C Lower-Limb Resilience Pod',
    spotsAvailable: 3,
  },
  {
    id: 'slot-3',
    dateIso: '2026-11-04',
    dayLabel: 'Wednesday',
    dateShort: '04 Nov',
    time: '16:30 – 17:45',
    sessionType: 'Group Squad',
    coach: 'Callum Vance & Lachlan Mercer',
    bay: 'Zone A+B Junior Pathway (U14–U18)',
    spotsAvailable: 2,
  },
  {
    id: 'slot-4',
    dateIso: '2026-11-04',
    dayLabel: 'Wednesday',
    dateShort: '04 Nov',
    time: '18:15 – 19:30',
    sessionType: 'Group Squad',
    coach: 'Callum Vance',
    bay: 'Holden Hill Turf + Zone B Senior Squad',
    spotsAvailable: 3,
  },
  {
    id: 'slot-5',
    dateIso: '2026-11-05',
    dayLabel: 'Thursday',
    dateShort: '05 Nov',
    time: '16:30 – 17:30',
    sessionType: '3RM & Movement Screening',
    coach: 'Hannah Lindqvist',
    bay: 'Zone C Force Plate & 3RM Diagnostic Bay',
    spotsAvailable: 2,
  },
  {
    id: 'slot-6',
    dateIso: '2026-11-05',
    dayLabel: 'Thursday',
    dateShort: '05 Nov',
    time: '17:45 – 18:45',
    sessionType: '3RM & Movement Screening',
    coach: 'Callum Vance',
    bay: 'Zone B+C Senior 3RM & MAS Screening',
    spotsAvailable: 2,
  },
  {
    id: 'slot-7',
    dateIso: '2026-11-06',
    dayLabel: 'Friday',
    dateShort: '06 Nov',
    time: '16:00 – 16:45',
    sessionType: '1-on-1 Mentoring',
    coach: 'Lachlan Mercer',
    bay: 'Zone A 240fps Kicking & Midfield Craft',
    spotsAvailable: 1,
  },
  {
    id: 'slot-8',
    dateIso: '2026-11-06',
    dayLabel: 'Friday',
    dateShort: '06 Nov',
    time: '17:00 – 18:00',
    sessionType: '3RM & Movement Screening',
    coach: 'Callum Vance',
    bay: 'Zone C Force Plate & 3RM Diagnostic Bay',
    spotsAvailable: 3,
  },
  {
    id: 'slot-9',
    dateIso: '2026-11-07',
    dayLabel: 'Saturday',
    dateShort: '07 Nov',
    time: '08:00 – 09:15',
    sessionType: 'Group Squad',
    coach: 'Full Coaching Team',
    bay: 'North-East Adelaide Turf MAS & Kicking',
    spotsAvailable: 4,
  },
  {
    id: 'slot-10',
    dateIso: '2026-11-07',
    dayLabel: 'Saturday',
    dateShort: '07 Nov',
    time: '09:30 – 10:30',
    sessionType: '3RM & Movement Screening',
    coach: 'Callum Vance & Hannah Lindqvist',
    bay: 'Zone A+C Weekend Trial Assessment Intake',
    spotsAvailable: 3,
  },
];
