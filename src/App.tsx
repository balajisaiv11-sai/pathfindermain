import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Class10Explorer } from './components/Class10Explorer';
import { Class12Explorer } from './components/Class12Explorer';
import { AssessmentQuiz } from './components/AssessmentQuiz';
import { ExamRadar } from './components/ExamRadar';
import { InstitutesExplorer } from './components/InstitutesExplorer';
import { PathComparison } from './components/PathComparison';
import { AICounselor } from './components/AICounselor';
import { ScholarshipFinder } from './components/ScholarshipFinder';
import { SavedBookmarksModal } from './components/SavedBookmarksModal';
import { Compass, BookOpen, GraduationCap, Award, BrainCircuit, GitCompare, MessageSquareHeart, HeartHandshake, ShieldCheck } from 'lucide-react';

interface SavedItem {
  id: string;
  title: string;
  type: 'stream' | 'career' | 'exam';
}

export function App() {
  const [activeTab, setActiveTab] = useState<string>('class10');
  const [counselorQuery, setCounselorQuery] = useState<string>('');
  const [examCategoryFilter, setExamCategoryFilter] = useState<string>('all');
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<SavedItem[]>(() => {
    try {
      const saved = localStorage.getItem('pathfinder_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pathfinder_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Could not save bookmarks to localStorage', e);
    }
  }, [bookmarks]);

  const toggleBookmark = (item: SavedItem) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      if (exists) {
        return prev.filter((b) => b.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleNavigateToCounselor = (prefilledQuery?: string) => {
    if (prefilledQuery) {
      setCounselorQuery(prefilledQuery);
    }
    setActiveTab('counselor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToExams = (category?: string) => {
    if (category) {
      setExamCategoryFilter(category);
    }
    setActiveTab('exams');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBookmark = (item: SavedItem) => {
    if (item.type === 'stream') {
      setActiveTab('class10');
    } else if (item.type === 'career') {
      setActiveTab('class12');
    } else if (item.type === 'exam') {
      setActiveTab('exams');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarksCount={bookmarks.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'class10' && (
          <Class10Explorer
            bookmarkedIds={bookmarks.map((b) => b.id)}
            onToggleBookmark={toggleBookmark}
            onNavigateToCounselor={handleNavigateToCounselor}
          />
        )}

        {activeTab === 'class12' && (
          <Class12Explorer
            bookmarkedIds={bookmarks.map((b) => b.id)}
            onToggleBookmark={toggleBookmark}
            onNavigateToCounselor={handleNavigateToCounselor}
            onNavigateToExams={handleNavigateToExams}
          />
        )}

        {activeTab === 'assessment' && (
          <AssessmentQuiz
            onNavigateToCounselor={handleNavigateToCounselor}
          />
        )}

        {activeTab === 'exams' && (
          <ExamRadar
            bookmarkedIds={bookmarks.map((b) => b.id)}
            onToggleBookmark={toggleBookmark}
            onNavigateToCounselor={handleNavigateToCounselor}
            initialFilter={examCategoryFilter}
          />
        )}

        {activeTab === 'institutes' && (
          <InstitutesExplorer
            onNavigateToCounselor={handleNavigateToCounselor}
          />
        )}

        {activeTab === 'compare' && (
          <PathComparison
            onNavigateToCounselor={handleNavigateToCounselor}
          />
        )}

        {activeTab === 'scholarships' && (
          <ScholarshipFinder
            onNavigateToCounselor={handleNavigateToCounselor}
          />
        )}

        {activeTab === 'counselor' && (
          <AICounselor
            initialQuery={counselorQuery}
            onClearInitialQuery={() => setCounselorQuery('')}
          />
        )}
      </main>

      {/* Secondary Quick Action Bar */}
      <section className="bg-stone-100 border-t border-stone-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Aligned with National Education Policy (NEP 2020), CBSE, ICSE, and UGC/NTA Guidelines.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('scholarships')}
              className="text-stone-700 hover:text-stone-900 font-semibold underline underline-offset-4"
            >
              National Scholarships & Grants
            </button>
            <button
              onClick={() => handleNavigateToCounselor('How should I address pressure from parents or relatives about pursuing Engineering or Medicine?')}
              className="text-amber-800 hover:text-amber-900 font-semibold"
            >
              Handling Parental Expectations
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-white font-display font-bold text-sm">
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Pathfinder India</span>
            </div>
            <p className="text-center sm:text-right text-stone-500 text-[11px]">
              Dedicated to every Indian student navigating Class 10 and Class 12 with hope, curiosity, and courage.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-800 text-[11px] text-stone-500 leading-relaxed text-center sm:text-left">
            Disclaimer: Pathfinder India is an educational informational resource. Admission criteria, dates, cutoffs, and seat counts vary by academic session. Always confirm official notifications on NTA, UPSC, ICAI, State CET cells, and university portals.
          </div>
        </div>
      </footer>

      {/* Saved Bookmarks Modal */}
      <SavedBookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={removeBookmark}
        onSelectBookmark={handleSelectBookmark}
      />
    </div>
  );
}

export default App;
