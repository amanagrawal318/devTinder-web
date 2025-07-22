import React from "react";
import { useSelector } from "react-redux";
import type { User } from "../store/types";

const ProfileInfo: React.FC<{ user: User }> = ({ user }) => (
  <div className="card w-full max-w-md bg-base-100 shadow-xl mx-auto mt-8">
    <figure className="px-10 pt-10">
      <img
        src={user.profileUrl}
        alt="Profile"
        className="rounded-full w-32 h-32 object-cover border-4 border-primary"
      />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title text-3xl font-bold">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-gray-500">{user.email}</p>
      {user.about && (
        <div className="mt-2">
          <span className="font-semibold">About:</span>
          <p className="italic">{user.about}</p>
        </div>
      )}
      {user.age && (
        <p>
          <span className="font-semibold">Age:</span> {user.age}
        </p>
      )}
      {user.email && (
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      )}
      {/* Add more fields as needed */}
      <div className="card-actions mt-4">
        <button className="btn btn-primary">Edit Profile</button>
      </div>
    </div>
  </div>
);

const Profile: React.FC = () => {
  const loggedInUser: User = useSelector(
    (state: { user: { data: User } }) => state.user.data
  );

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mt-8 mb-4 text-primary">
        Profile
      </h1>
      {loggedInUser ? (
        <ProfileInfo user={loggedInUser} />
      ) : (
        <div className="alert alert-warning shadow-lg mt-8 w-full max-w-md">
          <span>No user data available.</span>
        </div>
      )}
    </div>
  );
};

export default Profile;
