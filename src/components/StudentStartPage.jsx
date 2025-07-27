import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PillLogo from "./PillLogo";
import "./StudentStartPage.css";
import socket from "../socket";

export default function StudentStartPage() {
useEffect(() => {
  const studentName = sessionStorage.getItem("studentName");
  if (studentName) {
    console.log("Emitting join-student with name:", studentName); // Add this
    socket.emit("join-student", studentName);
  }
}, []);

  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("studentName");
    if (storedName) {
     navigate("/waiting");
    }
  }, [navigate]);

const handleContinue = () => {
  if (name.trim()) {
    sessionStorage.setItem("studentName", name); // stores only per tab
    navigate("/waiting");
  } else {
    alert("Please enter your name.");
  }
};


  return (
    <div className="student-start-container">
      <PillLogo />
      <h1 className="start-title">
        Let’s<strong> Get Started</strong>
      </h1>
      <p className="start-subtext">
        If you’re a student, you’ll be able to{" "}
        <strong>submit your answers</strong>, participate in live polls, and see
        how your responses compare with your classmates.
      </p>

      <label htmlFor="student-name" className="input-label">
        Enter your Name
      </label>
      <input
        id="student-name"
        type="text"
        className="name-input"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="continue-button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
