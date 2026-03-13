"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, GraduationCap } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/news");
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt=""
          width={1000}
          height={1000}
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-br from-primary-dark/80 via-primary/70 to-primary-light/60" />
        <div className="absolute inset-0 bg-[radial-linear(ellipse_at_top_right,rgba(200,162,60,0.15),transparent_60%)]" />
      </div>

      {/* Animated floating shapes */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary-light/15 blur-3xl"
          animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 h-48 w-48 rounded-full bg-white/5 blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Glass login card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-[0_8px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          {/* Logo area */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="mt-1.5 text-sm text-white/60">
              Graduate School — MNUMS
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <label
                htmlFor="username"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50"
              >
                Username
              </label>
              <div
                className={`group relative rounded-xl border transition-all duration-300 ${
                  focused === "username"
                    ? "border-accent/60 bg-white/15 shadow-[0_0_20px_rgba(200,162,60,0.15)]"
                    : "border-white/15 bg-white/8 hover:border-white/25"
                }`}
              >
                <User
                  className={`absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300 ${
                    focused === "username" ? "text-accent" : "text-white/40"
                  }`}
                />
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocused("username")}
                  onBlur={() => setFocused(null)}
                  required
                  autoFocus
                  className="admin-autofill-fix h-12 w-full bg-transparent pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none"
                  placeholder="Enter your username"
                />
              </div>
            </motion.div>

            {/* Password field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50"
              >
                Password
              </label>
              <div
                className={`group relative rounded-xl border transition-all duration-300 ${
                  focused === "password"
                    ? "border-accent/60 bg-white/15 shadow-[0_0_20px_rgba(200,162,60,0.15)]"
                    : "border-white/15 bg-white/8 hover:border-white/25"
                }`}
              >
                <Lock
                  className={`absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300 ${
                    focused === "password" ? "text-accent" : "text-white/40"
                  }`}
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  required
                  className="admin-autofill-fix h-12 w-full bg-transparent pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </motion.div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-red-400/30 bg-red-500/15 px-4 py-2.5 text-sm text-red-200 backdrop-blur-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <button
                type="submit"
                disabled={loading}
                className="group relative mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-accent to-accent/80 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
              >
                {loading ? (
                  <motion.div
                    className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
