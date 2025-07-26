/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState(() => ({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    profileUrl: user?.profileUrl ?? "",
    age: user?.age ?? 0,
    gender: user?.gender ?? "male",
    about: user?.about ?? "",
  }));

  const handleSaveProfile = async () => {
    try {
      setError(null);
      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        fieldValues,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setShowToast(true);
        dispatch(addUser(response?.data?.user));
        setTimeout(() => {
          setShowToast(false);
          navigate("/profile");
        }, 3000);
      }
    } catch (err: any) {
      setError(err?.response?.data ?? "Failed to update profile");
    }
  };

  return (
    <div className="flex justify-center my-18">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl">Edit Profile</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              value={fieldValues.firstName}
              onChange={(e) =>
                setFieldValues({ ...fieldValues, firstName: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              value={fieldValues.lastName}
              onChange={(e) =>
                setFieldValues({ ...fieldValues, lastName: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Profile Url</legend>
            <input
              type="text"
              className="input"
              value={fieldValues.profileUrl}
              onChange={(e) =>
                setFieldValues({ ...fieldValues, profileUrl: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="number"
              className="input"
              value={fieldValues.age}
              onChange={(e) =>
                setFieldValues({ ...fieldValues, age: Number(e.target.value) })
              }
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <select
              className="select"
              value={fieldValues.gender}
              onChange={(e) =>
                setFieldValues({ ...fieldValues, gender: e.target.value })
              }
            >
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea
              className="textarea h-24"
              placeholder="About"
              value={fieldValues.about}
              onChange={(e) =>
                setFieldValues({ ...fieldValues, about: e.target.value })
              }
            ></textarea>
          </fieldset>

          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center my-5">
            <button className="btn btn-primary" onClick={handleSaveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
