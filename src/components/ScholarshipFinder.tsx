import React, { useState } from 'react';
import { scholarshipsList } from '../data/scholarshipsData';
import { ScholarshipInfo } from '../types';
import { IndianRupee, ExternalLink, Award, CheckCircle2, Calendar, Compass, Sparkles } from 'lucide-react';

export const ScholarshipFinder: React.FC<{ onNavigateToCounselor: (q?: string) => void }> = ({
  onNavigateToCounselor,
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-3 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Financial Aid & Merit Grants</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight mb-3">
            Indian Government & Merit Scholarships
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Financial constraints should never stop a talented Indian student from reaching college. Explore central government schemes (INSPIRE, NSP), state fee-waivers, and private foundation grants.
          </p>
        </div>
      </div>

      {/* Grid of Scholarships */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scholarshipsList.map((sch) => (
          <div
            key={sch.id}
            className="bg-white rounded-xl border border-stone-200 hover:border-amber-400/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    {sch.offeredBy}
                  </div>
                  <h3 className="text-lg font-display font-bold text-stone-900">
                    {sch.title}
                  </h3>
                </div>
              </div>

              {/* Benefit Amount */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl my-3">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                  Financial Grant Amount
                </span>
                <div className="text-sm font-bold text-emerald-950">
                  {sch.financialBenefit}
                </div>
              </div>

              {/* Eligibility */}
              <div className="mb-3 text-xs">
                <span className="font-bold text-stone-700 block mb-1">Eligibility Criteria:</span>
                <p className="text-stone-600 leading-relaxed">{sch.eligibility}</p>
              </div>

              {/* Target & Timing */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-500 pt-3 border-t border-stone-100 mb-4">
                <div>
                  <span className="font-medium text-stone-700">Target Group: </span>
                  <span>{sch.targetGroup}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-800 font-medium shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{sch.applicationPeriod}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2">
              <a
                href={sch.portalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800"
              >
                <span>National Portal Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => onNavigateToCounselor(`How do I apply for ${sch.title} and what documents are required?`)}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Eligibility Help</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
