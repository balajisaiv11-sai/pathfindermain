import React, { useState } from 'react';
import { assessmentQuestions } from '../data/assessmentQuestions';
import { AssessmentResult } from '../types';
import { BrainCircuit, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, RotateCcw, Sparkles, Printer, Bookmark } from 'lucide-react';

interface AssessmentQuizProps {
  onNavigateToCounselor: (prefilledQuery?: string) => void;
  onSaveAssessmentResult?: (result: AssessmentResult) => void;
}

export const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({
  onNavigateToCounselor,
  onSaveAssessmentResult,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const totalQuestions = assessmentQuestions.length;
  const currentQ = assessmentQuestions[currentStep];

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedOptions];
    updated[currentStep] = optionIndex;
    setSelectedOptions(updated);
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateResult = () => {
    const scores = {
      analytical: 0,
      empirical: 0,
      business: 0,
      creative: 0,
      linguistic: 0,
      social: 0,
    };

    selectedOptions.forEach((optIdx, qIdx) => {
      if (optIdx !== undefined) {
        const option = assessmentQuestions[qIdx].options[optIdx];
        if (option && option.scores) {
          scores.analytical += option.scores.analytical;
          scores.empirical += option.scores.empirical;
          scores.business += option.scores.business;
          scores.creative += option.scores.creative;
          scores.linguistic += option.scores.linguistic;
          scores.social += option.scores.social;
        }
      }
    });

    // Determine top stream and careers
    let topStream = 'Science (PCM)';
    let secondaryStream = 'Commerce with Mathematics';
    let careers = ['Software & AI Engineering', 'Data Science', 'Quantitative Finance', 'Product Architecture'];
    let subjectCombo = ['Physics', 'Chemistry', 'Mathematics', 'Computer Science / Economics', 'English'];
    let exams = ['JEE Main', 'JEE Advanced', 'BITSAT'];
    let personality = 'You possess a strong analytical and quantitative mind. You derive satisfaction from logical deduction, system structures, and problem-solving.';
    let caution = 'Avoid burning out by attempting rote memorization; your strength lies in understanding core first principles. Keep an eye on practical software projects alongside board formulas.';

    // Logic for highest scoring dimension
    const maxScore = Math.max(
      scores.analytical,
      scores.empirical,
      scores.business,
      scores.creative,
      scores.linguistic,
      scores.social
    );

    if (maxScore === scores.empirical && scores.empirical > scores.analytical) {
      topStream = 'Science (PCB / Life Sciences)';
      secondaryStream = 'Biotechnology & Computational Biology';
      careers = ['Medicine & Surgery (MBBS)', 'Biotechnology Research', 'Clinical Psychology', 'Physiotherapy & Sports Health'];
      subjectCombo = ['Physics', 'Chemistry', 'Biology', 'Psychology / Biotechnology', 'English'];
      exams = ['NEET-UG', 'IAT (IISER Aptitude Test)', 'CUET UG'];
      personality = 'You have deep observational curiosity about living organisms, biological mechanisms, and human healing. You value empathy and direct health impact.';
      caution = 'NEET is highly competitive (over 20 lakh aspirants). Make sure to prepare solid alternative avenues in Allied Health, Biotechnology, or IISERs from Day 1.';
    } else if (maxScore === scores.business && scores.business >= scores.analytical) {
      topStream = 'Commerce with Mathematics';
      secondaryStream = 'Economics & Corporate Finance';
      careers = ['Chartered Accountancy (CA)', 'Integrated Management (IIM IPM)', 'Investment Banking', 'Corporate Strategy'];
      subjectCombo = ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English'];
      exams = ['IPMAT Indore/Rohtak', 'CUET UG (SRCC/St. Stephen\'s)', 'CA Foundation'];
      personality = 'You possess an instinctive commercial acumen. You are fascinated by market dynamics, corporate leadership, value creation, and fiscal strategy.';
      caution = 'Ensure you retain Mathematics with Commerce in Class 11-12. Without Mathematics, top DU programs (B.Com Hons, Economics Hons) and Actuarial Science will be closed.';
    } else if (maxScore === scores.linguistic || (scores.linguistic + scores.social >= scores.analytical + scores.empirical)) {
      topStream = 'Humanities & Social Sciences';
      secondaryStream = '5-Year Integrated Corporate Law (CLAT)';
      careers = ['Corporate Law (NLU)', 'Civil Services (IAS/IPS/IFS)', 'Public Policy & Think Tanks', 'Journalism & Media'];
      subjectCombo = ['History / Political Science', 'Legal Studies / Sociology', 'Economics', 'Psychology', 'English'];
      exams = ['CLAT (National Law Universities)', 'AILET', 'CUET UG'];
      personality = 'You are a critical thinker, passionate about societal structures, justice, rhetoric, and human behavior. You excel in reading, debate, and synthesis.';
      caution = 'Do not let outdated misconceptions discourage you. Modern law and economics offer starting compensation on par with tech engineers. Focus on daily editorial reading.';
    } else if (maxScore === scores.creative && scores.creative >= scores.analytical) {
      topStream = 'Design, Architecture & Creative Technologies';
      secondaryStream = 'Industrial Product Design';
      careers = ['UI/UX & Product Design', 'Industrial Design', 'Architecture (B.Arch)', 'Digital Animation & Game Design'];
      subjectCombo = ['Fine Arts / Graphic Design', 'Computer Science', 'English', 'Math / Humanities electives'];
      exams = ['UCEED (IIT Bombay/Delhi)', 'NID DAT', 'NATA', 'NIFT'];
      personality = 'You observe the world visually and tangibly. You think in layouts, ergonomic flows, ergonomics, and aesthetics.';
      caution = 'Great design requires understanding business constraints and user psychology, not just pretty pictures. Build an everyday observation sketchbook.';
    }

    const calculated: AssessmentResult = {
      topStream,
      secondaryStream,
      recommendedCareers: careers,
      suggestedSubjectCombo: subjectCombo,
      recommendedExams: exams,
      personalitySummary: personality,
      cautionAdvice: caution,
      scores,
    };

    setResult(calculated);
    if (onSaveAssessmentResult) {
      onSaveAssessmentResult(calculated);
    }
  };

  const resetQuiz = () => {
    setSelectedOptions([]);
    setCurrentStep(0);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Assessment Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-3">
          <BrainCircuit className="w-4 h-4 text-amber-700" />
          <span>India High School Aptitude & Interest Matcher</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 mb-2">
          Find Your Optimal Stream & Degree Fit
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm">
          An 8-question scientific assessment assessing quantitative logic, biological curiosity, commercial drive, visual creativity, and linguistic-social reasoning.
        </p>
      </div>

      {!result ? (
        /* Quiz Card */
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
              <span>Question {currentStep + 1} of {totalQuestions}</span>
              <span>{Math.round(((currentStep + 1) / totalQuestions) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-display font-bold text-stone-900 mb-2">
              {currentQ.question}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 italic">
              {currentQ.scenario}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOptions[currentStep] === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/80 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        isSelected
                          ? 'border-amber-600 bg-amber-600 text-white'
                          : 'border-stone-300 text-stone-400'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-stone-900 mb-0.5">
                        {opt.text}
                      </div>
                      <div className="text-xs text-stone-500">
                        {opt.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                currentStep === 0
                  ? 'text-stone-300 cursor-not-allowed'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={selectedOptions[currentStep] === undefined}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-sm ${
                selectedOptions[currentStep] === undefined
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
              }`}
            >
              <span>{currentStep === totalQuestions - 1 ? 'Generate My Report' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results Report */
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
                Assessment Results Analysis
              </span>
              <h2 className="text-2xl font-display font-bold text-stone-900">
                Your Academic & Career Match Profile
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 border border-stone-200 hover:bg-stone-50 rounded-lg transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print
              </button>
            </div>
          </div>

          {/* Primary Recommendation Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-stone-950 shadow-md">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-950/80 block mb-1">
              Top Stream Match
            </span>
            <div className="text-2xl sm:text-3xl font-display font-extrabold mb-2">
              {result.topStream}
            </div>
            <p className="text-xs sm:text-sm text-stone-900/90 leading-relaxed max-w-2xl">
              {result.personalitySummary}
            </p>
          </div>

          {/* Secondary & Subject Combo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                Strong Secondary Alternative
              </span>
              <div className="text-lg font-bold text-stone-900 mb-2">
                {result.secondaryStream}
              </div>
              <p className="text-xs text-stone-600">
                If circumstances or school availability prevent your first choice, this pathway complements your profile with minimal friction.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                Suggested Board Subject Combo
              </span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {result.suggestedSubjectCombo.map((sub, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold bg-white border border-stone-200 px-2.5 py-1 rounded-md text-stone-800"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Careers & Exams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                Top 4 Career Trajectories
              </span>
              <div className="space-y-2">
                {result.recommendedCareers.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-stone-800 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                Target Entrance Exams
              </span>
              <div className="space-y-2">
                {result.recommendedExams.map((e, i) => (
                  <div key={i} className="flex items-center justify-between text-xs font-semibold text-stone-800 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <span>{e}</span>
                    <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                      High Relevance
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Honest Counselor Caution Advice */}
          <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Counselor\'s Caution & Reality Check</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
              {result.cautionAdvice}
            </p>
          </div>

          {/* Affinity Radar Breakdown */}
          <div className="bg-stone-50 p-5 rounded-xl border border-stone-200">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
              Aptitude Score Breakdown
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {[
                { label: 'Analytical & Math', score: result.scores.analytical },
                { label: 'Empirical & Life Sciences', score: result.scores.empirical },
                { label: 'Business & Finance', score: result.scores.business },
                { label: 'Creative & Design', score: result.scores.creative },
                { label: 'Linguistic & Writing', score: result.scores.linguistic },
                { label: 'Social & Governance', score: result.scores.social },
              ].map((dim, i) => (
                <div key={i} className="bg-white p-3 rounded-lg border border-stone-200">
                  <div className="text-stone-500 mb-1">{dim.label}</div>
                  <div className="text-base font-bold text-stone-900">{dim.score} pts</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200">
            <p className="text-xs text-stone-500">
              Want a deeper conversation about your specific marks, city, and family background?
            </p>
            <button
              onClick={() => onNavigateToCounselor(`Based on my Pathfinder assessment, my top match was ${result.topStream} and careers in ${result.recommendedCareers.slice(0, 2).join(' and ')}. What specific steps should I take next?`)}
              className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              Discuss Report with AI Counselor
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
