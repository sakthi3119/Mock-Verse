import { Container } from "@/components/container";
import { Briefcase, Lightbulb, Code, Database, TrendingUp, ArrowRightCircle, BrainCog, BookOpen, FlaskConical, Cloud, Shield, Rocket, Trophy } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { extractCrispSteps } from "@/lib/genai";

const CoachingSVG = () => (
  <svg width="120" height="120" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="96" height="96" rx="24" fill="#DCFCE7"/>
    <rect x="28" y="36" width="40" height="24" rx="8" fill="#22C55E"/>
    <rect x="36" y="44" width="24" height="8" rx="4" fill="#4ADE80"/>
    <rect x="44" y="70" width="8" height="16" rx="4" fill="#22C55E"/>
  </svg>
);

const trendyRoles = [
  {
    key: "ai_ml_engineer",
    label: "AI/ML Engineer",
    icon: <Code className="w-8 h-8 text-blue-500 mb-2" />,
    desc: "Deep Learning, NLP, MLOps"
  },
  {
    key: "data_scientist",
    label: "Data Scientist",
    icon: <Database className="w-8 h-8 text-purple-500 mb-2" />,
    desc: "ML/AI/Analytics"
  },
  {
    key: "cloud_architect",
    label: "Cloud Solutions Architect",
    icon: <TrendingUp className="w-8 h-8 text-cyan-500 mb-2" />,
    desc: "AWS, Azure, GCP, DevOps"
  },
  {
    key: "cybersecurity_specialist",
    label: "Cybersecurity Specialist",
    icon: <Lightbulb className="w-8 h-8 text-red-400 mb-2" />,
    desc: "Security, Pentesting, Compliance"
  },
  {
    key: "product_manager",
    label: "Product Manager",
    icon: <Briefcase className="w-8 h-8 text-yellow-500 mb-2" />,
    desc: "Strategy, UX, Agile"
  }
];

const roleQuestions: Record<string, { q: string; key: string; type: "slider"|"text" }[]> = {
  ai_ml_engineer: [
    { q: "How proficient are you in Python?", key: "python", type: "slider" },
    { q: "How familiar are you with deep learning frameworks (TensorFlow, PyTorch)?", key: "dl_frameworks", type: "slider" },
    { q: "How would you rate your math/statistics knowledge?", key: "math_stats", type: "slider" },
    { q: "How comfortable are you with MLOps tools (Kubeflow, MLflow)?", key: "mlops", type: "slider" },
    { q: "How experienced are you with deploying models to production?", key: "deployment", type: "slider" }
  ],
  data_scientist: [
    { q: "How proficient are you in Python?", key: "python", type: "slider" },
    { q: "How familiar are you with data analysis libraries (Pandas, NumPy)?", key: "data_libs", type: "slider" },
    { q: "How would you rate your knowledge of ML algorithms?", key: "ml_algos", type: "slider" },
    { q: "How comfortable are you with data visualization tools (Tableau, Matplotlib)?", key: "viz", type: "slider" },
    { q: "How experienced are you with real-world data cleaning?", key: "dataclean", type: "slider" }
  ],
  cloud_architect: [
    { q: "How familiar are you with AWS, Azure, or GCP?", key: "cloud", type: "slider" },
    { q: "How would you rate your DevOps skills?", key: "devops", type: "slider" },
    { q: "How comfortable are you with infrastructure as code (Terraform, CloudFormation)?", key: "iac", type: "slider" },
    { q: "How experienced are you with containerization (Docker, Kubernetes)?", key: "containers", type: "slider" },
    { q: "How would you rate your knowledge of cloud security best practices?", key: "cloudsec", type: "slider" }
  ],
  cybersecurity_specialist: [
    { q: "How would you rate your knowledge of security protocols?", key: "protocols", type: "slider" },
    { q: "How familiar are you with pentesting tools?", key: "pentesting", type: "slider" },
    { q: "How comfortable are you with compliance frameworks?", key: "compliance", type: "slider" },
    { q: "How experienced are you with incident response?", key: "incident", type: "slider" },
    { q: "How would you rate your knowledge of network security?", key: "network", type: "slider" }
  ],
  product_manager: [
    { q: "How would you rate your communication skills?", key: "communication", type: "slider" },
    { q: "How familiar are you with Agile methodologies?", key: "agile", type: "slider" },
    { q: "How would you rate your technical background?", key: "technical", type: "slider" },
    { q: "How comfortable are you with product analytics?", key: "analytics", type: "slider" },
    { q: "How experienced are you with user research?", key: "research", type: "slider" }
  ]
};

const CareerCoaching = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [step, setStep] = useState(0);
  const [roadmap, setRoadmap] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (roleKey: string) => {
    setSelectedRole(roleKey);
    setAnswers({});
    setStep(0);
    setRoadmap("");
  };

  const handleAnswer = (val: number) => {
    const qKey = roleQuestions[selectedRole!][step].key;
    setAnswers(a => ({ ...a, [qKey]: val }));
    if (step < roleQuestions[selectedRole!].length - 1) {
      setStep(step + 1);
    } else {
      generateRoadmap();
    }
  };

  const generateRoadmap = async () => {
    setLoading(true);
    // Compose a prompt for the AI
    const questions = roleQuestions[selectedRole!]
      .map(q => `${q.q} User: ${answers[q.key] || 0}%`)
      .join("\n");
    // Add explicit instruction to adjust roadmap length/difficulty based on proficiency
    const prompt = `You are an expert career coach. Based on the user's answers for the role '${trendyRoles.find(r => r.key === selectedRole)?.label}', generate a step-by-step personalized roadmap with actionable advice.\n\n${questions}\n\nIf the user's average proficiency is high (e.g., above 75%), generate a much shorter, more advanced roadmap (fewer steps, focus on mastery, advanced topics, and unique value). If the proficiency is low (e.g., below 50%), generate a more detailed, beginner-friendly roadmap (more steps, foundational skills). The roadmap length and content must adapt to the user's skill level.`;
    try {
      const { genAI } = await import("../lib/genai");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setRoadmap(response.text());
    } catch (e) {
      setRoadmap("Sorry, there was an error generating your roadmap.");
    }
    setLoading(false);
  };

  const downloadRoadmapExcel = (roadmap: string) => {
    // Parse roadmap into rows: if possible, split into step and detail
    const lines = roadmap.split(/\r?\n/).filter(l => l.trim() !== "");
    // Try to group as [Step, Description]
    let rows: [string, string, string][] = [];
    let currentStep = "";
    lines.forEach(line => {
      const match = line.match(/^(Step\s*\d+[:.)\-]?)(.*)/i);
      if (match) {
        currentStep = match[1].replace(/[:.)\-]+$/, "").trim();
        rows.push([currentStep, match[2].trim(), "Not Done"]);
      } else if (currentStep) {
        // Add as additional description row for this step
        if (rows.length) rows[rows.length-1][1] += (rows[rows.length-1][1] ? "\n" : "") + line;
      }
    });
    if (rows.length === 0) {
      // fallback: treat each line as a step
      rows = lines.map((l, i) => [
        `Step ${i+1}`,
        l,
        "Not Done"
      ]);
    }
    const ws = XLSX.utils.aoa_to_sheet([
      ["Step", "Description", "Status (Done/Not Done)"],
      ...rows
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Roadmap");
    XLSX.writeFile(wb, "Personalized_Roadmap.xlsx");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Container>
        <div className="flex flex-col items-center justify-center text-center mt-16">
          <CoachingSVG />
          <Briefcase className="w-10 h-10 text-green-500 my-4" />
          <h1 className="text-4xl font-bold mb-4 text-primary">Career Coaching</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            Our AI-powered career coaching helps you grow beyond just interview prep. Explore multiple career paths, compare roles, and get a personalized roadmap to your dream job!
          </p>
          <div className="flex flex-col items-center w-full mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-green-700">Choose Your Path</h2>
            <div className="flex flex-row gap-6 flex-wrap items-center justify-center mb-4">
              {trendyRoles.map((role) => (
                <button
                  key={role.key}
                  className={`flex flex-col items-center p-4 rounded-xl shadow w-48 mb-2 border-2 transition-all ${selectedRole === role.key ? 'border-green-500 bg-green-50' : 'border-transparent bg-white hover:bg-green-50'}`}
                  onClick={() => handleRoleSelect(role.key)}
                  disabled={loading}
                >
                  {role.icon}
                  <span className="font-semibold text-lg mb-1">{role.label}</span>
                  <span className="text-xs text-muted-foreground">{role.desc}</span>
                </button>
              ))}
            </div>
            {selectedRole && step < roleQuestions[selectedRole].length && (
              <div className="mt-6 bg-white border rounded-lg shadow p-6 w-full max-w-md mx-auto flex flex-col items-center">
                <span className="font-semibold text-base mb-2">{roleQuestions[selectedRole][step].q}</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={answers[roleQuestions[selectedRole][step].key] ?? 50}
                  onChange={e => setAnswers(a => ({ ...a, [roleQuestions[selectedRole][step].key]: Number(e.target.value) }))}
                  className="w-2/3 my-4 accent-green-500"
                  disabled={loading}
                />
                <span className="text-green-700 font-bold">{answers[roleQuestions[selectedRole][step].key] ?? 50}%</span>
                <button
                  className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow"
                  onClick={() => handleAnswer(answers[roleQuestions[selectedRole][step].key] ?? 50)}
                  disabled={loading}
                >{step === roleQuestions[selectedRole].length - 1 ? 'Generate Roadmap' : 'Next'}</button>
              </div>
            )}
            {loading && (
              <div className="mt-8 text-green-700 font-semibold">Generating your personalized roadmap...</div>
            )}
            {roadmap && !loading && (
              <>
                <div className="mt-8 flex flex-col items-center w-full overflow-x-auto">
                  <h3 className="font-bold text-lg mb-6 text-green-800 flex items-center gap-2"><ArrowRightCircle className="w-6 h-6 text-green-500"/>Your AI-Powered Roadmap:</h3>
                  <MindmapRoadmap roadmap={roadmap} />
                </div>
                <div className="flex flex-col items-center mt-6">
                  <button
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow mb-2"
                    onClick={() => downloadRoadmapExcel(roadmap)}
                  >Download Offline Roadmap for Tracking</button>
                  <span className="text-xs text-gray-500">Download a detailed Excel roadmap to track your progress offline.</span>
                </div>
              </>
            )}
            <div className="w-full max-w-2xl mx-auto mb-8">
              <h2 className="text-xl font-semibold mb-2 text-green-700">Your Personalized Roadmap</h2>
              <ul className="text-left text-base text-muted-foreground mx-auto mb-6 space-y-3">
                <li><ArrowRightCircle className="inline w-5 h-5 text-emerald-400 mr-2" /> <b>Specify Multiple Roles:</b> Enter two or more job roles you’re interested in. AI analyzes each and creates a tailored roadmap for every path.</li>
                <li><ArrowRightCircle className="inline w-5 h-5 text-emerald-400 mr-2" /> <b>Skill Gap Analysis:</b> See what skills you need to develop for each role, with actionable resources and practice modules.</li>
                <li><ArrowRightCircle className="inline w-5 h-5 text-emerald-400 mr-2" /> <b>Step-by-Step Guidance:</b> Follow a visual, stepwise plan to progress from your current skills to your target job—track progress and get nudges along the way.</li>
                <li><ArrowRightCircle className="inline w-5 h-5 text-emerald-400 mr-2" /> <b>Compare & Decide:</b> Instantly compare the requirements, growth, and opportunities for each path.</li>
              </ul>
            </div>
            <div className="w-full max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-2 text-green-700">How Our AI Coaching Works</h2>
              <ul className="text-left text-base text-muted-foreground mx-auto mb-6 space-y-3">
                <li><Lightbulb className="inline w-5 h-5 text-yellow-400 mr-2" /> <b>Personalized Interview Creation:</b> You specify your job role, description, and skills—AI generates targeted questions to match your career goals.</li>
                <li><Lightbulb className="inline w-5 h-5 text-yellow-400 mr-2" /> <b>Real-Time Feedback:</b> After each mock interview, receive instant insights on your answers, voice clarity, and communication style.</li>
                <li><Lightbulb className="inline w-5 h-5 text-yellow-400 mr-2" /> <b>Best-Answer Suggestions:</b> Get AI-suggested model answers and tips for improvement, tailored to your unique profile.</li>
                <li><Lightbulb className="inline w-5 h-5 text-yellow-400 mr-2" /> <b>Continuous Growth:</b> Track your progress and receive coaching nudges to help you improve over time.</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const MINDMAP_COLORS = [
  'from-green-50 to-green-100 border-green-200',
  'from-purple-50 to-purple-100 border-purple-200',
  'from-yellow-50 to-yellow-100 border-yellow-200',
  'from-blue-50 to-blue-100 border-blue-200',
  'from-pink-50 to-pink-100 border-pink-200',
  'from-emerald-50 to-emerald-100 border-emerald-200',
  'from-orange-50 to-orange-100 border-orange-200',
  'from-cyan-50 to-cyan-100 border-cyan-200',
  'from-fuchsia-50 to-fuchsia-100 border-fuchsia-200'
];

const STEP_ICONS = [
  <BrainCog className="w-7 h-7" />,
  <BookOpen className="w-7 h-7" />,
  <FlaskConical className="w-7 h-7" />,
  <Cloud className="w-7 h-7" />,
  <Shield className="w-7 h-7" />,
  <Rocket className="w-7 h-7" />,
  <Trophy className="w-7 h-7" />
];
const STEP_EMOJIS = [
  "🧠", "📖", "🧪", "☁️", "🛡️", "🚀", "🏆"
];

const MindmapRoadmap = ({ roadmap }: { roadmap: string }) => {
  // Use crisp, actionable steps for a sharp roadmap
  const steps = extractCrispSteps(roadmap);

  // Limit to max 7 steps for visual clarity
  const blocks = steps.slice(0, 7).map((step) => ({
    title: step,
    details: []
  }));

  // Zig-zag (snake) layout: alternate left-right per row, 2 per row
  const rows: { blocks: typeof blocks, direction: 'right'|'left' }[] = [];
  for (let i = 0; i < blocks.length; i += 2) {
    rows.push({
      blocks: blocks.slice(i, i + 2),
      direction: (Math.floor(i/2) % 2 === 0) ? 'right' : 'left'
    });
  }

  return (
    <div className="flex flex-col gap-16 items-center w-full">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className={`flex flex-row ${row.direction === 'right' ? '' : 'flex-row-reverse'} items-center w-full justify-center gap-16`}>
          {row.blocks.map((block, idx) => {
            const colorIdx = (rowIdx * 2 + idx) % MINDMAP_COLORS.length;
            const iconIdx = (rowIdx * 2 + idx) % STEP_ICONS.length;
            const emoji = STEP_EMOJIS[iconIdx];
            return (
              <div key={idx} className={`relative flex flex-col items-center`}>
                <div className={`bg-gradient-to-br ${MINDMAP_COLORS[colorIdx]} border-2 rounded-2xl shadow-xl px-8 py-6 min-w-[260px] max-w-xs transition-all duration-300 hover:scale-105 flex flex-col items-center`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{emoji}</span>
                    <span className="text-green-700">{STEP_ICONS[iconIdx]}</span>
                  </div>
                  <div className="font-bold text-lg mb-2 text-center flex items-center gap-2">
                    <span className="break-words">{block.title.replace(/\*\*/g,'').replace(/\*+/g,'')}</span>
                  </div>
                </div>
                {/* Draw arrow to next block or next row */}
                {((row.direction === 'right' && idx === row.blocks.length - 1 && rowIdx < rows.length-1) ||
                  (row.direction === 'left' && idx === 0 && rowIdx < rows.length-1)) && (
                  <svg width="48" height="64" className={`absolute ${row.direction === 'right' ? 'right-[-56px]' : 'left-[-56px]'} top-1/2 -translate-y-1/2 z-10`} viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 0v48M24 48c0 8 16 8 16 16M24 48c0 8-16 8-16 16" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {/* Draw horizontal arrow to next block in same row */}
                {idx < row.blocks.length-1 && (
                  <svg width="48" height="48" className="absolute right-[-36px] top-1/2 -translate-y-1/2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 24h28M36 24l-6-6M36 24l-6 6" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CareerCoaching;
