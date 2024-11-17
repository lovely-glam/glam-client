'use client'

import { getRooms } from "@/app/_services/chatSocketService";
import Link from "next/link";
import { useEffect, useState } from "react";
export interface RoomResponse {
    id: number;
    userAvatar: string;
    username: string;
}

const ChatBusinessLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [users, setUsers] = useState<RoomResponse[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number>();
    const handleUserClick = (userId: number) => {
        setSelectedUserId(userId);
    };
    const fetchRoom = async (): Promise<RoomResponse[]> => {
        try {
            const data = await getRooms();
            if (data.status === 200) {
                return data.data.content;
            }
            return [];
        } catch (err) {
            return [];
        }

    }

    useEffect(() => {
        const fetch = async () => {
            const data = await fetchRoom();
            setUsers(data);
        }
        fetch();
    }, [])
    return (
        <div className="flex h-screen w-full">
            <div className="w-1/4 bg-gray-100 p-6 shadow-lg h-[calc(100vh)] overflow-y-auto">
                <h2 className="font-bold text-lg mb-6 text-gray-700">Danh sách chat</h2>
                {users.length > 0 ? (
                    users.map((user) => (
                        <Link href={`/business/chat/${user.id}`} key={user.id}>
                            <div
                                onClick={() => handleUserClick(user.id)}
                                className={`flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer shadow-sm mb-4 border border-gray-300 ${selectedUserId === user.id ? 'bg-gray-300' : 'hover:bg-gray-200'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <div className="border rounded-full overflow-hidden w-12 h-12 mr-4 shadow-sm">
                                        <img
                                            src={user.userAvatar}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <strong className="text-gray-900 text-sm">{user.username}</strong>
                                        <span className="text-gray-500 text-xs">Last message...</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500">No users available</p>
                )}
            </div>
            <div className="w-full bg-white pl-3 shadow-lg rounded-l-lg flex-1 flex flex-col">
                {children}
            </div>
        </div>
    );
}

export default ChatBusinessLayout;
