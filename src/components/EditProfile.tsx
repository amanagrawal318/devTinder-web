/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const [showToast, setShowToast] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState(() => ({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    age: user?.age ?? 0,
    gender: user?.gender ?? "male",
    about: user?.about ?? "",
    skills: user?.skills ?? [],
  }));
  const [skillInput, setSkillInput] = useState("");

  const handleSaveProfile = async () => {
    try {
      setError(null);
      if (file) {
        const formData = new FormData();
        formData.append("ProfileImage", file);
        await handleUpload(formData);
      }

      const response = await axiosInstance.patch(
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

  const handleUpload = async (formData: FormData) => {
    const res = await axiosInstance.post(
      `${BASE_URL}/profile/upload-profile-image`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return res;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      if (uploadedFile && uploadedFile.size > 1024 * 1024) {
        alert("File size should be less than 1MB");
        return;
      }
      setFile(uploadedFile);
    } else {
      setFile(null);
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
            <legend className="fieldset-legend">Upload Profile Image</legend>
            <input
              type="file"
              className="file-input"
              onChange={handleFileChange}
              accept="image/*"
            />
            <label className="label">Max size 1MB</label>
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
                setFieldValues({ ...fieldValues, gender: e.target.value as "male" | "female" | "other" })
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
          <fieldset>
            <legend className="fieldset-legend">Skills</legend>
            <div className="flex flex-wrap gap-2 mb-2">
              {(fieldValues.skills ?? []).map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="badge badge-outline flex items-center gap-1"
                >
                  {skill}
                  <button
                    type="button"
                    className="ml-1 text-xs text-red-500"
                    onClick={() => {
                      setFieldValues({
                        ...fieldValues,
                        skills: fieldValues.skills.filter(
                          (_: string, i: number) => i !== idx
                        ),
                      });
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              className="input"
              placeholder="Type a skill and press Enter"
              value={skillInput || ""}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  skillInput &&
                  skillInput.trim() !== ""
                ) {
                  const newSkill = skillInput.trim();
                  if (!fieldValues.skills?.includes(newSkill)) {
                    setFieldValues({
                      ...fieldValues,
                      skills: [...(fieldValues.skills ?? []), newSkill],
                    });
                    setSkillInput("");
                  } else {
                    setSkillInput("");
                  }
                  e.preventDefault();
                }
              }}
            />
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
