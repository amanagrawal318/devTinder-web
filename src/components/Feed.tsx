import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../store/feedSlice";
import type { RootState } from "../store/store";
import type { User } from "../store/types";
import UserCard from "./userCard";

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
  }, []);

  return (
    feedData.length > 0 && (
      <div className="flex justify-center my-10">
        <UserCard user={feedData[0]} />
      </div>
    )
  );
};

export default Feed;
