"use client";

import React, { useState } from "react";
import {
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  KeyRound,
  Trash2,
} from "lucide-react";

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Notification Toggles
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    jobMatches: true,
    applicationUpdates: true,
    marketing: false,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Account Settings</h2>
          <p className="text-slate-400 text-sm">
            Manage your password, security preferences, and email notifications.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/20 text-sm self-start sm:self-auto"
        >
          {isSaved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          {isSaved ? "Saved!" : "Save Settings"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Change Password Section */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <KeyRound size={18} className="text-indigo-400" /> Security & Password
          </h3>

          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-slate-500" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-slate-500" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-slate-500" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Notifications Preference */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Bell size={18} className="text-indigo-400" /> Notifications & Alerts
          </h3>

          <div className="space-y-4">
            <ToggleOption
              title="Job Application Updates"
              description="Get notified when an employer reviews or changes your application status."
              checked={notifications.applicationUpdates}
              onChange={() => handleToggle("applicationUpdates")}
            />
            <ToggleOption
              title="Recommended Job Matches"
              description="Receive weekly job recommendations based on your profile skills."
              checked={notifications.jobMatches}
              onChange={() => handleToggle("jobMatches")}
            />
            <ToggleOption
              title="Email Digest & Alerts"
              description="Receive direct emails for urgent message notifications."
              checked={notifications.emailAlerts}
              onChange={() => handleToggle("emailAlerts")}
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-rose-950/10 border border-rose-500/20 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
            <Shield size={18} /> Danger Zone
          </h3>
          <p className="text-xs text-slate-400">
            Once you delete your account, all your data, applications, and saved jobs will be permanently removed.
          </p>
          <button className="flex items-center gap-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 px-4 py-2 rounded-xl text-xs font-semibold transition">
            <Trash2 size={14} /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

const ToggleOption = ({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <div className="flex items-center justify-between gap-4 p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl">
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="text-xs text-slate-400 mt-0.5">{description}</p>
    </div>
    <button
      onClick={onChange}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
        checked ? "bg-indigo-600" : "bg-slate-800"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);