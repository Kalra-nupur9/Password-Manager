import React, { useState } from "react"; // Import useState

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-customPurple item-center py-5 w-full gap-20 flex font-mono px-20 ">
      <div className="logo font-bold text-2xl uppercase text-slate-200 flex justify-between">
        Pass Manager
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>
      <div className={`md:flex ${isOpen ? "block" : "hidden"}`}>
        <ul className="item-center flex">
          <li className="gap-8 text-lg flex text-slate-200 items-center">
            <a href="/" className="hover:font-bold">
              Home
            </a>
            {/* <a href="#" className="hover:font-bold">
              About Us
            </a>
            <a href="#" className="hover:font-bold">
              Storage
            </a> */}
          </li>
        </ul>
        
      </div>
    </nav>
  );
};

export default NavBar;