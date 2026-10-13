"use client";

import React, { useState } from "react";
import {
  Users,
  Briefcase,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  TrendingUp,
  Search,
} from "lucide-react";

interface PendingJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
}

export default function AdminDashboardPage() {
  // Stats Data
  const stats = [
    { title: "Total Users", value: "1,420", icon: Users, color: "text-indigo-400", bg: "bg-indigo-500/10" },
    { title: "Active Employers", value: "180", icon: Building2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "Total Jobs Posted", value: "850", icon: Briefcase, color: "text-amber-400", bg: "bg-amber-500/10" },
    { title: "Pending Approvals", value: "5", icon: Clock, color: "text-rose-400", bg: "bg-rose-500/10" },
  ];

  // Pending Jobs State for Approval Moderation
  const [pendingJobs, setPendingJobs] = useState<PendingJob[]>([
    {
      id: "101",
      title: "Senior Full-Stack Developer",
      company: "Nexus Tech Ltd.",
      location: "Dhaka (Hybrid)",
      salary: "$120k - $140k",
      type: "Full-Time",
      postedDate: "Sep 14, 2026",
    },
    {
      id: "102",
      title: "Lead UI/UX Designer",
      company: "Creative Mind Studio",
      location: "Remote",
      salary: "$90k - $110k",
      type: "Remote",
      postedDate: "Sep 13, 2026",
    },
  ]);

  // Handle Approve
  const handleApprove = (id: string) => {
    setPendingJobs((prev) => prev.filter((job) => job.id !== id));
  };

  // Handle Reject
  const handleReject = (id: string) => {
    setPendingJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="text-indigo-400" size={26} /> Admin Dashboard
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Platform overview, user stats, and job moderation panel.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-black text-white mt-1">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Pending Job Approvals Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="text-rose-400" size={18} /> Pending Job Approvals
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Review jobs submitted by companies before making them public.</p>
          </div>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-bold rounded-full border border-rose-500/20">
            {pendingJobs.length} Action Needed
          </span>
        </div>

        {/* Pending Jobs List */}
        <div className="space-y-3 pt-2">
          {pendingJobs.length > 0 ? (
            pendingJobs.map((job) => (
              <div
                key={job.id}
                className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">{job.title}</h4>
                  <p className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
                    <span className="text-indigo-400 font-medium">{job.company}</span> • 
                    <span>{job.location}</span> • 
                    <span className="text-emerald-400">{job.salary}</span> • 
                    <span>{job.type}</span>
                  </p>
                </div>

                {/* Approve / Reject Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(job.id)}
                    className="px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl border border-emerald-500/20 transition flex items-center gap-1"
                  >
                    <CheckCircle2 size={14} /> Approve
                  </button>
                  <button
                    onClick={() => handleReject(job.id)}
                    className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl border border-rose-500/20 transition flex items-center gap-1"
                  >
                    <XCircle size={14} /> Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-slate-950/40 rounded-2xl border border-slate-800/50">
              <p className="text-xs text-slate-400">All pending jobs have been reviewed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}