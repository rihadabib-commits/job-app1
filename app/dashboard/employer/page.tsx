 "use client";

import React, { useState, ChangeEvent } from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Send,
  FileText,
  Sparkles,
  Loader2,
} from "lucide-react";

// TypeScript Form Interface
interface JobFormData {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
}

export default function PostJobPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-Time",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = async () => {
    // Basic Field Check
    if (!formData.title || !formData.company || !formData.location || !formData.salary || !formData.description) {
      alert("⚠️ Please fill out all fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Success: Job saved to MongoDB!");
        setFormData({
          title: "",
          company: "",
          location: "",
          salary: "",
          type: "Full-Time",
          description: "",
        });
      } else {
        alert("❌ Failed: " + (data.message || data.error));
      }
    } catch (err: unknown) {
      const error = err as Error;
      alert("❌ Network Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Sparkles className="text-indigo-400" size={22} /> Post a New Job
        </h2>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
              <Briefcase size={14} className="text-indigo-400" /> Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
              <Building2 size={14} className="text-indigo-400" /> Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Nexus Labs"
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
              <MapPin size={14} className="text-indigo-400" /> Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Dhaka, BD"
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
              <DollarSign size={14} className="text-emerald-400" /> Salary
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. $80k - $100k"
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
              <Clock size={14} className="text-indigo-400" /> Job Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
            <FileText size={14} className="text-indigo-400" /> Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Write job requirements and details..."
            className="w-full p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white"
          />
        </div>

        <button
          type="button"
          onClick={handlePost}
          disabled={loading}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Publishing...
            </>
          ) : (
            <>
              <Send size={16} /> Publish Job Post
            </>
          )}
        </button>
      </div>
    </div>
  );
}