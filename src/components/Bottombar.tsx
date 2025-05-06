import React from "react";
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";

const Bottombar = () => {
    return (
        <div className="flex justify-around items-center bg-gray-800 text-white py-2">
            <button className="flex flex-col items-center">
                <AiOutlineHome className="h-6 w-6" />
                <span className="text-xs">Home</span>
            </button>
            <button className="flex flex-col items-center">
                <AiOutlineUser className="h-6 w-6" />
                <span className="text-xs">Profile</span>
            </button>
            <button className="flex flex-col items-center">
                <AiOutlineSetting className="h-6 w-6" />
                <span className="text-xs">Settings</span>
            </button>
        </div>
    );
};

export default Bottombar;