"use client";

import { Users, Plus, LogOut } from "lucide-react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  selectedContact: string | null;
  setSelectedContact: (contact: string | null) => void;
  searchQuery: string;
}

export function Sidebar({
  selectedContact,
  setSelectedContact,
  searchQuery,
}: SidebarProps) {
  const contacts = [
    {
      id: "1",
      name: "John Doe",
      lastMessage: "Hey, how are you doing today?",
      time: "10:30 AM",
      unread: 2,
      avatar: "John",
    },
    {
      id: "2",
      name: "Jane Smith",
      lastMessage: "See you tomorrow at the meeting!",
      time: "9:15 AM",
      unread: 0,
      avatar: "Jane",
    },
    {
      id: "3",
      name: "Mike Johnson",
      lastMessage: "Thanks for all the help with the project",
      time: "Yesterday",
      unread: 1,
      avatar: "Mike",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      lastMessage: "The documents look great!",
      time: "Yesterday",
      unread: 0,
      avatar: "Sarah",
    },
  ];
  const { logout } = useAuth();

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    const result = await logout();
  };

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
      {filteredContacts.map((contact) => (
        <div
          key={contact.id}
          onClick={() => setSelectedContact(contact.id)}
          className={`flex items-center p-4 cursor-pointer transition-all duration-100 border-b 
            border-gray-700/30 hover:bg-gray-700/30 ${
              selectedContact === contact.id
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
                {contact.time}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm truncate pr-2">
                {contact.lastMessage}
              </p>
              {contact.unread > 0 && (
                <span className=" items-center justify-center bg-green-600 text-white text-sm rounded-full w-5 h-5 min-w-[10px] text-center shrink-0 shadow-lg">
                  {contact.unread}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
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
