/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import type { User } from "../store/types";
import axiosInstance from "../utils/axiosInstance";

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user: User = useSelector((state: any) => state.user.data);

  const fetchUser = async () => {
    if (user) return;

    try {
      const res = await axiosInstance.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      if (res.status !== 200) {
        navigate("/login");
      }
      dispatch(addUser(res.data.user));
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="relative min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
