// import React, { createContext, useState } from "react";
// import { useAuth } from "./AuthContext";
// import { chatAPI } from "../Services/api";

// interface ChatContextType {
//   getSidebarUsers: () => Promise<{
//     success: boolean;
//     message?: string;
//     data: any;
//   }>;
// }

// const ChatContext = createContext<ChatContextType | undefined>(undefined);
// const [messages, setMessages] = useState([]);
// const [unseenMessages, setUnseenMessages] = useState({});
// const [sidebarUsers, setSidebarUsers] = useState([]);
// const [seletectedUser, setSeletectedUser] = useState(null);
// const { socket } = useAuth();
// const value: ChatContextType = {
//   getSidebarUsers,
// };

// const getSidebarUsers = async () => {
//   try {
//     const response = await chatAPI.getChats();
//     if (response.data.success) {
//       setSidebarUsers(response?.data?.data);
//     }
//   } catch (error) {
//     console.log(error, "error");
//   }
// };

// const getMessages = async (user_id: string) => {
//   try {
//     const response = await chatAPI.getMessages(user_id);
//     if (response.data.success) {
//       setSidebarUsers(response?.data?.data);
//     }
//   } catch (error) {
//     console.log(error, "error");
//   }
// };

// export const ChatProvider = ({ children }) => {
//   return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
// };

// export default ChatProvider;
"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { chatAPI } from "../Services/api";
import toast from "react-hot-toast";

interface ChatContextType {
  sidebarUsers: any[];
  messages: any[];
  unseenMessages: Record<string, number>;
  selectedUser: any;
  setUnseenMessages: any;
  getSidebarUsers: () => Promise<void>;
  getMessages: (user_id: string) => Promise<void>;
  // sendMessages: (reciever_id: string, data: any) => Promise<void>;
  sendMessages: (messageData: { text?: string; image?: File }) => Promise<void>;
  setSelectedUser: React.Dispatch<React.SetStateAction<any>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [unseenMessages, setUnseenMessages] = useState<Record<string, number>>(
    {}
  );
  const [sidebarUsers, setSidebarUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { socket } = useAuth();

  const getSidebarUsers = async () => {
    try {
      const response = await chatAPI.getChats();
      if (response?.data?.code === 200) {
        setSidebarUsers(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching sidebar users:", error);
    }
  };

  const getMessages = async (user_id: string) => {
    try {
      const response = await chatAPI.getMessages(user_id);
      if (response?.data?.code === 200) {
        setMessages(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessages = async (messageData: { text?: string; image?: File }) => {
    try {
      console.log(messageData, "messageData");

      const response = await chatAPI.sendMessage(selectedUser._id, messageData);
      if (response?.data?.code === 200) {
        setMessages((prev) => [...prev, response?.data?.data]);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const subscribeToMessages = async () => {
    try {
      if (!socket) return;
      socket.on("newMessage", async (newMessage) => {
        if (selectedUser && newMessage.sender_id === selectedUser._id) {
          newMessage.seen = true;
          setMessages((prev) => [...prev, newMessage]);
          const response = await chatAPI.seenMessage(newMessage._id);
        } else {
          setUnseenMessages((prev) => ({
            ...prev,
            [newMessage.sender_id]: prev[newMessage.sender_id]
              ? prev[newMessage.sender_id] + 1
              : 1,
          }));
        }
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const unsubscribeToMessages = async () => {
    try {
      if (socket) socket.off("newMessage");
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    subscribeToMessages();
    return () => {
      unsubscribeToMessages();
    };
  }, [socket, selectedUser]);

  const value: ChatContextType = {
    sidebarUsers,
    messages,
    unseenMessages,
    selectedUser,
    getSidebarUsers,
    getMessages,
    sendMessages,
    setSelectedUser,
    setUnseenMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
