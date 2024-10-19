import React from 'react';
import Background from '../assets/bg.jpg';

const Home = () => {
  return (
    <div
      className="bg-cover bg-center min-h-[30vh] flex items-center justify-center"
      // style={{
      //   backgroundImage: `url(${Background})`
      // }}
    >
      <div className="text-center text-white">
        <p className="text-lg">Your one-stop solution for video processing and subtitle management.</p>
        <h1 className="text-5xl font-bold mb-4">Welcome to Lunatix</h1>
        <a
          href="/product"
          className="mt-4 inline-block px-4 py-2 border-white border bg-black hover:bg-white hover:text-black text-white font-semibold rounded-lg transition-all"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Home;
