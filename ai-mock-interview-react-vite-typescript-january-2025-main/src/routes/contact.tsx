import { Container } from "@/components/container";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useRef, useState } from "react";

const socials = [
  { name: "Facebook", icon: <Facebook size={22} />, color: "hover:text-blue-500", url: "https://facebook.com" },
  { name: "Twitter", icon: <Twitter size={22} />, color: "hover:text-blue-400", url: "https://twitter.com" },
  { name: "Instagram", icon: <Instagram size={22} />, color: "hover:text-pink-500", url: "https://instagram.com" },
  { name: "LinkedIn", icon: <Linkedin size={22} />, color: "hover:text-blue-700", url: "https://linkedin.com" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Dummy form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    }, 1200);
  };

  return (
    <Container>
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-16 relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg width="100%" height="100%" className="absolute top-0 left-0 opacity-40 animate-pulse" style={{zIndex:0}}>
            <circle cx="80" cy="80" r="60" fill="#facc15" fillOpacity="0.15" />
            <circle cx="700" cy="200" r="90" fill="#a21caf" fillOpacity="0.12" />
            <circle cx="300" cy="400" r="70" fill="#2563eb" fillOpacity="0.11" />
          </svg>
        </div>
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 bg-clip-text text-transparent text-center drop-shadow-lg">Contact Us</h1>
          <p className="text-lg text-center text-muted-foreground mb-8 max-w-xl mx-auto">We'd love to hear from you! Fill out the form or reach out using the details below.</p>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Contact Details Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col justify-between min-h-[300px] border border-white/40">
              <div className="flex flex-col gap-2 mb-6">
                <span className="flex items-center gap-2 text-base font-semibold text-primary"><Phone size={18}/> 93849 38618</span>
                <span className="flex items-center gap-2 text-base font-semibold text-primary"><Mail size={18}/> support@mockverse.com</span>
                <span className="flex items-center gap-2 text-base font-semibold text-primary"><MapPin size={18}/> SECE, Coimbatore, 642 109</span>
                <span className="flex items-center gap-2 text-base font-semibold text-primary"><b>Mock Verse</b></span>
              </div>
              <div className="flex gap-4 mt-2">
                {socials.map(s => (
                  <a href={s.url} key={s.name} target="_blank" rel="noopener noreferrer" className={`transition-all duration-200 p-2 rounded-full bg-white/50 hover:bg-white shadow hover:scale-110 ${s.color}`}>{s.icon}</a>
                ))}
              </div>
            </div>
            {/* Contact Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white/90 rounded-2xl shadow-xl p-6 border border-white/40">
              <label className="font-medium text-primary">Name
                <input required value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Your Name" />
              </label>
              <label className="font-medium text-primary">Email
                <input required type="email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" placeholder="you@email.com" />
              </label>
              <label className="font-medium text-primary">Message
                <textarea required value={form.message} onChange={e=>setForm(f=>({...f, message:e.target.value}))} className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none min-h-[80px]" placeholder="How can we help you?" />
              </label>
              <button type="submit" disabled={loading} className="mt-2 py-2 px-6 rounded-lg bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 text-white font-semibold shadow hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? "Sending..." : sent ? "Message Sent!" : "Send Message"}
              </button>
              {sent && <span className="text-green-600 font-medium text-center animate-pulse">Thank you! We'll get back to you soon.</span>}
              {error && <span className="text-red-600 font-medium text-center">{error}</span>}
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
