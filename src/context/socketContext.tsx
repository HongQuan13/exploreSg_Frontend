import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import { Socket, io } from "socket.io-client";

const SocketContext = createContext<any>(undefined);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }: { children: any }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    if (authUser) {
      console.log(authUser, "inside socket context");
      const socket = io("http://localhost:3100", {
        query: {
          userId: authUser.id,
        },
      });
      setSocket(socket);

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};
