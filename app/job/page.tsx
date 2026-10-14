"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, DollarSign, Clock, Building2, ArrowUpRight, Filter, Sparkles } from "lucide-react";
import { toast } from "react-toastify";

interface JobItem {
  _id: string;
  title: string;
  company?: string;
  location?: string;
  salary?: string;
  type?: string;
  category?: string;
  createdAt?: string;
}

export default function FindJobsPage() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        if (res.ok && data.success) {
          setJobs(data.data || []);
        } else {
          toast.error("Failed to load jobs");
        }
      } catch (err) {
        console.error("Fetch jobs error:", err);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const categories = ["All", ...Array.from(new Set(jobs.map((j) => j.category).filter(Boolean)))];
  const jobTypes = ["All", "Full-Time", "Remote", "Contract", "Part-Time"];

  const filteredJobs = jobs.filter((job) => {
    const title = job.title || "";
    const company = job.company || "";
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
    const matchesType = selectedType === "All" || job.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-indigo-400 font-semibold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 inline-flex items-center gap-1.5">
            <Sparkles size={13} /> Job Portal Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Find Your <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Dream Job</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Explore thousands of job listings with advanced filtering and instant applications.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3.5 py-2 rounded-2xl">
              <Filter size={14} className="text-indigo-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-slate-300 text-xs focus:outline-none cursor-pointer"
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat as string} className="bg-slate-900 text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3.5 py-2 rounded-2xl">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-transparent text-slate-300 text-xs focus:outline-none cursor-pointer"
              >
                {jobTypes.map((type, i) => (
                  <option key={i} value={type} className="bg-slate-900 text-white">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm">Loading available jobs...</div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div 
                key={job._id} 
                className="group relative bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 hover:border-indigo-500/40 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition line-clamp-1">
                        {job.title}
                      </h3>
                      <p className="text-xs text-indigo-400 font-medium flex items-center gap-1 mt-1">
                        <Building2 size={13} /> {job.company || "Company"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-500" />
                      <span>{job.location || "Remote"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={14} className="text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">{job.salary || "Negotiable"}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 text-[11px] font-semibold rounded-xl border border-indigo-500/20">
                      {job.type || "Full-Time"}
                    </span>
                    {job.category && (
                      <span className="px-3 py-1 bg-slate-800/80 text-slate-300 text-[11px] font-semibold rounded-xl border border-slate-700/50">
                        {job.category}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Easy Apply</span>
                  <Link href={`/jobs/${job._id}/apply`}>
                    <button className="flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition">
                      <span>Apply Now</span>
                      <ArrowUpRight size={15} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <p className="text-sm text-slate-400">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}