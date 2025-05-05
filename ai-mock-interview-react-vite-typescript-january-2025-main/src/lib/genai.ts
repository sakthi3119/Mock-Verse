import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing Gemini API Key");
}

export const genAI = new GoogleGenerativeAI(apiKey);

// Utility to convert a verbose AI roadmap to crisp, actionable steps
export function extractCrispSteps(text: string): string[] {
  // Split by line, filter for lines that look like steps, or short actionable advice
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  // Only keep lines that look like 'Step X:' or 'Step X.' or 'Step X -'
  const stepLines = lines.filter(l =>
    /^step\s*\d+[:.)\-]/i.test(l)
  );
  // If not enough, fallback to short actionable lines
  if (stepLines.length < 4) {
    return lines.filter(l => l.length < 80 && !l.toLowerCase().startsWith('phase')).slice(0, 6);
  }
  // Always show as Step 1-N, never Phase
  return stepLines.slice(0, 6).map((l, i) => l.replace(/^.*?(Step\s*\d+[:.)\-]?)/i, `Step ${i+1}:`).replace(/\s*[:.)\-]+\s*$/, ':'));
}
