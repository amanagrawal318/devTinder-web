import React from "react";
import { BASE_URL, PREMIUM_PLANS } from "../utils/constants";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import type { User } from "../store/types";

const Premium = () => {
  const loggedInUser = useSelector(
    (state: { user: { data: User } }) => state.user.data
  );
  const handleSubscribe = async (planName: "GOLD" | "SILVER") => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/payment/create-payment`,
        { plan: PREMIUM_PLANS[planName] },
        { withCredentials: true }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error.message);
    }
  };
  const renderPremiumCard = (planName: "GOLD" | "SILVER") => {
    const { type, amount } = PREMIUM_PLANS[planName];
    const features = [
      "Profile Boost",
      "Unlimited Swipes (or higher daily limit)",
      "Basic Profile Insights",
      "Priority Support",
      "Send Unlimited Messages",
    ];
    return (
      <div
        className={`card w-180 bg-base-200 shadow-custom rounded-lg transform transition duration-300 hover:scale-100 hover:shadow-2xl hover:shadow-gray-500`}
      >
        <div className="card-body">
          <span className="badge badge-md badge-warning">
            {type === "GOLD" ? "MOST POPULAR" : "MOST LOVED"}
          </span>
          <div className="flex justify-between">
            <h2 className="text-4xl font-bold">{type} Plan</h2>
            <span className="text-3xl">
              ${amount.toLocaleString("en-IN")}/yr
            </span>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xl">
            {features.map((feature) => {
              return (
                <li key={feature}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`size-4 me-2 inline-block text-success`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              );
            })}
            <li className={type === "GOLD" ? "" : "opacity-50"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`size-4 me-2 inline-block ${
                  type === "GOLD" ? "text-success" : "text-base-content/50"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className={type === "GOLD" ? "" : "line-through"}>
                Direct Messaging Without Match
              </span>
            </li>
            <li className={type === "GOLD" ? "" : "opacity-50"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`size-4 me-2 inline-block ${
                  type === "GOLD" ? "text-success" : "text-base-content/50"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className={type === "GOLD" ? "" : "line-through"}>
                Advanced AI Match Recommendations
              </span>
            </li>
          </ul>
          <div className="mt-6">
            <button
              className="btn btn-primary btn-block"
              onClick={() => handleSubscribe(planName)}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loggedInUser?.isPremium) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="card w-96 bg-base-100 card-xl shadow-sm">
          <div className="card-body">
            <h2 className="card-title">{`You are a ${loggedInUser?.planType?.toLowerCase()} plan User`}</h2>
            <p>Enjoy all the premium features!</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col justify-center absolute top-1/4 lg:flex-row ">
      {renderPremiumCard("SILVER")}
      <div className="divider lg:divider-horizontal"></div>
      {renderPremiumCard("GOLD")}
    </div>
  );
};

export default Premium;
