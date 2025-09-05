"use client";

import { Search, MessageSquare, MoreVertical, Phone } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4 border-b border-gray-700/50 bg-gray-900/60 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-white">Ping</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full 
               text-gray-400 hover:text-white hover:bg-gray-600 transition-colors duration-200"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full 
               text-gray-400 hover:text-white hover:bg-gray-600 transition-colors duration-200"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {/* {open && (
            <div
              className="absolute left-40 mt-12 w-32  rounded-md shadow-lg 
            border border-gray-700/10 z-50"
            >
              <button
                // onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 bg-gray-800 hover:bg-gray-800/10 rounded-md"
              >
                Logout
              </button>
            </div>
          )} */}
        </div>
      </div>

      <div className="relative w-full h-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search or start a new chat"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-gray-800/50 border-gray-600/50 text-white w-full h-full
          placeholder-gray-400 focus:border-green-500/50 focus:ring-green-500/20"
        />
      </div>
    </div>
  );
}
