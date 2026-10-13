"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Palette, 
  Megaphone, 
  BarChart3, 
  Headphones, 
  ShieldCheck, 
  Cpu, 
  Briefcase,
  ArrowUpRight 
} from "lucide-react";
import { toast } from "react-toastify";

interface Category {
  id: number;
  title: string;
  openings: number;
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
}

const categories: Category[] = [
  { id: 1, title: "Software Development", openings: 1240, icon: <Code2 size={24} />, gradient: "from-blue-600 to-indigo-600", glowColor: "rgba(99, 102, 241, 0.4)" },
  { id: 2, title: "UI/UX & Product Design", openings: 850, icon: <Palette size={24} />, gradient: "from-pink-600 to-rose-600", glowColor: "rgba(244, 63, 94, 0.4)" },
  { id: 3, title: "Digital Marketing", openings: 620, icon: <Megaphone size={24} />, gradient: "from-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)" },
  { id: 4, title: "Finance & Accounting", openings: 430, icon: <BarChart3 size={24} />, gradient: "from-emerald-500 to-teal-600", glowColor: "rgba(20, 184, 166, 0.4)" },
  { id: 5, title: "Customer Support", openings: 290, icon: <Headphones size={24} />, gradient: "from-cyan-500 to-blue-600", glowColor: "rgba(6, 182, 212, 0.4)" },
  { id: 6, title: "Cyber Security", openings: 180, icon: <ShieldCheck size={24} />, gradient: "from-red-600 to-rose-700", glowColor: "rgba(225, 29, 72, 0.4)" },
  { id: 7, title: "AI & Machine Learning", openings: 510, icon: <Cpu size={24} />, gradient: "from-violet-600 to-purple-600", glowColor: "rgba(147, 51, 234, 0.4)" },
  { id: 8, title: "Project Management", openings: 340, icon: <Briefcase size={24} />, gradient: "from-indigo-600 to-sky-600", glowColor: "rgba(14, 165, 233, 0.4)" },
];

export const JobCategories: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-indigo-400 font-semibold text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              Explore Opportunities
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-3 tracking-tight">
              Popular <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Job Categories</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gray-400 max-w-md mt-4 md:mt-0 text-sm sm:text-base"
          >
            Discover thousands of job openings across top industries. Choose your niche and apply in seconds.
          </motion.p>
        </div>

        {/* Animated Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <CategoryCard key={cat.id} cat={cat} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

/* Separate Animated Card Component for Interactive Effects */
const CategoryCard = ({ cat, index }: { cat: Category; index: number }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onClick={() => toast.info(`Viewing ${cat.title} jobs!`)}
      style={{
        boxShadow: `0 10px 30px -10px ${cat.glowColor}`,
      }}
      className="group relative p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl cursor-pointer overflow-hidden transition-all duration-300 flex flex-col justify-between h-52 hover:border-slate-700"
    >
      {/* Dynamic Hover Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${cat.glowColor}, transparent 80%)`,
        }}
      />

      {/* Top Bar: Icon & Arrow Button */}
      <div className="flex items-start justify-between relative z-10">
        
        {/* IMPRESSIVE ICON CONTAINER DESIGN */}
        <motion.div 
          whileHover={{ scale: 1.15, rotate: 6 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ boxShadow: `0 0 20px ${cat.glowColor}` }}
          className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} p-0.5 overflow-hidden flex items-center justify-center border border-white/20 group/icon`}
        >
          {/* Animated Inner Shine Line */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover/icon:translate-x-full transition-transform duration-700" />
          
          {/* Inner Glass Box */}
          <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center text-white relative z-10 backdrop-blur-sm">
            {cat.icon}
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ x: 3, y: -3 }}
          className="p-2.5 rounded-full bg-slate-800/80 text-slate-400 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-300"
        >
          <ArrowUpRight size={18} />
        </motion.div>
      </div>

      {/* Bottom Text Area */}
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors duration-300 line-clamp-1">
          {cat.title}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-xs text-slate-400 font-medium">
            {cat.openings.toLocaleString()} Active Vacancies
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCategories;