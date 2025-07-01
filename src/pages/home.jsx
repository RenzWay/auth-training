import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [uid, setUid] = useState("");
  useEffect(() => {
    const _uid = sessionStorage.getItem("uid");
    setUid(_uid);
    if (!_uid) {
      if (location.pathname !== "/login") {
        location.href = "/register";
      }
      return;
    }
  }, []);
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex flex-col">
      {/* Topbar */}
      <header className="w-full px-8 py-4 flex items-center justify-between bg-slate-800/80 backdrop-blur border-b border-slate-700 shadow-sm">
        <span className="text-xl font-mono font-bold text-sky-400 tracking-tight">
          Auth
          <span className="text-blue-300">App</span>
        </span>
        <span className="text-xs text-slate-300 font-mono">
          {uid ? `UID: ${uid}` : "Not logged in"}
        </span>
      </header>
      {/* Dashboard Card */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl mx-auto p-8 rounded-2xl bg-white/10 shadow-2xl border border-slate-700 backdrop-blur-lg flex flex-col gap-8">
          <div className="mb-2">
            <h1 className="text-3xl font-mono font-bold text-sky-300 mb-1 tracking-tight">
              Welcome, Programmer!
            </h1>
            <p className="text-slate-300 font-mono text-base">
              This is your authentication dashboard. Explore the features below:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <Link
              to="/register"
              className="group rounded-xl border border-sky-500 bg-slate-800/80 hover:bg-sky-900/80 transition shadow flex flex-col items-center p-6 gap-2 cursor-pointer"
            >
              <span className="text-3xl">📝</span>
              <span className="font-mono text-lg text-sky-300 font-bold">
                Register
              </span>
              <span className="text-xs text-slate-400 group-hover:text-sky-200 transition">
                Buat akun baru
              </span>
            </Link>
            <Link
              to="/post"
              className="group rounded-xl border border-blue-500 bg-slate-800/80 hover:bg-blue-900/80 transition shadow flex flex-col items-center p-6 gap-2 cursor-pointer"
            >
              <span className="text-3xl">📒</span>
              <span className="font-mono text-lg text-blue-300 font-bold">
                Post
              </span>
              <span className="text-xs text-slate-400 group-hover:text-blue-200 transition">
                Kelola catatan pribadi
              </span>
            </Link>
          </div>
        </div>
      </main>
    </section>
  );
}
