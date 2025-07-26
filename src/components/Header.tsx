import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { User } from "../store/types";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../store/userSlice";
import { clearFeedData } from "../store/feedSlice";
import { removeConnections } from "../store/connectionsSlice";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(
    (state: { user: { data: User } }) => state.user.data
  );

  const handleLogout = useCallback(async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      dispatch(clearFeedData());
      dispatch(removeConnections());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [dispatch, navigate]);

  return (
    <nav className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          DevTinder
        </Link>
      </div>
      <div className="flex gap-2 mx-5 items-center">
        {loggedInUser && (
          <>
            <span className="my-auto">Welcome, {loggedInUser.firstName}</span>
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
                aria-label="User menu"
              >
                <div className="w-10 rounded-full">
                  <img alt="User avatar" src={loggedInUser.profileUrl} />
                </div>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to={"/connections"}>Connections</Link>
                </li>
                <li>
                  <Link to={"/requests"}>Requests</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
