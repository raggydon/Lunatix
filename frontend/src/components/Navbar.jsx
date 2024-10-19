import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

import { Link, useNavigate } from 'react-router-dom'



function Navbar() {
    
    const [isMobile, setIsMobile] = useState(false);

  const handleToggle = () => {
    setIsMobile(!isMobile);
  };
  const closeNavbar = () => {
    setIsMobile(false);
  };
    

    

  return (
    <>
        <div className='w-full relative h-[15vh] opacity-65 bg-black text-white flex py-4 px-16 items-center justify-between gap-4'>
    <div>
        <Link to='/'>
            <h1 className='text-3xl font-bold'>
                Lunatix
            </h1>
        </Link>
    </div>
    <div className={`flex items-center gap-12 font-normal text-sm transition-all md:flex ${
        isMobile
            ? 'flex flex-col fixed top-0 left-0 right-0 bottom-0 text-white items-center justify-center gap-4 w-screen h-[50vh] bg-gray-900 text-lg'
            : 'hidden'
    }`}>
        <div className='flex justify-end gap-12'> {/* Added this div to hold the links */}
            <Link className="hover:text-[#D34801] transition-all" onClick={closeNavbar} to="/">Home</Link>
            <Link className="hover:text-[#D34801] transition-all" onClick={closeNavbar} to="/product">Product</Link>
            <Link className="hover:text-[#D34801] transition-all" onClick={closeNavbar} to="/about">About</Link>
        </div>
    </div>
</div>

            <div className='flex gap-8 font-normal text-sm '>
                
            
                
                
                
            </div>
            <div
          className="md:hidden cursor-pointer text-white absolute right-0 p-4"
          onClick={handleToggle}
        >
          ☰
        </div>
    </>
  )
}

export default Navbar