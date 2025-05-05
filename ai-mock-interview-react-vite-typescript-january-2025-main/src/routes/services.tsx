import { Container } from "@/components/container";
import { Card } from "@/components/ui/card";
import { Sparkles, Briefcase, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const PreparationSVG = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="96" height="96" rx="24" fill="#E0F2FE"/>
    <path d="M48 24C36.9543 24 28 32.9543 28 44C28 55.0457 36.9543 64 48 64C59.0457 64 68 55.0457 68 44C68 32.9543 59.0457 24 48 24ZM48 60C39.1634 60 32 52.8366 32 44C32 35.1634 39.1634 28 48 28C56.8366 28 64 35.1634 64 44C64 52.8366 56.8366 60 48 60Z" fill="#0EA5E9"/>
    <circle cx="48" cy="44" r="10" fill="#38BDF8"/>
    <rect x="44" y="70" width="8" height="16" rx="4" fill="#0EA5E9"/>
  </svg>
);

const CoachingSVG = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="96" height="96" rx="24" fill="#DCFCE7"/>
    <rect x="28" y="36" width="40" height="24" rx="8" fill="#22C55E"/>
    <rect x="36" y="44" width="24" height="8" rx="4" fill="#4ADE80"/>
    <rect x="44" y="70" width="8" height="16" rx="4" fill="#22C55E"/>
  </svg>
);

const ResumeSVG = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="96" height="96" rx="24" fill="#F3E8FF"/>
    <rect x="32" y="28" width="32" height="40" rx="8" fill="#A78BFA"/>
    <rect x="40" y="36" width="16" height="4" rx="2" fill="#C4B5FD"/>
    <rect x="40" y="44" width="16" height="4" rx="2" fill="#C4B5FD"/>
    <rect x="40" y="52" width="16" height="4" rx="2" fill="#C4B5FD"/>
    <rect x="44" y="70" width="8" height="16" rx="4" fill="#A78BFA"/>
  </svg>
);

const services = [
  {
    id: "preparation",
    title: "Interview Preparation",
    icon: <Sparkles className="w-8 h-8 text-sky-500" />,
    illustration: <PreparationSVG />,
    description:
      "Master your next interview with AI-driven practice questions, instant feedback, and confidence-boosting simulations. Get tailored guidance to ace every stage of the hiring process.",
    route: "/services/interview-preparation",
  },
  {
    id: "coaching",
    title: "Career Coaching",
    icon: <Briefcase className="w-8 h-8 text-green-500" />,
    illustration: <CoachingSVG />,
    description:
      "Unlock your potential with expert career advice, personalized coaching sessions, and actionable strategies. Navigate your career path with clarity and purpose.",
    route: "/services/career-coaching",
  },
  {
    id: "resume",
    title: "Resume Building",
    icon: <FileText className="w-8 h-8 text-purple-500" />,
    illustration: <ResumeSVG />,
    description:
      "Craft a standout resume using smart templates, AI-powered suggestions, and real-time feedback. Showcase your strengths and land more interviews!",
    route: "/services/resume-building",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Container>
        <h1 className="text-4xl font-extrabold text-center my-12 text-primary">
          Our Premium Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              to={service.route}
              className="group"
              style={{ textDecoration: 'none' }}
            >
              <Card
                id={service.id}
                className="flex flex-col items-center p-8 bg-card shadow-lg hover:shadow-2xl transition-all border border-muted/30 rounded-2xl cursor-pointer group-hover:scale-105 group-hover:shadow-primary/30"
              >
                <div className="mb-2">{service.illustration}</div>
                <div className="mb-2">{service.icon}</div>
                <h2 className="text-2xl font-bold mb-2 text-center text-accent-foreground">
                  {service.title}
                </h2>
                <p className="text-muted-foreground text-center mb-4">
                  {service.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Services;
