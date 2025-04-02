import React from 'react'
import { Link } from "react-router-dom";
import AceHeading from '../components/AceHeading';


function ZohoBooking() {
  return (
    <div className='flex-col justify-center'>
        <div className='mt-4 mb-4'>
            <AceHeading/>
        </div>
    <div className='flex justify-center items-center overflow-hidden'>
    <iframe className='' width='90%'  height='680px' src='https://acetennisbhopal.zohobookings.in/portal-embed#/280101000000040016' frameborder='0' allowfullscreen='' > </iframe>
    </div>
  
    <div className="p-4 pt-0">
        {/* <Link to='/booking-details'> */}
        <Link to='/'>

        <button className="px-4 py-2 mt-8 w-full bg-amber-500 text-white rounded-md hover:bg-blue-700"
        >
          Back To Home Page
        </button>
          </Link>
      </div>
    </div>

  )
}

export default ZohoBooking
