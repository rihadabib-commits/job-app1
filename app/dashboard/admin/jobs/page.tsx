"use client";

import React, { useState } from "react";
import { Briefcase, Trash2, Eye, Building2, MapPin, DollarSign } from "lucide-react";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Senior Full-Stack Engineer", company: "Nexus Labs", location: "San Francisco, CA", salary: "$120k - $150k", status: "Live" },
    { id: 2, title: "UI/UX Designer", company: "Tech Corp", location: "Remote", salary: "$80k - $100k", status: "Live" },
  ]);

  const handleDelete = (id: number) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Briefcase className="text-indigo-400" size={24} /> Manage All Jobs
        </h2>
        <p className="text-xs text-slate-400 mt-1">Review and remove reported or policy-violating job listings.</p>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{job.title}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400">
                  {job.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-3">
                <span>{job.company}</span> • <span>{job.location}</span> • <span className="text-emerald-400">{job.salary}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => handleDelete(job.id)} className="p-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-xl transition">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}