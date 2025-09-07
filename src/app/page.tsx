"use client";

import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { ChatArea } from "../components/ChatArea";

export default function Home() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AuthLayout>
      <div className="min-h-screen bg-gray-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-full h-screen bg-transparent">
          <div className="flex h-full bg-gray-800/30 backdrop-blur-lg border border-gray-700/50 rounded-lg overflow-hidden shadow-2xl">
            <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-700/50 bg-gray-900/40 backdrop-blur-sm">
              <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <Sidebar searchQuery={searchQuery} />
            </div>
            <div className="flex-1 bg-gray-800/20 backdrop-blur-sm">
              <ChatArea selectedContact={selectedContact} />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
