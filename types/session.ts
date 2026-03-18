export type PollMode = "quiz" | "poll";
export type PollStatus = "active" | "completed";

export interface PollOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface CurrentPoll {
  id: string;
  question: string;
  options: PollOption[];
  duration: number;
  timeLeft: number;
  mode: PollMode;
  status: PollStatus;
  startedAt: number;
}

export interface Participant {
  id: string;
  name: string;
  score: number;
  answersCount: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  answersCount: number;
  averageResponseTime: string;
}

export interface SessionHistoryEntry {
  id: string;
  question: string;
  mode: PollMode;
  totalResponses: number;
  completedAt?: string;
  results?: Record<string, number>;
}

export interface SessionMessage {
  sender: string;
  role: "teacher" | "student";
  text: string;
  createdAt: string;
}

export interface SessionAnalytics {
  responsesReceived: number;
  participantsCount: number;
  responseRate: number;
  averageResponseTime: string;
}

export interface SessionSnapshot {
  code: string | null;
  teacher: {
    id: string;
    name: string;
  } | null;
  participants: Participant[];
  currentPoll: CurrentPoll | null;
  results: Record<string, number>;
  analytics: SessionAnalytics;
  leaderboard: LeaderboardEntry[];
  history: SessionHistoryEntry[];
  messages: SessionMessage[];
}

export interface ViewerState {
  role: "teacher" | "student";
  name: string;
  sessionCode?: string;
}
