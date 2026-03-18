"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/shell";
import { getSocket } from "@/lib/socket";
import { classNames, formatSeconds, getVotePercentage } from "@/lib/helpers";
import { getViewer, saveViewer } from "@/lib/storage";
import type { SessionMessage, SessionSnapshot } from "@/types/session";

export function StudentConsole() {
  const [name, setName] = useState<string>("");
  const [sessionCode, setSessionCode] = useState<string>("");
  const [session, setSession] = useState<SessionSnapshot | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [messages, setMessages] = useState<SessionMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const [joinError, setJoinError] = useState<string>("");
  const socket = useMemo(() => getSocket(), []);

  useEffect(() => {
    const viewer = getViewer();
    if (viewer?.role === "student") {
      setName(viewer.name || "");
      setSessionCode(viewer.sessionCode || "");
    }
  }, []);

  useEffect(() => {
    const handleSessionUpdate = (nextSession: SessionSnapshot) => {
      setSession((current) => {
        if (nextSession.currentPoll?.id !== current?.currentPoll?.id) {
          setSelectedOptionId(null);
          setSubmitted(false);
        }
        return nextSession;
      });
      setMessages(nextSession.messages || []);
      setJoinError("");
    };
    const handleMessage = (message: SessionMessage) =>
      setMessages((current) => [...current, message]);
    const handleJoinError = (payload: { message: string }) =>
      setJoinError(payload.message);
    const handleKicked = () => {
      setSession(null);
      setSelectedOptionId(null);
      setSubmitted(false);
      setJoinError("You were removed from the session.");
    };

    socket.on("session-update", handleSessionUpdate);
    socket.on("receive-message", handleMessage);
    socket.on("join-error", handleJoinError);
    socket.on("kicked", handleKicked);

    return () => {
      socket.off("session-update", handleSessionUpdate);
      socket.off("receive-message", handleMessage);
      socket.off("join-error", handleJoinError);
      socket.off("kicked", handleKicked);
    };
  }, [socket]);

  const joinSession = (): void => {
    const trimmedName = name.trim();
    const trimmedCode = sessionCode.trim().toUpperCase();

    if (!trimmedName || !trimmedCode) {
      setJoinError("Enter your name and the teacher's session code.");
      return;
    }

    saveViewer({ role: "student", name: trimmedName, sessionCode: trimmedCode });
    socket.emit("student-join", {
      name: trimmedName,
      sessionCode: trimmedCode,
    });
    setJoinError("");
  };

  const submitAnswer = (): void => {
    if (!selectedOptionId || submitted || !session?.currentPoll) return;
    const elapsed =
      (session.currentPoll.duration || 0) - (session.currentPoll.timeLeft || 0);
    socket.emit("submit-answer", {
      optionId: selectedOptionId,
      responseTime: Math.max(0, elapsed),
    });
    setSubmitted(true);
  };

  const sendMessage = (): void => {
    if (!chatInput.trim()) return;

    socket.emit("send-message", {
      sender: name.trim() || "Student",
      role: "student",
      text: chatInput.trim(),
    });
    setChatInput("");
  };

  const currentPoll = session?.currentPoll;
  const results = session?.results || {};
  const totalVotes = Object.values(results).reduce((sum, count) => sum + count, 0);
  const leaderboard = session?.leaderboard || [];
  const me = session?.participants?.find((participant) => participant.name === name);
  const myRankIndex = leaderboard.findIndex((entry) => entry.name === name);
  const rank = myRankIndex >= 0 ? myRankIndex + 1 : "-";

  return (
    <AppShell
      eyebrow="Student Experience"
      title="Join fast, answer cleanly, and see where you stand instantly."
      description="The student flow now feels more like a real product: room-code join, realtime question sync, timer feedback, live results, chat, and optional quiz ranking."
    >
      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/75 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/70">
              Join session
            </p>
            <div className="mt-5 grid gap-4">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                placeholder="Your name"
              />
              <input
                value={sessionCode}
                onChange={(event) => setSessionCode(event.target.value.toUpperCase())}
                className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                placeholder="Session code"
              />
              <button
                onClick={joinSession}
                className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Join live room
              </button>
              {joinError ? (
                <p className="text-sm text-rose-200">{joinError}</p>
              ) : null}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/75 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-emerald-200/70">
                  Personal progress
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  {session?.code ? `Room ${session.code}` : "Waiting to join"}
                </h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                {currentPoll ? formatSeconds(currentPoll.timeLeft) : "--:--"}
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                  Score
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {me?.score || 0}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                  Rank
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">{rank}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/75 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-amber-200/70">
              Room chat
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
                placeholder="Ask a question or react..."
              />
              <button
                onClick={sendMessage}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-900/75 p-6">
          {!currentPoll ? (
            <div className="flex min-h-[28rem] items-center justify-center rounded-[28px] border border-dashed border-white/15 bg-white/5 p-8 text-center text-slate-300">
              Join a session to receive the teacher&apos;s live poll and results.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/70">
                    {currentPoll.mode === "quiz" ? "Quiz round" : "Opinion poll"}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">
                    {currentPoll.question}
                  </h2>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
                  {formatSeconds(currentPoll.timeLeft)}
                </div>
              </div>

              <div className="grid gap-4">
                {currentPoll.options.map((option, index) => {
                  const voteCount = results[option.id] || 0;
                  const percentage = getVotePercentage(voteCount, totalVotes);
                  const showResults =
                    submitted || currentPoll.status === "completed";

                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={submitted || currentPoll.status === "completed"}
                      onClick={() => setSelectedOptionId(option.id)}
                      className={classNames(
                        "rounded-[28px] border px-5 py-5 text-left transition",
                        selectedOptionId === option.id
                          ? "border-cyan-300 bg-cyan-300/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/70 text-sm font-semibold text-cyan-200">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-semibold text-white">
                            {option.text}
                          </p>
                          {showResults ? (
                            <>
                              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <p className="mt-2 text-sm text-slate-400">
                                {percentage}% selected this option
                              </p>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={submitAnswer}
                  disabled={!selectedOptionId || submitted}
                  className="rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition enabled:hover:bg-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                >
                  {submitted ? "Submitted" : "Submit answer"}
                </button>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                  {session?.analytics?.responsesReceived || 0} /{" "}
                  {session?.participants?.length || 0} responses received
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </AppShell>
  );
}
