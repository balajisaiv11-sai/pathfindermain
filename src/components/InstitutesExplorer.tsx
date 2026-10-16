import React, { useState } from 'react';
import { topInstitutesList } from '../data/institutesData';
import { InstituteInfo } from '../types';
import { Search, Landmark, Award, IndianRupee, MapPin, ExternalLink, Sparkles, Compass } from 'lucide-react';

export const InstitutesExplorer: React.FC<{ onNavigateToCounselor: (q?: string) => void }> = ({
  onNavigateToCounselor,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'IIT', label: 'IITs' },
    { id: 'AIIMS', label: 'AIIMS' },
    { id: 'NLU', label: 'National Law Universities' },
    { id: 'IIM', label: 'IIMs (Undergrad IPM)' },
    { id: 'Central University', label: 'Central Universities (DU/BHU)' },
    { id: 'Research', label: 'Apex Research (IISc/IISER)' },
  ];

  const filtered = topInstitutesList.filter((inst) => {
    const matchesType = selectedType === 'all' || inst.type === selectedType;
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.flagshipPrograms.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inst.admissionVia.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-3 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Premier Indian Institutions of Higher Education</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight mb-3">
            Top Colleges, National Ranks & Cutoff Routes
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            From the Indian Institutes of Technology (IITs) and AIIMS to National Law Universities and IIM 5-Year IPM programs — examine programs, entrance routes, and actual fee structures.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search college, city (Mumbai, Delhi, Bangalore), or program..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-stone-900 placeholder:text-stone-400"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-stone-200/80 rounded-xl no-scrollbar">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedType === t.id
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((inst) => (
          <div
            key={inst.id}
            className="bg-white rounded-xl border border-stone-200 hover:border-amber-400/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                  {inst.type}
                </span>
                <span className="text-[11px] font-medium text-stone-500">{inst.nirfTier}</span>
              </div>

              <h3 className="text-lg font-display font-bold text-stone-900 mb-1">
                {inst.name}
              </h3>

              <div className="flex items-center gap-1 text-xs text-stone-500 mb-4">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>{inst.location}</span>
              </div>

              {/* Highlights */}
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {inst.highlight}
              </p>

              {/* Programs */}
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  Flagship Programs
                </span>
                <div className="flex flex-wrap gap-1">
                  {inst.flagshipPrograms.map((prog, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium bg-stone-100 text-stone-800 px-2 py-0.5 rounded border border-stone-200/60"
                    >
                      {prog}
                    </span>
                  ))}
                </div>
              </div>

              {/* Admission Via & Fees */}
              <div className="space-y-1.5 p-3 rounded-lg bg-stone-50 border border-stone-100 text-xs mb-4">
                <div>
                  <span className="font-semibold text-stone-500">Entrance Route: </span>
                  <span className="font-semibold text-amber-800">{inst.admissionVia.join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-500">Approx. Fee: </span>
                  <span className="text-stone-700">{inst.approxFeePerYear}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateToCounselor(`What rank and marks are needed to secure admission into ${inst.name} and what is the typical cutoff?`)}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask About Cutoffs & Seats</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
