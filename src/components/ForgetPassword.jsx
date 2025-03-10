import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [view, setView] = useState(0);
  const nav = useNavigate();

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
      console.log(error);
    }
  };

  return (
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
  );
};

export default ForgetPassword;
