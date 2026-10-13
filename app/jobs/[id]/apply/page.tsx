"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Upload, CheckCircle2, Link as LinkIcon } from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

export default function JobApplyPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resumeLink: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.resumeLink && !resumeFile) {
      toast.error("Please provide a resume link or upload your CV file.");
      return;
    }

    setLoading(true);

    try {
      // FormData ব্যবহার করতে হবে যাতে ফাইল এবং টেক্সট একসাথে পাঠানো যায়
      const data = new FormData();
      data.append("jobId", jobId);
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("coverLetter", formData.coverLetter);
      
      if (formData.resumeLink) {
        data.append("resumeLink", formData.resumeLink);
      }
      
      if (resumeFile) {
        data.append("resume", resumeFile);
        data.append("fileName", resumeFile.name);
      }

      const res = await fetch("/api/applications", {
        method: "POST",
        body: data,
        // ⚠️ কোনো headers (Content-Type) দেওয়া যাবে না, ব্রাউজার নিজে থেকে multipart/form-data সেট করে নেবে
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setShowModal(true); // Success হলে মোডাল ওপেন হবে
      } else {
        toast.error(result.error || "Failed to submit application");
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to Jobs
        </Link>
      </div>

      <div className="max-w-xl w-full mx-auto bg-slate-900/85 backdrop-blur-xl border border-slate-800/80 p-8 rounded-2xl shadow-2xl mt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Apply for Job</h2>
          <p className="text-slate-400 text-sm mt-1">
            Job ID: <span className="text-indigo-400 font-mono">{jobId}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="+880 1700-000000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-white"
            />
          </div>

          {/* CV / Resume Section */}
          <div className="space-y-3 pt-2">
            <label className="block text-sm font-semibold text-indigo-400">
              Resume / CV <span className="text-rose-500">*</span>
            </label>
            
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">CV Online Link (Google Drive / LinkedIn / Portfolio)</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 text-slate-500" size={16} />
                <input
                  type="url"
                  placeholder="https://drive.google.com/your-cv"
                  value={formData.resumeLink}
                  onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-white"
                />
              </div>
            </div>

            <div className="text-center text-xs text-slate-500 uppercase tracking-wider font-semibold">Or</div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Upload CV Document (PDF / DOCX)</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-800 border-dashed rounded-xl cursor-pointer bg-slate-950/40 hover:bg-slate-950/70 transition">
                  <div className="flex flex-col items-center justify-center pt-3 pb-3 px-4 text-center">
                    <Upload className="w-5 h-5 mb-1 text-indigo-400" />
                    <p className="text-xs text-slate-300">
                      {resumeFile ? <span className="text-indigo-400 font-medium">{resumeFile.name}</span> : <><span>Click to upload</span> or drag and drop</>}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">PDF, DOCX (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setResumeFile(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Cover Letter</label>
            <textarea
              rows={4}
              placeholder="Tell us why you are a great fit for this role..."
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-white"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-600/20"
          >
            {loading ? "Submitting Application..." : (
              <>
                <Send size={16} /> Submit Application
              </>
            )}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full text-center space-y-4 shadow-2xl relative"
            >
              <div className="w-16 h-16 bg-emerald-500/15 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-2xl font-bold">Successfully Submitted!</h2>
              <p className="text-slate-400 text-sm">
                Your job application and CV have been successfully sent to the employer.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => router.push("/")}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-indigo-600/20"
                >
                  Back to Jobs
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}