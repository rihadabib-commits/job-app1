"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Bookmark,
  User,
  Settings,
  Briefcase,
  PlusCircle,
  Users,
  Building2,
  ShieldCheck,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // NextAuth Session থেকে আসল রোল রিড করা
  const rawRole = (session?.user as any)?.role || "candidate";
  const userRole = String(rawRole).trim().toLowerCase();

  // ডায়নামিক রোল চেকিং
  const isAdmin = userRole === "admin";
  const isEmployer = userRole === "employer" || userRole === "recruiter";

  // ক্যান্ডিডেট / অ্যাপ্লিকেন্ট মেনু
  const candidateNav = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Applications", href: "/dashboard/applications", icon: FileText },
    { name: "Saved Jobs", href: "/dashboard/saved", icon: Bookmark },
    { name: "My Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // এমপ্লয়ার মেনু
  const employerNav = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Post a Job", href: "/dashboard/post-job", icon: PlusCircle },
    { name: "Posted Jobs", href: "/dashboard/jobs", icon: Briefcase },
    { name: "Applicants", href: "/dashboard/applicants", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // অ্যাডমিন মেনু
  const adminNav = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Manage Users", href: "/dashboard/users", icon: Users },
    { name: "Manage Jobs", href: "/dashboard/jobs", icon: Briefcase },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // ডাইনামিক মেনু নির্বাচন
  const navItems = isAdmin
    ? adminNav
    : isEmployer
    ? employerNav
    : candidateNav;

  // ডাইনামিক স্টাইল এবং ব্যাজ লেবেল
  const roleLabel = isAdmin ? "Admin" : isEmployer ? "Employer" : "Candidate";
  
  const badgeColor = isAdmin
    ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
    : isEmployer
    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";

  const iconBg = isAdmin
    ? "bg-rose-600"
    : isEmployer
    ? "bg-emerald-600"
    : "bg-indigo-600";

  const logoTextColor = isAdmin
    ? "text-rose-400"
    : isEmployer
    ? "text-emerald-400"
    : "text-indigo-400";

  const activeLinkStyle = isAdmin
    ? "bg-rose-600/10 text-rose-400 border border-rose-500/20"
    : isEmployer
    ? "bg-emerald-600/10 text-emerald-400 border border-emerald-500/20"
    : "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20";

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-5">
        {/* Dynamic Logo Section */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className={`p-2.5 rounded-2xl ${iconBg}`}>
            {isAdmin ? (
              <ShieldCheck size={22} className="text-white" />
            ) : isEmployer ? (
              <Building2 size={22} className="text-white" />
            ) : (
              <Briefcase size={22} className="text-white" />
            )}
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              Job<span className={logoTextColor}>Portal</span>
            </h1>
            <span
              className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${badgeColor}`}
            >
              {roleLabel}
            </span>
          </div>
        </div>

        {/* Dynamic Navigation Links */}
        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? activeLinkStyle
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}