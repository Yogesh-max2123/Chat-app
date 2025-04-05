import React from 'react'
import { FaUserSecret } from "react-icons/fa6";
function Avatar({userId,name,imageUrl,width,height}) {

    let avatarName = "";
    
    if(name){
        const splitName = name?.split(" ")

        if(splitName.length>1){
            avatarName = splitName[0][0]+splitName[1][0]
        }else{
            avatarName = splitName[0][0]
        }
    }
    const bgColor = [
        "bg-sky-50",
        "bg-sky-400",
        "bg-sky-900",
        "bg-sky-500/10",
        "bg-sky-500/40",
        "bg-red-300",
        "bg-red-700",
        "bg-red-100-accent",
        "bg-red-700-accent",
        "bg-pink-100",
        "bg-pink-300",
        "bg-pink-200-accent",
        "bg-purple-100",
        "bg-purple-400",
        "bg-purple-700",
        "bg-purple-900",
        "bg-deep-purple-200",
        "bg-deep-purple-400",
        "bg-deep-purple-700",
        "bg-cyan-300",
        "bg-cyan-800",
        "bg-teal-300",
        "bg-teal-500",
        "bg-teal-800",
        "bg-green-300",
        "bg-green-700",
        "bg-light-green-400",
        "bg-lime-400",
        "bg-yellow-300",
        "bg-yellow-800",
        "bg-brown-200",
        "bg-brown-500",
        "bg-brown-800",
        "bg-grey-400",
        "bg-grey-600",
        "bg-blue-grey-900"
    ]
    const randomNumber = Math.floor(Math.random()*10)

  return (
    <div className={`text-slate-800 overflow-hidden rounded-full shadow-md border text-xl font-bold ${bgColor[randomNumber]}`}  style={{width:width+"px",height:height+"px"}} >
        {
            imageUrl?(
                <img src={imageUrl} 
                width = {width}
                height = {height}
                alt={name}
                className='overflow-hidden rounded-full' />
            ):(
                name?(
                    <div  style={{width:width+"px",height:height+"px"}} className='overflow-hidden rounded-full flex items-center justify-center'>
                        {avatarName}
                    </div>

                ):(
                    <FaUserSecret size={width} />
                )
            )
        }
    </div>
  )
}

export default Avatar