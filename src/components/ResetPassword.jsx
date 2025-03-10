import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate, useParams } from "react-router";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const handleReset = async () => {
    try {
      if (password !== rePassword) {
        throw new Error("Passwords do not match");
      }
      const res = await axios.post(
        BASE_URL + "/reset-password/" + token,
        { password },
        { withCredentials: true }
      );
      console.log(res);
      navigate("/login");
    } catch (error) {
      setError(error.message);
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
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">New Password</span>
              </div>
              <input
                value={password}
                type="password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Confirm Password</span>
              </div>
              <input
                value={rePassword}
                type="password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setRePassword(e.target.value)}
              />
            </label>
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" onClick={handleReset}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
