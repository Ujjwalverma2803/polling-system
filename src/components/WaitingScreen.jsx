import React, { useEffect, useState } from "react";
import PillLogo from "./PillLogo";
import QuestionScreen from "./QuestionScreen";
import socket from "../socket";
import "./WaitingScreen.css";

export default function WaitingScreen() {
  const [question, setQuestion] = useState(null);
useEffect(() => {
  const studentName = sessionStorage.getItem("studentName");
  if (studentName) {
    socket.emit("join-student", studentName);
  }
}, []);

  useEffect(() => {
    socket.on("new-question", (data) => {
      setQuestion(data); // data should be question object from backend
    });

    return () => {
      socket.off("new-question"); // clean up
    };
  }, []);

  if (question) {
    return <QuestionScreen question={question} />;
  }

  return (
    <div className="waiting-container">
      <div className="center-content">
        <PillLogo />
        <img src="/assets/loader.png" alt="Loading" className="spinner" />
        <p className="waiting-text">Wait for the teacher to ask questions..</p>
      </div>
      <div className="chat-circle">
        <img src="/assets/chat.png" alt="Chat" className="chat-icon" />
      </div>
    </div>
  );
}
