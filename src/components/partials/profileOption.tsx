import { Navigate, useNavigate } from "react-router-dom";

const ProfileOption = (user: any) => {
  console.log(
    user.user,
    user.username,
    user.email,
    "testing in the profile option"
  );
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 overflow-hidden bg-gray-300 rounded-full ">
          <svg
            className="absolute w-36 h-36 text-gray-500 -left-1"
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
        <h1 className="text-xl font-bold">{user.user.username}</h1>
        <p className="text-gray-700">{user.user.email}</p>
      </div>
      <hr className="my-6 border-t border-gray-300" />
      <div className="flex flex-col">
        <ul>
          <li className="mb-2">
            <a
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 bg-gray-100"
              href="/profile/account"
            >
              Account Details
            </a>
          </li>
          <li className="mb-2">
            <a
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              href="/profile/ownedPlace"
            >
              Owned Places
            </a>
          </li>
          <li className="mb-2">
            <a
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              href="/profile/passwordChange"
            >
              Update Password
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default ProfileOption;
