import { create } from "zustand";

interface ConversationState {
  selectedConversation: any;
  setSelectedConversation: (conversation: any) => void;
  messages: string[];
  setMessages: (messages: string[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation: any) => {
    set({ selectedConversation: conversation });
  },
  messages: [],
  setMessages: (messageContent: any) => {
    set({ messages: messageContent });
  },
}));
export default useConversation;
