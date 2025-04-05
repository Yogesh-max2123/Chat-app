import React, { useEffect, useState, useRef } from "react";
import Avatar from "./Avatar";
import Divider from "./Divider";
import { toast } from "react-toastify";
import uploadFile from "@/helper/uploadFile";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

function EditUserDetails({ onClose, user }) {
  const [data, setData] = useState({
    name: user?.name || "",
    profile_pic: user?.profile_pic || "",
  });

  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      ...user,
    }));
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadPhotoRef.current?.click();
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadPhoto = await uploadFile(file);
      setData((prev) => ({
        ...prev,
        profile_pic: uploadPhoto?.url || prev.profile_pic,
      }));
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload profile picture.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/update-user`;
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Auth token missing! Please log in again.");
      return;
    }

    const payload = {
      name: data.name,
      profile_pic: data.profile_pic,
    };

    console.log("Token:", token);
    console.log("Data sent:", payload);

    try {
      const response = await axios.post(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response", response);
      toast.success(response?.data?.message);

      if (response.data.success) {
        dispatch(setUser(response.data.data));
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message || "Update failed!");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700/40 flex justify-center items-center">
      <div className="bg-white p-4 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit your Personal Details</p>

        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleOnChange}
              className="border rounded mt-1 focus:outline-cyan-900 p-1 w-full"
            />
          </div>
          <div>
            <div>Profile Pic:</div>
            <div className="my-1 flex items-center gap-4">
              <Avatar
                width={60}
                height={60}
                imageUrl={data?.profile_pic}
                name={data?.name}
              />
              <label htmlFor="profile_pic">
                <button
                  type="button"
                  className="font-semibold cursor-pointer hover:text-fuchsia-900"
                  onClick={handleOpenUploadPhoto}
                >
                  Change Profile Pic
                </button>
                <input
                  type="file"
                  id="profile_pic"
                  className="hidden"
                  onChange={handleUploadPhoto}
                  ref={uploadPhotoRef}
                />
              </label>
            </div>
          </div>
          <Divider />
          <div className="flex gap-2 w-fit ml-auto mt-2">
            <button
              type="button"
              className="border-cyan-900 border px-4 py-1 rounded cursor-pointer hover:bg-cyan-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border-cyan-900 bg-cyan-600 text-white border px-4 py-1 rounded cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(EditUserDetails);
