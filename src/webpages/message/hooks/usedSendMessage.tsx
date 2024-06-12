import { useEffect } from "react";
import { axiosClient } from "../../../libs/axios";
import qs from "qs";
import useConversation from "../../../zustand/useConversation";
import { useAuthContext } from "../../../context/authContext";

function useSendMessage() {
  const { authUser } = useAuthContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (messageContent: string) => {
    if (!selectedConversation) return;
    try {
      const data = {
        senderId: authUser.id,
        conversationId: selectedConversation._id,
        messageContent: messageContent,
      };

      const send = await axiosClient.post(
        `/chat/sendMessage`,
        qs.stringify(data)
      );
      setMessages([...messages, send.data.metadata]);
    } catch (error: any) {
      console.log(error.response);
    }
  };
  return { sendMessage };
}

export default useSendMessage;
