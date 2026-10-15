"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Briefcase,
  Search,
  Building2,
  LogOut,
  Bell,
  Menu,
  X,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const userRole = (session?.user as any)?.role || "applicant";
  const userName = session?.user?.name || "User";
  const userImage = session?.user?.image;

  const [mobile, setMobile] = useState(false);
  const [profile, setProfile] = useState(false);

  const notify = (msg: string) =>
    toast.success(msg, { position: "bottom-right", autoClose: 2000 });

  const handleLogout = () => {
    setProfile(false);
    signOut({ callbackUrl: "/" });
    toast.info("আপনার অ্যাকাউন্ট থেকে লগআউট করা হয়েছে!");
  };

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
              <NavLink href="/job" icon={<Search size={18} />}>
                Find Jobs
              </NavLink>

              <NavLink href="/companies" icon={<Building2 size={18} />}>
                Companies
              </NavLink>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {!isLoggedIn ? (
                <>
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 text-slate-300 font-medium hover:text-white transition cursor-pointer"
                    >
                      Login
                    </motion.button>
                  </Link>

                  <Link href="/register">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-500/20 cursor-pointer"
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
                    onClick={() => notify("No new notifications")}
                    className="relative p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-900 cursor-pointer"
                  >
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  </motion.button>

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      onClick={() => setProfile(!profile)}
                      className="flex items-center gap-2 p-1.5 rounded-full border border-slate-800 hover:border-indigo-500 transition cursor-pointer"
                    >
                      <div className="relative">
                        {userImage ? (
                          <img
                            src={userImage}
                            alt={userName}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                            {userName.charAt(0).toUpperCase()}
                          </div>
                        )}
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
                          className="absolute right-0 mt-3 w-60 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden z-50"
                        >
                          <div className="p-4 bg-slate-950 border-b border-slate-800">
                            <p className="font-bold text-white truncate">{userName}</p>
                            <span className="text-xs text-indigo-400 capitalize bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20 inline-block mt-1">
                              Role: {userRole}
                            </span>
                          </div>

                          <div className="py-1">
                            <Link href="/dashboard" onClick={() => setProfile(false)}>
                              <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-indigo-600/10 hover:text-indigo-400 transition cursor-pointer">
                                <LayoutDashboard size={17} />
                                Dashboard
                              </div>
                            </Link>
                          </div>

                          <motion.button
                            whileHover={{ x: 5 }}
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-500 hover:bg-rose-500/10 border-t border-slate-800 cursor-pointer"
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
              className="md:hidden p-2.5 rounded-xl hover:bg-slate-900 text-slate-300 cursor-pointer"
            >
              {mobile ? <X size={25} /> : <Menu size={25} />}
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
                <MobileLink icon={<Search />} text="Find Jobs" href="/job" close={() => setMobile(false)} />
                <MobileLink icon={<Building2 />} text="Companies" href="/companies" close={() => setMobile(false)} />
              </div>

              {!isLoggedIn ? (
                <div className="flex gap-2 pt-4 mt-3 border-t border-slate-900">
                  <Link href="/login" className="flex-1" onClick={() => setMobile(false)}>
                    <button className="w-full border border-slate-800 text-slate-300 py-2.5 rounded-xl font-semibold hover:border-indigo-500 transition cursor-pointer">
                      Login
                    </button>
                  </Link>

                  <Link href="/register" className="flex-1" onClick={() => setMobile(false)}>
                    <button className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold cursor-pointer">
                      Register
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="mt-4 pt-3 border-t border-slate-900 space-y-2">
                  <Link href="/dashboard" onClick={() => setMobile(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 font-medium hover:bg-slate-900 hover:text-indigo-400">
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-rose-500 font-semibold cursor-pointer"
                  >
                    <LogOut size={18} />
                    Logout
                  </motion.button>
                </div>
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
  <Link
    href={href}
    className="group relative flex items-center gap-2 text-slate-300 font-medium hover:text-white py-2 cursor-pointer"
  >
    <motion.span whileHover={{ scale: 1.15, rotate: 5 }}>{icon}</motion.span>
    {children}
    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-500 group-hover:w-full transition-all duration-300" />
  </Link>
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
  <Link
    href={href}
    onClick={close}
    className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-300 font-medium hover:bg-slate-900 hover:text-indigo-400 transition"
  >
    {React.isValidElement(icon)
      ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 19 })
      : icon}
    {text}
  </Link>
);

export default Navbar;