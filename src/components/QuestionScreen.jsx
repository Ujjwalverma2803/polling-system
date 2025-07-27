import React, { useState, useEffect } from "react";
import "./QuestionScreen.css";
import socket from "../socket";
import PillLogo from "./PillLogo";

export default function QuestionScreen(initialProps) {
  const [question, setQuestion] = useState(initialProps.question || null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(question?.duration || 60);
  const [submitted, setSubmitted] = useState(false);
  const [liveResults, setLiveResults] = useState({});
  const [pollComplete, setPollComplete] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isKicked, setIsKicked] = useState(false); // ✅ Added
  const [showChatBox, setShowChatBox] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [chatInput, setChatInput] = useState("");


  const handleSubmit = () => {
    if (submitted) return;

    if (selectedOption === null) {
      setSubmitted(true);
      return;
    }

    socket.emit("submit-answer", { answerIndex: selectedOption });
    setSubmitted(true);
  };
useEffect(() => {
  socket.on("participant-list", (list) => {
    setParticipants(list);
  });

  socket.on("receive-message", (msg) => {
    setMessages((prev) => [...prev, msg]);
  });

  return () => {
    socket.off("participant-list");
    socket.off("receive-message");
  };
}, []);

  useEffect(() => {
    const studentName = sessionStorage.getItem("studentName") || "Anonymous";
    socket.emit("join-student", studentName);

    socket.on("kicked", () => {
      setIsKicked(true);
    });

    return () => {
      socket.off("kicked");
    };
  }, []);

  useEffect(() => {
    socket.on("new-question", (poll) => {
      setQuestion(poll);
      setSelectedOption(null);
      setSubmitted(false);
      setPollComplete(false);
      setLiveResults({});
      setTimeLeft(poll.duration || 60);
      setQuestionNumber((prev) => prev + 1);
    });

    return () => {
      socket.off("new-question");
    };
  }, []);

  useEffect(() => {
    if (submitted || !question) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!submitted) {
            handleSubmit();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, question]);

  useEffect(() => {
    socket.on("live-results", (results) => {
      setLiveResults(results);
    });

    socket.on("poll-complete", (results) => {
      setLiveResults(results);
      setPollComplete(true);
    });

    return () => {
      socket.off("live-results");
      socket.off("poll-complete");
    };
  }, []);

  // ✅ Show kicked message
 if (isKicked) {
   return (
     <div
       className="kicked-screen"
       style={{
         height: "100vh",
         width: "100vw",
         display: "flex",
         flexDirection: "column",
         justifyContent: "center",
         alignItems: "center",
         padding: "0px",
         color: "#fff",
         fontFamily: "Sora, sans-serif",
       }}
     >
       <PillLogo />

       <div
         style={{
           fontSize: "40px",
           fontWeight: 400,
           lineHeight: "100%",
           textAlign: "center",
           marginBottom: "20px",
           color: "black", // White text on black background
         }}
       >
         You’ve been Kicked out!
       </div>

       {/* Sub message */}
       <div
         style={{
           fontSize: "19px",
           fontWeight: 400,
           lineHeight: "100%",
           textAlign: "center",
           color: "rgba(0, 0, 0, 0.5)", // White text on semi-transparent black bg
           padding: "15px 20px",
           borderRadius: "10px",
           maxWidth: "600px",
           margin: "0 auto",
         }}
       >
         Looks like the teacher has removed you from the poll system.
         <br />
         Please try again sometime.
       </div>
     </div>
   );
 }

  if (!question) {
    return (
      <div className="question-screen-container">
        <h2>Waiting for the teacher to start the poll...</h2>
      </div>
    );
  }
const sendMessage = () => {
  if (chatInput.trim() === "") return;
  const studentName = sessionStorage.getItem("studentName") || "Anonymous";
  const message = { sender: studentName, text: chatInput };
  socket.emit("send-message", message);
  setChatInput("");
};

const renderChatTab = () => (
  <div className="chat-messages">
    {messages.map((msg, i) => {
      const isMe =
        msg.sender === (sessionStorage.getItem("studentName") || "Anonymous");
      return (
        <div
          key={i}
          className={`chat-message ${isMe ? "my-message" : "other-message"}`}
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
    {participants.map((name, i) => (
      <div className="participant-row" key={i}>
        <span>{name}</span>
      </div>
    ))}
  </div>
);

  const totalVotes = Object.values(liveResults).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="question-screen-container">
      <div className="question-header-top">
        <div className="header-group">
          <span className="question-number">Question {questionNumber}</span>
        </div>
        <div className="header-group">
          <img src="/assets/timer.png" alt="timer" />
          <span className="timer-count" style={{ color: "red" }}>
            00:{timeLeft.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="question-box">
        <div className="question-title">{question.question}</div>

        <div className="options-list">
          {question.options.map((opt, index) => {
            const count = liveResults[opt] || 0;
            const percent = Math.round((count / totalVotes) * 100);
            const isSelected = selectedOption === index;

            return (
              <div
                key={index}
                className={`option-item ${isSelected ? "selected" : ""} ${
                  submitted ? "submitted" : ""
                }`}
                onClick={() => !submitted && setSelectedOption(index)}
              >
                <div className="option-number">{index + 1}</div>
                <div className="option-text">{opt}</div>

                {(submitted || pollComplete) && (
                  <div className="option-bar-wrapper">
                    <div
                      className="option-bar-fill"
                      style={{ width: `${percent}%` }}
                    ></div>
                    <span className="option-bar-percent">{percent}%</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {!submitted && (
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={selectedOption === null}
        >
          Submit
        </button>
      )}

      {pollComplete && (
        <p className="poll-complete-message">
          Wait for the teacher to ask a new question...
        </p>
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
    </div>
  );
}
