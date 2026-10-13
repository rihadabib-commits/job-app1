"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Send, GithubIcon, TwitterIcon, LinkedinIcon, FacebookIcon, Heart } from "lucide-react";
import { toast } from "react-toastify";

export const Footer: React.FC = () => {
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed to job alerts!");
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-lg shadow-indigo-500/20">
                <Briefcase size={22} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-extrabold tracking-tighter text-white">
                Job<span className="text-indigo-500">Portal</span>
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-400 max-w-sm leading-relaxed">
              Connecting brilliant minds with world-class companies. Discover remote, full-time, and freelance opportunities.
            </p>

            {/* Newsletter Input */}
            <form onSubmit={handleNewsletter} className="mt-6 flex items-center gap-2 max-w-md">
              <input
                type="email"
                required
                placeholder="Enter your email for job alerts..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500 transition"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition shrink-0"
              >
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">For Candidates</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#" className="hover:text-indigo-400 transition">Browse Jobs</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Browse Categories</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Saved Jobs</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Career Advice</a></li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">For Employers</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#" className="hover:text-indigo-400 transition">Post a Job</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Browse Talent</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Pricing Plans</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Recruitment Solutions</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#" className="hover:text-indigo-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Contact Support</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} JobPortal Inc. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <SocialIcon icon={<Github size={18} />} />
            <SocialIcon icon={<Twitter size={18} />} />
            <SocialIcon icon={<Linkedin size={18} />} />
            <SocialIcon icon={<Facebook size={18} />} />
          </div>
        </div>

      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <motion.a
    href="#"
    whileHover={{ y: -3, scale: 1.1 }}
    className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-indigo-600 transition"
  >
    {icon}
  </motion.a>
);

export default Footer;