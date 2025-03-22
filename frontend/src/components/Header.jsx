import React, { useEffect, useState } from 'react';
import profile from '../assets/profile.webp';
import { GrAppsRounded } from "react-icons/gr";

function Header({ handleNavDrawer }) {
    const [userProfile, setUserProfile] = useState(profile);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user-info"));
        if (userInfo && userInfo.picture) {
            setUserProfile(userInfo.picture);
        }
    }, []);

    return (
        <div className="flex justify-between items-center m-2">
            <div className="relative h-15 w-15 p-[2px] rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500">
                <img
                    src={userProfile}
                    alt="user profile"
                    className="h-full w-full rounded-full border-2 border-white"
                />
            </div>
            <GrAppsRounded 
                onClick={handleNavDrawer} 
                className='text-4xl text-gray-600 font-thin cursor-pointer' 
                strokeWidth={0.00} 
                style={{ color: "#6B7280" }} 
            />
        </div>
    );
}

export default Header;
