"use client"
import { CompatClient, Stomp } from '@stomp/stompjs';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
enum EChatMessageStatus {
  JOIN,
  CHATTING,
  LEAVE
}



type ChatMessageResponse = {
  id: string;
  from: string;
  message: string;
  role?: string;
  time: string;
  status: EChatMessageStatus;
}

type ChatMessageRequest = {
  role: string;
  message: string;
  status: EChatMessageStatus
}


const webSocketUrl = (): string => {
  var socketUrl: string | undefined = process.env.NEXT_PUBLIC_WEBSOCKET_HOST;
  if (socketUrl) {
    const result = socketUrl.replace(/^https/, 'wss').replace(/^http/, 'ws');
    return result + '/ws';
  }
  return "";
}


const ChatBusiness = () => {
  const params = useParams<{ id: string }>()
  const [roomId, setRoomId] = useState<number>();
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatSocket, setChatSocket] = useState<CompatClient | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const connectSocket = async () => {
    const socket = new WebSocket(webSocketUrl());
    const client = Stomp.over(socket);
    client.connect(
      { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      () => {
        setChatSocket(client);
        client.subscribe(`/topic/messages/${roomId}`, (message) => {
          const msg = JSON.parse(message.body);
          setMessages((prevMessages) => {
            const existingIds = new Set(prevMessages.map(existingMsg => existingMsg.id));
            if (!existingIds.has(msg.id)) {
              return [
                ...prevMessages,
                { ...msg, time: new Date().toLocaleTimeString(), },
              ]
            }
            return prevMessages;
          });
        }, {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        });

        client.send(`/app/chat-histories/${roomId}`, { Authorization: `Bearer ${localStorage.getItem("accessToken")}` });
      },
      (error: Error) => {
        console.error("Connection error:", error);
      }
    );
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const newChatMessage: ChatMessageRequest = {
      message: newMessage.trim(),
      role: "ROLE_SHOP",
      status: EChatMessageStatus.CHATTING,
    };

    if (chatSocket) {
      chatSocket.send(`/app/chat/${roomId}`, {
        Authorization: `Bearer ${localStorage?.getItem("accessToken")}`
      }, JSON.stringify(newChatMessage));
      setNewMessage("");
    }
  };

  useEffect(() => {
    setRoomId(Number(params.id));
    connectSocket();
  }, [roomId]);



  return (
    <>
      <div className="bg-gradient-to-r from-[#b44b4b] via-[#a23d3d] to-[#843232] text-white p-4 flex items-center shadow-lg rounded-b-lg">
        <h1 className="text-lg font-bold">Users</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-[66%] transition-all duration-200 ${msg.role === 'ROLE_USER'
              ? 'bg-gray-200 self-start'
              : 'bg-red-500 text-white self-end ml-auto'
              }`}
            style={{ alignSelf: msg.role === 'ROLE_USER' ? 'flex-start' : 'flex-end', width: 'fit-content' }}
          >
            <p>{msg.message}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex items-center p-3 border-t border-gray-300 bg-white rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Nhập tin nhắn"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-300 transition duration-200"
        />
        <button onClick={sendMessage} className="ml-2 p-2 rounded-full bg-red-500 hover:bg-red-600 transition duration-200">
          <img src="https://www.svgrepo.com/show/30442/send.svg" alt="Send" className="w-6 h-6 text-white" />
        </button>
      </div>
    </>
  );

};
export default ChatBusiness;