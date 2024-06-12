import { useState } from "react";

export const EditButton = () => {
  const [editDropDown, setEditDropDown] = useState(false);
  const handleEditDropDown = () => {
    setEditDropDown(!editDropDown);
  };

  return (
    <div className="relative inline-block text-left">
      {" "}
      {/* Ensure the div is relative */}
      <button
        type="button"
        className="flex-shrink-0 focus:outline-none mx-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-500 bg-gray-300 w-8 h-8 p-2"
        onClick={handleEditDropDown}
      >
        <svg viewBox="0 0 15 20" className="w-full h-full fill-current">
          <path
            d="M2.5,7.8C1.285,7.8,0.3,8.785,0.3,10s0.985,2.2,2.2,2.2S4.7,11.215,4.7,10S3.715,7.8,2.5,7.8zM12.5,7.8
            C11.285,7.8,10.3,8.785,10.3,10s0.985,2.2,2.2,2.2S14.7,11.215,14.7,10S13.715,7.8,12.5,7.8z"
          />
        </svg>
      </button>
      <div
        className={`${
          editDropDown ? "block" : "hidden"
        } absolute right-0 mt-2 w-48 z-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100`}
      >
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 "
            >
              Delete Chat
            </a>
          </li>
          {/* <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 "
            >
              My Places
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
};
