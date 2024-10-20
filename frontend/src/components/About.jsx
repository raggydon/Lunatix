import React from 'react';
import { FaInstagram } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-slate-900 min-h-[85vh] flex items-center justify-center">
      <div className="max-w-2xl p-8 bg-slate-950 rounded shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-white">About Me</h2>
        <p className="text-gray-100 mb-2">
        We are a group of Chemical Engineering students from IIT Roorkee-
        <div className='ml-8'>
            {<br/>}
<div className=' font-bold'>Special Thanks : Mohit Verma</div>
Manan Loomba
{<br/>}
Kritagya Agarwal
{<br/>}
Kapil Upadhyay
{<br/>}
Raghav Kumar
</div>

        </p>

        


       
        <p className="text-gray-100 mb-6">
        This website was developed as a part of Syntax Error 2024.

Our website helps users set subtitles for videos while minimizing lag, providing a smoother and more accessible viewing experience. It’s a simple, user-friendly tool designed to enhance video playback without interruptions.        </p>

        
      </div>
    </div>
  );
};

export default About;