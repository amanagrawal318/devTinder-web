import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import React from "react";
import type { User } from "../store/types";
import { ProfileInfo } from "./Profile";
import { useSelector } from "react-redux";

const ViewProfile = () => {
  const { userId } = useParams();
  const loggedInUser: User = useSelector(
    (state: { user: { data: User } }) => state.user.data
  );
  const [user, setUser] = React.useState<User | null>(null);

  const fetchViewUser = async () => {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/profile/view/${userId}`,
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      userId &&
      loggedInUser &&
      userId.toString() !== loggedInUser?._id?.toString()
    ) {
      fetchViewUser();
    }
  }, [userId, loggedInUser]);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mt-8 mb-4 text-primary">
        View Profile
      </h1>
      {userId?.toString() === loggedInUser?._id?.toString() ? (
        <ProfileInfo user={loggedInUser} />
      ) : user ? (
        <ProfileInfo user={user} showEditButton={false} />
      ) : (
        <div role="alert" className="alert alert-info alert-soft">
          <span className="alert-title text-2xl">User Not Found</span>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
