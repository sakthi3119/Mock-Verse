import { Container } from "@/components/container";
import { FileText, Download, AlertCircle, CheckCircle, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { genAI } from "@/lib/genai";

const ResumeSVG = () => (
  <svg width="120" height="120" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="96" height="96" rx="24" fill="#F3E8FF"/>
    <rect x="32" y="28" width="32" height="40" rx="8" fill="#A78BFA"/>
    <rect x="40" y="36" width="16" height="4" rx="2" fill="#C4B5FD"/>
    <rect x="40" y="44" width="16" height="4" rx="2" fill="#C4B5FD"/>
    <rect x="40" y="52" width="16" height="4" rx="2" fill="#C4B5FD"/>
    <rect x="44" y="70" width="8" height="16" rx="4" fill="#A78BFA"/>
  </svg>
);

const handleCVUpload = async (file: File, setScore: (score: number) => void, setFeedback: (msg: string) => void, setLoading: (b: boolean) => void) => {
  setLoading(true);
  try {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      // Call Gemini API for score
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      // 1. Score prompt
      const scorePrompt = `You are an expert resume reviewer. Read the following CV and provide a single overall score out of 100 for its quality, relevance, and impact. Only return the score as a number (0-100), nothing else.\n\nCV Content:\n${text}`;
      const scoreResult = await model.generateContent(scorePrompt);
      const scoreResponse = await scoreResult.response;
      let score = parseInt(scoreResponse.text().replace(/[^0-9]/g, ""), 10);
      if (isNaN(score) || score < 0 || score > 100) score = 0;
      setScore(score);
      // 2. Feedback prompt
      const feedbackPrompt = `You are an expert resume reviewer. Read the following CV and provide concise, actionable feedback as 5-7 short bullet points. Each point should be brief (max 20 words), clear, and focus on key improvements. Avoid long paragraphs.\n\nCV Content:\n${text}`;
      const feedbackResult = await model.generateContent(feedbackPrompt);
      const feedbackResponse = await feedbackResult.response;
      setFeedback(feedbackResponse.text());
      setLoading(false);
    };
    reader.onerror = () => {
      setFeedback("Failed to read file. Please upload a valid PDF or text CV.");
      setLoading(false);
    };
    reader.readAsText(file);
  } catch (e) {
    setFeedback("Error processing your CV. Please try again.");
    setLoading(false);
  }
};

const EnhancedFeedback = ({ feedback }: { feedback: string }) => {
  // Split feedback into lines
  const lines = feedback.split(/\r?\n/).filter(l => l.trim() !== "");
  // Try to detect feedback like: "Title: content" for bolded left, normal right
  const feedbackItems = lines.map((line, idx) => {
    // Remove leading/trailing asterisks and whitespace, and also remove asterisks after splitting (for bolded markdown)
    let cleanLine = line.replace(/^\*+/, '').replace(/\*+$/, '').trim();
    // Remove markdown bolding asterisks (**) from start and end
    cleanLine = cleanLine.replace(/^\*+/, '').replace(/\*+$/, '').trim();
    // Match lines like "Title: content"
    const match = cleanLine.match(/^(.*?):\s*(.*)$/);
    if (match) {
      // Remove asterisks from both key and value
      const left = match[1].replace(/^\*+/, '').replace(/\*+$/, '').trim();
      const right = match[2].replace(/^\*+/, '').replace(/\*+$/, '').trim();
      return (
        <div key={"fb-"+idx} className="flex items-start gap-3 py-2 border-b last:border-b-0 border-dashed border-gray-200">
          <span className="flex-shrink-0 w-56 min-w-[11rem] font-semibold text-gray-800 flex items-center gap-1">
            <AlertCircle className="inline w-5 h-5 text-gray-400 mr-1" />
            {left}
          </span>
          <span className="text-gray-700 text-left">{right}</span>
        </div>
      );
    } else {
      // Fallback: just show as a single line
      return (
        <div key={"fb-"+idx} className="py-2 text-gray-700 flex items-center gap-2">
          <AlertCircle className="inline w-5 h-5 text-gray-400 mr-1" />
          <span>{cleanLine}</span>
        </div>
      );
    }
  });
  return (
    <div className="rounded-lg bg-purple-50 px-4 py-2">
      {feedbackItems}
    </div>
  );
};

const ResumeBuilding = () => {
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState<number|null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Container>
        <div className="flex flex-col items-center justify-center text-center mt-16">
          <ResumeSVG />
          <FileText className="w-10 h-10 text-purple-500 my-4" />
          <h1 className="text-4xl font-bold mb-4 text-primary">Resume Building</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            Create a standout resume that opens doors! Download our best-in-class CV template and learn what makes a CV truly shine:
          </p>
          <a href="/assets/software-engineer-resume-example.pdf" download className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition mb-6">
            <Download className="w-5 h-5" /> Download Sample CV
          </a>
          <div className="text-left text-base text-muted-foreground max-w-xl mx-auto space-y-3 mb-8">
            <div><b>What makes a great CV?</b></div>
            <ul className="list-disc ml-6">
              <li>Clear, concise structure with relevant sections</li>
              <li>Strong summary that highlights your unique value</li>
              <li>Quantifiable achievements, not just duties</li>
              <li>Tailored for the specific job and industry</li>
              <li>Professional formatting and easy-to-read fonts</li>
            </ul>
          </div>
          <div className="w-full max-w-2xl mx-auto mb-8">
            <h2 className="text-xl font-semibold mb-2 text-purple-700">Minute Details That Make a Difference</h2>
            <ul className="text-left text-base text-muted-foreground mx-auto mb-6 space-y-3">
              <li><AlertCircle className="inline w-5 h-5 text-red-400 mr-2" /> <b>Typos & Grammar:</b> Even a single typo can create a negative impression. Proofread thoroughly!</li>
              <li><AlertCircle className="inline w-5 h-5 text-red-400 mr-2" /> <b>Alignment & Whitespace:</b> Uneven spacing or cluttered sections make your CV hard to read.</li>
              <li><AlertCircle className="inline w-5 h-5 text-red-400 mr-2" /> <b>Consistency:</b> Use consistent fonts, bullet points, and date formats throughout.</li>
              <li><AlertCircle className="inline w-5 h-5 text-red-400 mr-2" /> <b>ATS Compatibility:</b> Avoid graphics or tables that confuse Applicant Tracking Systems.</li>
              <li><AlertCircle className="inline w-5 h-5 text-red-400 mr-2" /> <b>Action Verbs:</b> Start bullet points with strong action verbs for impact.</li>
              <li><AlertCircle className="inline w-5 h-5 text-red-400 mr-2" /> <b>Contact Details:</b> Make sure your email/phone are correct and professional.</li>
            </ul>
          </div>
          <div className="w-full max-w-2xl mx-auto mb-8">
            <h2 className="text-xl font-semibold mb-2 text-purple-700 flex items-center gap-2">
              <UploadCloud className="w-6 h-6 text-purple-400" /> Good vs Bad CV Examples (PDF)
            </h2>
            <div className="flex flex-row gap-8 items-center justify-center mb-4">
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl shadow w-48">
                <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                <span className="font-semibold mb-2">Good CV</span>
                <a
                  href="/assets/examples_of_good_and_bad_cvs.pdf#page=3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-sm mt-2"
                >
                  <FileText className="w-4 h-4" /> View PDF
                </a>
              </div>
              <div className="flex flex-col items-center p-4 bg-red-50 rounded-xl shadow w-48">
                <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                <span className="font-semibold mb-2">Bad CV</span>
                <a
                  href="/assets/examples_of_good_and_bad_cvs.pdf#page=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition text-sm mt-2"
                >
                  <FileText className="w-4 h-4" /> View PDF
                </a>
              </div>
            </div>
            <div className="text-center text-xs text-muted-foreground mb-2">Open each PDF page to see a real example of a good or bad CV.</div>
          </div>
          <div className="w-full max-w-2xl mx-auto mb-8">
            <h2 className="text-xl font-semibold mb-2 text-purple-700 flex items-center gap-2">
              <UploadCloud className="w-6 h-6 text-purple-400" /> Upload Your CV for AI Feedback
            </h2>
            <label className="inline-block">
              <span className="sr-only">Choose file</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                className="hidden"
                onChange={async (e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFeedback("");
                    setScore(null);
                    await handleCVUpload(e.target.files[0], setScore, setFeedback, setLoading);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }
                }}
                disabled={loading}
              />
              <span
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow transition cursor-pointer flex items-center gap-2"
                onClick={() => fileInputRef.current?.click()}
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter') fileInputRef.current?.click(); }}
                role="button"
                aria-label="Choose file"
              >
                Choose File
              </span>
              {fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files.length > 0 && (
                <span className="ml-3 text-base text-purple-700">{fileInputRef.current.files[0].name}</span>
              )}
            </label>
            {loading && <div className="text-purple-500 mt-2">Analyzing your CV...</div>}
            {score !== null && !loading && (
              <div className="mt-4 p-4 bg-purple-100 border border-purple-300 rounded-lg text-center">
                <span className="text-2xl font-bold text-purple-700 flex items-center justify-center gap-2">
                  <AlertCircle className="inline w-7 h-7 text-yellow-400" />
                  Your AI Resume Score: {score}/100
                </span>
                <div className="text-xs text-gray-500 mt-1">This score is generated by our AI based on your CV's overall quality and impact.</div>
              </div>
            )}
            {feedback && (
              <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg text-left text-sm">
                <b className="text-lg flex items-center gap-2 mb-2">
                  <AlertCircle className="inline w-5 h-5 text-purple-500" /> AI Feedback:
                </b>
                <EnhancedFeedback feedback={feedback} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ResumeBuilding;
