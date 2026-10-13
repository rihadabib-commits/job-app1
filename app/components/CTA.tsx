"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, Building2, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

export const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900/80 border border-indigo-500/20 p-8 sm:p-14 overflow-hidden backdrop-blur-xl">
          
          {/* Animated Glow Blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/20 rounded-full blur-[100px] pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Box: For Job Seekers */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
                <Rocket size={16} /> For Job Seekers
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to land your <span className="text-indigo-400">dream role?</span>
              </h3>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                Upload your resume now and get discovered by top tech companies worldwide. Apply with just one click!
              </p>
              
              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toast.success("Redirecting to Resume Upload...")}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                >
                  <span>Upload Your CV</span>
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>

            {/* Right Box: For Employers */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900/70 border border-slate-800 p-6 sm:p-8 rounded-2xl backdrop-blur-md"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold mb-4">
                <Building2 size={16} /> For Employers
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Hiring top tech talent?
              </h3>
              <p className="mt-2 text-slate-400 text-sm leading-relaxed">
                Post your job opening to reach over 100k+ qualified professionals instantly.
              </p>
              
              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toast.info("Opening Employer Portal...")}
                  className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-sm flex items-center gap-2 transition"
                >
                  <span>Post a Job Free</span>
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;