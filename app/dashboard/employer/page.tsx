"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Briefcase, Users, CheckCircle2, Plus, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function EmployerOverviewPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Employer";

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0,
  });
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          fetch("/api/jobs"),
          fetch("/api/applications"),
        ]);

        const jobsData = await jobsRes.json();
        const appsData = await appsRes.json();

        const jobsList = Array.isArray(jobsData?.data) 
          ? jobsData.data 
          : Array.isArray(jobsData) 
          ? jobsData 
          : [];
          
        const appsList = Array.isArray(appsData?.data) 
          ? appsData.data 
          : Array.isArray(appsData) 
          ? appsData 
          : [];

        setStats({
          totalJobs: jobsList.length,
          totalApplications: appsList.length,
          activeJobs: jobsList.length,
        });

        setRecentApplications(appsList.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch employer overview stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Employer Dashboard — Welcome, {userName}! 👋
          </h2>
          <p className="text-slate-400 text-sm">
            Here is what's happening with your job postings and applicants today.
          </p>
        </div>

        <Link
          href="/dashboard/employer/post-job"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-lg shadow-emerald-600/20 text-sm self-start md:self-auto"
        >
          <Plus size={18} /> Post a New Job
        </Link>
      </div>

      {/* Dynamic Stats Grid - Optional Chaining Fix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          icon={<Briefcase className="text-emerald-400" size={24} />}
          title="Total Posted Jobs"
          value={(stats?.totalJobs ?? 0).toString()}
        />
        <StatCard
          icon={<Users className="text-indigo-400" size={24} />}
          title="Total Applications Received"
          value={(stats?.totalApplications ?? 0).toString()}
        />
        <StatCard
          icon={<CheckCircle2 className="text-amber-400" size={24} />}
          title="Active Listings"
          value={(stats?.activeJobs ?? 0).toString()}
        />
      </div>

      {/* Recent Received Applications Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Recent Applicants</h3>
          <Link
            href="/dashboard/employer/applicants"
            className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
          >
            View All <ArrowUpRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="text-slate-400 text-sm py-6 text-center">Loading applicants data...</div>
        ) : recentApplications.length === 0 ? (
          <div className="text-slate-400 text-sm py-6 text-center">
            No applications received yet for your posted jobs.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase">
                  <th className="pb-3 px-4">Applicant Name</th>
                  <th className="pb-3 px-4">Email</th>
                  <th className="pb-3 px-4">Phone</th>
                  <th className="pb-3 px-4">Job ID</th>
                  <th className="pb-3 px-4">Applied Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {recentApplications.map((app, index) => (
                  <tr key={app._id || index} className="hover:bg-slate-800/30 transition">
                    <td className="py-4 px-4 font-semibold text-white">{app.fullName || "N/A"}</td>
                    <td className="py-4 px-4 text-slate-300">{app.email || "N/A"}</td>
                    <td className="py-4 px-4 text-slate-400">{app.phone || "N/A"}</td>
                    <td className="py-4 px-4 text-emerald-400 font-mono text-xs">{app.jobId || "N/A"}</td>
                    <td className="py-4 px-4 text-slate-400 text-xs">
                      {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "Recently"}
                    </td>
                  </tr>
                ))}
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
  <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
    <div className="p-3 bg-slate-800 rounded-xl">{icon}</div>
    <div>
      <p className="text-xs text-slate-400 mb-0.5">{title}</p>
      <p className="text-3xl font-extrabold text-white">{value}</p>
    </div>
  </div>
);