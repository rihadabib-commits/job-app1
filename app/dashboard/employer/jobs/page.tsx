"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  X,
  Check,
} from "lucide-react";
import { toast } from "react-toastify";

interface Job {
  _id?: string;
  id?: string | number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  applicants?: number;
  status?: string;
}

export default function EmployerPostedJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Fetch posted jobs from database
  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      const jobList = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
      setJobs(jobList);
    } catch (err) {
      console.error("Failed to load posted jobs", err);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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

  // Input change inside modal
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

  // Save Updated Job via API
  const handleUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    const jobId = editingJob._id || editingJob.id;

    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingJob),
      });

      if (res.ok) {
        toast.success("Job updated successfully!");
        setJobs((prevJobs) =>
          prevJobs.map((j) => ((j._id || j.id) === jobId ? editingJob : j))
        );
        handleCloseModal();
      } else {
        toast.error("Failed to update job");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  // Delete Job Post
  const handleDeleteJob = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this job post?")) {
      try {
        const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
        if (res.ok) {
          toast.success("Job post deleted successfully!");
          setJobs(jobs.filter((j) => (j._id || j.id) !== id));
        } else {
          toast.error("Failed to delete job post");
        }
      } catch (err) {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Briefcase className="text-indigo-400" size={24} /> Posted Jobs
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            View, edit, and manage all your active job listings.
          </p>
        </div>

        <Link
          href="/dashboard/employer/post-job"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/20 text-sm self-start sm:self-auto"
        >
          <Plus size={18} /> Post Job
        </Link>
      </div>

      {/* Jobs List Section */}
      {loading ? (
        <div className="text-center py-12 text-slate-400 text-sm">Loading your posted jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto border border-indigo-500/20">
            <Briefcase size={22} />
          </div>
          <h3 className="text-lg font-bold text-white">No Jobs Posted Yet</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            You haven't published any job opportunities yet. Click below to post your first job.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/employer/post-job"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-xl text-xs transition"
            >
              <Plus size={16} /> Post New Job
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job, index) => {
            const jobId = job._id || job.id;
            return (
              <div
                key={jobId || index}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition shadow-xl"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white">{job.title || "Untitled Job"}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Active
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Building2 size={14} className="text-indigo-400" /> {job.company || "Company"}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-indigo-400" /> {job.location || "Remote"}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <DollarSign size={14} /> {job.salary || "Competitive"}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-indigo-400" /> {job.type || "Full-Time"}
                    </span>
                    <span>•</span>
                    <span className="text-slate-300 font-medium">
                      {job.applicants || 0} Applicants
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <Link
                    href={`/jobs/${jobId}/apply`}
                    title="View Job Details"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                  >
                    <Eye size={16} />
                  </Link>

                  <button
                    onClick={() => handleEditClick(job)}
                    title="Edit Job"
                    className="p-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 transition"
                  >
                    <Edit3 size={16} />
                  </button>

                  <button
                    onClick={() => handleDeleteJob(jobId as string)}
                    title="Delete Job Post"
                    className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= EDIT JOB MODAL ================= */}
      {isEditModalOpen && editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
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

            <form onSubmit={handleUpdateJob} className="space-y-4">
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