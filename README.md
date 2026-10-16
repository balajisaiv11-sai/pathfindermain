# Pathfinder India 🧭

Thoughtful, encouraging educational guidance for students in India exploring academic and career pathways after Class 10 and Class 12.

## Key Features

1. **Class 10 Stream Exploration**:
   - Comprehensive breakdown of CBSE, ICSE, and State Board pathways: Science (PCM, PCB, PCMB), Commerce (with Maths & without Maths), Arts & Humanities, 3-Year Polytechnic Diplomas, and ITI Vocational Trades.
   - Core subject checklists, best-fit criteria, pros & cons, myths vs reality, and direct career trajectories.
   - 4 Golden Rules for choosing a stream without peer or parental pressure.

2. **Class 12 Degrees & Career Roadmaps**:
   - Detailed coverage of Engineering (B.Tech in AI, CSE), Medicine & Surgery (MBBS, BDS, Allied Health), Integrated Management (5-Year IPM at IIMs), Corporate & Constitutional Law (NLUs via CLAT), Pure Science & Research (IISc, IISERs), Industrial Design (UCEED, NID), and Armed Forces (NDA).
   - 4-stage execution timelines: Class 11-12 preparation, Undergrad Years 1-2, Undergrad Years 3-4, and Career Launch.
   - Transparent salary insights and top Indian institutes for each career.

3. **Psychometric Stream Matcher Quiz**:
   - 8-question aptitude assessment measuring Analytical, Empirical, Business, Creative, Linguistic, and Social tendencies.
   - Generates personalized recommendations for Top Stream match, secondary alternative, suggested board subject combinations, target entrance exams, and tailored caution advice.

4. **National Entrance Exam Radar**:
   - 2025–2026 timeline and directory for JEE Main, JEE Advanced, NEET-UG, CUET-UG, CLAT, BITSAT, IPMAT Indore, UCEED, NID DAT, NDA & NA, IAT (IISERs), and NATA.
   - Eligibility criteria, exam formats, conducting bodies, seat counts, and high-yield preparation tips.

5. **Premier Indian Colleges Directory**:
   - Detailed listings of IITs, AIIMS, NLUs, IIMs (IPM), Central Universities (DU), BITS, NID, and IISc with NIRF ranks, admission routes, and approximate fee structures.

6. **Head-to-Head Path Comparison**:
   - Direct side-by-side matrices comparing common dilemmas:
     - PCM vs PCB vs PCMB
     - Commerce with Math vs Commerce without Math
     - Chartered Accountancy (CA) vs 5-Year IIM IPM (Management)
     - 3-Year Polytechnic Diploma vs Class 11-12 Regular School

7. **AI Educational Counselor (Pathfinder Didi / Bhaiya)**:
   - Server-side Gemini API integration (`gemini-3.8-flash`) providing structured, encouraging answers to questions about exam anxiety, subject selection, cutoffs, and family expectations.
   - Built-in fallback knowledge base for guaranteed offline resilience.

8. **Scholarships & Financial Aid**:
   - Information on INSPIRE (SHE), PMSSS (J&K/Ladakh), Central Sector Scholarship (NSP), AICTE Pragati (for girls), and private foundation grants.

9. **Saved Pathways Bookmarking**:
   - Students can bookmark streams, careers, and exams to revisit anytime, saved locally in `localStorage`.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React icons
- **Backend**: Node.js, Express, `@google/genai` TypeScript SDK
- **Build System**: Vite 6, Gradle execution runner
