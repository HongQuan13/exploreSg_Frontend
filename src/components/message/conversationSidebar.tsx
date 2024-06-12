import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import { EditButton } from "./button/editButton";

function ConversationSidebar({
  conversation,
  username,
  lastMessage,
}: {
  conversation: any;
  username: string;
  lastMessage: string;
}) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <div className="flex flex-row">
      <button
        className={`flex justify-between items-center p-3 hover:bg-gray-300 rounded-lg relative w-full
      ${isSelected ? "bg-gray-300" : ""}`}
        onClick={() => {
          setSelectedConversation(conversation);
        }}
      >
        <div className="w-16 h-16 relative flex flex-shrink-0">
          <img
            className="shadow-md rounded-full w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100"
            alt=""
          />
        </div>

        <div className="flex-auto min-w-0 ml-2 mr-6 hidden md:block group-hover:block">
          <div className="">
            <p>{username}</p>
          </div>
          <div className="flex items-center ml-3 text-sm text-gray-700">
            <div className="min-w-0">
              <p className=" text-gray-500">{lastMessage}</p>
            </div>
          </div>
        </div>
      </button>
      <EditButton />
    </div>
  );
}

export default ConversationSidebar;
