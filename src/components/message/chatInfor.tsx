import { useState } from "react";
import { ChatNameEdit } from "./popUp/chatNameEdit";

function ChatInfor({ customClass }: { customClass: string }) {
  const [chatName, setChatName] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleChatName = (e: any) => {
    e.preventDefault();
    setIsVisible(true);
  };

  return (
    <div
      className={`${customClass} flex flex-col flex-none pl-6 pr-2 w-1/3 md:hidden lg:flex overflow-auto bg-gray-100`}
    >
      <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
        <div className="h-20 w-20 rounded-full border overflow-hidden">
          <img
            src="https://avatars3.githubusercontent.com/u/2763884?s=128"
            alt="Avatar"
            className="h-full w-full"
          />
        </div>
        <div className="text-sm font-semibold mt-2">Aminos Co.</div>
        <div className="text-xs text-gray-500">Lead UI/UX Designer</div>
      </div>
      <div className="flex flex-col flex-auto border-l pl-2 border-gray-800 ">
        <div className="flex flex-col space-y-1 mt-4 -mx-2">
          <button
            className="flex flex-row items-center hover:bg-gray-200 rounded-xl p-2 "
            onClick={handleChatName}
          >
            <div className="ml-2 text-sm font-semibold">Change chat name </div>
          </button>
          {/* <ChatNameEdit customClass={chatName ? "" : "hidden"} /> */}
          {isVisible && (
            <ChatNameEdit setIsVisible={setIsVisible} isVisible={isVisible} />
          )}
        </div>
      </div>
    </div>
  );
}
export default ChatInfor;
