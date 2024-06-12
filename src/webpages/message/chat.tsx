import ChatContent from "../../components/message/chatContent";
import ChatSideBar from "../../components/message/sidebar";
import NavBar from "../../components/partials/navBar";
import useGetConversation from "./hooks/useGetConversation";
import useGetPeople from "./hooks/useGetPeople";

function Chat() {
  const allConversations = useGetConversation();
  const allPeople = useGetPeople();

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="h-screen w-full flex antialiased text-gray-700 bg-gray-100 overflow-hidden mt-100px">
        <div className="flex-1 flex flex-col">
          <main className="flex-grow flex flex-row min-h-0">
            <ChatSideBar />
            <ChatContent />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Chat;
