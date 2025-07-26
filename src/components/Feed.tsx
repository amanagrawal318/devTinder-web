/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../store/feedSlice";
import type { RootState } from "../store/store";
import type { User } from "../store/types";
import UserCard from "./UserCard";

const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const feedData: User[] = useSelector((state: RootState) => state.feed);
  const getFeedData = async () => {
    // Fetch feed data from the server or API
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeedData(res.data));
    } catch (error) {
      console.error("Error fetching feed data:", error);
    }
  };

  useEffect(() => {
    if (feedData.length > 0) return;
    getFeedData();
  }, [feedData.length, dispatch]);

  if (!feedData || feedData.length === 0) {
    return (
      <div className="h-[50vh] flex justify-center items-center text-4xl">
        No users available in the feed
      </div>
    );
  }

  return (
    feedData.length > 0 && (
      <div className="h-[50vh] flex justify-center mt-10 ">
        <UserCard user={feedData[0]} />
      </div>
    )
  );
};

export default Feed;
