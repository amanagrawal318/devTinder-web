/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../utils/axiosInstance";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../store/connectionsSlice";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { getTimeDifference } from "../utils/status";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const connections = useSelector((state: RootState) => state.connections);
  const [error, setError] = React.useState<string | null>(null);

  const fetchConnections = React.useCallback(async () => {
    try {
      setError(null); // Reset error state before fetching
      const res = await axiosInstance.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(setConnections(res?.data?.data ?? []));
    } catch (error: any) {
      setError(error?.response?.data?.message || "Failed to fetch connections");
    }
  }, [dispatch]);

  const fetchBlockUser = async (userId: string) => {
    try {
      // Replace 'blockedUserId' with the actual ID of the user to be blocked
      const res = await axiosInstance.post(
        `${BASE_URL}/profile/block-user/${userId}`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        // Refresh the connections list after blocking a user
        fetchConnections();
      }
    } catch (error) {
      console.error("Failed to block user:", error);
    }
  };
  const fetchUnBlockUser = async (userId: string) => {
    try {
      const res = await axiosInstance.delete(
        `${BASE_URL}/profile/unblock-user/${userId}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        // Refresh the connections list after un blocking a user
        fetchConnections();
      }
    } catch (error) {
      console.error("Failed to unblock user:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  if (error) {
    return <div className="text-red-500 text-4xl text-center">{error}</div>;
  }

  const aboutSection = (about: string): string => {
    const updatedAbout = about?.split(" ");
    if (updatedAbout.length > 10) {
      return updatedAbout.slice(0, 10).join(" ") + " .....";
    }
    return about;
  };

  return (
    <div className="mx-18">
      <h2 className="text-4xl font-bold text-center my-4">Connections</h2>
      <div className="flex justify-center flex-wrap gap-4">
        {connections.map((connection: any) => {
          const {
            _id,
            firstName,
            lastName,
            profileUrl,
            about,
            isBlocked,
            lastActiveAt,
          } = connection;
          return (
            <div
              className={
                "card bg-base-100 image-full w-96 shadow-xl rounded-xl"
              }
              key={connection._id}
            >
              <figure
                className={
                  "h-80 flex justify-center items-center" +
                  (isBlocked
                    ? "bg-[#e0e0e0] opacity-[0.5] pointer-events-none"
                    : "")
                }
              >
                <img
                  src={profileUrl}
                  alt="profile image"
                  className="h-40 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="card-actions flex justify-between items-center">
                  <h1 className="card-title text-2xl">
                    {firstName} {lastName}
                  </h1>
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button">
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="text-2xl"
                      />
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-40 p-2 shadow"
                    >
                      {isBlocked === undefined && (
                        <li>
                          <button onClick={() => fetchBlockUser(_id)}>
                            Block
                          </button>
                        </li>
                      )}
                      {isBlocked === true && (
                        <li>
                          <button onClick={() => fetchUnBlockUser(_id)}>
                            Unblock
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                {lastActiveAt && (
                  <p className="text-sm text-gray-500">
                    {getTimeDifference(lastActiveAt)}
                  </p>
                )}
                <p>
                  {aboutSection(about) || "No about information available."}
                </p>
                {isBlocked && (
                  <div className=" w-full h-full flex justify-center items-center">
                    <span className="text-white text-2xl font-bold">
                      Blocked
                    </span>
                  </div>
                )}
                <div className={"card-actions justify-end"}>
                  <button
                    className={
                      "btn btn-primary" +
                      (isBlocked ? " opacity-[0.5] pointer-events-none" : "")
                    }
                    onClick={() => {
                      navigate(`/profile/${_id}`);
                    }}
                  >
                    View profile
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
