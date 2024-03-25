import { useEffect, useState } from "react";

function useGetConversation() {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const getConversation = () => {};
    getConversation();
  });
  return { loading, conversation };
}

export default useGetConversation;
