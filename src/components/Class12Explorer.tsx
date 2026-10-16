import React, { useState } from 'react';
import { class12CareerPaths } from '../data/pathwaysData';
import { CareerPath } from '../types';
import { Search, Bookmark, ArrowRight, X, Sparkles, Building2, Clock, IndianRupee, Trophy, Compass } from 'lucide-react';

interface Class12ExplorerProps {
  bookmarkedIds: string[];
  onToggleBookmark: (item: { id: string; title: string; type: 'stream' | 'career' | 'exam' }) => void;
  onNavigateToCounselor: (prefilledQuery?: string) => void;
  onNavigateToExams: (examFilter?: string) => void;
}

export const Class12Explorer: React.FC<Class12ExplorerProps> = ({
  bookmarkedIds,
  onToggleBookmark,
  onNavigateToCounselor,
  onNavigateToExams,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);

  const categories = [
    { id: 'all', label: 'All Domains' },
    { id: 'tech', label: 'Tech & Engineering' },
    { id: 'medical', label: 'Medicine & Healthcare' },
    { id: 'business', label: 'Finance & Management' },
    { id: 'law', label: 'Law & Governance' },
    { id: 'design', label: 'Design & Creative' },
    { id: 'research', label: 'Pure Science Research' },
    { id: 'defense', label: 'Defense (NDA)' },
  ];

  const filteredCareers = class12CareerPaths.filter((path) => {
    const matchesCategory = selectedCategory === 'all' || path.category === selectedCategory;
    const matchesSearch =
      path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.typicalDegrees.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
      path.topEntranceExams.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase())) ||
      path.streamRequired.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-3 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Class 12 Higher Secondary Milestone</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight mb-3">
            Undergraduate Degrees & Career Roadmaps
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
            Beyond standard engineering and medical coaching: Discover high-trajectory careers in AI, Corporate Law, 
            Integrated Management (IPM at IIMs), Design, Pure Research (IISc/IISER), and Officer commissions.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateToCounselor('I am in Class 12. How should I balance board exams with competitive entrance exam preparation?')}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs sm:text-sm rounded-lg transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              Ask AI Counselor for Exam Strategy
            </button>
            <button
              onClick={() => onNavigateToExams()}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs sm:text-sm rounded-lg border border-stone-700 transition-colors"
            >
              View 2025-2026 Entrance Exam Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Search & Domain Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search degrees, exams (JEE, NEET, CLAT), or skills..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-stone-900 placeholder:text-stone-400"
          />
        </div>

        {/* Categories scroll */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-stone-200/80 rounded-xl no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Careers Grid */}
      {filteredCareers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
          <p className="text-stone-500 text-sm mb-3">No career paths matched your filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100"
          >
            Clear Search & Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((path) => {
            const isBookmarked = bookmarkedIds.includes(path.id);
            return (
              <div
                key={path.id}
                className="bg-white rounded-xl border border-stone-200 hover:border-amber-400/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                        Requires: {path.streamRequired}
                      </div>
                      <h3 className="text-lg font-display font-bold text-stone-900">
                        {path.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => onToggleBookmark({ id: path.id, title: path.title, type: 'career' })}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark this path'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  </div>

                  {/* Typical Degrees */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                      Target Degrees
                    </span>
                    <p className="text-xs text-stone-700 font-medium line-clamp-2">
                      {path.typicalDegrees.join(' · ')}
                    </p>
                  </div>

                  {/* Key Stats: Duration & Package */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 bg-stone-50 rounded-lg border border-stone-100 text-xs">
                    <div className="flex items-center gap-1.5 text-stone-600">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{path.durationYears}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{path.entrySalaryRange}</span>
                    </div>
                  </div>

                  {/* Top Entrance Exams */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                      Key Entrance Exams
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {path.topEntranceExams.map((exam, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200/70 px-2 py-0.5 rounded"
                        >
                          {exam}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top Institutes Preview */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                      Premier Colleges
                    </span>
                    <p className="text-xs text-stone-600 truncate">
                      {path.topCollegesIndia.slice(0, 3).join(', ')}
                    </p>
                  </div>
                </div>

                {/* Open Detailed Roadmap */}
                <button
                  onClick={() => setSelectedCareer(path)}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-lg transition-colors"
                >
                  <span>View 4-Stage Career Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Career Roadmap Modal */}
      {selectedCareer && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-stone-200">
            <button
              onClick={() => setSelectedCareer(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                <span>Domain: {selectedCareer.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedCareer.durationYears}</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-stone-900 mb-2">
                {selectedCareer.title}
              </h3>
              <p className="text-xs text-stone-600">
                Eligibility requirement: <strong className="text-stone-800">{selectedCareer.streamRequired}</strong>
              </p>
            </div>

            {/* Day in the Life */}
            <div className="mb-6 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                What Does a Professional in this Field Actually Do Daily?
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {selectedCareer.workDaySummary}
              </p>
            </div>

            {/* Compensation & Mid Career Outlook */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  <IndianRupee className="w-3.5 h-3.5" />
                  Entry Salary Range
                </div>
                <div className="text-base font-bold text-emerald-950 mb-1">{selectedCareer.entrySalaryRange}</div>
                <p className="text-xs text-stone-600">At campus recruitment / junior officer level</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-100/80 border border-stone-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  <Trophy className="w-3.5 h-3.5" />
                  Mid-Career Outlook (5–10 Yrs)
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">{selectedCareer.midCareerOutlook}</p>
              </div>
            </div>

            {/* Step-by-Step 4-Stage Roadmap */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
                4-Stage Execution Roadmap
              </span>
              <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-stone-200">
                {selectedCareer.roadmapSteps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-3 pl-8">
                    <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white shadow-xs" />
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 w-full">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-stone-900">{step.stage}</span>
                        <span className="text-stone-500 font-medium">{step.duration}</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">{step.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Colleges & Required Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
              <div>
                <span className="font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Top Colleges in India
                </span>
                <ul className="list-disc list-inside text-stone-700 space-y-1">
                  {selectedCareer.topCollegesIndia.map((col, i) => (
                    <li key={i}>{col}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Core Skills to Build
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareer.skillsNeeded.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-200">
              <button
                onClick={() => {
                  onToggleBookmark({ id: selectedCareer.id, title: selectedCareer.title, type: 'career' });
                }}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 flex items-center justify-center gap-2"
              >
                <Bookmark className="w-3.5 h-3.5" />
                {bookmarkedIds.includes(selectedCareer.id) ? 'Bookmarked' : 'Save Path to Bookmarks'}
              </button>

              <button
                onClick={() => {
                  setSelectedCareer(null);
                  onNavigateToCounselor(`I am interested in ${selectedCareer.title}. What are the realistic college options and preparation roadmap for someone in India?`);
                }}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask Counselor About {selectedCareer.title}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
