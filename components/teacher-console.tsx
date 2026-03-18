"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/shell";
import { getSocket } from "@/lib/socket";
import { classNames, formatSeconds, getVotePercentage } from "@/lib/helpers";
import { saveViewer } from "@/lib/storage";
import type {
  PollMode,
  SessionMessage,
  SessionSnapshot,
} from "@/types/session";

const durations = [30, 45, 60, 90, 120];

interface DraftOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface StatCardProps {
  label: string;
  value: string | number;
  tone?: "cyan" | "emerald" | "amber";
}

const emptyOption = (id: number): DraftOption => ({
  id,
  text: "",
  isCorrect: false,
});

function StatCard({ label, value, tone = "cyan" }: StatCardProps) {
  const toneMap = {
    cyan: "from-cyan-300/20 to-sky-300/5 text-cyan-100",
    emerald: "from-emerald-300/20 to-emerald-300/5 text-emerald-100",
    amber: "from-amber-200/20 to-amber-200/5 text-amber-100",
  };

  return (
    <div
      className={classNames(
        "rounded-3xl border border-white/10 bg-gradient-to-br p-5",
        toneMap[tone]
      )}
    >
      <p className="text-sm uppercase tracking-[0.2em] text-white/60">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

export function TeacherConsole() {
  const [teacherName, setTeacherName] = useState<string>("Host");
  const [session, setSession] = useState<SessionSnapshot | null>(null);
  const [question, setQuestion] = useState<string>("");
  const [mode, setMode] = useState<PollMode>("quiz");
  const [duration, setDuration] = useState<number>(60);
  const [options, setOptions] = useState<DraftOption[]>([
    emptyOption(1),
    emptyOption(2),
    emptyOption(3),
    emptyOption(4),
  ]);
  const [messages, setMessages] = useState<SessionMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const socket = useMemo(() => getSocket(), []);

  useEffect(() => {
    saveViewer({ role: "teacher", name: teacherName });
  }, [teacherName]);

  useEffect(() => {
    const handleSessionUpdate = (nextSession: SessionSnapshot) => {
      setSession(nextSession);
      setMessages(nextSession.messages || []);
    };
    const handleReceiveMessage = (message: SessionMessage) =>
      setMessages((current) => [...current, message]);

    socket.on("session-update", handleSessionUpdate);
    socket.on("receive-message", handleReceiveMessage);
    socket.emit("teacher-sync");

    return () => {
      socket.off("session-update", handleSessionUpdate);
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket]);

  const createSession = (): void => {
    socket.emit("teacher-create-session", { teacherName });
  };

  const addOption = (): void => {
    setOptions((current) => [...current, emptyOption(current.length + 1)]);
  };

  const updateOption = (id: number, patch: Partial<DraftOption>): void => {
    setOptions((current) =>
      current.map((option) =>
        option.id === id ? { ...option, ...patch } : option
      )
    );
  };

  const startPoll = (): void => {
    const cleanOptions = options
      .map((option) => ({ ...option, text: option.text.trim() }))
      .filter((option) => option.text);

    if (!session?.code || !question.trim() || cleanOptions.length < 2) {
      return;
    }

    socket.emit("teacher-start-poll", {
      question: question.trim(),
      duration,
      mode,
      options: cleanOptions,
    });
  };

  const sendMessage = (): void => {
    if (!chatInput.trim()) return;

    socket.emit("send-message", {
      sender: teacherName,
      role: "teacher",
      text: chatInput.trim(),
    });
    setChatInput("");
  };

  const removeParticipant = (participantId: string): void => {
    socket.emit("kick-out", participantId);
  };

  const currentPoll = session?.currentPoll;
  const results = session?.results || {};
  const participants = session?.participants || [];
  const leaderboard = session?.leaderboard || [];
  const history = session?.history || [];
  const totalVotes = Object.values(results).reduce((sum, count) => sum + count, 0);
  const responseRate = session?.analytics?.responseRate || 0;

  return (
    <AppShell
      eyebrow="Teacher Command Center"
      title="Create sessions, launch live quizzes, and see the room react in realtime."
      description="This console gives you more than a poll form. You can run a session with a join code, track classroom engagement, manage participants, review history, and surface a leaderboard for quiz-style rounds."
      actions={
        <>
          <input
            value={teacherName}
            onChange={(event) => setTeacherName(event.target.value)}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="Teacher name"
          />
          <button
            onClick={createSession}
            className="rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
          >
            {session?.code ? `Refresh ${session.code}` : "Create session"}
          </button>
        </>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Join code" value={session?.code || "Create one"} />
            <StatCard label="Participants" value={participants.length} tone="emerald" />
            <StatCard
              label="Response rate"
              value={`${responseRate}%`}
              tone="amber"
            />
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/75 p-6">
            <div className="flex flex-col gap-6">
              <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-300">
                    Poll prompt
                  </span>
                  <textarea
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    maxLength={160}
                    rows={4}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-base text-white outline-none placeholder:text-slate-500"
                    placeholder="Ask something opinionated, surprising, or quiz-based..."
                  />
                </label>

                <div className="grid gap-4">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-300">Mode</span>
                    <select
                      value={mode}
                      onChange={(event) => setMode(event.target.value as PollMode)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                    >
                      <option value="quiz">Quiz mode</option>
                      <option value="poll">Opinion poll</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-300">
                      Duration
                    </span>
                    <select
                      value={duration}
                      onChange={(event) => setDuration(Number(event.target.value))}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                    >
                      {durations.map((item) => (
                        <option key={item} value={item}>
                          {item} seconds
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className="grid gap-3">
                {options.map((option, index) => (
                  <div
                    key={option.id}
                    className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 md:grid-cols-[1fr_auto]"
                  >
                    <input
                      value={option.text}
                      onChange={(event) =>
                        updateOption(option.id, { text: event.target.value })
                      }
                      className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                      placeholder={`Option ${index + 1}`}
                    />
                    <label className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200">
                      <input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={(event) =>
                          updateOption(option.id, {
                            isCorrect: event.target.checked,
                          })
                        }
                        className="h-4 w-4 accent-emerald-400"
                      />
                      Mark correct
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={addOption}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Add option
                </button>
                <button
                  onClick={startPoll}
                  className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                >
                  Launch poll
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/75 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/70">
                  Live analytics
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  {currentPoll?.question || "No active poll yet"}
                </h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                {currentPoll ? `${formatSeconds(currentPoll.timeLeft)} left` : "Idle"}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {(currentPoll?.options || []).map((option) => {
                const voteCount = results[option.id] || 0;
                const percentage = getVotePercentage(voteCount, totalVotes);
                return (
                  <div
                    key={option.id}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-white">
                          {option.text}
                        </p>
                        <p className="text-sm text-slate-400">
                          {option.isCorrect ? "Correct answer" : "Distractor"}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-cyan-200">
                        {voteCount} votes
                      </p>
                    </div>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="mt-2 text-right text-sm text-slate-400">
                      {percentage}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/75 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-emerald-200/70">
                  Leaderboard
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Top performers
                </h2>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {leaderboard.length === 0 ? (
                <p className="text-sm text-slate-400">
                  Quiz scores will appear here after students answer.
                </p>
              ) : (
                leaderboard.map((entry, index) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm text-slate-400">#{index + 1}</p>
                      <p className="text-base font-semibold text-white">
                        {entry.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-emerald-200">
                        {entry.score} pts
                      </p>
                      <p className="text-sm text-slate-400">
                        Avg {entry.averageResponseTime}s
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/75 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/70">
              Participants
            </p>
            <div className="mt-5 space-y-3">
              {participants.length === 0 ? (
                <p className="text-sm text-slate-400">
                  Share the join code to start building the room.
                </p>
              ) : (
                participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="font-semibold text-white">{participant.name}</p>
                      <p className="text-sm text-slate-400">
                        {participant.answersCount} answers submitted
                      </p>
                    </div>
                    <button
                      onClick={() => removeParticipant(participant.id)}
                      className="rounded-full border border-rose-300/30 bg-rose-300/10 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-300/20"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/75 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-amber-200/70">
              Session chat
            </p>
            <div className="mt-5 max-h-72 space-y-3 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={`${message.sender}-${index}`}
                  className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-white">
                    {message.sender}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">{message.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendMessage();
                }}
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                placeholder="Send guidance to the room..."
              />
              <button
                onClick={sendMessage}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Send
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/75 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/70">
              Poll history
            </p>
            <div className="mt-5 space-y-3">
              {history.length === 0 ? (
                <p className="text-sm text-slate-400">
                  Completed polls will be archived here.
                </p>
              ) : (
                history
                  .slice()
                  .reverse()
                  .map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded-3xl border border-white/10 bg-white/5 p-4"
                    >
                      <p className="font-semibold text-white">{entry.question}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {entry.mode === "quiz" ? "Quiz round" : "Opinion poll"} |{" "}
                        {entry.totalResponses} responses
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
