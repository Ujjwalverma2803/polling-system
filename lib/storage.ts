"use client";

import type { ViewerState } from "@/types/session";

const STORAGE_KEY = "pulse-poll-user";

export function saveViewer(viewer: ViewerState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(viewer));
}

export function getViewer(): ViewerState | null {
  if (typeof window === "undefined") return null;

  const rawValue = window.localStorage.getItem(STORAGE_KEY);
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue) as ViewerState;
  } catch {
    return null;
  }
}

export function clearViewer(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
