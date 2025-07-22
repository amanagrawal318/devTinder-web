import React from "react";
import { useSelector } from "react-redux";

const Profile: React.FC = () => {
  // This component can be expanded to show user profile details
  const loggedInUser = useSelector((state: any) => state.user.data);
  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      {loggedInUser ? (
        <div>
          <p>First Name: {loggedInUser.firstName}</p>
          <p>Last Name: {loggedInUser.lastName}</p>
          <p>Email: {loggedInUser.email}</p>
          <img
            src={loggedInUser.profileUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
