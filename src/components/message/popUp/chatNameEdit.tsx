import { useState } from "react";

export const ChatNameEdit = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: any;
}) => {
  const handleClose = (e: any) => {
    e.preventDefault();
    setIsVisible(false);
  };
  if (!isVisible) return null;
  return (
    <div
      className={`${
        isVisible ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed h-screen flex items-center justify-center z-50 w-full md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
        <div className="relative p-4 rounded-lg shadow bg-gray-400 md:p-8">
          <div className=" flex flex-row text-sm font-light text-gray-500 ">
            <h3 className="mb-3 text-2xl font-bold text-gray-700">
              Change chat name
            </h3>
            <button
              type="button"
              className="text-gray-700 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row mb-4 m-4">
              <label className="flex text-center items-center justify-center text-gray-700 font-medium mr-4">
                Email
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-500"
                placeholder="New chat name"
              />
            </div>
            <div className="items-center justify-end space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
              <button
                id="close-modal"
                type="button"
                className="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-gray-100 rounded-lg border border-gray-200 sm:w-auto  hover:text-gray-900 focus:z-10"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                id="confirm-button"
                type="button"
                className="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg sm:w-auto  hover:text-gray-900"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
