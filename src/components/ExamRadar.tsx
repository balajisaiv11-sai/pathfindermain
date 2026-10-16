import React, { useState } from 'react';
import { entranceExamsList } from '../data/examsData';
import { EntranceExam } from '../types';
import { Search, ExternalLink, Bookmark, CheckCircle2, Calendar, Award, AlertCircle, Compass } from 'lucide-react';

interface ExamRadarProps {
  bookmarkedIds: string[];
  onToggleBookmark: (item: { id: string; title: string; type: 'stream' | 'career' | 'exam' }) => void;
  onNavigateToCounselor: (prefilledQuery?: string) => void;
  initialFilter?: string;
}

export const ExamRadar: React.FC<ExamRadarProps> = ({
  bookmarkedIds,
  onToggleBookmark,
  onNavigateToCounselor,
  initialFilter = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedExam, setSelectedExam] = useState<EntranceExam | null>(null);

  const categories = [
    { id: 'all', label: 'All Exams' },
    { id: 'engineering', label: 'Engineering (JEE/BITSAT)' },
    { id: 'medical', label: 'Medical (NEET)' },
    { id: 'central_uni', label: 'Central Uni (CUET)' },
    { id: 'law', label: 'Law (CLAT)' },
    { id: 'management', label: 'Management (IPMAT)' },
    { id: 'design', label: 'Design (UCEED/NID)' },
    { id: 'pure_science', label: 'Pure Science (IAT/NEST)' },
    { id: 'defense', label: 'Defense (NDA)' },
  ];

  const filteredExams = entranceExamsList.filter((exam) => {
    const matchesCat = selectedCategory === 'all' || exam.streamCategory === selectedCategory;
    const matchesSearch =
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.targetCourses.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      exam.conductingBody.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-3 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>National Entrance Exam Directory & Timeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight mb-3">
            National Entrance Exam Radar
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
            Verified schedules, eligibility criteria, exam patterns, conducting bodies, and official portal links for India\'s key national and state entrance tests.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exam name (JEE, NEET, CLAT, CUET)..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-stone-900 placeholder:text-stone-400"
          />
        </div>

        {/* Categories Tabs */}
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

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => {
          const isBookmarked = bookmarkedIds.includes(exam.id);
          return (
            <div
              key={exam.id}
              className="bg-white rounded-xl border border-stone-200 hover:border-amber-400/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                      {exam.conductingBody}
                    </div>
                    <h3 className="text-xl font-display font-bold text-stone-900">
                      {exam.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => onToggleBookmark({ id: exam.id, title: exam.name, type: 'exam' })}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark this exam'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                  </button>
                </div>

                <div className="text-xs text-stone-600 mb-3 font-medium">
                  {exam.fullName}
                </div>

                {/* Meta details */}
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-4 pb-3 border-b border-stone-100">
                  <span className="flex items-center gap-1 font-semibold text-stone-800">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    {exam.typicalMonth}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{exam.frequency}</span>
                </div>

                {/* Target Courses */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Admissions To
                  </span>
                  <p className="text-xs text-stone-700 font-medium line-clamp-2">
                    {exam.targetCourses.join(' · ')}
                  </p>
                </div>

                {/* Eligibility Summary */}
                <div className="mb-4 bg-stone-50 p-2.5 rounded-lg border border-stone-100 text-xs">
                  <span className="font-semibold text-stone-700 block mb-0.5">Eligibility:</span>
                  <p className="text-stone-600 text-[11px] leading-relaxed line-clamp-2">
                    {exam.eligibility}
                  </p>
                </div>

                {/* Key Prep Tip Snippet */}
                <div className="mb-4 text-xs text-stone-600">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="italic line-clamp-2">{exam.keyPreparationTips[0]}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <a
                  href={exam.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => onNavigateToCounselor(`What is the optimal preparation timeline and strategy for ${exam.name} (${exam.fullName})?`)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-lg transition-colors"
                >
                  Exam Strategy
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
