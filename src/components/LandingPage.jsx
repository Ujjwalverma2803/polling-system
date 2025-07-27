import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PillLogo from "./PillLogo";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("student"); // student selected initially

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole === "student") {
      navigate("/student");
    } else if (selectedRole === "teacher") {
      navigate("/teacher");
    }
  };

  return (
    <div className="landing-container">
      <PillLogo />
      <div className="welcome-text">
        Welcome to the <span className="bold-text">Live Polling System</span>
      </div>
      <div className="sub-text">
        Please select the role that best describes you to begin using the live
        polling system
      </div>

      <div className="role-boxes">
        <div
          className={`role-box student ${
            selectedRole === "student" ? "selected" : ""
          }`}
          onClick={() => handleRoleClick("student")}
        >
          <p className="role-title">I'm a Student</p>
          <p className="role-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </p>
        </div>

        <div
          className={`role-box teacher ${
            selectedRole === "teacher" ? "selected" : ""
          }`}
          onClick={() => handleRoleClick("teacher")}
        >
          <p className="role-title">I'm a Teacher</p>
          <p className="role-description">
            Submit answers and view live poll results in real-time.
          </p>
        </div>
      </div>

      <button className="continue-button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
