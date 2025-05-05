import { Container } from "@/components/container";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const PreparationSVG = () => (
  <svg width="120" height="120" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="96" height="96" rx="24" fill="#E0F2FE"/>
    <path d="M48 24C36.9543 24 28 32.9543 28 44C28 55.0457 36.9543 64 48 64C59.0457 64 68 55.0457 68 44C68 32.9543 59.0457 24 48 24ZM48 60C39.1634 60 32 52.8366 32 44C32 35.1634 39.1634 28 48 28C56.8366 28 64 35.1634 64 44C64 52.8366 56.8366 60 48 60Z" fill="#0EA5E9"/>
    <circle cx="48" cy="44" r="10" fill="#38BDF8"/>
    <rect x="44" y="70" width="8" height="16" rx="4" fill="#0EA5E9"/>
  </svg>
);

const InterviewPreparation = () => (
  <div className="min-h-screen bg-background pb-24">
    <Container>
      <div className="flex flex-col items-center justify-center text-center mt-16">
        <PreparationSVG />
        <Sparkles className="w-10 h-10 text-sky-500 my-4" />
        <h1 className="text-4xl font-bold mb-4 text-primary">Interview Preparation</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-6">
          Practice real interview scenarios powered by AI! Specify your job role, description, and skills—our AI generates tailored questions and provides instant feedback. After your mock interview, receive detailed feedback on your voice clarity, your answers, and suggestions for improvement. <br /><br />
          Ready to boost your confidence and ace your next interview?
        </p>
        <Button asChild size="lg" className="mt-4 text-lg">
          <a href="/generate">Take An Interview</a>
        </Button>
      </div>
    </Container>
  </div>
);

export default InterviewPreparation;
