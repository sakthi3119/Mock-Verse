import { Container } from "@/components/container";
import { Award, Users, Rocket, Lightbulb, Star } from "lucide-react";

const values = [
  { icon: <Lightbulb size={32} className="text-yellow-400" />, title: "Innovation", desc: "We leverage AI to bring you the most modern, effective career tools." },
  { icon: <Users size={32} className="text-blue-400" />, title: "Empowerment", desc: "Our goal is to empower job seekers and students with actionable insights." },
  { icon: <Rocket size={32} className="text-pink-400" />, title: "Growth", desc: "We help you grow your skills and confidence for real-world success." },
  { icon: <Star size={32} className="text-yellow-300" />, title: "Excellence", desc: "We strive for excellence in everything we do." },
  { icon: <Award size={32} className="text-indigo-400" />, title: "Trust", desc: "Your journey is safe with us. We value your privacy and trust." },
];

const About = () => (
  <Container>
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-16 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" className="absolute top-0 left-0 opacity-40 animate-pulse" style={{zIndex:0}}>
          <circle cx="120" cy="80" r="60" fill="#facc15" fillOpacity="0.11" />
          <circle cx="700" cy="200" r="90" fill="#a21caf" fillOpacity="0.10" />
          <circle cx="400" cy="420" r="70" fill="#2563eb" fillOpacity="0.13" />
        </svg>
      </div>
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 bg-clip-text text-transparent text-center drop-shadow-lg">About Us</h1>
        <p className="text-lg text-center text-muted-foreground mb-8 max-w-2xl mx-auto">We are committed to helping you unlock your full potential with AI-powered tools. Our platform offers a wide range of resources to improve your interview skills and chances of success.</p>
        {/* Mission with animation */}
        <div className="flex flex-col items-center mb-10">
          <span className="text-xl font-semibold text-primary animate-pulse mb-2">Our Mission</span>
          <span className="text-lg text-center text-gradient bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 bg-clip-text text-transparent font-bold animate-fade-in">Empowering job seekers and students with personalized, actionable guidance for career growth.</span>
        </div>
        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {values.map((v) => (
            <div key={v.title} className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-white/40 hover:scale-105 transition-all duration-200">
              <div className="mb-2">{v.icon}</div>
              <div className="font-bold text-lg text-primary mb-1">{v.title}</div>
              <div className="text-center text-muted-foreground text-base">{v.desc}</div>
            </div>
          ))}
        </div>
        {/* Timeline Section */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-primary text-center mb-4">Our Journey</h2>
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6">
            <div className="flex flex-col items-center">
              <span className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 mb-2 animate-bounce" />
              <span className="text-sm font-semibold">2023</span>
              <span className="text-xs text-muted-foreground">MockVerse founded</span>
            </div>
            <div className="h-10 w-1 bg-gradient-to-b md:bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 mx-auto md:h-1 md:w-32" />
            <div className="flex flex-col items-center">
              <span className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 mb-2 animate-bounce" />
              <span className="text-sm font-semibold">2024</span>
              <span className="text-xs text-muted-foreground">Launched AI-powered Interview Platform</span>
            </div>
            <div className="h-10 w-1 bg-gradient-to-b md:bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 mx-auto md:h-1 md:w-32" />
            <div className="flex flex-col items-center">
              <span className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 mb-2 animate-bounce" />
              <span className="text-sm font-semibold">2025</span>
              <span className="text-xs text-muted-foreground">Serving 1000+ users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

export default About;
