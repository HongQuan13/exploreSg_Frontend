import { useEffect } from "react";
import { useSocketContext } from "../../../context/socketContext";
import useConversation from "../../../zustand/useConversation";
import { convertCompilerOptionsFromJson } from "typescript";

export const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    socket?.on(
      "newMessage",
      ({
        conversationId,
        newMessage,
      }: {
        conversationId: string;
        newMessage: string;
      }) => {
        console.log(
          conversationId,
          "conversationId",
          newMessage,
          "newMessage",
          selectedConversation,
          "selectedConversation"
        );
        if (
          selectedConversation &&
          selectedConversation._id == conversationId
        ) {
          setMessages([...messages, newMessage]);
        }
      }
    );
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};
