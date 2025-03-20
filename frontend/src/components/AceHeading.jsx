import React from 'react';
import logo from '../assets/acePickleBallLogoWBg.png'

function AceHeading() {
  return (
    <div className="py-4 rounded-lg shadow-md flex justify-center">
       <img src={logo} alt="Ace Pickleball Academy Logo" className="h-16" />
    </div>
  );
}

export default AceHeading;
