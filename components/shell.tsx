import type { ReactNode } from "react";
import { BrandBadge } from "@/components/brand-badge";

interface AppShellProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AppShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: AppShellProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <BrandBadge />
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/75">
                {eyebrow}
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                {title}
              </h1>
              <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
                {description}
              </p>
            </div>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </section>
      {children}
    </main>
  );
}
