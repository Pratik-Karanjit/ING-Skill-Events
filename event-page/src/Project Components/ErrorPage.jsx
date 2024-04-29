import React from "react";
import "./stylesheet.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-heading">404 ERROR PAGE</h1>
        <p className="error-message">
          Oops, it looks like you've entered a page that doesn't exist.
        </p>
        <br />
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
