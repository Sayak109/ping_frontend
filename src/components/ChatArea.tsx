"use client";

import { useState } from "react";
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

interface ChatAreaProps {
  selectedContact: string | null;
}

export function ChatArea({ selectedContact }: ChatAreaProps) {
  const [message, setMessage] = useState("");

  if (!selectedContact) {
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

  const contact = { name: "Contact", lastSeen: "last seen today at 10:30 AM" };
  const messages = [
    {
      id: "1",
      text: "Hey there! How are you doing?",
      sender: "them",
      time: "10:30 AM",
    },
    {
      id: "2",
      text: "I'm doing great, thanks for asking! How about you?",
      sender: "me",
      time: "10:32 AM",
    },
    {
      id: "3",
      text: "Same here! Want to grab coffee later?",
      sender: "them",
      time: "10:35 AM",
    },
    {
      id: "4",
      text: "That sounds perfect! See you at 3 PM?",
      sender: "me",
      time: "10:37 AM",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message logic here
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
            <h2 className="text-white font-medium">{contact.name}</h2>
            <p className="text-xs text-gray-400">{contact.lastSeen}</p>
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
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                msg.sender === "me"
                  ? "bg-green-600 text-white rounded-br-md"
                  : "bg-gray-700/80 text-white rounded-bl-md"
              } shadow-lg backdrop-blur-sm border border-gray-600/30`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === "me" ? "text-green-100" : "text-gray-400"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
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
