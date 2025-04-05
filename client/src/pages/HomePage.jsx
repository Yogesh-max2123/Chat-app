
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/userSlice';
import { setUser } from '@/redux/userSlice';
import Sidebar from '@/components1/Sidebar';
function HomePage() {

  const user = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchUserDetails = async()=>{
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials : true
      })


      dispatch(setUser(response.data.data))


      if(response?.data?.logout){
        dispatch(logout())
        navigate("/email")
      }

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchUserDetails()
  },[])

  return (
    <div className="grid grid-cols-12 h-screen max-h-screen overflow-hidden">
    {/* Sidebar Section */}
    <section className="col-span-3 bg-white border-r border-gray-200 overflow-y-auto">
      <Sidebar />
    </section>

      <section>
        <Outlet></Outlet>
      </section>
    </div>
  )
}

export default HomePage