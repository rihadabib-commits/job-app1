"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Briefcase, CheckCircle2, Clock, Bookmark, XCircle } from "lucide-react";

export default function OverviewPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "User";

  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserApplications = async () => {
      try {
        const res = await fetch("/api/applications");
        const data = await res.json();
        if (data.success) {
          setApplications(data.data || []);
        }
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserApplications();
  }, []);

  const totalApplied = applications.length;
  // ডাইনামিক্যালি শর্টলিস্ট এবং ইন রিভিউ কাউন্ট করা
  const totalShortlisted = applications.filter((app) => app.status === "Shortlisted").length;
  const totalInReview = applications.filter((app) => !app.status || app.status === "In Review").length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-1">
          Welcome back, {userName}! 👋
        </h2>
        <p className="text-slate-400 text-sm">Here is your daily activity overview.</p>
      </div>

      {/* Dynamic Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Briefcase className="text-indigo-400" size={22} />}
          title="Applied Jobs"
          value={totalApplied.toString()}
        />
        <StatCard
          icon={<CheckCircle2 className="text-emerald-400" size={22} />}
          title="Shortlisted"
          value={totalShortlisted.toString()}
        />
        <StatCard
          icon={<Clock className="text-amber-400" size={22} />}
          title="In Review"
          value={totalInReview.toString()}
        />
        <StatCard
          icon={<Bookmark className="text-blue-400" size={22} />}
          title="Saved Jobs"
          value="0"
        />
      </div>

      {/* Recent Activity Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
        {loading ? (
          <div className="text-slate-400 text-sm py-4">Loading recent activity...</div>
        ) : applications.length === 0 ? (
          <div className="text-slate-400 text-sm py-4">No recent job applications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase">
                  <th className="pb-3 px-4">Role</th>
                  <th className="pb-3 px-4">Company</th>
                  <th className="pb-3 px-4">Date</th>
                  <th className="pb-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {applications.slice(0, 5).map((app, index) => {
                  const jobTitle = app.jobDetails?.title || app.jobTitle || "Job Application";
                  const companyName = app.jobDetails?.company || app.company || "Company";
                  const dateStr = app.createdAt
                    ? new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Recently";

                  const currentStatus = app.status || "In Review";

                  return (
                    <tr key={app._id || index} className="hover:bg-slate-800/30 transition">
                      <td className="py-4 px-4 font-semibold text-white">{jobTitle}</td>
                      <td className="py-4 px-4 text-slate-300">{companyName}</td>
                      <td className="py-4 px-4 text-slate-400 text-xs">{dateStr}</td>
                      <td className="py-4 px-4">
                        <DynamicStatusBadge status={currentStatus} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => (
  <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
    <div className="p-3 bg-slate-800 rounded-xl">{icon}</div>
    <div>
      <p className="text-xs text-slate-400">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

// ডাইনামিক স্ট্যাটাস ব্যাজ কম্পোনেন্ট
const DynamicStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "Shortlisted":
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 flex items-center gap-1 w-max">
          <CheckCircle2 size={12} /> Shortlisted
        </span>
      );
    case "Rejected":
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium border bg-rose-500/10 text-rose-400 border-rose-500/20 flex items-center gap-1 w-max">
          <XCircle size={12} /> Rejected
        </span>
      );
    default:
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium border bg-amber-500/10 text-amber-400 border-amber-500/20 flex items-center gap-1 w-max">
          <Clock size={12} /> In Review
        </span>
      );
  }
};