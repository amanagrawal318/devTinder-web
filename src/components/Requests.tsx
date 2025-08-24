import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../store/requestSlice";
import type { RootState } from "../store/store";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state: RootState) => state.requests);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const requestHandler = async (
    status: "accepted" | "rejected",
    requestId: string
  ) => {
    // Logic to handle accept or reject actions for connection requests

    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(removeRequest(requestId));
        setShowToast({
          show: true,
          message: `Connection Request ${status} successfully.`,
          type: `${status === "accepted" ? "success" : "info"}`,
        });
        setTimeout(() => {
          setShowToast({ show: false, message: "", type: "" });
        }, 3000);
      }
    } catch (error) {
      console.error(`Failed to ${status} request:`, error);
    }
  };

  const fetchRequests = async () => {
    // Logic to fetch connection requests from the server or API
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="text-center text-4xl my-8">
        No connection requests available.
      </div>
    );
  }

  return (
    <div className="requests-container">
      <h2 className="text-4xl font-bold my-6 text-center">
        Connection Requests
      </h2>
      <div className="h-screen overflow-y-auto flex flex-col items-center gap-8">
        {requests.map((request) => {
          const { _id, fromUserId } = request;
          return (
            <div
              key={_id}
              className="hero-content flex-col lg:flex-row bg-base-200 rounded-3xl shadow-2xl"
            >
              <img
                src={fromUserId.profileUrl}
                className="rounded-lg shadow-2xl h-full w-[170px] object-cover"
                onClick={() => {
                  window.open(`/profile/${fromUserId._id}`, "_blank");
                }}
              />
              <div
                className="flex flex-col gap-[20px] text-center"
                style={{ height: "100%", width: "300px" }}
              >
                <h2 className="text-3xl font-bold">
                  {fromUserId.firstName} {fromUserId.lastName}
                </h2>
                <p>{fromUserId.about || "No description provided"}</p>
                <div className="flex gap-4 mt-4 justify-center">
                  <button
                    className="btn btn-primary px-6 py-2 rounded-lg text-white font-semibold shadow"
                    onClick={() => requestHandler("accepted", _id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-soft btn-ghost px-6 py-2 rounded-lg text-white font-semibold shadow"
                    onClick={() => requestHandler("rejected", _id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {showToast.show && (
        <div className="toast toast-top toast-center">
          <div className={`alert alert-${showToast.type}`}>
            <span>{showToast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
