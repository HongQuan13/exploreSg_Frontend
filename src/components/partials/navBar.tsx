import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { infoFlash } from "../../core/response";
import logo from "../../logo192.png";
import { useAuthContext } from "../../context/authContext";

interface User {
  id: string;
  username: string;
  email: string;
}

function NavBar() {
  const navigate = useNavigate();
  const currentUser = useAuthContext();

  const [userDropDown, setuserDropDown] = useState(false);
  const { setAuthUser } = useAuthContext();
  const handleUserDropDown = () => {
    setuserDropDown(!userDropDown);
  };

  const handleLogout = async (event: any) => {
    event.preventDefault();
    try {
      const logoutResponse = await axios.post(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/access/logout`,
        null,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );

      if (logoutResponse.status === 200) {
        infoFlash("Logout successfull");
        localStorage.removeItem("user-info");
        setAuthUser(null);
        navigate("/access/login");
      }
    } catch (error: any) {
      console.error("Error:", error.stack);
    }
  };
  return (
    <nav className="bg-gray-700 sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a href="/home" className="text-white text-lg font-bold">
            ExploreSG
          </a>
          <button
            className="block md:hidden focus:outline-none focus:bg-opacity-50"
            aria-label="Toggle navigation"
          >
            <svg
              className="h-5 w-5 text-gray-500 hover:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden md:flex md:items-center md:w-auto md:space-x-6">
            <a href="/home" className="text-gray-500 hover:text-gray-300">
              Home
            </a>
            <a href="/place/new" className="text-gray-500 hover:text-gray-300">
              Add Place
            </a>
            <a href="/chat" className="text-gray-500 hover:text-gray-300">
              Chat
            </a>

            {!currentUser ? (
              <>
                <a
                  href="/access/login"
                  className="text-gray-500 hover:text-gray-300"
                >
                  Login
                </a>
                <a
                  href="/access/register"
                  className="text-gray-500 hover:text-gray-300"
                >
                  Register
                </a>
              </>
            ) : (
              <>
                <button type="button">
                  <div
                    className="relative w-10 h-10 overflow-hidden bg-gray-300 rounded-full "
                    onClick={handleUserDropDown}
                    aria-controls="user-dropdown"
                    aria-expanded={userDropDown ? "true" : "false"}
                  >
                    <svg
                      className="absolute w-12 h-12 text-gray-500 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </button>
                <div
                  className={` ${
                    userDropDown ? "block" : "hidden"
                  } absolute right-2 top-16 z-10 divide-gray-100 rounded-lg bg-white shadow-md`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900">
                      {currentUser.username}
                    </span>
                    <span className="block truncate text-sm text-gray-500">
                      {currentUser.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="/profile/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                      >
                        My Account
                      </a>
                    </li>
                    <li>
                      <a
                        href="/profile/ownedPlace"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                      >
                        My Places
                      </a>
                    </li>
                    <li>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
            {/*User detail button */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
