/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../utils/axiosInstance";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [showToast, setShowToast] = React.useState(false);
  const navigate = useNavigate();
  const HandleUpdatePassword = async () => {
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}/profile/password`,
        { password: newPassword },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/");
        }, 3000);
      }
    } catch (error: any) {
      console.error("Error updating password:", error?.response?.data || error);
    }
  };

  return (
    <div className="flex justify-center my-18">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl">Update password</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">New Password</legend>
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">
              {" "}
              Confirm Password
            </legend>
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
          {newPassword !== confirmPassword && (
            <p className="text-red-500">{"Passwords do not match"}</p>
          )}
          <div className="card-actions justify-center my-5">
            <button
              className="btn btn-primary"
              onClick={HandleUpdatePassword}
              disabled={
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
              }
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Password updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
