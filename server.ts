import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client with provided key:', err);
  }
}

// AI Career Counselor Endpoint
app.post('/api/counselor', async (req: Request, res: Response) => {
  const { prompt, studentProfile } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // If Gemini API is available, generate dynamic response
  if (aiClient) {
    try {
      const systemInstruction = `
You are 'Pathfinder Didi/Bhaiya', an empathetic, wise, encouraging, and deeply knowledgeable senior academic counselor in India.
Your mission is to guide Indian students transitioning after Class 10 or Class 12, as well as their parents.
You have mastery over:
1. Class 10 stream choices: Science (PCM, PCB, PCMB), Commerce (with/without Math), Arts/Humanities, Polytechnic Diplomas (3-yr), ITI vocational courses.
2. Class 12 degree options: Engineering (JEE, BITSAT, State CETs), Medical & Allied Health (NEET, BDS, BAMS, BHMS, B.Pharm, Nursing, Paramedical), Pure Sciences & Research (IISc, IISERs, NISER, ISI, CMI), Commerce & Management (CA, CS, CMA, B.Com, IPMAT for IIMs), Law (CLAT, AILET), Design & Architecture (NID, UCEED, NIFT, NATA), Defense (NDA, TES), Government exams (UPSC, SSC, Banking prep roadmaps).
3. Addressing student anxiety, parental pressure, fear of failing entrance exams, alternative backup options, and high-ROI low-cost government institutions.

Guidelines:
- Tone: Warm, reassuring, practical, structured, and realistic (no false hype, no dismissive advice).
- Structure: Clear headings or bullet points, key pros & cons, realistic entrance exam requirements, estimated timeline, and a concrete next step for this week.
- Respect diverse backgrounds: acknowledge state boards, rural/urban contexts, and financial scholarship avenues (e.g. NSP, INSPIRE, PMSSS) when relevant.
- Keep the response direct, engaging, and under 450 words unless detail is strictly requested.
`;

      const userContext = studentProfile
        ? `Student Context:
- Current Level: ${studentProfile.currentLevel || 'Class 10/12'}
- Primary Interests/Subjects: ${studentProfile.interests || 'Not specified'}
- Career Goals/Dream: ${studentProfile.goals || 'Exploring options'}
- Concerns/Doubts: ${studentProfile.concerns || 'General guidance'}

Student Query: ${prompt}`
        : prompt;

      let responseText = '';
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userContext,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        responseText = response.text || '';
      } catch (firstErr: any) {
        // If transient 503 unavailable or spike in demand, attempt one quick retry after 800ms
        if (firstErr?.status === 503 || firstErr?.message?.includes('503') || firstErr?.message?.includes('high demand')) {
          console.warn('Gemini 503 received, retrying once...');
          await new Promise((r) => setTimeout(r, 800));
          const retryResponse = await aiClient.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: userContext,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          });
          responseText = retryResponse.text || '';
        } else {
          throw firstErr;
        }
      }

      if (responseText) {
        return res.json({
          reply: responseText,
          source: 'gemini',
        });
      }
    } catch (err: any) {
      console.warn('Gemini API call failed, serving grounded knowledge base answer:', err?.message || err);
      // Fallback gracefully to domain knowledge base below
    }
  }

  // Graceful smart fallback when Gemini is offline or API key is pending
  const fallbackReplies: Record<string, string> = {
    biology: `### Navigating Options with Biology (Beyond or with NEET)
Biology offers rich, fulfilling careers in India even if you do not want to pursue traditional MBBS:
1. **Clinical & Medicine**: MBBS, BDS (Dental), BAMS (Ayurveda), BHMS (Homeopathy).
2. **Allied Healthcare & High Demand**:
   - **B.Sc. Nursing / BPT (Physiotherapy)**: High global mobility and rapid hiring.
   - **B.Pharm / Pharm.D**: Pharmaceutical R&D, clinical trials, regulatory affairs.
   - **Medical Lab Technology (BMLT)** & Radiology/Imaging.
3. **Biotechnology & Research**:
   - IISERs (via IAT) & IISc Bangalore for BS-MS in Biological Sciences.
   - Genetic Engineering, Bioinformatics, Food Technology.
4. **Bio-Psychology & Behavioral Sciences**:
   - B.Sc. Clinical Psychology, Cognitive Science, Neurobiology.

*Next Step:* If you enjoy biology but find Physics daunting for NEET, look closely at IISER IAT (holistic science) or CUET UG for Central University BSc programs.`,
    
    commerce: `### Exploring Commerce after Class 10 / 12
Commerce is one of the most versatile and entrepreneurial streams in India:
1. **Professional Credentials**:
   - **CA (Chartered Accountancy)**: Administered by ICAI. High prestige, independent practice, zero reservation, very cost-effective.
   - **CS (Company Secretary)** & **CMA (Cost Management Accounting)**: High corporate governance demand.
2. **Premier Management**:
   - **IPMAT (Integrated Programme in Management)**: 5-year dual BBA+MBA directly at IIM Indore, IIM Rohtak, IIM Ranchi, IIM Bodh Gaya, IIM Jammu right after Class 12.
3. **Premier Undergraduate Universities**:
   - B.Com (Hons), B.A. Economics (Hons), BMS/BFIA via **CUET UG** (SRCC, Hindu, St. Stephen's, SSCBS).
4. **Fintech & Actuarial Science**:
   - For students with Mathematics: Actuarial Science (IAI), Data Analytics in Finance, Investment Banking.

*Next Step:* If deciding on Class 11 stream, taking Mathematics along with Commerce keeps 95% of top finance and economics college seats accessible.`,

    pcm: `### Exploring PCM & Engineering Pathways
With Physics, Chemistry, and Mathematics, you have extensive modern avenues:
1. **Engineering (B.Tech / B.E.)**:
   - Exams: JEE Main, JEE Advanced, BITSAT, State CETs (MHT-CET, WBJEE, KCET, COMEDK), VITEEE, MET.
   - Emerging branches: AI & Data Science, Robotics, VLSI Design, Renewable Energy, Aerospace.
2. **Pure Sciences & Mathematics**:
   - **ISI Kolkata / ISI Delhi**: B.Stat / B.Math (India's premier analytics & actuarial launchpad, provides monthly stipends).
   - **CMI Chennai**: B.Sc. Computer Science & Mathematics.
   - **IISERs & NISER**: 5-year integrated research programs.
3. **Design & Architecture**:
   - **UCEED** for IIT Bombay/Delhi/Guwahati B.Des.
   - **NATA & JEE Main Paper 2** for B.Arch (SPA Delhi, IIT Roorkee, NIT Trichy).
4. **Armed Forces**:
   - **NDA Exam** (UPSC) conducted twice a year for direct officer commissions in Army, Navy, Air Force.
   - **Technical Entry Scheme (TES)** via 10+2 marks and SSB.`,

    humanities: `### Humanities & Liberal Arts in Modern India
The notion that Arts lacks high-earning potential is completely outdated:
1. **Law (5-Year Integrated BA/BBA LLB)**:
   - Entrance: **CLAT** (National Law Universities like NLSIU Bengaluru, NALSAR Hyderabad) & **AILET** (NLU Delhi).
   - High placements in corporate law firms, litigation, policy consulting, and judiciary.
2. **Public Policy & Civil Services**:
   - Strong foundational alignment for UPSC CSE, State PSCs, Think Tanks, and Foreign Service.
3. **Design & Visual Communication**:
   - NID DAT, NIFT, UCEED. UI/UX design, Product Design, Visual Identity.
4. **Economics & Data Analytics**:
   - Economics (Hons) from DU (SRCC, St. Stephen's) or Ashoka leads directly to top consulting (McKinsey, BCG) and financial research.
5. **Psychology & Cognitive Sciences**:
   - Rapidly expanding field in corporate wellness, clinical counseling, and educational psychology.

*Next Step:* Prepare for CUET UG targeting top Central Universities and consider CLAT if you enjoy analytical reading and arguments.`,
  };

  const lower = prompt.toLowerCase();
  let selected = fallbackReplies.pcm;
  if (lower.includes('bio') || lower.includes('neet') || lower.includes('medic') || lower.includes('pcb')) {
    selected = fallbackReplies.biology;
  } else if (lower.includes('commerc') || lower.includes('ca') || lower.includes('business') || lower.includes('ipmat')) {
    selected = fallbackReplies.commerce;
  } else if (lower.includes('art') || lower.includes('humanit') || lower.includes('law') || lower.includes('clat') || lower.includes('upsc')) {
    selected = fallbackReplies.humanities;
  }

  return res.json({
    reply: selected,
    source: 'counselor-knowledge-base',
  });
});

// Setup dev server with Vite middlewares or production static files
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
      console.log('Vite middleware attached in development mode');
    } catch (e) {
      console.error('Error starting Vite middleware:', e);
    }
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pathfinder India server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
