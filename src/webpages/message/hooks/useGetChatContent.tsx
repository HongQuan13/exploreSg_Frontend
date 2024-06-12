import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/authContext";
import { axiosClient } from "../../../libs/axios";
import useGetConversation from "./useGetConversation";
import useConversation from "../../../zustand/useConversation";

function useGetChatContent() {
  const [chatContent, setChatContent] = useState<any[]>([]);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getChatContent = async (conversationId: string) => {
      try {
        const chatContent = await axiosClient.post(
          `/chat/getConversationContent/${conversationId}`
        );
        setMessages(chatContent.data.metadata);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    if (selectedConversation?._id) getChatContent(selectedConversation._id);
  }, [selectedConversation?._id, setMessages]);
  return { messages };
}

export default useGetChatContent;
