// src/ChatWindow.js
"use client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import { getRoomsByShopId, ChatRoom } from '../../_services/chatService'
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
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [room, setRoom] = useState<ChatRoom>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


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
                { ...msg, time: new Date().toLocaleTimeString(), },
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
    if (!localStorage?.getItem("accessToken")) {
      setIsOpen(false);
      setIsAuthenticated(false);
    } else {
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
    }

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

  const toggleChatWindow = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-5 right-5 w-72 h-[500px] rounded-lg shadow-lg flex flex-col bg-white">
          <div className="flex items-center bg-red-400 text-white p-4 rounded-t-lg">
            <img src="/icon.ico" alt="Lovely Glam Icon" className="w-8 h-8 mr-3" />
            <span>Lovely Glam</span>
            <button onClick={toggleChatWindow} className="ml-auto text-white">
              <img src="https://www.svgrepo.com/show/275233/x.svg" alt="Close" className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-3 rounded-lg max-w-[66%] ${msg.from === "bot" ? "bg-gray-200 self-start" : "bg-green-200 self-end ml-auto"
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
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
                <path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 12.21875 10.78125 L 10.78125 12.21875 L 14.5625 16 L 10.78125 19.78125 L 12.21875 21.21875 L 16 17.4375 L 19.78125 21.21875 L 21.21875 19.78125 L 17.4375 16 L 21.21875 12.21875 L 19.78125 10.78125 L 16 14.5625 Z"></path>
              </svg>
            </button>
          </div>
        </div>
      ) : (isAuthenticated && (
        <button onClick={toggleChatWindow} className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-red-400 flex items-center justify-center shadow-lg">
          <img src="/icon.ico" alt="Chat" className="w-8 h-8" />
        </button>
      )
      )}
    </>
  );
};

export default ChatWindow;
