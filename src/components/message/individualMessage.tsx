import { useAuthContext } from "../../context/authContext";
import Utility from "./utilities";

function IndividualMessage({ message }: { message: any }) {
  const { authUser } = useAuthContext();
  const fromMe = message.senderId === authUser.id;
  const justifyContent = fromMe ? "justify-end" : "justify-start";
  const customClass = fromMe
    ? "rounded-l-full bg-blue-700"
    : "rounded-r-full bg-gray-800 text-gray-200";
  const flexRowReverse = fromMe ? "flex-row-reverse" : "";

  return (
    <div>
      <div className={`flex flex-row ${justifyContent}`}>
        {!fromMe && (
          <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
            <img
              className="shadow-md rounded-full w-full h-full object-cover"
              src="https://randomuser.me/api/portraits/women/33.jpg"
              alt=""
            />
          </div>
        )}
        <div className="messages text-sm text-white grid grid-flow-row gap-2">
          <div className={`flex items-center group ${flexRowReverse} `}>
            <span
              className={`px-6 py-3 rounded-t-full max-w-xs lg:max-w-md ${customClass} `}
            >
              {message.message}
            </span>
            <Utility />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualMessage;
