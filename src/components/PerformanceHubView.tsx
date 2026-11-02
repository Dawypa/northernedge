import React, { useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Download, Mail, Search } from 'lucide-react';
import {
  AUTOMATED_EMAIL_SEQUENCE,
  BLOG_ARTICLES,
  BlogArticle,
  BlogCategory,
} from '../data/clinicData';
import { downloadOffSeasonBlueprintPdf } from '../utils/downloads';

interface PerformanceHubViewProps {
  onBookScreening: (goal?: string) => void;
}

export const PerformanceHubView: React.FC<PerformanceHubViewProps> = ({ onBookScreening }) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleId, setActiveArticleId] = useState<string>(BLOG_ARTICLES[0].id);

  // Lead magnet & automated email sequence state
  const [leadName, setLeadName] = useState<string>('');
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [leadLevel, setLeadLevel] = useState<string>('Senior Amateur / SANFL (18+)');
  const [leadError, setLeadError] = useState<string>('');
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);

  const categories: BlogCategory[] = ['All', 'Strength', 'Running', 'Kicking', 'Recovery'];

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesCat = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeArticle: BlogArticle =
    BLOG_ARTICLES.find((a) => a.id === activeArticleId) ||
    filteredArticles[0] ||
    BLOG_ARTICLES[0];

  const handleLeadMagnetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim()) {
      setLeadError('Please enter the player or parent first name.');
      return;
    }
    if (!leadEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail.trim())) {
      setLeadError('Please enter a valid email address to receive the 6-Week PDF & email sequence.');
      return;
    }
    setLeadError('');
    setLeadSubmitted(true);
    downloadOffSeasonBlueprintPdf(leadName, leadLevel);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header & Category Filters */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="text-[#FF5500] font-semibold">4.0 Footy Performance Hub</span>
          <span aria-hidden="true">·</span>
          <span>Evidence-Based AFL Sports Science, Running Grids &amp; Injury Rehab</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1
              className="font-display text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              North-East Adelaide Footy Performance Hub
            </h1>
            <p className="text-base text-slate-300 mt-2 max-w-2xl">
              Research-backed conditioning guides, 240fps kicking kinematics, and soft-tissue rehab protocols written by our degree-qualified Human Movement team.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search MAS, soleus, kicking..."
                className="pl-9 pr-3 py-2 rounded-lg bg-[#111722] border border-slate-800 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5500] w-full sm:w-56"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-[#111722] border border-slate-800 rounded-lg overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#FF5500] text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Article List + Full Article Reader Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Filtered Article Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono text-slate-400">
            SHOWING {filteredArticles.length} EVIDENCE-BASED ARTICLES
          </div>
          {filteredArticles.length === 0 ? (
            <div className="p-6 rounded-xl bg-[#111722] border border-slate-800 text-sm text-slate-400 space-y-3">
              <p>No articles match your current search filter.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-3 py-1.5 rounded bg-slate-800 text-white text-xs font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredArticles.map((article) => {
              const isSelected = article.id === activeArticle.id;
              return (
                <button
                  key={article.id}
                  type="button"
                  onClick={() => setActiveArticleId(article.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-colors cursor-pointer space-y-2.5 block ${
                    isSelected
                      ? 'bg-[#151E2E] border-[#FF5500]'
                      : 'bg-[#111722] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Unboxed Metadata with Typographic Separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="text-[#FF5500] font-semibold">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publishedDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="text-xs text-slate-400 pt-1">By {article.author}</div>
                </button>
              );
            })
          )}
        </div>

        {/* Right Column: Full Interactive Article Reader */}
        <div className="lg:col-span-7 rounded-xl bg-[#111722] border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="space-y-3 border-b border-slate-800 pb-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <BookOpen className="w-3.5 h-3.5 text-[#FF5500]" />
              <span className="text-[#FF5500] font-semibold">{activeArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span>Published {activeArticle.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span>{activeArticle.readTime}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
              {activeArticle.title}
            </h2>

            <div className="text-xs text-slate-300">Authored by {activeArticle.author}</div>

            <div className="p-4 rounded-lg bg-[#0B0E14] border border-slate-800 text-xs sm:text-sm text-slate-200">
              <span className="font-semibold text-[#38BDF8]">Key Performance Takeaway: </span>
              {activeArticle.keyTakeaway}
            </div>
          </div>

          {/* Article Body Sections & Prescription Tables */}
          <div className="space-y-6">
            {activeArticle.contentSections.map((sec) => (
              <div key={sec.heading} className="space-y-3">
                <h3 className="font-display text-xl font-bold text-white">{sec.heading}</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{sec.body}</p>

                {sec.prescriptionTable && (
                  <div className="rounded-lg border border-slate-800 overflow-hidden mt-3">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-[#0B0E14] border-b border-slate-800 font-mono text-[11px] text-slate-400 uppercase">
                          <th className="py-2.5 px-3.5">Training Variable / Phase</th>
                          <th className="py-2.5 px-3.5">Holden Hill Lab Prescription</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 bg-[#0D131D]">
                        {sec.prescriptionTable.map((row) => (
                          <tr key={row.variable}>
                            <td className="py-2.5 px-3.5 font-medium text-white">
                              {row.variable}
                            </td>
                            <td className="py-2.5 px-3.5 font-mono text-slate-300 tabular-nums">
                              {row.target}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Article Bottom Conversion CTA */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-slate-300">
              Want your own {activeArticle.category.toLowerCase()} metrics tested on our Holden Hill force plates and timing gates?
            </div>
            <button
              type="button"
              onClick={() =>
                onBookScreening(
                  activeArticle.category === 'Kicking'
                    ? 'Drop-Punt Kicking Distance & Biomechanics'
                    : activeArticle.category === 'Recovery'
                    ? 'Bulletproof Calf / Hamstring Resilience'
                    : activeArticle.category === 'Running'
                    ? 'Pre-Season 2km Tank & Repeat Speed'
                    : '3RM Maximal Strength & Contested Power'
                )
              }
              className="px-4 py-2.5 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Book Diagnostic Screening</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* DOWNLOADABLE LEAD MAGNET + AUTOMATED EMAIL SEQUENCE */}
      <div className="rounded-xl bg-[#111722] border border-slate-800 p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Lead Magnet Form */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="text-[#FF5500] font-semibold">Free Pre-Season Resource</span>
              <span aria-hidden="true">·</span>
              <span>Instant Download + 4-Part Coach Email Sequence</span>
            </div>

            <h2
              className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Download the 6-Week Off-Season Running &amp; Calf Resilience Blueprint
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Get our complete North-East Adelaide off-season turf running manual—including the 1.2km/2km MAS speed calculator, Eurofit 15s/15s cone charts, and our 3x/week seated soleus and Nordic hamstring resilience routine.
            </p>

            <form onSubmit={handleLeadMagnetSubmit} className="space-y-3.5 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Player or Parent Name *
                  </label>
                  <input
                    type="text"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Jordan Walker"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0E14] border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="jordan@example.com.au"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0E14] border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Athlete Cohort</label>
                <select
                  value={leadLevel}
                  onChange={(e) => setLeadLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0E14] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                >
                  <option value="Senior Amateur / SANFL (18+)">
                    Senior Amateur / SANFL (18+)
                  </option>
                  <option value="U18 / Colts (17–18 yrs)">U18 / Colts (17–18 yrs)</option>
                  <option value="U16 Pathway (15–16 yrs)">U16 Pathway (15–16 yrs)</option>
                  <option value="U14 Junior (12–14 yrs)">U14 Junior (12–14 yrs)</option>
                </select>
              </div>

              {leadError && <div className="text-xs text-rose-400 font-medium">{leadError}</div>}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="px-5 py-3 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download 6-Week Blueprint &amp; Start Sequence</span>
                </button>
              </div>

              {leadSubmitted && (
                <div className="p-3.5 rounded-lg bg-emerald-950/50 border border-emerald-700/70 text-xs text-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Blueprint Downloaded &amp; Sequence Active: </span>
                    Your personalized 6-Week Off-Season Running &amp; Calf Resilience file has downloaded, and Day 0 of our automated pre-season sequence has been queued for{' '}
                    <span className="font-mono">{leadEmail}</span>.
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right: Automated 4-Part Email Retention Sequence Preview */}
          <div className="lg:col-span-6 rounded-xl bg-[#0B0E14] border border-slate-800 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
                <Mail className="w-4 h-4" />
                <span>AUTOMATED PRE-SEASON EMAIL NURTURE SEQUENCE</span>
              </div>
              <span className="text-xs text-slate-400">
                {leadSubmitted ? 'Active for ' + leadName : '4-Step Coaching Drip'}
              </span>
            </div>

            <div className="space-y-3">
              {AUTOMATED_EMAIL_SEQUENCE.map((item, idx) => (
                <div
                  key={item.day}
                  className={`p-3.5 rounded-lg border transition-colors ${
                    leadSubmitted && idx === 0
                      ? 'bg-[#131E30] border-[#FF5500]'
                      : 'bg-[#111722] border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-mono text-[#FF5500] font-semibold">{item.day}</span>
                    {leadSubmitted && idx === 0 && (
                      <span className="text-emerald-400 font-mono">SENT &amp; DOWNLOADED</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white">{item.subject}</div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
