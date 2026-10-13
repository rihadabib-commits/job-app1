"use client";

import React, { useState } from "react";
import { Search, Building2, MapPin, DollarSign, BookmarkCheck, ExternalLink, Trash2 } from "lucide-react";

interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
}

export default function SavedJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample Saved Jobs Data
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([
    {
      id: "1",
      title: "Full Stack Developer",
      company: "TechSys Global",
      location: "Dhaka, Bangladesh (Hybrid)",
      salary: "$1,200 - $1,800 / month",
      type: "Full-time",
      postedDate: "2 days ago",
    },
    {
      id: "2",
      title: "Senior Product Designer",
      company: "InnoLabs",
      location: "Remote",
      salary: "$2,500 - $3,500 / month",
      type: "Contract",
      postedDate: "5 days ago",
    },
    {
      id: "3",
      title: "DevOps Engineer",
      company: "CloudScale Inc.",
      location: "Remote",
      salary: "$2,000 - $3,000 / month",
      type: "Full-time",
      postedDate: "1 week ago",
    },
  ]);

  const handleRemoveSaved = (id: string) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== id));
  };

  const filteredJobs = savedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Saved Jobs</h2>
          <p className="text-slate-400 text-sm">
            Jobs you have bookmarked to review or apply later.
          </p>
        </div>
        <div className="text-xs bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-slate-300 self-start sm:self-auto">
          Saved Items: <span className="text-indigo-400 font-bold">{savedJobs.length}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 text-slate-500" size={18} />
        <input
          type="text"
          placeholder="Search saved jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-900/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                    <p className="text-xs text-indigo-400 flex items-center gap-1.5 mt-1 font-medium">
                      <Building2 size={14} /> {job.company}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveSaved(job.id)}
                    title="Remove from saved"
                    className="text-slate-500 hover:text-rose-400 p-1.5 hover:bg-slate-800 rounded-lg transition"
                  >
                    <BookmarkCheck size={20} className="text-indigo-500 hover:text-rose-400" />
                  </button>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-slate-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-slate-500" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <span className="text-[11px] px-2.5 py-1 bg-slate-800 border border-slate-700/50 rounded-lg text-slate-300">
                    {job.type}
                  </span>
                  <span className="text-[11px] text-slate-500">Posted {job.postedDate}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-800/80">
                <button className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition">
                  Apply Now
                </button>
                <button
                  onClick={() => handleRemoveSaved(job.id)}
                  className="p-2 text-slate-400 hover:text-rose-400 bg-slate-800/50 hover:bg-slate-800 rounded-xl transition"
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl text-center py-16 text-slate-500">
          <p className="text-base font-medium">No saved jobs found</p>
          <p className="text-xs text-slate-600 mt-1">
            Browse jobs and save them to view here later.
          </p>
        </div>
      )}
    </div>
  );
}