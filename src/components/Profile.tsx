import React from "react";
import { useSelector } from "react-redux";
import type { User } from "../store/types";
import { useNavigate } from "react-router-dom";

export const ProfileInfo: React.FC<{
  user: User;
  showEditButton?: boolean;
}> = ({ user, showEditButton = true }) => {
  const navigate = useNavigate();

  return (
    <div className="card lg:card-side bg-base-100 shadow-sm h-[60vh]">
      <figure>
        <img
          src={user.profileUrl || "https://via.placeholder.com/150"}
          alt="Album"
          className=" w-32 h-32 object-cover border-4 border-primary"
        />
      </figure>
      <div className="card-body grid grid-cols-1 gap-4">
        <h2 className="card-title text-3xl font-bold">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-500 text-xl">{user.email}</p>
        {user.age && (
          <p>
            <b>Age</b>: {user.age}
          </p>
        )}
        {user.gender && (
          <p>
            <b>Gender</b>: {user.gender}
          </p>
        )}
        {user.skills && user.skills.length > 0 && (
          <div className="mt-2">
            <p className="italic">
              <b>skills</b>: {user.skills.join(", ")}
            </p>
          </div>
        )}
        {user.about && (
          <div className="mt-2">
            <p className="italic">About: {user.about}</p>
          </div>
        )}
        {showEditButton && (
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/update-profile");
              }}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>

    // <div className="card w-full max-w-md bg-base-100 shadow-xl mx-auto mt-8">
    //   <figure className="px-10 pt-10">
    //     <img
    //       src={user.profileUrl}
    //       alt="Profile"
    //       className="rounded-full w-32 h-32 object-cover border-4 border-primary"
    //     />
    //   </figure>
    //   <div className="card-body items-center text-center">
    // <h2 className="card-title text-3xl font-bold">
    //   {user.firstName} {user.lastName}
    // </h2>
    // <p className="text-gray-500">{user.email}</p>
    // {user.age && <p>{user.age}</p>}
    // {user.gender && <p>{user.gender}</p>}
    // {user.skills && user.skills.length > 0 && (
    //   <div className="mt-2">
    //     <p className="italic">{user.skills.join(", ")}</p>
    //   </div>
    // )}
    // {user.about && (
    //   <div className="mt-2">
    //     <p className="italic">{user.about}</p>
    //   </div>
    // )}
    // {/* Add more fields as needed */}
    // <div className="card-actions mt-4">
    //   <button
    //     className="btn btn-primary"
    //     onClick={() => {
    //       navigate("/update-profile");
    //     }}
    //   >
    //     Edit Profile
    //   </button>
    //     </div>
    //   </div>
    // </div>
  );
};

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
