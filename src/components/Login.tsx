/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";
import { addUser, updateError } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import type { User } from "../store/types";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const error: string = useSelector((state: any) => state.user.error);
  const user: User = useSelector((state: any) => state.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HandleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response.data));
      navigate("/");
    } catch (err: any) {
      dispatch(updateError(err.response.data.message));
    }
  };

  if (user) {
    navigate("/");
  }

  return (
    <div className="flex justify-center my-18">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl">Login</h2>

          <div className="validator-hint hidden">Enter valid email address</div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Email</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                required
                className="focus:outline-none focus:border-none"
              />
            </label>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Password</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter Your Password"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including atleast one number, one
              lowercase letter, one uppercase letter and one special character
            </p>
          </fieldset>
          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center my-5">
            <button className="btn btn-primary" onClick={HandleLogin}>
              Login
            </button>
          </div>
          <div className="card-actions justify-center my-5">
            <p className="flex-none">New User? </p>
            <a className="link link-info" onClick={() => navigate("/signup")}>
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
