// ActivationPage.tsx

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ActivationPage.css";

const ActivationPage: React.FC = () => {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const navigate = useNavigate();
  const handleActivate = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/auth/users/activation/`,
        {
          uid,
          token,
        }
      );
      console.log("Account activated successfully:", response.data);
      navigate("/login-register");
    } catch (error) {
      console.error("Error activating account:", error);
    }
  };

  return (
    <div className="activation-page-container">
      <div className="activation-page-content">
        <h1 className="activation-page-title">Activate Your Account</h1>
        <p className="activation-page-description">
          Click the button below to activate your account.
        </p>
        <button className="activation-button" onClick={handleActivate}>
          Activate
        </button>
      </div>
    </div>
  );
};

export default ActivationPage;
