// src/ChatWindow.js
"use client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import {getRoomsByShopId, ChatRoom} from '../../_services/chatService'
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
    console.log(socketUrl);
    const result = socketUrl.replace(/^https/, 'wss').replace(/^http/, 'ws');
    return result + '/ws';
  }
  return "";
}

const ChatWindow: React.FC<{ shopProfileId: number }> = ({ shopProfileId }) => {
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatSocket, setChatSocket] = useState<CompatClient | null>(null);
  const [isOpen, setIsOpen] = useState<boolean> (true);
  const [room, setRoom] = useState<ChatRoom>();
  

  const connectSocket = async () => {
    const socket = new WebSocket(webSocketUrl());
    const client = Stomp.over(socket);
    client.connect(
      { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      () => {
        setChatSocket(client);
        client.subscribe(`/topic/messages/${room?.id}`, (message) => {
          const msg = JSON.parse(message.body);
          console.log("Received message:", msg);
          setMessages((prevMessages) => {
            const existingIds = new Set(prevMessages.map(existingMsg => existingMsg.id));
            if (!existingIds.has(msg.id)) {
              return [
                ...prevMessages,
                { ...msg, time: new Date().toLocaleTimeString(),  },
              ]
            }
            return prevMessages;
          });
        }, {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}` 
        });

        client.send(`/app/chat-histories/${room?.id}`, { Authorization: `Bearer ${localStorage.getItem("accessToken")}` });
      },
      (error: Error) => {
        console.error("Connection error:", error);
      }
    );
  };
  useEffect(() => {
    const fetchRoomInformation = async (): Promise<ChatRoom | undefined> => {
      const roomInfo: ChatRoom | undefined = await getRoomsByShopId(shopProfileId).then((response) => {
        if (response.status === 200) {
            return response.data.content;
        }
        return undefined;
      }).catch(error => {
        return undefined;
      });
      return roomInfo;
    };
    const handleUp = async () => {
      const roomInfo = await fetchRoomInformation();
      console.log(roomInfo);
      if (roomInfo) {
        setRoom(roomInfo);
      }
    }

    handleUp();
    return () => {
    };
  }, [shopProfileId]);
  useEffect(() => {
    connectSocket();
  }, [room]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const newChatMessage: ChatMessageRequest = {
      message: newMessage.trim(),
      role: "ROLE_USER",
      status: EChatMessageStatus.CHATTING,
    };

    if (chatSocket) {
      chatSocket.send(`/app/chat/${room?.id}`, {
        Authorization: `Bearer ${localStorage?.getItem("accessToken")}`
      }, JSON.stringify(newChatMessage));
      setNewMessage("");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-5 right-5 w-72 h-[500px] rounded-lg shadow-lg flex flex-col bg-white">
          <div className="flex items-center bg-red-400 text-white p-4 rounded-t-lg">
            <img src="/icon.ico" alt="Lovely Glam Icon" className="w-8 h-8 mr-3" />
            <span>Lovely Glam</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-3 rounded-lg max-w-[66%] ${
                  msg.from === "bot" ? "bg-gray-200 self-start" : "bg-green-200 self-end ml-auto"
                }`}
                style={{
                  alignSelf: msg.from === "ROLE_USER" ? "flex-start" : "flex-end",
                  width: "fit-content",
                }}
              >
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center p-3 border-t border-gray-300">
            <input
              type="text"
              placeholder="Nhập tin nhắn"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <button onClick={sendMessage} className="ml-2">
              <img src="https://www.svgrepo.com/show/30442/send.svg" alt="Send" className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow;
