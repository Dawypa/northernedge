import React, { useState } from 'react';
import { Activity, Download, MapPin, Navigation, Share2 } from 'lucide-react';
import {
  INSTAGRAM_REEL_HIGHLIGHTS,
  STRAVA_COMMUNITY_LEADERBOARD,
  SUBURB_PROXIMITY_LIST,
} from '../data/clinicData';
import { downloadOffSeasonBlueprintPdf } from '../utils/downloads';

export const LocalSeoRetentionSection: React.FC = () => {
  const [selectedSuburbIndex, setSelectedSuburbIndex] = useState<number>(0);
  const [communityTab, setCommunityTab] = useState<'strava' | 'instagram'>('strava');
  const [quickEmail, setQuickEmail] = useState<string>('');
  const [quickSent, setQuickSent] = useState<boolean>(false);

  const handleQuickPdfDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEmail.trim() || !quickEmail.includes('@')) return;
    setQuickSent(true);
    downloadOffSeasonBlueprintPdf(quickEmail.split('@')[0], 'North-East Adelaide Athlete');
  };

  return (
    <section className="border-t border-slate-800/90 bg-[#090C12] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-1">
              <span className="text-[#FF5500] font-semibold">
                North-East Adelaide Local Hub &amp; Athlete Community
              </span>
              <span aria-hidden="true">·</span>
              <span>Holden Hill · Tea Tree Gully · Modbury · Golden Grove · Norwood</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
              Location, Strava Run Club &amp; Community Feed
            </h2>
          </div>

          {/* Quick Free Pre-Season PDF Email Trigger */}
          <form
            onSubmit={handleQuickPdfDelivery}
            className="flex flex-wrap sm:flex-nowrap items-center gap-2"
          >
            <input
              type="email"
              required
              value={quickEmail}
              onChange={(e) => setQuickEmail(e.target.value)}
              placeholder="Enter email for Free 6-Wk MAS PDF..."
              className="px-3.5 py-2 rounded-lg bg-[#111722] border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5500] w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{quickSent ? 'PDF Sent & Downloaded' : 'Get Free Pre-Season PDF'}</span>
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Embedded Google Maps Pin (North-East Adelaide) + Suburb Drive Matrix */}
          <div className="lg:col-span-6 rounded-xl bg-[#111722] border border-slate-800 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-5 border-b border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF5500]" />
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Northern Edge Footy Performance Lab
                    </h3>
                    <p className="text-xs text-slate-400">
                      Unit 4, 560 North East Road, Holden Hill SA 5088
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#38BDF8] tabular-nums">
                  -34.8439, 138.6728
                </span>
              </div>

              {/* Embedded Google Maps Iframe for North-East Adelaide */}
              <div className="relative h-64 w-full bg-[#0B0E14] border-b border-slate-800">
                <iframe
                  title="Northern Edge Footy North-East Adelaide Location Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=138.6400%2C-34.8650%2C138.7100%2C-34.8200&layer=mapnik&marker=-34.8439%2C138.6728"
                  className="w-full h-full border-0 opacity-90 contrast-125"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Suburb Drive Time Selector */}
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Navigation className="w-3.5 h-3.5 text-[#FF5500]" />
                <span>NORTH-EAST ADELAIDE CLUB CORRIDOR TRAVEL TIMES</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUBURB_PROXIMITY_LIST.map((item, idx) => (
                  <button
                    key={item.suburb}
                    type="button"
                    onClick={() => setSelectedSuburbIndex(idx)}
                    className={`text-left p-2.5 rounded-lg border transition-colors cursor-pointer ${
                      selectedSuburbIndex === idx
                        ? 'bg-[#162032] border-[#FF5500]'
                        : 'bg-[#0B0E14] border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-semibold text-white">
                      <span className="truncate">{item.suburb}</span>
                      <span className="font-mono text-[#FF5500] tabular-nums shrink-0">
                        {item.distanceKm}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                      {item.driveTime} · {item.clubsNearby}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Strava Run Club & Instagram Community Feed Integration */}
          <div className="lg:col-span-6 rounded-xl bg-[#111722] border border-slate-800 p-5 sm:p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="text-xs font-mono text-[#FF5500]">
                    COMMUNITY ACCOUNTABILITY &amp; RETENTION
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                    Strava MAS Leaderboard &amp; @northernedgefooty Reels
                  </h3>
                </div>

                {/* Toggle Buttons */}
                <div className="flex items-center gap-1 p-1 bg-[#0B0E14] border border-slate-800 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setCommunityTab('strava')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      communityTab === 'strava'
                        ? 'bg-[#FF5500] text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Strava Run Club
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommunityTab('instagram')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      communityTab === 'instagram'
                        ? 'bg-[#2563EB] text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Instagram Reels
                  </button>
                </div>
              </div>

              {communityTab === 'strava' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#FF5500]" />
                      <span>Club: Northern Edge Footy — Adelaide North-East GPS</span>
                    </span>
                    <span className="font-mono text-slate-300 tabular-nums">142 Active Members</span>
                  </div>

                  <div className="divide-y divide-slate-800/80 rounded-lg border border-slate-800 bg-[#0B0E14] overflow-hidden">
                    {STRAVA_COMMUNITY_LEADERBOARD.map((row) => (
                      <div
                        key={row.athlete}
                        className="p-3.5 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-mono text-xs font-bold text-[#FF5500] tabular-nums mt-0.5">
                            0{row.rank}.
                          </span>
                          <div>
                            <div className="text-xs sm:text-sm font-semibold text-white">
                              {row.athlete}
                            </div>
                            <div className="text-xs text-slate-400">{row.session}</div>
                          </div>
                        </div>
                        <div className="text-right font-mono tabular-nums">
                          <div className="text-xs sm:text-sm font-bold text-[#38BDF8]">
                            {row.metric}
                          </div>
                          <div className="text-[11px] text-slate-400">{row.elevationOrHr}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>Instagram Feed · @northernedgefooty</span>
                    </span>
                    <span className="font-mono text-slate-300">Holden Hill Coaching Breakdowns</span>
                  </div>

                  <div className="space-y-2.5">
                    {INSTAGRAM_REEL_HIGHLIGHTS.map((post) => (
                      <div
                        key={post.id}
                        className="p-3.5 rounded-lg bg-[#0B0E14] border border-slate-800 space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="font-mono text-[#38BDF8]">{post.handle}</span>
                          <span>{post.postedAgo}</span>
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-white">
                          {post.title}
                        </div>
                        <p className="text-xs text-slate-300">{post.takeaway}</p>
                        <div className="text-[11px] font-mono text-slate-500 pt-0.5">
                          {post.stats}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span>All squad athletes receive complimentary Strava GPS &amp; VALD portal sync.</span>
              <span className="font-mono text-slate-300">Adelaide SA 5088</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
