import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const { user } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4">
      <NavLink to="/">
        <img className="w-28 sm:w-32 lg:w-40" src={assets.logo} alt="" />
      </NavLink>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/buy-credit")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 rounded-full hover:scale-105 transition-all duration-700 cursor-pointer"
            >
              <img className="w-5" src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credits left : 50
              </p>
            </button>

            <p className="text-gray-600 max-sm:hidden">Hi, Vikas</p>

            <div className="relative group">
              <img
                className="w-10 drop-shadow"
                src={assets.profile_icon}
                alt=""
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li className="py-1 px-2 cursor-pointer pr10">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p
              className="cursor-pointer"
              onClick={() => navigate("/buy-credit")}
            >
              pricing
            </p>
            <button className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
