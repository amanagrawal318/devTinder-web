/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../store/connectionsSlice";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const connections = useSelector((state: RootState) => state.connections);
  const [error, setError] = React.useState<string | null>(null);

  const fetchConnections = React.useCallback(async () => {
    try {
      setError(null); // Reset error state before fetching
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(setConnections(res?.data?.data ?? []));
    } catch (error: any) {
      setError(error?.response?.data?.message || "Failed to fetch connections");
    }
  }, [dispatch]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  if (error) {
    return <div className="text-red-500 text-4xl text-center">{error}</div>;
  }

  return (
    <div className="mx-18">
      <h2 className="text-4xl font-bold text-center my-4">Connections</h2>
      <div className="flex justify-center flex-wrap gap-4">
        {connections.map((connection: any) => {
          const { _id, firstName, lastName, profileUrl, about } = connection;
          return (
            <div
              className="card bg-base-100 image-full w-96 shadow-xl rounded-xl"
              key={connection._id}
            >
              <figure className="h-80 flex justify-center items-center">
                <img
                  src={profileUrl}
                  alt="profile image"
                  className="h-40 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h1 className="card-title text-2xl">
                  {firstName} {lastName}
                </h1>
                <p>{about || "No about information available."}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
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
