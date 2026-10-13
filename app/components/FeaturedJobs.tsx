
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  DollarSign,
  Clock,
  Bookmark,
  ArrowUpRight,
  Sparkles,
  Zap,
  Globe,
  Layers,
  Hexagon,
  Cpu,
  Flame,
  Palette,
  Megaphone,
  BarChart3,
  Headphones,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import { toast } from "react-toastify";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: "Full-Time" | "Remote" | "Contract" | "Part-Time" | string;
  category?: string;
  createdAt?: string;
}

// category অনুযায়ী ডায়নামিক আইকন, গ্র্যাডিয়েন্ট ও গ্লো স্টাইল
const CATEGORY_STYLES: Record<
  string,
  { icon: React.ReactNode; gradient: string; glow: string }
> = {
  Development: {
    icon: <Zap size={22} className="text-amber-400" />,
    gradient: "from-amber-500/20 via-orange-500/20 to-yellow-500/20",
    glow: "rgba(245, 158, 11, 0.4)",
  },
  "Software Development": {
    icon: <Zap size={22} className="text-amber-400" />,
    gradient: "from-amber-500/20 via-orange-500/20 to-yellow-500/20",
    glow: "rgba(245, 158, 11, 0.4)",
  },
  Design: {
    icon: <Flame size={22} className="text-rose-400" />,
    gradient: "from-rose-500/20 via-pink-500/20 to-purple-500/20",
    glow: "rgba(244, 63, 94, 0.4)",
  },
  "UI/UX & Product Design": {
    icon: <Palette size={22} className="text-rose-400" />,
    gradient: "from-rose-500/20 via-pink-500/20 to-purple-500/20",
    glow: "rgba(244, 63, 94, 0.4)",
  },
  Marketing: {
    icon: <Globe size={22} className="text-cyan-400" />,
    gradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
    glow: "rgba(6, 182, 212, 0.4)",
  },
  "Digital Marketing": {
    icon: <Megaphone size={22} className="text-cyan-400" />,
    gradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
    glow: "rgba(6, 182, 212, 0.4)",
  },
  "AI & Machine Learning": {
    icon: <Cpu size={22} className="text-emerald-400" />,
    gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    glow: "rgba(16, 185, 129, 0.4)",
  },
  Management: {
    icon: <Layers size={22} className="text-indigo-400" />,
    gradient: "from-indigo-500/20 via-violet-500/20 to-purple-500/20",
    glow: "rgba(99, 102, 241, 0.4)",
  },
  "Finance & Accounting": {
    icon: <BarChart3 size={22} className="text-emerald-400" />,
    gradient: "from-emerald-500/20 via-teal-500/20 to-green-500/20",
    glow: "rgba(16, 185, 129, 0.4)",
  },
  "Customer Support": {
    icon: <Headphones size={22} className="text-sky-400" />,
    gradient: "from-sky-500/20 via-blue-500/20 to-indigo-500/20",
    glow: "rgba(56, 189, 248, 0.4)",
  },
  "Cyber Security": {
    icon: <ShieldCheck size={22} className="text-red-400" />,
    gradient: "from-red-500/20 via-rose-500/20 to-pink-500/20",
    glow: "rgba(239, 68, 68, 0.4)",
  },
};

const DEFAULT_STYLE = {
  icon: <Hexagon size={22} className="text-violet-400" />,
  gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
  glow: "rgba(139, 92, 246, 0.4)",
};

function timeAgo(dateString?: string) {
  if (!dateString) return "Recently";
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} hours ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

export const FeaturedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs", { cache: "no-store" });
        const json = await res.json();

        if (res.ok && json.success) {
          setJobs(json.jobs || json.data || []);
        } else {
          setErrorMsg(json.error || "Could not load jobs right now.");
        }
      } catch (err) {
        setErrorMsg("Could not reach the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(jobs.map((j) => j.category).filter(Boolean))
    );
    return ["All", ...unique];
  }, [jobs]);

  const filteredJobs =
    activeTab === "All"
      ? jobs
      : jobs.filter((job) => job.category === activeTab);

  const toggleSaveJob = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter((item) => item !== id));
      toast.info("Removed from saved jobs");
    } else {
      setSavedJobs([...savedJobs, id]);
      toast.success("Job saved successfully!");
    }
  };

  return (
    <section className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-indigo-400 font-semibold text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 inline-flex items-center gap-1.5">
              <Sparkles size={13} />
              {loading
                ? "Loading jobs..."
                : `${filteredJobs.length} ${
                    filteredJobs.length === 1 ? "Job" : "Jobs"
                  } Available`}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-3 tracking-tight flex items-center gap-3">
              <span>
                Featured{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Jobs
                </span>
              </span>

              {/* ডায়নামিক কাউন্টার ব্যাজ */}
              <span className="text-xs sm:text-sm font-semibold text-slate-300 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full">
                {loading
                  ? "..."
                  : `${filteredJobs.length} ${
                      filteredJobs.length === 1 ? "Job" : "Jobs"
                    } Available`}
              </span>
            </h2>
          </div>

          {/* Filter Tabs */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
              {categories.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as string)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                    activeTab === tab
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl -z-10 shadow-lg"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 animate-pulse space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-slate-800 rounded-2xl" />
                  <div className="w-8 h-8 bg-slate-800 rounded-full" />
                </div>
                <div className="h-5 bg-slate-800 rounded w-3/4 mt-4" />
                <div className="h-4 bg-slate-800 rounded w-1/2" />
                <div className="pt-6 border-t border-slate-800/80 flex justify-between">
                  <div className="h-4 bg-slate-800 rounded w-1/4" />
                  <div className="h-4 bg-slate-800 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && errorMsg && (
          <div className="py-16 text-center bg-slate-900/50 border border-slate-800 rounded-3xl">
            <p className="text-slate-400">{errorMsg}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !errorMsg && jobs.length === 0 && (
          <div className="py-16 text-center bg-slate-900/50 border border-slate-800 rounded-3xl">
            <Briefcase className="mx-auto text-slate-500 mb-3" size={32} />
            <p className="text-lg font-semibold text-slate-200">
              No jobs posted yet
            </p>
            <p className="text-slate-400 text-sm mt-1">
              New job postings will automatically appear here.
            </p>
          </div>
        )}

        {/* Jobs Grid Container */}
        {!loading && !errorMsg && jobs.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredJobs.map((job) => {
                const style =
                  CATEGORY_STYLES[job.category || ""] || DEFAULT_STYLE;
                const isSaved = savedJobs.includes(job._id);

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -8 }}
                    key={job._id}
                    onClick={() =>
                      toast.info(`Opening details for ${job.title}`)
                    }
                    className="group relative p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl hover:border-indigo-500/40 cursor-pointer transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Card Top */}
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        {/* Logo / Category Icon */}
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 6 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            style={{ boxShadow: `0 0 20px ${style.glow}` }}
                            className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${style.gradient} p-0.5 overflow-hidden flex items-center justify-center border border-white/10 group/logo`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover/logo:translate-x-full transition-transform duration-700" />
                            <div className="w-full h-full bg-slate-950/90 rounded-[14px] flex items-center justify-center relative z-10">
                              {style.icon}
                            </div>
                          </motion.div>

                          <div>
                            <h4 className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition">
                              {job.company}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {timeAgo(job.createdAt)}
                            </p>
                          </div>
                        </div>

                        {/* Save Bookmark Button */}
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.85 }}
                          onClick={(e) => toggleSaveJob(job._id, e)}
                          className={`p-2.5 rounded-full border transition-all ${
                            isSaved
                              ? "bg-indigo-600/20 border-indigo-500 text-indigo-400"
                              : "bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white"
                          }`}
                        >
                          <Bookmark
                            size={16}
                            fill={isSaved ? "currentColor" : "none"}
                          />
                        </motion.button>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mt-5 group-hover:text-indigo-300 transition line-clamp-1">
                        {job.title}
                      </h3>

                      {/* Badges Info */}
                      <div className="flex flex-wrap gap-2 mt-4 text-xs font-medium text-slate-300">
                        <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800/70 border border-slate-700/50">
                          <MapPin size={13} className="text-indigo-400" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800/70 border border-slate-700/50">
                          <DollarSign
                            size={13}
                            className="text-emerald-400"
                          />
                          {job.salary}
                        </span>
                        <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                          <Clock size={13} />
                          {job.type}
                        </span>
                      </div>
                    </div>

                    {/* Card Bottom / Apply Action */}
                    <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">
                        Easy Apply
                      </span>

                      <motion.div
                        whileHover={{ x: 3 }}
                        className="flex items-center gap-1 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300"
                      >
                        <span>Apply Now</span>
                        <ArrowUpRight size={16} />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View All Button */}
        {!loading && !errorMsg && jobs.length > 0 && (
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.info("Redirecting to all jobs...")}
              className="px-8 py-3.5 rounded-full bg-slate-900 border border-slate-700 hover:border-indigo-500 text-white font-semibold text-sm transition shadow-xl"
            >
              Explore All Available Jobs
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobs;