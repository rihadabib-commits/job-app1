import React from "react";
import { Briefcase, CheckCircle2, Clock, Bookmark, ChevronRight } from "lucide-react";

export default function OverviewPage() {
  const recentApplications = [
    { id: 1, jobTitle: "Senior Frontend Developer", company: "TechCorp", appliedDate: "Sep 12, 2026", status: "Interview", statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { id: 2, jobTitle: "UI/UX Designer", company: "Creative Studio", appliedDate: "Sep 10, 2026", status: "In Review", statusColor: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-1">Welcome back, John! 👋</h2>
        <p className="text-slate-400 text-sm">Here is your daily activity overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Briefcase className="text-indigo-400" size={22} />} title="Applied Jobs" value="12" />
        <StatCard icon={<CheckCircle2 className="text-emerald-400" size={22} />} title="Interviews" value="2" />
        <StatCard icon={<Clock className="text-amber-400" size={22} />} title="In Review" value="5" />
        <StatCard icon={<Bookmark className="text-blue-400" size={22} />} title="Saved Jobs" value="8" />
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
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
              {recentApplications.map((app) => (
                <tr key={app.id}>
                  <td className="py-4 px-4 font-semibold text-white">{app.jobTitle}</td>
                  <td className="py-4 px-4 text-slate-300">{app.company}</td>
                  <td className="py-4 px-4 text-slate-400 text-xs">{app.appliedDate}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${app.statusColor}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
  <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
    <div className="p-3 bg-slate-800 rounded-xl">{icon}</div>
    <div>
      <p className="text-xs text-slate-400">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);