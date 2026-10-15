"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Search, MapPin, Briefcase, TrendingUp, Users, Sparkles } from "lucide-react";
import { toast } from "react-toastify";

export const Hero: React.FC = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  // Scroll Animations Config
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleCard = useTransform(scrollY, [0, 300], [1, 0.9]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword && !location) {
      toast.warning("Please enter a job title or location!");
      return;
    }
    toast.success(`Searching for: ${keyword || "All Jobs"} in ${location || "All Locations"}`);
    router.push(`/job?query=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`);
  };

  const popularTags = ["Frontend Developer", "UI/UX Designer", "Marketing", "Remote Work", "Data Analyst"];

  // Animation Variants (typed with Variants to fix TS2322)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-24 lg:py-36 min-h-[90vh] flex items-center justify-center">
      
      {/* 1. Animated Parallax Background Blobs */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-violet-600/25 rounded-full blur-[140px]" 
        />
      </motion.div>

      {/* 2. Floating Decorative Badges (Scroll Sensitive) */}
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex absolute top-32 left-12 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl gap-3 items-center shadow-2xl"
      >
        <div className="p-3 bg-indigo-500 rounded-xl text-white">
          <Briefcase size={22} />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium">Active Jobs</p>
          <p className="text-lg font-bold text-white">12,450+</p>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden lg:flex absolute bottom-28 right-12 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl gap-3 items-center shadow-2xl"
      >
        <div className="p-3 bg-emerald-500 rounded-xl text-white">
          <Users size={22} />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium">Top Companies</p>
          <p className="text-lg font-bold text-white">850+ Hiring</p>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          style={{ opacity: opacityText, scale: scaleCard }}
        >
          {/* Top Pill Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium backdrop-blur-md">
              <Sparkles size={16} className="text-indigo-400 animate-pulse" />
              #1 Platform for Tech & Creative Careers
            </span>
          </motion.div>

          {/* Animated Headline */}
          <motion.h1 
            variants={itemVariants}
            className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight max-w-5xl mx-auto"
          >
            Find your next <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              dream opportunity
            </span> effortlessly.
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-base sm:text-xl text-gray-400 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Connect with top-tier companies, explore remote options, and elevate your career with our next-generation Job Search Engine.
          </motion.p>

          {/* Animated Interactive Search Bar */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="mt-10 max-w-4xl mx-auto"
          >
            <form
              onSubmit={handleSearch}
              className="p-2 sm:p-3 bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-full border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center gap-2"
            >
              {/* Input 1: Keyword */}
              <div className="flex items-center gap-3 px-4 py-3 w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-white/10">
                <Search className="text-indigo-400 shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="Job title, skills, or company..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              {/* Input 2: Location */}
              <div className="flex items-center gap-3 px-4 py-3 w-full sm:w-1/2">
                <MapPin className="text-violet-400 shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="City, country, or 'Remote'..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              {/* Search Button with Pulse Animation */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(99, 102, 241, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-xl sm:rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold transition shrink-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Search Jobs</span>
                <TrendingUp size={18} />
              </motion.button>
            </form>
          </motion.div>

          {/* Popular Search Tags */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-400"
          >
            <span className="font-medium text-gray-300">Popular Searches:</span>
            {popularTags.map((tag, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => {
                  setKeyword(tag);
                  toast.info(`Filter applied: "${tag}"`);
                }}
                className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 text-gray-300 hover:text-indigo-300 transition text-xs sm:text-sm font-medium backdrop-blur-sm cursor-pointer"
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default Hero;