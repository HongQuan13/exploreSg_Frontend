import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/authContext";

function useGetConversation() {
  const [conversation, setConversation] = useState<any[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getConversation = async () => {
      try {
        const allConversations = await axios.post(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/chat/allConversation/${authUser.id}`,
          null,
          {
            withCredentials: true,
          }
        );
        console.log(allConversations.data.metadata);
        setConversation(allConversations.data.metadata);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    getConversation();
  }, []);
  return conversation;
}

export default useGetConversation;
