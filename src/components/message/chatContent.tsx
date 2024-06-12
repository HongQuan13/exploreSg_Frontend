import { useEffect, useRef, useState } from "react";
import ChatInput from "./chatInput";
import IndividualMessage from "./individualMessage";
import useConversation from "../../zustand/useConversation";
import NoChatSelected from "./noChatSelected";
import useGetChatContent from "../../webpages/message/hooks/useGetChatContent";
import { useListenMessage } from "../../webpages/message/hooks/useListenMessage";
import { VideoCallButton } from "./button/videoCallButton";
import { NormalCallButton } from "./button/normalCallButton";
import { ChatInforButton } from "./button/chatInforButton";
import ChatInfor from "./chatInfor";

function ChatContent({ customClass }: { customClass?: string }) {
  const fixedClass = "flex flex-col flex-auto border-l border-gray-800";
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [inforButton, setInforButton] = useState<boolean>(false);
  useListenMessage();
  const { messages } = useGetChatContent();
  const lastMessageRef = useRef<any>(null);
  const handleInforButton = (e: any) => {
    e.preventDefault();
    setInforButton(!inforButton);
  };

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="flex flex-auto flex-row ">
      <div className={`${fixedClass} ${customClass || ""}`}>
        <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
          <div className="flex">
            <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
              <img
                className="shadow-md rounded-full w-full h-full object-cover"
                src="https://randomuser.me/api/portraits/women/33.jpg"
                alt=""
              />
            </div>
            <div className="text-sm">
              <p className="font-bold text-gray-700">Scarlett Johansson</p>
              <p className="text-gray-500">Active 1h ago</p>
            </div>
          </div>

          <div className="flex">
            <NormalCallButton />
            <VideoCallButton />
            <ChatInforButton handleClick={handleInforButton} />
          </div>
        </div>
        <div className="p-4 flex-1 overflow-y-scroll">
          {!selectedConversation ? (
            <NoChatSelected />
          ) : (
            <div className="flex flex-col space-y-4 p-3">
              {messages.map((m: any) => (
                <div key={m._id} ref={lastMessageRef}>
                  <IndividualMessage message={m} />
                </div>
              ))}
            </div>
          )}
        </div>
        <ChatInput />
      </div>
      <ChatInfor customClass={inforButton ? "" : "lg:hidden"} />
    </div>
  );
}

export default ChatContent;
