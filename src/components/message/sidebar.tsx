import { useState } from "react";
import ConversationSidebar from "./conversationSidebar";
import useGetPeople from "../../webpages/message/hooks/useGetPeople";
import useGetConversation from "../../webpages/message/hooks/useGetConversation";

const fixedClass = " flex flex-col items-center justify-center "; // Added spaces before and after

function ChatSideBar() {
  const conversations = useGetConversation();
  return (
    <div className="flex flex-col flex-none overflow-auto w-24  group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out bg-gray-100">
      <div className=" px-6 py-4 flex flex-row justify-between items-center flex-none shadow">
        <p className="text-md font-bold hidden md:block group-hover:block ">
          Messenger
        </p>
        <a
          href="#"
          className=" rounded-full hover:bg-gray-300 bg-gray-200 w-12 h-12 p-2 hidden md:block group-hover:block"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
            <path d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z" />
          </svg>
        </a>
      </div>

      <div className="p-2 flex-1 overflow-y-scroll">
        {conversations.map((each: any) => (
          <ConversationSidebar
            conversation={each}
            username={each.name}
            lastMessage="Testing message"
          />
        ))}
      </div>
    </div>
  );
}

export default ChatSideBar;
