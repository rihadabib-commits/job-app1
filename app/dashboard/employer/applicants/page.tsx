"use client";

import React, { useState } from "react";
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

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  appliedDate: string;
  experience: string;
  status: "In Review" | "Shortlisted" | "Rejected";
  resumeUrl: string;
}

export default function ApplicantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: "1",
      name: "Rahim Ahmed",
      email: "rahim.ahmed@example.com",
      phone: "+880 1711-111111",
      jobTitle: "Senior Frontend Developer",
      appliedDate: "Sep 12, 2026",
      experience: "4 Years",
      status: "In Review",
      resumeUrl: "#",
    },
    {
      id: "2",
      name: "Tanvir Hasan",
      email: "tanvir.hasan@example.com",
      phone: "+880 1822-222222",
      jobTitle: "Senior Frontend Developer",
      appliedDate: "Sep 10, 2026",
      experience: "5 Years",
      status: "Shortlisted",
      resumeUrl: "#",
    },
    {
      id: "3",
      name: "Nusrat Jahan",
      email: "nusrat.jahan@example.com",
      phone: "+880 1933-333333",
      jobTitle: "UI/UX Designer",
      appliedDate: "Sep 08, 2026",
      experience: "3 Years",
      status: "Rejected",
      resumeUrl: "#",
    },
  ]);

  // Handle Status Update
  const handleStatusChange = (id: string, newStatus: Applicant["status"]) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  // Filter Logic
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
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
      <div className="space-y-4">
        {filteredApplicants.length > 0 ? (
          filteredApplicants.map((applicant) => (
            <div
              key={applicant.id}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-slate-700 transition"
            >
              {/* Left Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold text-white">
                    {applicant.name}
                  </h3>
                  <StatusBadge status={applicant.status} />
                </div>

                <p className="text-xs text-indigo-400 font-medium">
                  Applied for: <span className="text-slate-200">{applicant.jobTitle}</span>
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Mail size={12} /> {applicant.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={12} /> {applicant.phone}
                  </span>
                  <span className="text-slate-500">• Exp: {applicant.experience}</span>
                  <span className="text-slate-500">• Date: {applicant.appliedDate}</span>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800">
                {/* Resume Download */}
                <a
                  href={applicant.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
                >
                  <FileText size={14} /> Resume <ExternalLink size={12} />
                </a>

                {/* Shortlist Button */}
                {applicant.status !== "Shortlisted" && (
                  <button
                    onClick={() => handleStatusChange(applicant.id, "Shortlisted")}
                    className="px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl transition flex items-center gap-1 border border-emerald-500/20"
                  >
                    <CheckCircle2 size={14} /> Shortlist
                  </button>
                )}

                {/* Reject Button */}
                {applicant.status !== "Rejected" && (
                  <button
                    onClick={() => handleStatusChange(applicant.id, "Rejected")}
                    className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl transition flex items-center gap-1 border border-rose-500/20"
                  >
                    <XCircle size={14} /> Reject
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <p className="text-sm text-slate-400">No applicants found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const StatusBadge = ({ status }: { status: Applicant["status"] }) => {
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