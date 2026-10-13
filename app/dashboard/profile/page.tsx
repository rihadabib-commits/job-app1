"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Upload,
  FileText,
  Plus,
  X,
  Save,
  Camera,
  Globe,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface Skill {
  name: string;
  level: string;
}

export default function MyProfilePage() {
  const [skills, setSkills] = useState<Skill[]>([
    { name: "React.js", level: "Expert" },
    { name: "Next.js", level: "Expert" },
    { name: "TypeScript", level: "Intermediate" },
    { name: "Tailwind CSS", level: "Expert" },
    { name: "Node.js", level: "Intermediate" },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Intermediate");

  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    headline: "Senior Frontend Developer | React & Next.js Specialist",
    email: "john.doe@example.com",
    phone: "+880 1700-000000",
    location: "Dhaka, Bangladesh",
    website: "https://johndoe.dev",
    bio: "Passionate Frontend Developer with 4+ years of experience in building modern, performant, and accessible web applications using React, Next.js, and TypeScript.",
  });

  // Modal Submit Logic
  const handleAddSkillFromModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newSkillName.trim() &&
      !skills.some(
        (s) => s.name.toLowerCase() === newSkillName.trim().toLowerCase()
      )
    ) {
      setSkills([
        ...skills,
        { name: newSkillName.trim(), level: newSkillLevel },
      ]);
      setNewSkillName("");
      setNewSkillLevel("Intermediate");
      setIsModalOpen(false); // Close Modal
    }
  };

  const handleRemoveSkill = (skillName: string) => {
    setSkills(skills.filter((s) => s.name !== skillName));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Dynamic Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900/50 via-slate-900 to-indigo-950/40 p-8 border border-indigo-500/20 overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
              <Sparkles size={14} /> Profile Completion: 90%
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Manage Your Profile
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Keep your profile up to date to get matched with top tech recruiters.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg shadow-indigo-500/25 transition text-sm self-start md:self-auto"
          >
            {isSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
            {isSaved ? "Saved Successfully!" : "Save Changes"}
          </motion.button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Avatar Card */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 text-center relative overflow-hidden group">
            <div className="relative inline-block mx-auto mb-4">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-black text-white text-4xl border-4 border-slate-900 shadow-2xl">
                JD
              </div>
              <button
                title="Change Avatar"
                className="absolute -bottom-2 -right-2 p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 shadow-lg transition"
              >
                <Camera size={14} />
              </button>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 py-1 px-3 rounded-full w-fit mx-auto mb-2">
              <ShieldCheck size={14} /> Verified Candidate
            </div>
            <h3 className="text-xl font-bold text-white">{formData.fullName}</h3>
            <p className="text-xs text-indigo-400 font-medium mt-1">
              {formData.headline}
            </p>
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-3">
              <MapPin size={12} /> {formData.location}
            </p>
          </div>

          {/* Resume Upload Card */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText size={16} className="text-indigo-400" /> Resume & CV
              </h4>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">
                Active
              </span>
            </div>

            <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between group hover:border-slate-700 transition">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <FileText size={20} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-white truncate">
                    John_Doe_Resume.pdf
                  </p>
                  <p className="text-[10px] text-slate-500">2.4 MB • Updated Sep 2026</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-rose-400 transition p-1">
                <X size={16} />
              </button>
            </div>

            <label className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 bg-slate-950/20 hover:bg-indigo-500/5 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition text-center group">
              <Upload
                size={24}
                className="text-slate-500 group-hover:text-indigo-400 transition mb-2"
              />
              <span className="text-xs font-semibold text-slate-300">
                Upload New Resume
              </span>
              <span className="text-[10px] text-slate-500 mt-1">
                PDF or DOCX (Max 5MB)
              </span>
              <input type="file" accept=".pdf,.docx" className="hidden" />
            </label>
          </div>
        </div>

        {/* Right Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Personal Details */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-6">
            <h4 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <User size={18} className="text-indigo-400" /> Personal Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 text-slate-500" size={16} />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Headline
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-3 text-slate-500" size={16} />
                  <input
                    type="text"
                    value={formData.headline}
                    onChange={(e) =>
                      setFormData({ ...formData, headline: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 text-slate-500" size={16} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 text-slate-500" size={16} />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 text-slate-500" size={16} />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Portfolio URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-3 text-slate-500" size={16} />
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Bio / Summary
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 resize-none transition"
              />
            </div>
          </div>

          {/* Skills Section with Modal Trigger */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Zap size={18} className="text-indigo-400" /> Skills & Expertise
              </h4>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-xs transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <Plus size={16} /> Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <motion.span
                  layout
                  key={skill.name}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800/80 border border-slate-700/60 rounded-xl text-xs font-semibold text-slate-200 group hover:border-indigo-500/50 transition"
                >
                  <span>{skill.name}</span>
                  <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                    {skill.level}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill.name)}
                    className="text-slate-400 hover:text-rose-400 transition ml-1"
                  >
                    <X size={14} />
                  </button>
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Add Skill Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap size={18} className="text-indigo-400" /> Add New Skill
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddSkillFromModal} className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GraphQL, Docker, Figma"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Proficiency Level
                  </label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition"
                  >
                    Add to Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}