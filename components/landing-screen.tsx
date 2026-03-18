"use client";

import Link from "next/link";
import { AppShell } from "@/components/shell";

const highlights = [
  "Realtime live polling with Socket.IO sync",
  "Quiz mode with correctness tracking and leaderboard momentum",
  "Teacher analytics for response rate, speed, and engagement",
];

export function LandingScreen() {
  return (
    <AppShell
      eyebrow="Realtime Classroom Experience"
      title="Turn a basic polling demo into a product that feels interview-ready."
      description="This upgraded version is positioned as a modern engagement platform: polished UI, stronger session flow, live analytics, quiz scoring, and a structure that scales better than a beginner CRUD project."
      actions={
        <>
          <Link
            href="/teacher"
            className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Launch teacher console
          </Link>
          <Link
            href="/student"
            className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Join as student
          </Link>
        </>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-cyan-200/10 bg-slate-900/70 p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/70">
                  0{index + 1}
                </p>
                <p className="mt-3 text-lg font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-emerald-200/10 bg-gradient-to-br from-emerald-300/15 via-cyan-300/10 to-transparent p-6">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-100/70">
              What makes it stand out
            </p>
            <ul className="space-y-3 text-slate-200">
              <li>Session code based joining instead of a fragile open room.</li>
              <li>Live engagement metrics that make the teacher view feel purposeful.</li>
              <li>Quiz scoring and leaderboards that create a measurable learning loop.</li>
            </ul>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
