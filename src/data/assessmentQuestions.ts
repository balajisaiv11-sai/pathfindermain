import { AssessmentQuestion } from '../types';

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    question: 'When you are faced with a challenging real-world puzzle, what excites you most?',
    scenario: 'Think about what naturally absorbs your attention for hours without feeling like a chore.',
    options: [
      {
        text: 'Deciphering mathematical patterns, writing algorithms, or calculating how things work.',
        description: 'You enjoy rigorous logic, proofs, and structural problem-solving.',
        scores: { analytical: 3, empirical: 1, business: 1, creative: 0, linguistic: 0, social: 0 },
      },
      {
        text: 'Observing living systems, biology diagrams, chemicals, or medical case studies.',
        description: 'You are curious about organic life, physiology, and how nature functions.',
        scores: { analytical: 1, empirical: 3, business: 0, creative: 0, linguistic: 0, social: 2 },
      },
      {
        text: 'Analyzing why a company made billions or how markets, startups, and profits operate.',
        description: 'You love tracking finance, commerce, trade, and business strategy.',
        scores: { analytical: 1, empirical: 0, business: 3, creative: 0, linguistic: 1, social: 1 },
      },
      {
        text: 'Debating social issues, reading historical events, analyzing laws, or writing persuasive essays.',
        description: 'You care deeply about justice, literature, human behavior, and governance.',
        scores: { analytical: 0, empirical: 0, business: 1, creative: 1, linguistic: 3, social: 3 },
      },
      {
        text: 'Sketching visual layouts, designing digital graphics, or inventing ergonomic products.',
        description: 'You think visually, focus on aesthetics, and love creating tangible artifacts.',
        scores: { analytical: 1, empirical: 0, business: 1, creative: 3, linguistic: 0, social: 0 },
      },
    ],
  },
  {
    id: 2,
    question: 'How do you feel about Mathematics in school?',
    scenario: 'Be honest about your relationship with algebraic equations and numbers.',
    options: [
      {
        text: 'I genuinely enjoy solving equations and feel a rush when I crack a tough problem.',
        description: 'Mathematics is an enjoyable strength for you.',
        scores: { analytical: 3, empirical: 1, business: 2, creative: 0, linguistic: 0, social: 0 },
      },
      {
        text: 'I can manage applied math (like commercial arithmetic, statistics, profit/loss), but dislike complex abstract calculus.',
        description: 'You prefer practical, applied numbers over abstract multi-variable proofs.',
        scores: { analytical: 1, empirical: 0, business: 3, creative: 0, linguistic: 1, social: 0 },
      },
      {
        text: 'I prefer understanding conceptual mechanisms through text and diagrams rather than mathematical drills.',
        description: 'You prefer observational, descriptive, or linguistic exploration.',
        scores: { analytical: 0, empirical: 2, business: 0, creative: 2, linguistic: 3, social: 2 },
      },
      {
        text: 'I find math stressful and would prefer streams that emphasize reading, debate, or creative arts.',
        description: 'You want to prioritize humanities, design, law, or languages.',
        scores: { analytical: -1, empirical: 0, business: 0, creative: 2, linguistic: 3, social: 3 },
      },
    ],
  },
  {
    id: 3,
    question: 'In a school festival or project exhibition, what role would you pick first?',
    scenario: 'Your natural preference in team and project settings reveals your career disposition.',
    options: [
      {
        text: 'Technical architect — building the automated gadget, website, robot, or lighting circuit.',
        description: 'Hands-on technical implementation.',
        scores: { analytical: 3, empirical: 1, business: 0, creative: 2, linguistic: 0, social: 0 },
      },
      {
        text: 'Health & science demonstrator — explaining an organ anatomy model or chemistry reaction.',
        description: 'Scientific communication & empathy.',
        scores: { analytical: 1, empirical: 3, business: 0, creative: 0, linguistic: 1, social: 2 },
      },
      {
        text: 'Finance & sponsorship head — pitching to local sponsors, budgeting costs, and ticket sales.',
        description: 'Commercial acumen & resource mobilization.',
        scores: { analytical: 1, empirical: 0, business: 3, creative: 0, linguistic: 1, social: 2 },
      },
      {
        text: 'Chief anchor & debate leader — writing the script, hosting dignitaries, moderating panel.',
        description: 'Oratory, public articulation, and social presence.',
        scores: { analytical: 0, empirical: 0, business: 1, creative: 1, linguistic: 3, social: 3 },
      },
      {
        text: 'Creative director — poster graphics, stage aesthetics, theme branding, and visual storytelling.',
        description: 'Visual identity and design sensibility.',
        scores: { analytical: 0, empirical: 0, business: 1, creative: 3, linguistic: 1, social: 0 },
      },
    ],
  },
  {
    id: 4,
    question: 'When you imagine your ideal future work environment, where are you happiest?',
    scenario: 'Your preferred daily rhythm and workplace culture.',
    options: [
      {
        text: 'A high-tech innovation campus or modern workstation building software, hardware, or AI.',
        description: 'Technology, computing, engineering.',
        scores: { analytical: 3, empirical: 1, business: 1, creative: 1, linguistic: 0, social: 0 },
      },
      {
        text: 'A hospital, diagnostic clinic, or medical research facility helping patients heal.',
        description: 'Healthcare, patient care, clinical biology.',
        scores: { analytical: 1, empirical: 3, business: 0, creative: 0, linguistic: 0, social: 3 },
      },
      {
        text: 'A corporate boardroom, stock exchange trading desk, or running my own startup.',
        description: 'Management, investment banking, entrepreneurship.',
        scores: { analytical: 1, empirical: 0, business: 3, creative: 0, linguistic: 1, social: 2 },
      },
      {
        text: 'A court of law, public policy think-tank, civil service collectorate, or publishing house.',
        description: 'Law, public service, diplomacy, media.',
        scores: { analytical: 1, empirical: 0, business: 1, creative: 0, linguistic: 3, social: 3 },
      },
      {
        text: 'A design studio, architecture firm, animation workshop, or film production set.',
        description: 'Creative design, industrial aesthetics, digital arts.',
        scores: { analytical: 1, empirical: 0, business: 1, creative: 3, linguistic: 1, social: 0 },
      },
    ],
  },
  {
    id: 5,
    question: 'What is your perspective on high-stakes competitive entrance exams (e.g., JEE, NEET)?',
    scenario: 'Understanding your stress tolerance and exam mindset.',
    options: [
      {
        text: 'I am ready to put in disciplined daily coaching and mock tests for 2 years to crack top government colleges.',
        description: 'High competitive stamina suited for JEE/NEET.',
        scores: { analytical: 2, empirical: 2, business: 1, creative: 0, linguistic: 0, social: 0 },
      },
      {
        text: 'I prefer comprehensive aptitude & comprehension exams (like CLAT, IPMAT, CUET, or UCEED) over intense 2-year PCM/PCB coaching.',
        description: 'Aptitude and reading-focused competitive exams.',
        scores: { analytical: 1, empirical: 0, business: 2, creative: 2, linguistic: 3, social: 2 },
      },
      {
        text: 'I prefer practical hands-on technical skills right away, such as a 3-year polytechnic diploma or vocational path.',
        description: 'Hands-on practical execution.',
        scores: { analytical: 2, empirical: 1, business: 0, creative: 1, linguistic: 0, social: 0 },
      },
      {
        text: 'I prefer a balanced school life with consistent board exams and entering college through CUET or direct merit.',
        description: 'Holistic board-focused learning.',
        scores: { analytical: 0, empirical: 1, business: 2, creative: 2, linguistic: 2, social: 2 },
      },
    ],
  },
  {
    id: 6,
    question: 'Which of the following topics would you most like to read an article or book about?',
    scenario: 'What sparks your natural intellectual curiosity when no marks are on the line?',
    options: [
      {
        text: 'Quantum computing, black holes, aerodynamics, or how neural networks learn.',
        description: 'Theoretical & applied physics, mathematics.',
        scores: { analytical: 3, empirical: 2, business: 0, creative: 0, linguistic: 0, social: 0 },
      },
      {
        text: 'CRISPR gene editing, infectious viruses, brain neurochemistry, or surgical breakthroughs.',
        description: 'Life sciences, medicine, genetic engineering.',
        scores: { analytical: 1, empirical: 3, business: 0, creative: 0, linguistic: 0, social: 1 },
      },
      {
        text: 'How Indian startups scale to $1 billion, cryptocurrency systems, or Warren Buffett\'s value investing.',
        description: 'Capital markets, business growth, venture strategy.',
        scores: { analytical: 1, empirical: 0, business: 3, creative: 0, linguistic: 1, social: 1 },
      },
      {
        text: 'Landmark Supreme Court rulings, geopolitical history of South Asia, or philosophical ethics.',
        description: 'Constitutional law, politics, social ethics.',
        scores: { analytical: 1, empirical: 0, business: 1, creative: 0, linguistic: 3, social: 3 },
      },
      {
        text: 'How Apple crafts minimalist industrial hardware, Pixar animation techniques, or sustainable architecture.',
        description: 'Product form, visual psychology, design.',
        scores: { analytical: 0, empirical: 0, business: 1, creative: 3, linguistic: 1, social: 0 },
      },
    ],
  },
  {
    id: 7,
    question: 'How do you handle memorization vs conceptual deduction in tests?',
    scenario: 'Understanding your cognitive processing style.',
    options: [
      {
        text: 'I excel at deriving formulas from first principles and applying them to new tricky numericals.',
        description: 'Deductive reasoning & quantitative problem solving.',
        scores: { analytical: 3, empirical: 1, business: 1, creative: 0, linguistic: 0, social: 0 },
      },
      {
        text: 'I have strong visual memory for detailed classifications, diagrams, cycles, and terminology.',
        description: 'Visual retention and scientific taxonomy.',
        scores: { analytical: 0, empirical: 3, business: 0, creative: 1, linguistic: 1, social: 1 },
      },
      {
        text: 'I excel at understanding frameworks, logical structures, and structured commercial rules.',
        description: 'Rule-based structured reasoning (Accounting, Law).',
        scores: { analytical: 1, empirical: 0, business: 3, creative: 0, linguistic: 2, social: 1 },
      },
      {
        text: 'I express thoughts best in descriptive essays, analytical arguments, and contextual explanations.',
        description: 'Narrative expression, synthesis, and persuasion.',
        scores: { analytical: 0, empirical: 0, business: 1, creative: 1, linguistic: 3, social: 3 },
      },
    ],
  },
  {
    id: 8,
    question: 'What is your primary long-term personal definition of a fulfilling career?',
    scenario: 'Your core driving value will keep you motivated over decades.',
    options: [
      {
        text: 'Building impactful technology and engineering innovations that solve grand scale problems.',
        description: 'Technical mastery and engineering impact.',
        scores: { analytical: 3, empirical: 1, business: 1, creative: 1, linguistic: 0, social: 0 },
      },
      {
        text: 'Healing and improving human health directly through compassionate medicine or bio-research.',
        description: 'Direct humanitarian relief and medical service.',
        scores: { analytical: 0, empirical: 3, business: 0, creative: 0, linguistic: 0, social: 3 },
      },
      {
        text: 'Creating high financial wealth, leading teams, and directing successful enterprises.',
        description: 'Financial independence, executive authority, entrepreneurship.',
        scores: { analytical: 1, empirical: 0, business: 3, creative: 0, linguistic: 1, social: 1 },
      },
      {
        text: 'Reforming governance, upholding justice in society, and advocating for public causes.',
        description: 'Social justice, policy leadership, institutional reform.',
        scores: { analytical: 0, empirical: 0, business: 0, creative: 0, linguistic: 3, social: 3 },
      },
      {
        text: 'Designing inspiring experiences, visual beauty, and products that delight millions.',
        description: 'Creative self-expression and functional beauty.',
        scores: { analytical: 0, empirical: 0, business: 1, creative: 3, linguistic: 1, social: 0 },
      },
    ],
  },
];
