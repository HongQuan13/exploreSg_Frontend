import { useEffect, useState } from "react";
import useSendMessage from "../../webpages/message/hooks/usedSendMessage";

function ChatInput() {
  const [message, setMessage] = useState<string>("");
  const { sendMessage } = useSendMessage();
  const handleSend = async (e: any) => {
    try {
      e.preventDefault();
      if (!message) return;
      await sendMessage(message);
      setMessage("");
    } catch (error: any) {
      console.error("Error:", error.stack);
    }
  };
  const handleEnterKey = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!message) return;
      await sendMessage(message);
      setMessage("");
    }
  };
  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  return (
    <div className="chat-footer flex-none">
      <div className="flex flex-row items-center p-4">
        <button
          type="button"
          className="flex flex-shrink-0 focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6"
        >
          <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
            <path d="M10,1.6c-4.639,0-8.4,3.761-8.4,8.4s3.761,8.4,8.4,8.4s8.4-3.761,8.4-8.4S14.639,1.6,10,1.6z M15,11h-4v4H9  v-4H5V9h4V5h2v4h4V11z" />
          </svg>
        </button>
        <button
          type="button"
          className="flex flex-shrink-0 focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6"
        >
          <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
            <path d="M11,13 L8,10 L2,16 L11,16 L18,16 L13,11 L11,13 Z M0,3.99406028 C0,2.8927712 0.898212381,2 1.99079514,2 L18.0092049,2 C19.1086907,2 20,2.89451376 20,3.99406028 L20,16.0059397 C20,17.1072288 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M15,9 C16.1045695,9 17,8.1045695 17,7 C17,5.8954305 16.1045695,5 15,5 C13.8954305,5 13,5.8954305 13,7 C13,8.1045695 13.8954305,9 15,9 Z" />
          </svg>
        </button>
        <button
          type="button"
          className="flex flex-shrink-0 focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6"
        >
          <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
            <path d="M0,6.00585866 C0,4.89805351 0.893899798,4 2.0048815,4 L5,4 L7,2 L13,2 L15,4 L17.9951185,4 C19.102384,4 20,4.89706013 20,6.00585866 L20,15.9941413 C20,17.1019465 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1029399 0,15.9941413 L0,6.00585866 Z M10,16 C12.7614237,16 15,13.7614237 15,11 C15,8.23857625 12.7614237,6 10,6 C7.23857625,6 5,8.23857625 5,11 C5,13.7614237 7.23857625,16 10,16 Z M10,14 C11.6568542,14 13,12.6568542 13,11 C13,9.34314575 11.6568542,8 10,8 C8.34314575,8 7,9.34314575 7,11 C7,12.6568542 8.34314575,14 10,14 Z" />
          </svg>
        </button>
        <button
          type="button"
          className="flex flex-shrink-0 focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6"
        >
          <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
            <path d="M9,18 L9,16.9379599 C5.05368842,16.4447356 2,13.0713165 2,9 L4,9 L4,9.00181488 C4,12.3172241 6.6862915,15 10,15 C13.3069658,15 16,12.314521 16,9.00181488 L16,9 L18,9 C18,13.0790094 14.9395595,16.4450043 11,16.9378859 L11,18 L14,18 L14,20 L6,20 L6,18 L9,18 L9,18 Z M6,4.00650452 C6,1.79377317 7.79535615,0 10,0 C12.209139,0 14,1.79394555 14,4.00650452 L14,8.99349548 C14,11.2062268 12.2046438,13 10,13 C7.790861,13 6,11.2060545 6,8.99349548 L6,4.00650452 L6,4.00650452 Z" />
          </svg>
        </button>
        <div className="relative flex-grow">
          <label>
            <input
              className="focus:pointer-events-auto rounded-full py-2 pl-3 pr-10 w-full border border-gray-500 focus:border-gray-700 bg-gray-100 focus:bg-gray-300 focus:outline-none text-gray-900 focus:shadow-md transition duration-300 ease-in"
              type="text"
              value={message}
              placeholder="Aa"
              onChange={handleChange}
              onKeyDown={handleEnterKey}
            />
            <button
              type="button"
              className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none text-blue-600 hover:text-blue-700 w-6 h-6"
            >
              <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z" />
              </svg>
            </button>
          </label>
        </div>
        <button
          type="button"
          className="flex flex-shrink-0 focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6"
          onClick={handleSend}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 w-6 ml-2 transform rotate-90"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
