"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Briefcase,
  Search,
  Building2,
  PlusCircle,
  User,
  LogOut,
  Bell,
  Menu,
  X,
  FileText,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

type UserRole = "visitor" | "seeker" | "employer" | "admin";

interface UserState {
  isLoggedIn: boolean;
  role: UserRole;
  name: string;
}

export const Navbar: React.FC = () => {
  const [user, setUser] = useState<UserState>({
    isLoggedIn: false, // ডিফল্টভাবে Visitor রাখা হয়েছে যেন Login/Register বাটন দৃশ্যমান হয়
    role: "visitor",
    name: "",
  });

  const [mobile, setMobile] = useState(false);
  const [profile, setProfile] = useState(false);

  const notify = (msg: string) =>
    toast.success(msg, { position: "bottom-right", autoClose: 2000 });

  const logout = () => {
    setUser({ isLoggedIn: false, role: "visitor", name: "" });
    setProfile(false);
    toast.info("আপনার অ্যাকাউন্ট থেকে লগআউট করা হয়েছে!");
  };

  const profileLinks = () => {
    if (user.role === "seeker")
      return (
        <>
          <MenuItem icon={<FileText />} text="My Applications" />
          <MenuItem icon={<Briefcase />} text="Saved Jobs" />
        </>
      );

    if (user.role === "employer")
      return (
        <>
          <MenuItem icon={<PlusCircle />} text="Post a Job" />
          <MenuItem icon={<User />} text="Manage Applicants" />
        </>
      );

    if (user.role === "admin")
      return (
        <>
          <MenuItem icon={<ShieldCheck />} text="Admin Dashboard" />
          <MenuItem icon={<CheckCircle2 />} text="Pending Approvals" />
        </>
      );

    return null;
  };

  const MenuItem = ({
    icon,
    text,
  }: {
    icon: React.ReactNode;
    text: string;
  }) => (
    <motion.a
      href="#"
      whileHover={{ x: 5 }}
      onClick={() => notify(text)}
      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
    >
      {React.isValidElement(icon)
        ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 17 })
        : icon}
      {text}
    </motion.a>
  );

  return (
    <>
      <ToastContainer />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[70px] flex items-center justify-between">

            {/* Professional Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: [-10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative p-2.5 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 overflow-hidden"
              >
                <Briefcase size={23} strokeWidth={2.5} />
              </motion.div>

              <div className="flex flex-col -space-y-1">
                <span className="text-2xl font-extrabold tracking-tighter text-white">
                  Job<span className="text-indigo-500">Portal</span>
                </span>
                <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase pl-0.5">
                  Find Your Future
                </span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-7">
              <NavLink href="#jobs" icon={<Search size={18} />}>
                Find Jobs
              </NavLink>

              <NavLink href="#companies" icon={<Building2 size={18} />}>
                Companies
              </NavLink>

              {user.role === "employer" && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => notify("Creating New Job Post...")}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 font-semibold hover:bg-indigo-600/20"
                >
                  <PlusCircle size={18} />
                  Post a Job
                </motion.button>
              )}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {!user.isLoggedIn ? (
                <>
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 text-slate-300 font-medium hover:text-white transition"
                    >
                      Login
                    </motion.button>
                  </Link>

                  <Link href="/register">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-500/20"
                    >
                      Register
                    </motion.button>
                  </Link>
                </>
              ) : (
                <>
                  {/* Notification */}
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => notify("There was no notification found!")}
                    className="relative p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-900"
                  >
                    <motion.div
                      animate={{ rotate: [0, -8, 8, 0] }}
                      transition={{
                        duration: 0.7,
                        repeat: Infinity,
                        repeatDelay: 5,
                      }}
                    >
                      <Bell size={20} />
                    </motion.div>

                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  </motion.button>

                  {/* Profile */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      onClick={() => setProfile(!profile)}
                      className="flex items-center gap-2 p-1.5 rounded-full border border-slate-800 hover:border-indigo-500 transition"
                    >
                      <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                      </div>

                      <motion.div animate={{ rotate: profile ? 180 : 0 }}>
                        <ChevronDown size={16} />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {profile && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-60 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden"
                        >
                          <div className="p-4 bg-slate-950">
                            <p className="font-bold text-white">{user.name}</p>
                            <span className="text-xs text-indigo-400 capitalize">
                              {user.role}
                            </span>
                          </div>

                          <div className="py-1">{profileLinks()}</div>

                          <motion.button
                            whileHover={{ x: 5 }}
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-500 hover:bg-rose-500/10 border-t border-slate-800"
                          >
                            <LogOut size={17} />
                            Logout
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobile(!mobile)}
              className="md:hidden p-2.5 rounded-xl hover:bg-slate-900 text-slate-300"
            >
              <AnimatePresence mode="wait">
                {mobile ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                  >
                    <X size={25} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                  >
                    <Menu size={25} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-900 bg-slate-950 px-4 py-4"
            >
              <div className="space-y-1">
                <MobileLink
                  icon={<Search />}
                  text="Find Jobs"
                  href="#jobs"
                  close={() => setMobile(false)}
                />

                <MobileLink
                  icon={<Building2 />}
                  text="Companies"
                  href="#companies"
                  close={() => setMobile(false)}
                />

                {user.role === "employer" && (
                  <MobileLink
                    icon={<PlusCircle />}
                    text="Post a Job"
                    href="#post-job"
                    close={() => setMobile(false)}
                  />
                )}
              </div>

              {!user.isLoggedIn ? (
                <div className="flex gap-2 pt-4 mt-3 border-t border-slate-900">
                  <Link href="/login" className="flex-1" onClick={() => setMobile(false)}>
                    <button className="w-full border border-slate-800 text-slate-300 py-2.5 rounded-xl font-semibold hover:border-indigo-500 transition">
                      Login
                    </button>
                  </Link>

                  <Link href="/register" className="flex-1" onClick={() => setMobile(false)}>
                    <button className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold">
                      Register
                    </button>
                  </Link>
                </div>
              ) : (
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={logout}
                  className="mt-4 w-full flex items-center gap-3 px-3 py-3 text-rose-500 font-semibold border-t border-slate-900 pt-4"
                >
                  <LogOut size={18} />
                  Logout
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

/* Desktop Nav Link */
const NavLink = ({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <motion.a
    href={href}
    whileHover={{ y: -2 }}
    className="group relative flex items-center gap-2 text-slate-300 font-medium hover:text-white py-2"
  >
    <motion.span whileHover={{ scale: 1.15, rotate: 5 }}>
      {icon}
    </motion.span>

    {children}

    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-500 group-hover:w-full transition-all duration-300" />
  </motion.a>
);

/* Mobile Link */
const MobileLink = ({
  icon,
  text,
  href,
  close,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  close: () => void;
}) => (
  <motion.a
    href={href}
    whileHover={{ x: 5 }}
    onClick={close}
    className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-300 font-medium hover:bg-slate-900 hover:text-indigo-400 transition"
  >
    {React.isValidElement(icon)
      ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 19 })
      : icon}
    {text}
  </motion.a>
);

export default Navbar;