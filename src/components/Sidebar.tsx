"use client";

import { Users, Plus, LogOut } from "lucide-react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import { useEffect } from "react";
import { formatTime } from "../lib/common";

interface SidebarProps {
  searchQuery: string;
}

export function Sidebar({ searchQuery }: SidebarProps) {
  const { logout } = useAuth();
  const {
    sidebarUsers,
    setUnseenMessages,
    setSelectedUser,
    selectedUser,
    getSidebarUsers,
    unseenMessages,
  } = useChat();
  const filteredContacts = sidebarUsers.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getSidebarUsers();
  }, []);

  if (filteredContacts.length === 0 && !searchQuery) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-32 h-32 bg-gray-700/30 rounded-full flex items-center justify-center mb-6 border border-gray-600/50">
          <Users className="w-16 h-16 text-gray-500" />
        </div>
        <h2 className="text-xl font-medium text-white mb-2">No chats</h2>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Start a new conversation with your contacts
        </p>
        <button
          className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 transition-all duration-200 shadow-lg hover:shadow-xl"
          onClick={() => {
            /* Add new chat logic */
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </button>
      </div>
    );
  }

  if (filteredContacts.length === 0 && searchQuery) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-gray-700/30 rounded-full flex items-center justify-center mb-4 border border-gray-600/50">
          <Users className="w-12 h-12 text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">
          No results found
        </h3>
        <p className="text-gray-400">Try searching for a different contact</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {filteredContacts.map((contact) => {
        return (
          <div
            key={contact._id}
            onClick={() => setSelectedUser(contact)}
            className={`flex items-center p-4 cursor-pointer transition-all duration-100 border-b 
            border-gray-700/30 hover:bg-gray-700/30 ${
              selectedUser === contact._id
                ? "bg-gray-700/50 border-l-4 border-l-green-500"
                : ""
            }`}
          >
            <div className="w-12 h-12 mr-3 ring-2 ring-gray-600/50 rounded-full">
              <Image
                src="/default-profile.jpeg"
                alt=""
                width={100}
                height={100}
                className="aspect-square h-full w-full rounded-full"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-white font-medium truncate">
                  {contact.name}
                </h3>
                <span className="text-xs text-gray-400 shrink-0 ml-2">
                  {formatTime(contact.updatedAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm truncate pr-2">
                  {contact.lastMessageSender === "you" ? "You : " : ""}
                  {contact.lastMessage}
                </p>
                {contact.unseenCount > 0 && (
                  <span className=" items-center justify-center bg-green-600 text-white text-sm rounded-full w-5 h-5 min-w-[10px] text-center shrink-0 shadow-lg">
                    {contact.unseenCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div
        className="fixed bottom-2 left-0 w-full flex items-center justify-center gap-3 
  rounded-md border-none cursor-pointer text-red-700 p-4 bg-gray-700/10 hover:bg-gray-800"
        onClick={logout}
      >
        <span className="text-lg">Logout</span>
        <span>
          <LogOut className="w-5 h-5 " />
        </span>
      </div>
    </div>
  );
}
