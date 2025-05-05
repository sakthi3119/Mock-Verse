import { Sparkles } from "lucide-react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { MarqueImg } from "@/components/marquee-img";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    if (inView) {
      const duration = 2000; // 2 seconds
      const steps = 50;
      const interval = duration / steps;

      let current1 = 0;
      let current2 = 0;
      const timer = setInterval(() => {
        if (current1 < 250) {
          setCount1(current1);
          current1 += 5;
        }
        if (current2 < 1200) {
          setCount2(current2);
          current2 += 24;
        }
        if (current1 >= 250 && current2 >= 1200) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [inView]);

  return (
    <div className="flex-col w-full min-h-screen pb-24 relative overflow-hidden bg-gradient-to-tr from-[#0f2027] via-[#2c5364] to-[#ff6e7f]">
      {/* Decorative background shapes for extra vibrance */}
      <div className="pointer-events-none z-0 absolute inset-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-400 opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-purple-500 opacity-20 rounded-full blur-2xl animate-pulse" />
      </div>
      <Container>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="my-8"
          >
          <h2 className="text-3xl text-center md:text-left md:text-6xl relative z-10 drop-shadow-xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-500 to-blue-400 font-extrabold md:text-8xl inline-block transform hover:scale-105 transition-transform duration-300">
              MOCK VERSE
            </span>
            <span className="text-white font-extrabold ml-2 drop-shadow-lg">
              - A better way to
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 font-bold drop-shadow-md">
              improve your interview chances and skills
            </span>
          </h2>

          <p className="mt-8 text-white/90 text-lg md:text-xl font-medium drop-shadow-lg bg-black/20 rounded-lg px-4 py-2 inline-block">
            Boost your interview skills and increase your success rate with
            AI-driven insights. Discover a smarter way to prepare, practice, and
            stand out.
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex w-full items-center justify-evenly md:px-12 md:py-16 md:items-center md:justify-end gap-12 z-10">
          <div className="transform hover:scale-105 transition-transform duration-300 p-6 rounded-xl bg-black/40 backdrop-blur-md shadow-xl border border-white/10">
            <p className="text-4xl font-bold bg-gradient-to-r from-yellow-200 via-pink-300 to-blue-300 bg-clip-text text-transparent drop-shadow-md">
              {count1}k+
              <span className="block text-xl text-white/80 font-normal mt-2">
                Offers Received
              </span>
            </p>
          </div>
          <div className="transform hover:scale-105 transition-transform duration-300 p-6 rounded-xl bg-black/40 backdrop-blur-md shadow-xl border border-white/10">
            <p className="text-4xl font-bold bg-gradient-to-r from-yellow-200 via-pink-300 to-blue-300 bg-clip-text text-transparent drop-shadow-md">
              {count2}k+
              <span className="block text-xl text-white/80 font-normal mt-2">
                Interviews Aced
              </span>
            </p>
          </div>
        </motion.div>

        {/* image section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full mt-4 rounded-xl bg-gradient-to-br from-[#232526] via-[#414345] to-[#e96443] h-[420px] shadow-2xl overflow-hidden relative transform hover:scale-[1.02] transition-transform duration-500 border border-white/10">
          <img
            src="/assets/img/hero.jpg"
            alt=""
            className="w-full h-full object-cover"
          />

          {/* <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-4 left-4 px-4 py-2 rounded-md bg-white/60 backdrop-blur-md shadow-lg border border-white/20">
            Inteviews Copilot&copy;
          </motion.div> */}

          {/* <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden md:block absolute w-80 bottom-4 right-4 px-6 py-4 rounded-lg bg-white/70 backdrop-blur-md shadow-lg border border-white/20">
            <h2 className="text-neutral-800 font-semibold">Developer</h2>
            <p className="text-sm text-neutral-500">
              Interview
            </p>

            <Button className="mt-3">
              Generate <Sparkles />
            </Button>
          </motion.div> */}
        </motion.div>
      </Container>

      {/* marquee section */}
      <div className="w-full my-12 py-8 bg-gradient-to-r from-purple-50 to-pink-50">
        <Marquee pauseOnHover>
          <MarqueImg img="/assets/logo/firebase.png" />
          <MarqueImg img="/assets/logo/Tailwind CSS.png" />
          <MarqueImg img="/assets/logo/python.png" />
          <MarqueImg img="/assets/logo/Node.js.png" />
          <MarqueImg img="/assets/logo/react.png" />
          <MarqueImg img="/assets/logo/MongoDB.png" />
        </Marquee>
      </div>

      <Container className="py-8 space-y-8">
        <h2 className="tracking-wide text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 drop-shadow-xl">
          Unleash your potential with personalized AI insights and targeted interview practice.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="col-span-1 md:col-span-3">
            <img
              src="/assets/img/office.jpg"
              alt=""
              className="w-full max-h-96 rounded-md object-cover border-2 border-white/10 shadow-lg"
            />
          </div>

          <div className="col-span-1 md:col-span-2 gap-8 max-h-96 min-h-96 w-full flex flex-col items-center justify-center text-center">
            <p className="text-center text-white/90 bg-black/30 rounded-lg px-4 py-2 font-medium drop-shadow-md">
              Transform the way you prepare, gain confidence, and boost your
              chances of landing your dream job. Let AI be your edge in
              today&apos;s competitive job market.
            </p>

            <Link to={"/generate"} className="w-full">
              <Button className="w-3/4 bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 text-white font-bold shadow-lg border-none">
                Generate <Sparkles className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;