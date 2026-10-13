"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Eye,
  Trash2,
  Edit3,
  Plus,
  X,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  Check,
} from "lucide-react";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  applicants: number;
  status: string;
}

export default function ManageJobsPage() {
  // Sample job listings
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Senior Full-Stack Engineer",
      company: "Nexus Labs",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-Time",
      applicants: 14,
      status: "Active",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Tech Corp",
      location: "Remote",
      salary: "$80k - $100k",
      type: "Remote",
      applicants: 10,
      status: "Active",
    },
  ]);

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Open Edit Modal
  const handleEditClick = (job: Job) => {
    setEditingJob({ ...job });
    setIsEditModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingJob(null);
  };

  // Handle Form Change inside Modal
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (editingJob) {
      setEditingJob({
        ...editingJob,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Save Updated Job
  const handleUpdateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJob) {
      setJobs((prevJobs) =>
        prevJobs.map((j) => (j.id === editingJob.id ? editingJob : j))
      );
      handleCloseModal();
    }
  };

  // Delete Job
  const handleDeleteJob = (id: number) => {
    setJobs((prevJobs) => prevJobs.filter((j) => j.id !== id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="text-indigo-400" size={24} /> Posted Jobs
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            View, edit, and manage all your active job listings.
          </p>
        </div>
        <Link
          href="/dashboard/employer/post-job"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition shadow-lg shadow-indigo-600/20"
        >
          <Plus size={16} /> Post Job
        </Link>
      </div>

      {/* Jobs List */}
      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-white">{job.title}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {job.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Building2 size={12} className="text-indigo-400" /> {job.company}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-indigo-400" /> {job.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <DollarSign size={12} className="text-emerald-400" /> {job.salary}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} className="text-indigo-400" /> {job.type}
                </span>
                <span>•</span>
                <span className="text-slate-300 font-medium">{job.applicants} Applicants</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                title="View Details"
                className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl transition"
              >
                <Eye size={16} />
              </button>

              {/* Edit Icon Button - Opens Modal */}
              <button
                onClick={() => handleEditClick(job)}
                title="Edit Job"
                className="p-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-xl transition"
              >
                <Edit3 size={16} />
              </button>

              <button
                onClick={() => handleDeleteJob(job.id)}
                title="Delete Job"
                className="p-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= EDIT JOB MODAL ================= */}
      {isEditModalOpen && editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Edit3 className="text-indigo-400" size={20} /> Update Job Details
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Modify the information for "{editingJob.title}"
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdateJob} className="space-y-4">
              {/* Job Title & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editingJob.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={editingJob.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              {/* Location, Salary & Job Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editingJob.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={editingJob.salary}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Job Type
                  </label>
                  <select
                    name="type"
                    value={editingJob.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
                >
                  <Check size={14} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}