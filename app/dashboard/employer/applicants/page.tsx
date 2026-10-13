"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Mail,
  Phone,
} from "lucide-react";
import { toast } from "react-toastify";

interface Applicant {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  jobDetails?: { title: string };
  jobTitle?: string;
  createdAt?: string;
  status?: "In Review" | "Shortlisted" | "Rejected";
  resumeLink?: string;
  resumeUrl?: string;
  resume?: string;
  fileUrl?: string;
  fileName?: string;
}

export default function ApplicantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch applicants from database
  const fetchApplicants = async () => {
    try {
      const res = await fetch("/api/applications");
      const data = await res.json();
      const list = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
      const formatted = list.map((item: any) => ({
        ...item,
        status: item.status || "In Review",
      }));
      setApplicants(formatted);
    } catch (err) {
      console.error("Failed to load applicants", err);
      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  // Handle Status Update via API
  const handleStatusChange = async (
    id: string,
    newStatus: "In Review" | "Shortlisted" | "Rejected"
  ) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        toast.success(`Application marked as ${newStatus}`);
        setApplicants((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
        );
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  // Filter Logic
  const filteredApplicants = applicants.filter((applicant) => {
    const name = applicant.fullName || "";
    const title = applicant.jobDetails?.title || applicant.jobTitle || "";
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || applicant.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="text-indigo-400" size={24} /> Job Applicants
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Review, shortlist, and manage resumes submitted by candidates.
        </p>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search by name or job role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={14} className="text-slate-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950/60 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="In Review">In Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applicants List */}
      {loading ? (
        <div className="text-center py-12 text-slate-400 text-sm">Loading applicants...</div>
      ) : (
        <div className="space-y-4">
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map((applicant) => {
              const jobName = applicant.jobDetails?.title || applicant.jobTitle || "Job Position";
              const dateStr = applicant.createdAt
                ? new Date(applicant.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recently";

              // রেজুমে সোর্স বের করা
              const rawResume =
                applicant.resumeLink ||
                applicant.resumeUrl ||
                applicant.resume ||
                applicant.fileUrl ||
                applicant.fileName;

              // ফাইল বা ইউআরএল প্রসেস করা
              const getResumeTarget = (src: string) => {
                if (!src) return "#";
                if (src.startsWith("http://") || src.startsWith("https://")) {
                  return src;
                }
                if (src.startsWith("/")) {
                  return src;
                }
                // public/uploads/ থেকে লোকাল ফাইল ওপেন করার চেষ্টা করবে
                return `/uploads/${src}`;
              };

              const resumeHref = rawResume ? getResumeTarget(rawResume) : null;

              return (
                <div
                  key={applicant._id}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-slate-700 transition"
                >
                  {/* Left Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-white">
                        {applicant.fullName || "Candidate"}
                      </h3>
                      <StatusBadge status={applicant.status || "In Review"} />
                    </div>

                    <p className="text-xs text-indigo-400 font-medium">
                      Applied for: <span className="text-slate-200">{jobName}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Mail size={12} /> {applicant.email || "N/A"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={12} /> {applicant.phone || "N/A"}
                      </span>
                      <span className="text-slate-500">Date: {dateStr}</span>
                    </div>
                  </div>

                  {/* Right Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800">
                    {/* Resume Action Button - forced to open in new tab */}
                    {resumeHref ? (
                      <a
                        href={resumeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 border border-indigo-500/30"
                      >
                        <FileText size={14} /> View Resume{" "}
                        <span className="text-[10px] opacity-75 truncate max-w-[90px]">
                          ({rawResume?.split("/").pop()})
                        </span>{" "}
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500 px-3 py-2 bg-slate-950 rounded-xl border border-slate-800">
                        No Resume Attached
                      </span>
                    )}

                    {/* In Review Button */}
                    {applicant.status !== "In Review" && (
                      <button
                        onClick={() => handleStatusChange(applicant._id, "In Review")}
                        className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-xl transition flex items-center gap-1 border border-amber-500/20"
                      >
                        <Clock size={14} /> In Review
                      </button>
                    )}

                    {/* Shortlist Button */}
                    {applicant.status !== "Shortlisted" && (
                      <button
                        onClick={() => handleStatusChange(applicant._id, "Shortlisted")}
                        className="px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl transition flex items-center gap-1 border border-emerald-500/20"
                      >
                        <CheckCircle2 size={14} /> Shortlist
                      </button>
                    )}

                    {/* Reject Button */}
                    {applicant.status !== "Rejected" && (
                      <button
                        onClick={() => handleStatusChange(applicant._id, "Rejected")}
                        className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl transition flex items-center gap-1 border border-rose-500/20"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <p className="text-sm text-slate-400">No applicants found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "Shortlisted":
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
          <CheckCircle2 size={10} /> Shortlisted
        </span>
      );
    case "Rejected":
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
          <XCircle size={10} /> Rejected
        </span>
      );
    default:
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
          <Clock size={10} /> In Review
        </span>
      );
  }
};