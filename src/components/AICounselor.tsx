import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { Send, Sparkles, User, Bot, HelpCircle, RefreshCw, Compass } from 'lucide-react';

interface AICounselorProps {
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

export const AICounselor: React.FC<AICounselorProps> = ({
  initialQuery,
  onClearInitialQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'counselor',
      text: `Namaste! I am your **Pathfinder Academic Counselor**. 

Whether you are in Class 10 wondering about PCM vs PCB vs Commerce vs Arts, or in Class 12 balancing boards with JEE/NEET/CLAT/IPMAT, I am here to offer empathetic, practical, and honest guidance tailored to Indian education.

What is on your mind today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [studentLevel, setStudentLevel] = useState<'Class 10' | 'Class 11' | 'Class 12' | 'Dropper/Parent'>('Class 10');
  const [interests, setInterests] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
      if (onClearInitialQuery) {
        onClearInitialQuery();
      }
    }
  }, [initialQuery]);

  const quickPromptChips = [
    'I love biology but hate physics numericals. Can I avoid NEET?',
    'Is Commerce without Maths worth choosing for top corporate jobs?',
    'How do I balance CBSE/State Board exams with competitive prep?',
    'What are high-paying careers in Humanities and Arts?',
    'What is the 5-year IPM program at IIM Indore and how do I prepare?',
    'What government scholarships exist for engineering/medical students?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/counselor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query.trim(),
          studentProfile: {
            currentLevel: studentLevel,
            interests: interests || 'Not specified',
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      const counselorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'counselor',
        text: data.reply || 'I am having trouble formulating an answer right now. Please try asking again!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };

      setMessages((prev) => [...prev, counselorMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'counselor',
        text: 'I could not reach the guidance service at this second. Please check your network and try asking again!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Empathetic Educational Guidance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
            Talk to Pathfinder AI Counselor
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Personalized advice on stream decisions, exam anxiety, subject combinations, college cutoffs, and family discussions.
          </p>
        </div>
      </div>

      {/* Student Profile Ribbon */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
          <User className="w-4 h-4 text-amber-600" />
          <span>Counselor Context:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-stone-500 font-medium">My Stage:</span>
            <select
              value={studentLevel}
              onChange={(e) => setStudentLevel(e.target.value as any)}
              className="bg-stone-50 border border-stone-200 rounded-md px-2 py-1 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="Class 10">Class 10 (Choosing Stream)</option>
              <option value="Class 11">Class 11 (Early Exam Prep)</option>
              <option value="Class 12">Class 12 (Board & College Entrances)</option>
              <option value="Dropper/Parent">Dropper / Parent</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-stone-500 font-medium">Favorite Subjects:</span>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., Math & Coding, or Bio & English"
              className="bg-stone-50 border border-stone-200 rounded-md px-2 py-1 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500 w-44"
            />
          </div>
        </div>
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col h-[560px] overflow-hidden">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-stone-800 text-stone-100'
                      : 'bg-amber-500 text-stone-950 shadow-sm shadow-amber-500/20'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-stone-900 text-white rounded-tr-xs'
                      : 'bg-stone-50 text-stone-800 border border-stone-200/80 rounded-tl-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div
                    className={`mt-1.5 text-[10px] ${
                      isUser ? 'text-stone-400 text-right' : 'text-stone-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="bg-stone-50 border border-stone-200 text-stone-600 rounded-2xl px-4 py-3 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Counselor is structuring thoughtful advice...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Chips */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 shrink-0 mr-1">
            Suggested:
          </span>
          {quickPromptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="text-xs bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-100 border border-stone-200 px-3 py-1 rounded-full whitespace-nowrap transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about streams, competitive exams, or backup careers..."
              disabled={isLoading}
              className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-200 disabled:text-stone-400 text-stone-950 font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
