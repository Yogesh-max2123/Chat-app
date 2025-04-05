import React, { useState } from "react";
import { FaUserSecret } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function CheckEmailPage() {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();
  
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
  
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/email`;
  
      try {
        const response = await axios.post(URL, data);
        console.log("Response:", response);
  
        if (response?.data?.success) {
          toast.success(response?.data?.message);
  
          // ✅ Clear form fields after successful registration
          setData({
            email: "",
          });
          
  
          
          setTimeout(() => {
            navigate("/password",{state:
              response?.data?.data
            });
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
        <div className="mx-auto w-fit mb-2"><FaUserSecret size={70} /></div>
         <h1>Welcome to the Chat App!✌️</h1>
 
         <form className="grid gap-4 mt-4" onSubmit={handleSubmit}>
           <div className="flex flex-col gap-2">
             <label htmlFor="email">Email:</label>
             <input
               type="email"
               id="email"
               name="email"
               placeholder="Type Your Email Id"
               className="bg-slate-100 px-2 py-1 rounded-xl"
               value={data.email}
               onChange={handleOnChange}
               required
             />
           </div>
 
           
          
           <button
             type="submit"
             className="text-lg text-amber-50 px-4 py-1 rounded-lg bg-cyan-800 hover:cursor-pointer shadow-md leading-relaxed tracking-wide"
           >
             Let's Go
           </button>
         </form>
 
         <p className="mt-2 text-center">
           First time here? 
           <Link
             className="hover:text-cyan-500 ml-2 font-semibold"
             to="/register"
           >
             Register
           </Link>
         </p>
       </div>
     </div>
   );
}

export default CheckEmailPage