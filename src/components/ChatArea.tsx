"use client";

import { useEffect, useState } from "react";
import {
  Video,
  Phone,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  Send,
  SendHorizontal,
  Globe,
  Earth,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import { formatMessageTime, formatTime } from "../lib/common";

interface ChatAreaProps {
  selectedContact: string | null;
}

export function ChatArea({ selectedContact }: ChatAreaProps) {
  const [message, setMessage] = useState("");
  const { user, onlineUsers } = useAuth();
  const {
    sidebarUsers,
    setUnseenMessages,
    setSelectedUser,
    selectedUser,
    getSidebarUsers,
    unseenMessages,
    getMessages,
    sendMessages,
    messages,
  } = useChat();
  console.log("selectedUser", selectedUser);
  console.log("getMessages", getMessages);
  console.log("onlineUsers", onlineUsers);
  console.log("setUnseenMessages", setUnseenMessages[selectedUser?._id]);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser?._id);
      setUnseenMessages();
    }
  }, [selectedUser]);

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center px-6">
          <div className="w-32 h-32 bg-gray-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Earth className="w-24 h-24 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Welcome to Ping
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Start conversations with your contacts instantly. You can send and
            receive messages seamlessly across devices.
          </p>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessages({ text: message });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-900/40 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10">
            <Image
              src="/default-profile.jpeg"
              alt=""
              width={50}
              height={50}
              className="aspect-square h-full w-full rounded-full"
            />
          </div>
          <div>
            <h2 className="text-white font-medium">{selectedUser.name}</h2>
            <p className="text-xs">
              {onlineUsers.includes(selectedUser._id) ? (
                <span className="text-green-400">Online</span>
              ) : (
                <span className="text-gray-400">Offline</span>
              )}
            </p>{" "}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full 
               text-gray-400 hover:text-white hover:bg-gray-600 transition-colors duration-200"
          >
            <Video className="w-5 h-5" />
          </button>
          <button
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full 
               text-gray-400 hover:text-white hover:bg-gray-600 transition-colors duration-200"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full 
               text-gray-400 hover:text-white hover:bg-gray-600 transition-colors duration-200"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-body-image">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: 'url("/background-image.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            opacity: 0.3,
          }}
        ></div>
        {messages.map((msg, index) => {
          const isMine = msg.receiver_id === selectedUser._id;

          return (
            <div
              key={index}
              className={`flex ${
                isMine ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`relative max-w-xs lg:max-w-md px-3 py-2 rounded-xl ${
                  isMine
                    ? "bg-green-500 text-white rounded-br-md"
                    : "bg-gray-700/80 text-white rounded-bl-md"
                } shadow-md`}
              >
                <div className="flex items-end space-x-2">
                  {msg.text && (
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  )}

                  <div className="flex items-center space-x-1">
                    <span className="text-[9px] text-gray-200/80">
                      {formatMessageTime(msg.createdAt)}
                    </span>
                    {isMine && (
                      <span
                        className={`text-[10px] ${
                          msg.seen ? "text-blue-600" : "text-gray-300"
                        }`}
                      >
                        {msg.seen ? "✓✓" : "✓"}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`absolute bottom-0 w-0 h-0 border-t-8 border-transparent ${
                    isMine
                      ? "right-0 border-l-8 border-l-green-500"
                      : "left-0 border-r-8 border-r-gray-700/80"
                  }`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-1 !bg-gray-800/10">
        <div className="flex items-center space-x-3">
          <button
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full 
               text-gray-400 hover:text-white hover:bg-gray-600 transition-colors duration-200"
          >
            <Smile className="w-5 h-5" />
          </button>
          <button
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full 
               text-gray-400 hover:text-white hover:bg-gray-600 transition-colors duration-200"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex items-center w-full p-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
                onKeyDown={(e: any) => e.key === "Enter" && handleSendMessage()}
                className="w-full rounded-full px-4 py-2 pr-12 bg-gray-700/10 text-white placeholder-gray-400 
                 focus:outline-none"
              />
            </div>
          </div>
          {message.trim() ? (
            <button
              onClick={handleSendMessage}
              className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full 
               text-gray-400 hover:text-white hover:bg-gray-600 transition-colors duration-200"
            >
              <SendHorizontal className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={handleSendMessage}
              className="shrink-0 flex items-center justify-center w-10 h-10 
             rounded-full text-gray-400 hover:text-white 
             hover:bg-gray-600 transition-colors duration-200"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
