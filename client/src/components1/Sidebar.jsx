import React, { useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import Avatar from "./Avatar";
import { useSelector, useDispatch } from "react-redux";
import EditUserDetails from "./EditUserDetails";

import Divider from "./Divider";

function Sidebar() {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editUserOpen, setEditUserOpen] = useState(false);

  //   const handleSave = (updatedUser) => {
  //     dispatch(updateUser(updatedUser)); // Update Redux store
  //     setEditUserDetails(false); // Close modal
  //   };

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-slate-200 text-slate-800 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 cursor-pointer flex justify-center items-center hover:bg-slate-300 rounded-full ${
                isActive && "bg-slate-200"
              }`
            }
            title="Chats"
          >
            <IoChatbubbleEllipsesSharp size={25} />
          </NavLink>

          <div
            className="w-12 h-12 cursor-pointer flex justify-center items-center hover:bg-slate-300 rounded-full"
            title="Add Friend"
          >
            <AiOutlineUserAdd size={25} />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="mx-auto cursor-pointer hover:bg-slate-300 rounded-full mb-2"
            title={user?.name}
            onClick={() => setEditUserOpen(true)}
          >
            <Avatar
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user?.profile_pic}
              userId = {user?.id}
            />
          </button>

          <button
            className="w-12 h-12 cursor-pointer flex justify-center items-center hover:bg-slate-300 rounded-full"
            title="Logout"
          >
            <span className="-ml-2">
            <HiOutlineLogout size={25} />
            </span>
          </button>
        </div>
      </div>

      {EditUserDetails && (
        <EditUserDetails
          onClose={() => setEditUserOpen(false)}
          user={user}
         
        />
      )}
    </div>
  );
}

export default Sidebar;
