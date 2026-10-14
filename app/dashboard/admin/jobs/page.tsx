"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

interface JobItem {
  _id: string;
  title: string;
  company?: string;
  location?: string;
  salary?: string;
  status?: string;
  isApproved?: boolean;
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেজ থেকে সব জব ফেচ করা
  const fetchAllJobs = async () => {
    try {
      const res = await fetch("/api/admin/jobs");
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

  useEffect(() => {
    fetchAllJobs();
  }, []);

  // ডাটাবেজ থেকে জব ডিলিট করা
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this job permanently?")) {
      try {
        const res = await fetch(`/api/admin/jobs/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();
        if (res.ok && data.success) {
          toast.success("Job deleted successfully");
          setJobs((prev) => prev.filter((j) => j._id !== id));
        } else {
          toast.error(data.error || "Failed to delete job");
        }
      } catch (err) {
        console.error("Delete error:", err);
        toast.error("Something went wrong!");
      }
    }
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
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm">Loading jobs from database...</div>
        ) : jobs.length > 0 ? (
          jobs.map((job) => {
            const isLive = job.isApproved || job.status === "active";
            return (
              <div key={job._id} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{job.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isLive ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                    }`}>
                      {isLive ? "Live" : "Pending"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                    <span className="text-indigo-400 font-medium">{job.company || "Company"}</span>
                    <span>•</span>
                    <span>{job.location || "Remote"}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{job.salary || "Negotiable"}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="p-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-xl transition"
                    title="Delete Job"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">No jobs found in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
}