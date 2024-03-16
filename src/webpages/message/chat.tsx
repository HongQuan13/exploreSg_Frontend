import axios from "axios";
import NavBar from "../../components/partials/navBar";
import { useEffect, useState } from "react";

function Chat() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(localStorage.getItem("user-info"));
  }, []);
  return (
    <>
      <NavBar />
    </>
  );
}

export default Chat;
