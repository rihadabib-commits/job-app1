"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Search, Filter, Trash2, Building, Calendar, Tag } from "lucide-react";
import { toast } from "react-toastify";

export default function MyApplicationsPage() {
  const { data: session, status: sessionStatus } = useSession();
  const userEmail = session?.user?.email;

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // লগইন চেক শেষ না হওয়া পর্যন্ত অপেক্ষা
    if (sessionStatus === "loading") return;

    // লগইন না থাকলে খালি দেখাবে
    if (sessionStatus === "unauthenticated" || !userEmail) {
      setApplications([]);
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      setLoading(true);
      setApplications([]); // আগের ইউজারের ডেটা মুছে ফেলা
      try {
        const res = await fetch("/api/applications", { cache: "no-store" });
        const data = await res.json();
        if (res.ok && data.success) {
          setApplications(data.data || []);
        } else {
          toast.error(data.error || "Failed to load applications");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [sessionStatus, userEmail]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Shortlisted":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "In Review":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Pending":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  const filteredApplications = applications.filter((app) => {
    const jobTitle = app.jobDetails?.title || app.jobTitle || "";
    const company = app.jobDetails?.company || app.company || "";
    const status = app.status || "In Review";

    const matchesSearch =
      jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleWithdraw = async (id: string) => {
    if (!confirm("Are you sure you want to withdraw this application?")) return;

    try {
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Application withdrawn successfully");
        setApplications((prev) => prev.filter((app) => app._id !== id));
      } else {
        toast.error(data.error || "Failed to withdraw application");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">My Applications</h2>
          <p className="text-slate-400 text-sm">
            Track and manage all the job applications you have submitted.
          </p>
        </div>
        <div className="text-xs bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-slate-300 self-start sm:self-auto">
          Total Applied:{" "}
          <span className="text-indigo-400 font-bold">{applications.length}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by job or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/50 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <Filter size={16} className="text-slate-400 ml-1 hidden sm:block" />
          {["All", "Pending", "In Review", "Shortlisted", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                statusFilter === status
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-950/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Loading your applications...
          </div>
        ) : filteredApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/40">
                  <th className="py-4 px-6">Job Details</th>
                  <th className="py-4 px-6">Type & Location</th>
                  <th className="py-4 px-6">Applied Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredApplications.map((app) => {
                  const jobTitle = app.jobDetails?.title || app.jobTitle || "Job Position";
                  const company = app.jobDetails?.company || app.company || "Company Name";
                  const location = app.jobDetails?.location || "Remote / Bangladesh";
                  const jobType = app.jobDetails?.jobType || "Full-time";
                  const currentStatus = app.status || "In Review";

                  const dateStr = app.createdAt
                    ? new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Recently";

                  return (
                    <tr key={app._id} className="hover:bg-slate-800/30 transition">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white text-base">{jobTitle}</div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                          <Building size={14} /> {company}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-slate-300 text-xs font-medium">{location}</div>
                        <div className="flex items-center gap-1 text-[11px] text-indigo-400 mt-0.5">
                          <Tag size={12} /> {jobType}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-400 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} /> {dateStr}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                            currentStatus
                          )}`}
                        >
                          {currentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            title="Withdraw Application"
                            onClick={() => handleWithdraw(app._id)}
                            className="p-2 text-slate-400 hover:text-rose-400 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 text-slate-500">
            <p className="text-base font-medium">No applications found</p>
            <p className="text-xs text-slate-600 mt-1">
              Try changing your search keywords or status filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}