import React, { useState } from 'react';
import { class10Streams } from '../data/pathwaysData';
import { StreamOption } from '../types';
import { CheckCircle2, AlertTriangle, Bookmark, BookOpen, Compass, ArrowRight, X, Sparkles, HelpCircle } from 'lucide-react';

interface Class10ExplorerProps {
  bookmarkedIds: string[];
  onToggleBookmark: (item: { id: string; title: string; type: 'stream' | 'career' | 'exam' }) => void;
  onNavigateToCounselor: (prefilledQuery?: string) => void;
}

export const Class10Explorer: React.FC<Class10ExplorerProps> = ({
  bookmarkedIds,
  onToggleBookmark,
  onNavigateToCounselor,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedStream, setSelectedStream] = useState<StreamOption | null>(null);

  const filteredStreams = class10Streams.filter((stream) => {
    if (filter === 'all') return true;
    if (filter === 'science') return stream.category === 'science';
    if (filter === 'commerce') return stream.category === 'commerce';
    if (filter === 'arts') return stream.category === 'arts';
    if (filter === 'vocational') return stream.category === 'vocational' || stream.category === 'polytechnic';
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-3 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Class 10 Transition Decision Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight mb-3">
            Choose Your Class 11 Stream with Clarity, Not Peer Pressure
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
            In India, Class 10 is often painted as a make-or-break fork in the road. In truth, whether you pick 
            <span className="text-amber-300 font-semibold"> Science, Commerce, Arts, or Polytechnic</span>, every pathway offers high-earning, impactful modern careers when chosen according to your genuine aptitude.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateToCounselor('I am in Class 10 and confused between Science, Commerce, and Arts. How should I choose?')}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs sm:text-sm rounded-lg transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              Ask AI Counselor for Stream Advice
            </button>
            <a
              href="#decision-rules"
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs sm:text-sm rounded-lg border border-stone-700 transition-colors"
            >
              Read 4 Golden Selection Rules
            </a>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-stone-900">Explore Available Streams & Diplomas</h2>
          <p className="text-xs sm:text-sm text-stone-600">CBSE, ICSE, and State Board recognized pathways after Class 10</p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl overflow-x-auto">
          {[
            { id: 'all', label: 'All Streams' },
            { id: 'science', label: 'Science' },
            { id: 'commerce', label: 'Commerce' },
            { id: 'arts', label: 'Arts & Humanities' },
            { id: 'vocational', label: 'Polytechnic & ITI' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStreams.map((stream) => {
          const isBookmarked = bookmarkedIds.includes(stream.id);
          return (
            <div
              key={stream.id}
              className="bg-white rounded-xl border border-stone-200 hover:border-amber-400/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                      {stream.category} stream
                    </div>
                    <h3 className="text-lg font-display font-bold text-stone-900 group-hover:text-amber-700">
                      {stream.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => onToggleBookmark({ id: stream.id, title: stream.title, type: 'stream' })}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark this stream'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                  </button>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {stream.tagline}
                </p>

                {/* Meta Attributes */}
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-4 pb-3 border-b border-stone-100">
                  <span className="font-medium text-stone-700">Difficulty: {stream.difficultyLevel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{stream.mathematicsRequired ? 'Maths Mandatory' : 'Maths Optional'}</span>
                </div>

                {/* Primary Subjects */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Core Subjects
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stream.primarySubjects.map((sub, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium bg-stone-100 text-stone-800 px-2 py-0.5 rounded border border-stone-200/60"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Best Suited For */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Best Suited For
                  </span>
                  <ul className="space-y-1 text-xs text-stone-600">
                    {stream.bestSuitedFor.slice(0, 2).map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedStream(stream)}
                className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-lg transition-colors"
              >
                <span>View Full Roadmap & Myths</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Golden Rules for Class 10 Section */}
      <div id="decision-rules" className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>Counselor Insight</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900 mb-4">
            4 Golden Rules Before Signing the Class 11 Admission Form
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-700">
            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-xs">
              <div className="font-bold text-stone-900 mb-1">1. Test Your Day-to-Day Tolerance</div>
              <p className="text-stone-600">
                Don\'t choose Science because you like watching science fiction. Check if you can sit for 4 hours doing 20 numerical problems in Physics and balancing complex redox reactions.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-xs">
              <div className="font-bold text-stone-900 mb-1">2. Keep Future Doors Open with Maths</div>
              <p className="text-stone-600">
                If you take Commerce, taking Mathematics (Applied Math or Core Math) keeps top central university degrees (DU B.Com Hons, Economics Hons) and Actuarial Science 100% accessible.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-xs">
              <div className="font-bold text-stone-900 mb-1">3. Don\'t Underestimate Humanities & Law</div>
              <p className="text-stone-600">
                Top corporate lawyers from NLUs (via CLAT) earn starting salaries of ₹15–20 Lakhs/year. Arts is no longer a compromise; it is an intellectual launchpad for policy, law, and economics.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-xs">
              <div className="font-bold text-stone-900 mb-1">4. Have a Honest Conversation with Family</div>
              <p className="text-stone-600">
                Most parental pressure comes from love and anxiety for your financial security. Show them structured data on career earnings across streams to build mutual trust.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stream Detail Modal */}
      {selectedStream && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-stone-200">
            <button
              onClick={() => setSelectedStream(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
                {selectedStream.category} Deep Dive
              </span>
              <h3 className="text-2xl font-display font-bold text-stone-900 mb-2">
                {selectedStream.title}
              </h3>
              <p className="text-sm text-stone-600">{selectedStream.detailedOverview}</p>
            </div>

            {/* Subject combinations */}
            <div className="mb-6 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Typical Board Subjects
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-semibold text-stone-800 block mb-1">Compulsory Core:</span>
                  <ul className="list-disc list-inside text-stone-600 space-y-0.5">
                    {selectedStream.primarySubjects.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block mb-1">Popular Electives (5th/6th subject):</span>
                  <ul className="list-disc list-inside text-stone-600 space-y-0.5">
                    {selectedStream.optionalSubjects.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Key Advantages
                </span>
                <ul className="text-xs text-stone-700 space-y-1.5">
                  {selectedStream.pros.map((pro, i) => (
                    <li key={i}>• {pro}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  Challenges & Constraints
                </span>
                <ul className="text-xs text-stone-700 space-y-1.5">
                  {selectedStream.cons.map((con, i) => (
                    <li key={i}>• {con}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Myths Busted */}
            <div className="mb-6">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                Common Myths Debunked
              </span>
              <div className="space-y-2">
                {selectedStream.commonMisconceptions.map((myth, i) => (
                  <div key={i} className="text-xs bg-stone-50 p-3 rounded-lg border border-stone-200 text-stone-700">
                    {myth}
                  </div>
                ))}
              </div>
            </div>

            {/* Career Outcomes */}
            <div className="mb-6">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                Direct Career Trajectories
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedStream.careerTrajectories.map((career, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-md"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-200">
              <button
                onClick={() => {
                  onToggleBookmark({ id: selectedStream.id, title: selectedStream.title, type: 'stream' });
                }}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 flex items-center justify-center gap-2"
              >
                <Bookmark className="w-3.5 h-3.5" />
                {bookmarkedIds.includes(selectedStream.id) ? 'Bookmarked' : 'Save to My Bookmarks'}
              </button>

              <button
                onClick={() => {
                  setSelectedStream(null);
                  onNavigateToCounselor(`Tell me more about preparing for ${selectedStream.title} in Class 11 and how to plan my schedule.`);
                }}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask Counselor About {selectedStream.title}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
