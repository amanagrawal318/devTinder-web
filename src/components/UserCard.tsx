import React from "react";
import type { User } from "../store/types";
const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const { firstName, lastName, profileUrl, age, gender, about, skills } = user;
  return (
    <div className="card bg-base-200 w-96 shadow-sm p-3">
      <figure>
        <img src={profileUrl} alt="profile image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName.toUpperCase() + " " + lastName.toUpperCase()}
        </h2>
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
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
