import React from "react";
import type { User } from "../store/types";
import axiosInstance from "../utils/axiosInstance";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";
import { getTimeDifference } from "../utils/status";

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const dispatch = useDispatch();
  const {
    _id,
    firstName,
    lastName,
    profileUrl,
    age,
    gender,
    about,
    skills,
    lastActiveAt,
  } = user;
  console.log("aman", getTimeDifference(lastActiveAt));

  const handleSendRequest = async (
    status: "interested" | "ignored",
    userId: string
  ) => {
    try {
      const res = await axiosInstance.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeUserFromFeed(userId));
      }
      console.log(`Request sent successfully:`, res.data);
    } catch (error) {
      console.error(`Error sending request: ${error}`);
    }
  };

  return (
    <div className="card bg-base-200 w-96 shadow-sm p-3">
      <figure className="flex justify-center items-center h-4/5 w-full overflow-hidden">
        <img
          src={profileUrl}
          alt="profile image"
          className="object-cover h-full w-full rounded-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName.toUpperCase() + " " + lastName.toUpperCase()}
        </h2>
        {lastActiveAt && (
          <p className="text-sm text-gray-500">
            {getTimeDifference(lastActiveAt)}
          </p>
        )}
        {age && gender && (
          <p>
            {age} years old, {gender}
          </p>
        )}
        {skills && (
          <p className="text-sm text-gray-500"> {skills.join(", ")}</p>
        )}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary px-6 py-2 rounded-lg text-white font-semibold shadow"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          <button
            className="btn btn-soft btn-ghost px-6 py-2 rounded-lg text-white font-semibold shadow"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
