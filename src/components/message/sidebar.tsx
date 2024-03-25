import Conversation from "./conversation";

const fixedClass = " flex flex-col items-center justify-center "; // Added spaces before and after

function ChatSideBar({ customClass = "" }: { customClass?: string }) {
  return (
    <div className={`${customClass}${fixedClass}`.trim()}>
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
}

export default ChatSideBar;
