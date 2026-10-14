"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Briefcase, Sparkles } from "lucide-react";
import { toast } from "react-toastify";

interface CompanyItem {
  _id: string;
  name?: string;
  email?: string;
  companyName?: string;
  location?: string;
  industry?: string;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("/api/companies");
        const data = await res.json();
        if (res.ok && data.success) {
          setCompanies(data.data || []);
        } else {
          toast.error("Failed to load companies");
        }
      } catch (err) {
        console.error("Fetch companies error:", err);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((comp) => {
    const name = comp.companyName || comp.name || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-indigo-400 font-semibold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 inline-flex items-center gap-1.5">
            <Sparkles size={13} /> Registered Employers
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Top Companies <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Hiring</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Discover trusted organizations and explore their open career opportunities.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-4 rounded-3xl max-w-md mx-auto shadow-2xl">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {/* Companies Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm">Loading companies...</div>
        ) : filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((comp) => {
              const displayName = comp.companyName || comp.name || "Unnamed Company";
              return (
                <div 
                  key={comp._id} 
                  className="group relative bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 hover:border-indigo-500/40 transition duration-300 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                        {displayName}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={12} className="text-indigo-400" /> {comp.location || "Bangladesh"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 font-medium text-slate-300">
                      <Briefcase size={14} className="text-indigo-400" /> Active Employer
                    </span>
                    <span className="text-indigo-400 font-semibold">{comp.email}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-2">
            <p className="text-base font-medium text-slate-300">No companies found</p>
            <p className="text-xs text-slate-500">Register an Employer account to list your company here!</p>
          </div>
        )}
      </div>
    </div>
  );
}