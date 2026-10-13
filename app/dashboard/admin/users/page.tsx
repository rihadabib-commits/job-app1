"use client";

import React, { useState } from "react";
import { Users, Search, ShieldAlert, CheckCircle2, Trash2, Filter } from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "Candidate" | "Employer";
  status: "Active" | "Blocked";
  joinedDate: string;
}

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const [users, setUsers] = useState<UserItem[]>([
    { id: "1", name: "Rahim Ahmed", email: "rahim@example.com", role: "Candidate", status: "Active", joinedDate: "Jan 10, 2026" },
    { id: "2", name: "Nexus Labs", email: "hr@nexuslabs.com", role: "Employer", status: "Active", joinedDate: "Feb 15, 2026" },
    { id: "3", name: "Tanvir Hasan", email: "tanvir@example.com", role: "Candidate", status: "Blocked", joinedDate: "Mar 02, 2026" },
  ]);

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
          : user
      )
    );
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="text-indigo-400" size={24} /> User Management
        </h2>
        <p className="text-xs text-slate-400 mt-1">Manage all candidates and employer accounts on the platform.</p>
      </div>

      {/* Search & Filter */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-950/60 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Candidate">Candidates</option>
            <option value="Employer">Employers</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-400">
            <thead className="bg-slate-950/60 text-slate-300 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">User</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Joined</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5">
                    <p className="font-bold text-white">{user.name}</p>
                    <p className="text-[11px] text-slate-500">{user.email}</p>
                  </td>
                  <td className="p-3.5 font-medium text-slate-300">{user.role}</td>
                  <td className="p-3.5">{user.joinedDate}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      user.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        user.status === "Active" ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20" : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      }`}
                    >
                      {user.status === "Active" ? "Block" : "Unblock"}
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-xl transition inline-flex items-center"
                    >
                      <Trash2 size={14} />
                    </button>
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