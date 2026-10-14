"use client";

import React, { useState, useEffect } from "react";
import { Search, Building2, MapPin, DollarSign, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface SavedJobItem {
  _id: string;
  jobId: string;
  title: string;
  company?: string;
  location?: string;
  salary?: string;
  jobType?: string;
  createdAt?: string;
}

export default function SavedJobsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [savedJobs, setSavedJobs] = useState<SavedJobItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেজ থেকে সেভ করা জবগুলো ফেচ করা
  const fetchSavedJobs = async () => {
    try {
      const res = await fetch("/api/saved-jobs");
      const data = await res.json();
      if (res.ok && data.success) {
        setSavedJobs(data.data || []);
      } else {
        toast.error("Failed to load saved jobs");
      }
    } catch (err) {
      console.error("Fetch saved jobs error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  // সেভ করা জব রিমুভ করা
  const handleRemoveSaved = async (id: string) => {
    try {
      const res = await fetch(`/api/saved-jobs/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Job removed from saved list");
        setSavedJobs((prev) => prev.filter((job) => job._id !== id));
      } else {
        toast.error(data.error || "Failed to remove job");
      }
    } catch (err) {
      console.error("Remove error:", err);
      toast.error("Something went wrong!");
    }
  };

  const filteredJobs = savedJobs.filter((job) => {
    const title = job.title || "";
    const company = job.company || "";
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">Loading saved jobs...</div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => {
            const dateStr = job.createdAt
              ? new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
              : "Recently";

            return (
              <div
                key={job._id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                      <p className="text-xs text-indigo-400 flex items-center gap-1.5 mt-1 font-medium">
                        <Building2 size={14} /> {job.company || "Company"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-500" />
                      <span>{job.location || "Remote"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={14} className="text-slate-500" />
                      <span>{job.salary || "Negotiable"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-[11px] px-2.5 py-1 bg-slate-800 border border-slate-700/50 rounded-lg text-slate-300">
                      {job.jobType || "Full-time"}
                    </span>
                    <span className="text-[11px] text-slate-500">Saved on {dateStr}</span>
                  </div>
                </div>

                {/* Actions: Apply Now & Remove */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => router.push(`/jobs/${job.jobId || job._id}/apply`)}
                    className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition text-center"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => handleRemoveSaved(job._id)}
                    className="p-2 text-slate-400 hover:text-rose-400 bg-slate-800/50 hover:bg-slate-800 rounded-xl transition"
                    title="Remove from saved"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
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