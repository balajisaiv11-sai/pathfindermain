import React, { useState } from 'react';
import { GitCompare, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface ComparisonPreset {
  id: string;
  title: string;
  category: string;
  description: string;
  options: {
    name: string;
    targetAudience: string;
    durationEffort: string;
    mathRequirement: string;
    competitiveDensity: string;
    flexibilityLater: string;
    entrySalaryRange: string;
    keyPros: string[];
    keyCons: string[];
    bestDecisionVerdict: string;
  }[];
}

const comparisonPresets: ComparisonPreset[] = [
  {
    id: 'pcm_vs_pcb_vs_pcmb',
    title: 'PCM vs PCB vs PCMB (The Science Stream Dilemma)',
    category: 'Class 10 Stream',
    description: 'Deciding between Engineering gateway, Medical gateway, or taking the dual-challenge PCMB.',
    options: [
      {
        name: 'Science (PCM)',
        targetAudience: 'Students who love quantitative reasoning, physics problems, coding, or architecture.',
        durationEffort: 'High effort: 2 years board prep + JEE/BITSAT practice.',
        mathRequirement: 'Mandatory and rigorous.',
        competitiveDensity: 'Extreme (JEE Main ~14 lakh candidates).',
        flexibilityLater: 'Highest: Can switch to Commerce, Economics, Law, Design, or Defense after 12th.',
        entrySalaryRange: '₹6L – ₹24L (Engineering / Tech / Analytics)',
        keyPros: ['Maximum career flexibility', 'Direct eligibility for IITs, BITS, and Air Force NDA'],
        keyCons: ['Cannot pursue MBBS/BDS without Biology', 'High coaching pressure'],
        bestDecisionVerdict: 'Choose PCM if you enjoy math derivations and want broad tech/finance options.',
      },
      {
        name: 'Science (PCB)',
        targetAudience: 'Students with deep curiosity about human biology, medicine, diagnostics, or animal sciences.',
        durationEffort: 'High effort: Extensive memorization of NCERT + NEET mock tests.',
        mathRequirement: 'Not required for boards (Basic math needed for physics numericals).',
        competitiveDensity: 'Extreme (NEET-UG ~24 lakh candidates for limited MBBS seats).',
        flexibilityLater: 'Moderate: Can switch to Psychology, Forensics, Biotechnology, or Law.',
        entrySalaryRange: '₹7L – ₹14L (Doctor Residency / Biotech / Pharma)',
        keyPros: ['Noble profession with societal respect', 'Global healthcare demand'],
        keyCons: ['Long training path (5.5y MBBS + 3y MD)', 'Zero eligibility for tech engineering'],
        bestDecisionVerdict: 'Choose PCB only if you have genuine passion for biological sciences or medicine.',
      },
      {
        name: 'Science (PCMB)',
        targetAudience: 'High-stamina students who genuinely enjoy both calculus and descriptive life sciences.',
        durationEffort: 'Very High: 4 demanding science subjects simultaneously.',
        mathRequirement: 'Mandatory.',
        competitiveDensity: 'Extreme (Eligible for both JEE and NEET).',
        flexibilityLater: '100% Unrestricted: Eligible for every undergraduate degree in India.',
        entrySalaryRange: '₹7L – ₹25L (Biomedical, AI Health, Biotech, Tech)',
        keyPros: ['Zero doors closed anywhere', 'Ideal for Biomedical Engineering and Bioinformatics'],
        keyCons: ['Severe workload and high risk of burnout if attempting both JEE and NEET'],
        bestDecisionVerdict: 'Choose PCMB only if you score 85%+ comfortably in both Math and Science in Class 10.',
      },
    ],
  },
  {
    id: 'commerce_math_vs_without_math',
    title: 'Commerce with Math vs Commerce without Math',
    category: 'Class 10 Stream',
    description: 'Should you brave Mathematics alongside Accounts, or skip it for a lighter schedule?',
    options: [
      {
        name: 'Commerce with Mathematics',
        targetAudience: 'Aspiring Corporate leaders, Investment Bankers, Chartered Accountants, and Economists.',
        durationEffort: 'Moderate-High: Balanced commercial theory with calculus and statistics.',
        mathRequirement: 'Yes (Core Mathematics or Applied Mathematics).',
        competitiveDensity: 'High (CUET UG for SRCC, St. Stephen\'s).',
        flexibilityLater: 'Very High: Eligible for B.Com (Hons), B.A. Economics (Hons), Actuarial Science, and Data Analytics.',
        entrySalaryRange: '₹8L – ₹22L (Investment Banking, Consulting, CA, Big 4)',
        keyPros: ['Eligible for top DU colleges and Actuarial exams', 'Sharpens quantitative logic'],
        keyCons: ['Balancing higher math alongside accounts ledgers requires steady homework'],
        bestDecisionVerdict: 'Take Math if your Class 10 math score is above 65%. It protects your options.',
      },
      {
        name: 'Commerce without Math',
        targetAudience: 'Students who want to specialize in business management, marketing, CS, or enter family business.',
        durationEffort: 'Moderate: Less analytical stress, more time for communication and case studies.',
        mathRequirement: 'No.',
        competitiveDensity: 'Moderate.',
        flexibilityLater: 'Good for general BBA, B.Com (General), CA Foundation, Law (CLAT), Hotel Management.',
        entrySalaryRange: '₹4.5L – ₹12L (Marketing, Corporate HR, Sales, CS, CMA)',
        keyPros: ['Significantly lower stress level', 'Full eligibility for CA, CS, and CLAT Law'],
        keyCons: ['Ineligible for B.Com Hons at Delhi University and Actuarial Science programs'],
        bestDecisionVerdict: 'Pick this if math genuinely causes anxiety and your dream is General Management, Law, or CS.',
      },
    ],
  },
  {
    id: 'ca_vs_ipmat',
    title: 'Chartered Accountancy (CA) vs 5-Year IIM IPM (Management)',
    category: 'Class 12 Career',
    description: 'Comparing India\'s premier accounting credential against the direct Class 12 entry to IIMs.',
    options: [
      {
        name: 'Chartered Accountancy (CA)',
        targetAudience: 'Self-disciplined students who love accounting standards, taxation, audit, and corporate fiscal law.',
        durationEffort: '4.5 - 5 Years (Self-study + coaching + 2 years mandatory articleship).',
        mathRequirement: 'Basic business math in CA Foundation.',
        competitiveDensity: 'High pass-mark threshold set by ICAI (Pass % in CA Final ~10-20%).',
        flexibilityLater: 'High statutory prestige: Only CAs can sign audit balance sheets in India.',
        entrySalaryRange: '₹8L – ₹18L / year (Partners / CFOs earn ₹50L+)',
        keyPros: ['Extremely affordable course fee (< ₹1 Lakh total)', 'Can start an independent private practice'],
        keyCons: ['Unpredictable attempt cycles', 'Requires massive self-discipline during articleship'],
        bestDecisionVerdict: 'Pick CA if you love taxation/accounting and want high ROI with minimal college tuition.',
      },
      {
        name: '5-Year IIM IPM (Management)',
        targetAudience: 'Natural leaders, debaters, and strategic thinkers targeting top-tier management consulting.',
        durationEffort: '5 Years of full-time residential campus life at IIM Indore, Rohtak, Ranchi, etc.',
        mathRequirement: 'Rigorous higher math tested in IPMAT exam.',
        competitiveDensity: 'Extreme (Few hundred seats against 30,000+ top aspirants).',
        flexibilityLater: 'Elite: MBA degree from an IIM opens doors worldwide in McKinsey, BCG, Google, and PE funds.',
        entrySalaryRange: '₹18L – ₹32L / year',
        keyPros: ['IIM alumni network straight from high school', 'Rich holistic college campus experience'],
        keyCons: ['Higher total tuition cost (₹25L – ₹35L over 5 years, though education loans are readily available)'],
        bestDecisionVerdict: 'Pick IPMAT if you excel in aptitude tests, communication, and desire corporate executive leadership.',
      },
    ],
  },
  {
    id: 'polytechnic_vs_school',
    title: '3-Year Polytechnic Diploma vs Class 11-12 Regular School',
    category: 'Class 10 Decision',
    description: 'Should you enter practical workshop training immediately or stay in conventional school?',
    options: [
      {
        name: '3-Year Polytechnic Diploma',
        targetAudience: 'Students who learn better by doing, building, welding, and wiring rather than memorizing board textbooks.',
        durationEffort: '3 Years technical diploma directly after Class 10.',
        mathRequirement: 'Applied engineering math.',
        competitiveDensity: 'Moderate (State POLYCET entrance exams).',
        flexibilityLater: 'Lateral Entry (LEET) into 2nd year B.Tech, or direct Junior Engineer jobs in Railways/PSUs.',
        entrySalaryRange: '₹3L – ₹6L (as Diploma JE) or ₹6L – ₹15L after lateral B.Tech',
        keyPros: ['Far superior hands-on technical skills', 'Earlier job eligibility and low fees'],
        keyCons: ['Cannot easily switch to arts or commerce degrees later'],
        bestDecisionVerdict: 'Pick Polytechnic if you want practical engineering with guaranteed lateral entry into B.Tech.',
      },
      {
        name: 'Class 11 & 12 Regular School',
        targetAudience: 'Students wanting conventional broad academic grounding and targeting IITs/Central Universities.',
        durationEffort: '2 Years school + board exams + competitive coaching.',
        mathRequirement: 'Depends on stream.',
        competitiveDensity: 'Very High.',
        flexibilityLater: 'Full flexibility to write all national entrance tests.',
        entrySalaryRange: 'Depends entirely on graduation degree.',
        keyPros: ['Keeps eligibility for JEE Advanced, NEET, CLAT, CUET wide open', 'School peer experience'],
        keyCons: ['Heavy theoretical focus with minimal practical vocational skill until college'],
        bestDecisionVerdict: 'Pick Regular School if you are targeting IITs, AIIMS, NLUs, or Central Universities.',
      },
    ],
  },
];

export const PathComparison: React.FC<{ onNavigateToCounselor: (q?: string) => void }> = ({
  onNavigateToCounselor,
}) => {
  const [activePresetId, setActivePresetId] = useState<string>(comparisonPresets[0].id);

  const currentPreset = comparisonPresets.find((p) => p.id === activePresetId) || comparisonPresets[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-3 uppercase tracking-wider">
            <GitCompare className="w-4 h-4 text-amber-400" />
            <span>Head-to-Head Pathway Comparator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight mb-3">
            Compare Competing Options Side-by-Side
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Eliminate confusion: Examine entrance exam intensity, math prerequisites, salary outlook, and long-term flexibility without bias.
          </p>
        </div>
      </div>

      {/* Preset Selectors */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-stone-200/80 rounded-xl no-scrollbar">
        {comparisonPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setActivePresetId(preset.id)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activePresetId === preset.id
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {preset.title.split('(')[0]}
          </button>
        ))}
      </div>

      {/* Preset Details Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
          {currentPreset.category} Comparison
        </span>
        <h2 className="text-xl font-display font-bold text-stone-900 mb-1">
          {currentPreset.title}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600">
          {currentPreset.description}
        </p>
      </div>

      {/* Side by Side Grid */}
      <div className={`grid grid-cols-1 ${currentPreset.options.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
        {currentPreset.options.map((opt, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm hover:border-amber-400/80 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="border-b border-stone-100 pb-3 mb-4">
                <div className="text-xs font-semibold text-stone-400 mb-0.5">Option {idx + 1}</div>
                <h3 className="text-lg font-display font-bold text-stone-900">
                  {opt.name}
                </h3>
              </div>

              {/* Target Audience */}
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  Ideal Student Profile
                </span>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {opt.targetAudience}
                </p>
              </div>

              {/* Parameter Table */}
              <div className="space-y-2 mb-4 bg-stone-50 p-3 rounded-lg border border-stone-100 text-xs">
                <div>
                  <span className="font-semibold text-stone-500 block text-[11px]">Maths Requirement:</span>
                  <span className="text-stone-800">{opt.mathRequirement}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-500 block text-[11px]">Competition Level:</span>
                  <span className="font-medium text-amber-800">{opt.competitiveDensity}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-500 block text-[11px]">Future Flexibility:</span>
                  <span className="text-stone-800">{opt.flexibilityLater}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-500 block text-[11px]">Typical Starting Compensation:</span>
                  <span className="font-semibold text-emerald-700">{opt.entrySalaryRange}</span>
                </div>
              </div>

              {/* Pros */}
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  Primary Strengths
                </span>
                <ul className="text-xs text-stone-600 space-y-1">
                  {opt.keyPros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                  Watch Out For
                </span>
                <ul className="text-xs text-stone-600 space-y-1">
                  {opt.keyCons.map((con, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Verdict */}
            <div className="mt-4 pt-3 border-t border-stone-100">
              <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200/60 text-xs">
                <span className="font-bold text-amber-900 block mb-0.5">Bottom Line Verdict:</span>
                <p className="text-stone-700">{opt.bestDecisionVerdict}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ask Counselor banner */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-display font-bold text-stone-900 mb-1">
            Still undecided between these options?
          </h3>
          <p className="text-xs text-stone-600">
            Pathfinder AI Counselor can analyze your specific marks, favorite subjects, and family location.
          </p>
        </div>
        <button
          onClick={() => onNavigateToCounselor(`I am comparing ${currentPreset.title}. Here is my situation: (Type your subjects and marks). Can you guide me?`)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Ask Counselor for Verdict
        </button>
      </div>
    </div>
  );
};
