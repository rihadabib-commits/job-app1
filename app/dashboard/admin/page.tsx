"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Briefcase,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";

interface PendingJob {
  _id: string;
  title: string;
  company?: string;
  location?: string;
  salary?: string;
  jobType?: string;
  createdAt?: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: "0",
    activeEmployers: "0",
    totalJobs: "0",
    pendingApprovals: "0",
  });
  const [pendingJobs, setPendingJobs] = useState<PendingJob[]>([]);
  const [loading, setLoading] = useState(true);

  // অ্যাডমিন ড্যাশবোর্ড ডাটা ফেচ করা (API থেকে)
  const fetchAdminData = async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      const data = await res.json();
      
      if (res.ok && data.success) {
        setStats(data.stats || stats);
        setPendingJobs(data.pendingJobs || []);
      } else {
        toast.error("Failed to load admin stats");
      }
    } catch (err) {
      console.error("Admin data fetch error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Handle Approve Job
  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Job approved successfully!");
        // লিস্ট থেকে রিমুভ করা এবং পেন্ডিং কাউন্ট আপডেট করা
        setPendingJobs((prev) => prev.filter((job) => job._id !== id));
      } else {
        toast.error(data.error || "Failed to approve job");
      }
    } catch (err) {
      console.error("Approve error:", err);
      toast.error("Something went wrong!");
    }
  };

  // Handle Reject Job
  const handleReject = async (id: string) => {
    if (confirm("Are you sure you want to reject and remove this job?")) {
      try {
        const res = await fetch(`/api/admin/jobs/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();
        if (res.ok && data.success) {
          toast.success("Job rejected and removed!");
          setPendingJobs((prev) => prev.filter((job) => job._id !== id));
        } else {
          toast.error(data.error || "Failed to reject job");
        }
      } catch (err) {
        console.error("Reject error:", err);
        toast.error("Something went wrong!");
      }
    }
  };

  const statCards = [
    { title: "Total Users", value: stats.totalUsers, icon: Users, color: "text-indigo-400", bg: "bg-indigo-500/10" },
    { title: "Active Employers", value: stats.activeEmployers, icon: Building2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "Total Jobs Posted", value: stats.totalJobs, icon: Briefcase, color: "text-amber-400", bg: "bg-amber-500/10" },
    { title: "Pending Approvals", value: pendingJobs.length.toString(), icon: Clock, color: "text-rose-400", bg: "bg-rose-500/10" },
  ];

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
        {statCards.map((stat, i) => (
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
          {loading ? (
            <div className="text-center py-8 text-slate-400 text-xs">Loading pending approvals...</div>
          ) : pendingJobs.length > 0 ? (
            pendingJobs.map((job) => {
              const dateStr = job.createdAt
                ? new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                : "Recently";

              return (
                <div
                  key={job._id}
                  className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">{job.title}</h4>
                    <p className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
                      <span className="text-indigo-400 font-medium">{job.company || "Company"}</span>
                      <span>•</span>
                      <span>{job.location || "Remote"}</span>
                      <span>•</span>
                      <span className="text-emerald-400">{job.salary || "Negotiable"}</span>
                      <span>•</span>
                      <span>{job.jobType || "Full-Time"}</span>
                      <span>•</span>
                      <span className="text-slate-500">{dateStr}</span>
                    </p>
                  </div>

                  {/* Approve / Reject Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(job._id)}
                      className="px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl border border-emerald-500/20 transition flex items-center gap-1"
                    >
                      <CheckCircle2 size={14} /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(job._id)}
                      className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl border border-rose-500/20 transition flex items-center gap-1"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </div>
              );
            })
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