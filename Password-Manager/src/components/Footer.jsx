import React from "react";

function Footer() {
  return (
    <div>
      <footer className=" border-t-2 item-center py-2 w-full gap-20 flex font-mono px-20  ">
        <div className="logo font-bold text-2xl uppercase text-slate-200 flex justify-between">
          Pass Manager
          
        </div>
        <div className="">
          {/* <ul className="item-center flex">
            <li className="gap-8 text-lg flex text-slate-200 items-center">
              <a href="/" className="hover:font-bold">
                Home
              </a>
              <a href="#" className="hover:font-bold">
                About Us
              </a>
              <a href="#" className="hover:font-bold">
                Storage
              </a>
            </li>
          </ul> */}
          
        </div>
      </footer>
    </div>
  );
}

export default Footer;