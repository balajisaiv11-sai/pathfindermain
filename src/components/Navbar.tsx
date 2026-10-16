import React from 'react';
import { Compass, BookOpen, GraduationCap, Award, BrainCircuit, GitCompare, MessageSquareHeart, Bookmark, Landmark } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookmarksCount,
  onOpenBookmarks,
}) => {
  const navItems = [
    { id: 'class10', label: 'Class 10 Streams', icon: BookOpen },
    { id: 'class12', label: 'Class 12 Degrees', icon: GraduationCap },
    { id: 'assessment', label: 'Stream Matcher Quiz', icon: BrainCircuit },
    { id: 'exams', label: 'Entrance Exams', icon: Award },
    { id: 'institutes', label: 'Premier Colleges', icon: Landmark },
    { id: 'compare', label: 'Compare Paths', icon: GitCompare },
    { id: 'counselor', label: 'AI Counselor', icon: MessageSquareHeart },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div 
            onClick={() => setActiveTab('class10')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg tracking-tight text-white">Pathfinder India</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/60">
                  Class 10 & 12
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">Educational & Career Compass for Indian Students</p>
            </div>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-amber-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenBookmarks}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 text-stone-200 hover:bg-stone-700 text-xs font-medium border border-stone-700 transition-colors"
              title="Saved Pathways & Exams"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Saved</span>
              {bookmarksCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 text-[11px] font-bold flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Navigation Scroll */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-stone-800/80 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950' : 'text-amber-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
