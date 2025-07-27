import React, { useState } from "react";
import PillLogo from "./PillLogo";
import "./TeacherStartPage.css";
import { useNavigate } from "react-router-dom";
import socket from "../socket"; // adjust path if needed

export default function TeacherStartPage() {
  const [question, setQuestion] = useState("");
  const [duration, setDuration] = useState("60 seconds");
  const [options, setOptions] = useState([{ text: "", correct: "no" }]);
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const handleCorrectChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].correct = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { text: "", correct: "no" }]);
  };
const handleAskQuestion = () => {
  if (!question.trim()) {
    alert("Please enter a question.");
    return;
  }

  const filledOptions = options.filter((opt) => opt.text.trim() !== "");
  if (filledOptions.length < 2) {
    alert("Please provide at least two valid options.");
    return;
  }

  const parsedDuration = parseInt(duration);
  const questionData = {
    question,
    options: filledOptions.map((opt) => opt.text),
    duration: parsedDuration,
  };

  console.log("Emitting new-question", questionData);

  // Store in localStorage before navigating
  localStorage.setItem("currentPoll", JSON.stringify(questionData));

  // Navigate first
  navigate("/LivePolling");

  // Optional slight delay to ensure listener is ready
  setTimeout(() => {
    socket.emit("new-question", questionData);
  }, 100);
};



  return (
    <>
      <div className="teacher-start-container">
        <PillLogo />

        <h1 className="start-title">
          Let’s <strong>Get Started</strong>
        </h1>

        <p className="teacher-start-subtext">
          You’ll have the ability to create and manage polls, ask questions, and
          monitor your students' responses in real-time.
        </p>

        <label htmlFor="question-input" className="question-label">
          Enter your question
        </label>

        <div className="teacher-question-box">
          <div className="timer-dropdown">
            <div className="dropdown-wrapper">
              <select
                className="timer-select"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                ref={(el) => (window._durationSelect = el)}
              >
                <option>30 seconds</option>
                <option>45 seconds</option>
                <option>60 seconds</option>
                <option>90 seconds</option>
              </select>
              <img
                src="/assets/drop-down.png"
                className="dropdown-icon"
                onClick={() => window._durationSelect?.focus()}
                alt="dropdown"
              />
            </div>
          </div>

          <textarea
            id="question-input"
            maxLength={100}
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="question-textarea"
          />
          <div className="char-count">{question.length}/100</div>
        </div>

        {/* Edit Options Section */}
        <div className="edit-options-header">
          <h3>Edit Options</h3>
        </div>

        <div className="options-container">
          {/* Option Text Inputs with bullets */}
          <div className="options-left">
            {options.map((opt, index) => (
              <div className="option-row" key={index}>
                <div className="option-bullet">{index + 1}</div>
                <input
                  className="option-input"
                  type="text"
                  value={opt.text}
                  placeholder={`Option ${index + 1}`}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </div>
            ))}
            <button className="add-option-button" onClick={addOption}>
              + Add More Option
            </button>
          </div>

          {/* Correctness Radios on the right */}
          <div className="options-right">
            <div className="correct-heading">Is it Correct?</div>
            <div className="correct-group">
              {options.map((opt, index) => (
                <div className="correct-radio" key={index}>
                  <label>
                    <input
                      type="radio"
                      name={`correct-${index}`}
                      value="yes"
                      checked={opt.correct === "yes"}
                      onChange={() => handleCorrectChange(index, "yes")}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`correct-${index}`}
                      value="no"
                      checked={opt.correct === "no"}
                      onChange={() => handleCorrectChange(index, "no")}
                    />
                    No
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="teacher-horizontal-line" />
      <div className="ask-question-container">
        <button className="ask-question-button" onClick={handleAskQuestion}>
          Ask Question
        </button>
      </div>
    </>
  );
}
