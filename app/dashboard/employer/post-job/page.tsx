// "use client";

// import React from "react";
// import {
//   Briefcase,
//   Building2,
//   MapPin,
//   DollarSign,
//   Clock,
//   Send,
//   FileText,
//   Globe,
//   Sparkles,
// } from "lucide-react";

// export default function PostJobPage() {
//   return (
//     <div className="max-w-3xl mx-auto space-y-6 pb-12">
//       {/* Top Title Banner */}
//       <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
//             <Sparkles className="text-indigo-400" size={22} /> Post a New Job
//           </h2>
//           <p className="text-xs text-slate-400 mt-1">
//             Fill out the details below to create a job listing for potential candidates.
//           </p>
//         </div>
//       </div>

//       {/* Main Job Post Form */}
//       <form className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        
//         {/* Section 1: Basic Information */}
//         <div className="space-y-4">
//           <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
//             1. Job & Company Overview
//           </h3>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {/* Job Title */}
//             <div>
//               <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
//                 <Briefcase size={14} className="text-indigo-400" /> Job Title
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. Senior Full-Stack Engineer"
//                 className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
//               />
//             </div>

//             {/* Company Name */}
//             <div>
//               <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
//                 <Building2 size={14} className="text-indigo-400" /> Company Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. Nexus Labs"
//                 className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Section 2: Attributes (Location, Salary, Type) */}
//         <div className="space-y-4">
//           <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
//             2. Job Details & Attributes
//           </h3>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             {/* Location */}
//             <div>
//               <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
//                 <MapPin size={14} className="text-indigo-400" /> Location
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. San Francisco, CA"
//                 className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
//               />
//             </div>

//             {/* Salary Range */}
//             <div>
//               <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
//                 <DollarSign size={14} className="text-emerald-400" /> Salary Range
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. $120k - $150k"
//                 className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
//               />
//             </div>

//             {/* Job Type Dropdown */}
//             <div>
//               <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
//                 <Clock size={14} className="text-indigo-400" /> Job Type
//               </label>
//               <select className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition">
//                 <option value="Full-Time">Full-Time</option>
//                 <option value="Part-Time">Part-Time</option>
//                 <option value="Remote">Remote</option>
//                 <option value="Contract">Contract</option>
//                 <option value="Internship">Internship</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Section 3: Description & Requirements */}
//         <div className="space-y-4">
//           <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
//             3. Detailed Description
//           </h3>

//           <div>
//             <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
//               <FileText size={14} className="text-indigo-400" /> Job Description & Requirements
//             </label>
//             <textarea
//               rows={5}
//               placeholder="Describe the job responsibility, requirements, and benefits..."
//               className="w-full p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none transition"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="button"
//           className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs transition shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
//         >
//           <Send size={16} /> Publish Job Post
//         </button>

//       </form>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Send,
  FileText,
  Sparkles,
} from "lucide-react";

export default function PostJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-Time",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("🎉 Job posted successfully!");
        console.log("Database Insert Result:", data);
        setFormData({
          title: "",
          company: "",
          location: "",
          salary: "",
          type: "Full-Time",
          description: "",
        });
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Something went wrong while posting the job.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#030712",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    fontSize: "13px",
    color: "#ffffff",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#94a3b8",
    marginBottom: "6px",
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "48px", fontFamily: "sans-serif" }}>
      {/* Top Title Banner */}
      <div style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", padding: "24px", borderRadius: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#ffffff", display: "flex", alignItems: "center", gap: "8px", margin: "0" }}>
          <Sparkles color="#818cf8" size={22} /> Post a New Job
        </h2>
        <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px", margin: "4px 0 0 0" }}>
          Fill out the details below to create a job listing for potential candidates.
        </p>
      </div>

      {/* Main Job Post Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.7)",
          border: "1px solid #1e293b",
          borderRadius: "24px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Section 1: Basic Information */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ fontSize: "12px", fontWeight: "700", color: "#e2e8f0", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #1e293b", paddingBottom: "8px", margin: "0" }}>
            1. Job & Company Overview
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
            <div>
              <label style={labelStyle}>
                <Briefcase size={14} color="#818cf8" /> Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Senior Full-Stack Engineer"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <Building2 size={14} color="#818cf8" /> Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="e.g. Nexus Labs"
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Attributes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ fontSize: "12px", fontWeight: "700", color: "#e2e8f0", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #1e293b", paddingBottom: "8px", margin: "0" }}>
            2. Job Details & Attributes
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
            <div>
              <label style={labelStyle}>
                <MapPin size={14} color="#818cf8" /> Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g. San Francisco, CA"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <DollarSign size={14} color="#34d399" /> Salary Range
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                placeholder="e.g. $120k - $150k"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <Clock size={14} color="#818cf8" /> Job Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ fontSize: "12px", fontWeight: "700", color: "#e2e8f0", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #1e293b", paddingBottom: "8px", margin: "0" }}>
            3. Detailed Description
          </h3>

          <div>
            <label style={labelStyle}>
              <FileText size={14} color="#818cf8" /> Job Description & Requirements
            </label>
            <textarea
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the job responsibility, requirements, and benefits..."
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: loading ? "#3730a3" : "#4f46e5",
            color: "#ffffff",
            borderRadius: "12px",
            fontWeight: "700",
            fontSize: "13px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          <Send size={16} /> {loading ? "Publishing..." : "Publish Job Post"}
        </button>
      </form>
    </div>
  );
}