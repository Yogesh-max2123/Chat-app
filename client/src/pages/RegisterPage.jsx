import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
    profilePic: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      username,
      email,
      password,
      phone,
      address,
      answer,
      profilePic,
    } = formData;

    if (!username || !email || !password || !phone || !address || !answer || !profilePic) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      // 1. Upload profile picture to Cloudinary
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", profilePic);
      cloudinaryData.append("upload_preset", "chat-app");
      cloudinaryData.append("cloud_name", "dlezsb47d");

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dlezsb47d/image/upload",
        {
          method: "POST",
          body: cloudinaryData,
        }
      );
      const cloudinaryResult = await cloudinaryResponse.json();
      const profilePicUrl = cloudinaryResult.url;

      // 2. Register user
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          username,
          email,
          password,
          phone,
          address,
          answer,
          profilePic: profilePicUrl,
        }
      );

      if (response?.data?.success) {
        const { token, user } = response.data;

        // Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success(response?.data?.message || "Registered successfully!");

        // Clear form
        setFormData({
          username: "",
          email: "",
          password: "",
          phone: "",
          address: "",
          answer: "",
          profilePic: null,
        });

        navigate("/edit-user-details");
      } else {
        toast.error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during registration.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="form-control my-2" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="form-control my-2" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="form-control my-2" />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="form-control my-2" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="form-control my-2" />
        <input type="text" name="answer" value={formData.answer} onChange={handleChange} placeholder="Security Answer" className="form-control my-2" />
        <input type="file" name="profilePic" onChange={handleChange} className="form-control my-2" accept="image/*" />
        <button type="submit" className="btn btn-primary mt-3">Register</button>
      </form>
    </div>
  );
};

export default Register;
