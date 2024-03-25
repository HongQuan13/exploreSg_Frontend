import axios from "axios";
import NavBar from "../../components/partials/navBar";
import { useEffect, useState } from "react";
import ChatSideBar from "../../components/message/sidebar";
import ChatContent from "../../components/message/chatContent";

function Chat() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(localStorage.getItem("user-info"));
  }, []);
  return (
    <>
      <NavBar />
      <div className="flex flex-row items-center justify-center border-4 mx-20 my-20 p-10">
        <ChatSideBar customClass="w-1/3" />
        <ChatContent customClass="w-2/3 bg-red-200" />
      </div>
    </>
  );
}

export default Chat;
