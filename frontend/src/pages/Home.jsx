import React from 'react';
import { GrAppsRounded } from "react-icons/gr";
import profile from "../assets/profile.jpg";
import CardComponent from '../components/CardComponent';
import TypewriterText from '../components/TypewriterText';
import CardTest from '../components/CardTest';
import AceHeading from '../components/AceHeading';

function Home() {
    return (
        <div className='p-4 container'>
            <div className="flex justify-between items-center m-2">
                {/* Profile Picture */}
                <div className="relative h-15 w-15 p-[2px] rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500">
                    <img
                        src={profile}
                        alt="user profile"
                        className="h-full w-full rounded-full border-2 border-white"
                    />
                </div>

                <GrAppsRounded className='text-4xl text-gray-600 font-thin cursor-pointer' strokeWidth={0.00} style={{ color: "#6B7280" }} />
            </div>
            {/* <div className="mt-4 p-4 rounded-2xl backdrop-blur-md">
                <div className="text-3xl">Hello 👋</div>
                <div className="text-3xl font-bold">Adi Jain</div>
            </div> */}
            <TypewriterText/>
            <div className="flex items-center">
                <div className="text-sm mx-4 mt-4">Book your court</div>
                <hr className="w-20 border-gray-300 border-t-[2px] mt-5" />
            </div>

            <div className='flex justify-center'>
                <CardComponent/>
            </div>
            <div className='flex justify-center'>
                {/* <CardTest/> */}
            </div>
            <div className='mt-4'>
                <AceHeading/>
            </div>

        </div>
    );
}

export default Home;
