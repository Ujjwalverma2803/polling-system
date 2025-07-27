import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import "./LivePollingPage.css";

export default function LivePollingPage() {
const [liveResults, setLiveResults] = useState({});
const [pollComplete, setPollComplete] = useState(false);
const [currentPoll, setCurrentPoll] = useState(null);
const [showHistory, setShowHistory] = useState(false);
const [history, setHistory] = useState([]);
const [showChatBox, setShowChatBox] = useState(false);
const [activeTab, setActiveTab] = useState("chat");
const [messages, setMessages] = useState([]);
const [participants, setParticipants] = useState([]);
const [chatInput, setChatInput] = useState("");
const navigate = useNavigate();
const teacherName = "Teacher";

  useEffect(() => {
    const storedPoll = localStorage.getItem("currentPoll");
    if (storedPoll) {
      setCurrentPoll(JSON.parse(storedPoll));
    }

    socket.on("new-question", (poll) => {
      setCurrentPoll(poll);
      setLiveResults({});
      setPollComplete(false);
      setShowHistory(false);
    });

    socket.on("live-results", (results) => {
      setLiveResults(results);
    });

    socket.on("poll-complete", (results) => {
      setLiveResults(results);
      setPollComplete(true);
    });

    return () => {
      socket.off("new-question");
      socket.off("live-results");
      socket.off("poll-complete");
    };
  }, []);
useEffect(() => {
  socket.on("participant-list", (list) => {
    console.log("Received participant list:", list); // Add this
    setParticipants(list);
  });

  socket.on("kicked", () => {
    alert("You have been removed by the teacher.");
    window.location.href = "/"; // or navigate("/login")
  });

  return () => {
    socket.off("participant-list");
    socket.off("kicked");
  };
}, []);
useEffect(() => {
  socket.on("receive-message", (msg) => {
    setMessages((prev) => [...prev, msg]);
  });

  return () => {
    socket.off("receive-message");
  };
}, []);


const fetchHistory = async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/poll-history`
    );
    if (res.ok) {
      const data = await res.json();
      setHistory(data);
      setShowHistory(true);
    }
  } catch (error) {
    console.error("Failed to fetch poll history:", error);
  }
};


  const handleNextQuestion = () => {
    navigate("/teacher");
  };

  if (showHistory) {
    return (
      <div className="question-screen-container">
        <h2>
          View <span>Poll History</span>
        </h2>
        <button
          onClick={() => setShowHistory(false)}
          className="view-history-button"
        >
          Back to Live Poll
        </button>

        {history.length === 0 && <p>No polls yet.</p>}

        {history.map(({ poll, results, timestamp }, idx) => {
          const totalVotes = Object.values(results).reduce(
            (sum, count) => sum + count,
            0
          );
          return (
            <div key={idx} className="history-question-wrapper">
              <div className="question-header-top">
                <div className="header-group">
                  <span className="question-number">Question {idx + 1}</span>
                </div>
              </div>

              <div className="question-box">
                <div className="question-title">{poll.question}</div>
                <div className="options-list">
                  {poll.options.map((opt, i) => {
                    const count = results[opt] || 0;
                    const percent =
                      totalVotes > 0
                        ? Math.round((count / totalVotes) * 100)
                        : 0;

                    return (
                      <div key={i} className="option-item submitted">
                        <div className="option-number">
                          {String.fromCharCode(65 + i)}
                        </div>
                        <div className="option-text">{opt}</div>
                        <div className="option-bar-wrapper">
                          <div
                            className="option-bar-fill"
                            style={{ width: `${percent}%` }}
                          ></div>
                          <div className="option-bar-percent">{percent}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (!currentPoll) {
    return (
      <div className="question-screen-container">
        <h2>No active poll</h2>
        <button onClick={() => navigate("/teacher")}>Go to Ask Question</button>
      </div>
    );
  }
const sendMessage = () => {
  if (chatInput.trim() === "") return;
  const sender =
    teacherName || sessionStorage.getItem("studentName") || "Anonymous";
  const message = { sender, text: chatInput };
  socket.emit("send-message", message); // no local update
  setChatInput("");
};


const handleKickOut = (name) => {
  socket.emit("kick-out", name);
};


const renderChatTab = () => (
  <div className="chat-messages">
    {messages.map((msg, i) => {
      const isTeacher = msg.sender === teacherName;
      return (
        <div
          key={i}
          className={`chat-message ${
            isTeacher ? "my-message" : "other-message"
          }`}
        >
          <div className="chat-sender">{msg.sender}</div>
          <div className="chat-bubble">{msg.text}</div>
        </div>
      );
    })}
    <div className="chat-input-area">
      <input
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
);

const renderParticipantsTab = () => (
  <div className="participants-list">
    <div className="participant-header">
      <span>Name</span>
      <span>Action</span>
    </div>
    {participants.map((name, i) => (
      <div className="participant-row" key={i}>
        <span>{name}</span>
        <button
          onClick={() => handleKickOut(name)}
          style={{
            color: "blue",
            textDecoration: "underline",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontSize: "inherit",
          }}
        >
          Kick Out
        </button>
      </div>
    ))}
  </div>
);
  return (
    <div className="question-screen-container" style={{ position: "relative" }}>
      <div className="question-header-top">
        <div className="header-group">
          <span className="question-number">Question</span>
        </div>
      </div>

      <div className="question-box">
        <div className="question-title">{currentPoll.question}</div>

        <div className="options-list">
          {currentPoll.options.map((option, i) => {
            const voteCount = liveResults[option] || 0;
            const totalVotes = Object.values(liveResults).reduce(
              (sum, count) => sum + count,
              0
            );
            const percentage =
              totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(1) : 0;

            return (
              <div key={i} className="option-item submitted">
                <div className="option-number">
                  {String.fromCharCode(65 + i)}
                </div>
                <div className="option-text">{option}</div>
                <div className="option-bar-wrapper">
                  <div
                    className="option-bar-fill"
                    style={{ width: `${percentage}%` }}
                  ></div>
                  <div className="option-bar-percent">{percentage}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!pollComplete && (
        <p className="poll-complete-message">
          Waiting for students to submit answers...
        </p>
      )}

      {pollComplete && (
        <button onClick={handleNextQuestion} className="submit-button">
          + Ask Next Question
        </button>
      )}
      <div className="chat-circle" onClick={() => setShowChatBox(!showChatBox)}>
        <img src="/assets/chat.png" alt="Chat" />
      </div>
      {showChatBox && (
        <div className="chat-box">
          <div className="chat-tabs">
            <div
              className={`chat-tab ${activeTab === "chat" ? "active" : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              Chat
            </div>
            <div
              className={`chat-tab ${
                activeTab === "participants" ? "active" : ""
              }`}
              onClick={() => setActiveTab("participants")}
            >
              Participants
            </div>
          </div>
          <div className="chat-content">
            {activeTab === "chat" ? renderChatTab() : renderParticipantsTab()}
          </div>
        </div>
      )}
      <button onClick={fetchHistory} className="view-history-button">
        <img src="/assets/Eye.png" alt="View" className="eye-icon" />
        View Poll History
      </button>
    </div>
  );
}
