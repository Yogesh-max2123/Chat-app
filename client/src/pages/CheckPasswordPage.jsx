import React, { useEffect, useState } from "react";
import { FaUserSecret } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Avatar from "@/components1/Avatar";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/userSlice";


function CheckPasswordPage() {
  const [data, setData] = useState({
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  

  useEffect(()=>{
    if(!location?.state?.name){
      navigate("/email")
    }
  },[])

    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      e.stopPropagation();
  
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/password`;
  
      try {
        const response = await axios({
          method:"post",
          url:URL,
          data :{
            userId : location?.state?._id,
            password: data.password
          },
          withCredentials : true
        })
        
        if (response?.data?.success) {
          toast.success(response?.data?.message);
          dispatch(setToken(response?.data?.token))
          localStorage.setItem('token',response?.data?.token)
  
          // ✅ Clear form fields after successful registration
          setData({
            password: "",
          });
          
  
          
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          toast.error(response?.data?.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Registration Error:", error);
        toast.error(error?.response?.data?.message || "Something went wrong.");
      }
    };
 return (
     <div className="mt-5">
       <div className="bg-white w-full max-w-md rounded-xl overflow-hidden p-4 mx-auto">
        <div className="mx-auto w-fit mb-2 flex flex-col justify-center items-center">
          {/* <FaUserSecret size={70} /> */}
          <Avatar width = {70} height={70} name={location?.state?.name}
          imageUrl={location?.state?.profile_pic}
          >
          </Avatar>
          <h2 className="text-lg font-semibold mt-1">{location?.state?.name}</h2>
          </div>
         <h1>Welcome to the Chat App!✌️</h1>
 
         <form className="grid gap-4 mt-4" onSubmit={handleSubmit}>
           <div className="flex flex-col gap-2">
             <label htmlFor="email">Password:</label>
             <input
               type="password"
               id="password"
               name="password"
               placeholder="Enter Your Passkey"
               className="bg-slate-100 px-2 py-1 rounded-xl"
               value={data.password}
               onChange={handleOnChange}
               required
             />
           </div>
 
           
          
           <button
             type="submit"
             className="text-lg text-amber-50 px-4 py-1 rounded-lg bg-cyan-800 hover:cursor-pointer shadow-md leading-relaxed tracking-wide"
           >
             Login
           </button>
         </form>
 
         <p className="mt-2 text-center">
           
           <Link
             className="hover:text-cyan-500 ml-2 font-semibold"
             to="/forgot-password"
           >
             Forgot Password?
           </Link>
         </p>
       </div>
     </div>
   );
}

export default CheckPasswordPage



