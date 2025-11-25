import React, { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { BASE_URL } from "../utils/constants";
import { updateUserField } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const PaymentStatus = () => {
  const [status, setStatus] = React.useState<string>("");
  const dispatch = useDispatch();

  const fetchPaymentStatus = async () => {
    try {
      setStatus("loading");
      const res = await axiosInstance.get(
        `${BASE_URL}/payment/membership/payment-status`,
        { withCredentials: true }
      );
      setStatus(res.data.status);
      if (res.data.user) {
        dispatch(updateUserField(res.data.user));
      }
    } catch (error) {
      setStatus("canceled");
      console.log("err", error);
    }
  };
  useEffect(() => {
    fetchPaymentStatus();
  }, []);

  if (status === "succeeded") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="card w-96 bg-base-200 card-xl shadow-[0_20px_40px_#0D3DFF] mx-auto rounded-lg transform transition duration-300 hover:scale-100 hover:shadow-[0_20px_40px_#0D3DFF] hover:shadow-[#43916d]">
          <div className="card-body">
            <h2 className="card-title">Payment Successful 🎉</h2>
            <p>
              Thankyou for your purchase! Your payment was processed
              successfully. You can now enjoy the benefits of your premium
              subscription.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "canceled") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="card w-96 bg-base-200 card-xl shadow-sm mx-auto rounded-lg transform transition duration-300 hover:scale-100 hover:shadow-2xl hover:shadow-[#914391]">
          <div className="card-body">
            <h2 className="card-title">Payment Cancelled</h2>
            <p>
              Your payment was cancelled. Please try again if you wish to
              proceed with the purchase.
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">
                <Link to="/buy-premium">Try Again</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-spinner loading-4xl absolute top-1/2 transform -translate-y-1/2"></span>
    </div>
  );
};

export default PaymentStatus;
