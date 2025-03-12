import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [view, setView] = useState(0);
  const nav = useNavigate();
  const [error, setError] = useState("");

  const handleLink = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/forget-password",
        { email },
        { withCredentials: true }
      );
      console.log(res);
      setView(1);
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }
  };

  return (
    <>
      {error !== "" && (
        <div
          role="alert"
          className="alert alert-error"
          onClick={() => setError("")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <div className="flex justify-center mt-8 pb-48">
        <div className="card bg-neutral w-96 shadow-xl self-center">
          <div className="card-body">
            <h2 className="card-title justify-center">Reset Your Password</h2>
            {view === 0 ? (
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Email Id</span>
                  </div>
                  <input
                    value={email}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-primary" onClick={handleLink}>
                    Send Reset Link
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Link has been successfully send</h2>
                <div className="card-actions justify-center mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => nav("/login")}
                  >
                    Go to Login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
