"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaShieldAlt } from "react-icons/fa";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        await Swal.fire({
          icon: "error",
          title: "Login failed",
          text: json.error ?? "Invalid credentials",
          confirmButtonColor: "#0d9488",
        });
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Welcome back",
        text: "Redirecting to dashboard...",
        timer: 1200,
        showConfirmButton: false,
      });
      window.location.href = "/admin";
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Please try again.",
        confirmButtonColor: "#0d9488",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-500/10 via-background to-emerald-500/10 py-10 flex items-center">
      <div className="mx-auto w-full max-w-md px-4">
        <motion.form
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          onSubmit={submit}
          className="rounded-2xl border border-border bg-card/90 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-teal-500/10 space-y-5"
        >
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-300 flex items-center justify-center">
              <FaShieldAlt className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-sm text-muted-foreground">Sign in to manage your portfolio content.</p>
          </div>

          <label className="space-y-1.5 block">
            <span className="text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5">
              <FaUser className="h-3.5 w-3.5" /> Username
            </span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              required
            />
          </label>

          <label className="space-y-1.5 block">
            <span className="text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5">
              <FaLock className="h-3.5 w-3.5" /> Password
            </span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-teal-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 disabled:opacity-60"
          >
            <FaSignInAlt className="h-3.5 w-3.5" />
            {loading ? "Signing in..." : "Login"}
          </motion.button>
        </motion.form>
      </div>
    </main>
  );
}
