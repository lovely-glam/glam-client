'use client'
import { getBusinessManagement } from "@/app/_services/adminService";
import React, { useState, useEffect } from "react";

export type Business = {
    id: number;
    avatarUrl: string;
    name: string;
    averageVote: number | null;
    totalVote: number;
    address: string;
    profit: number;
}
const Dashboard: React.FC = () => {
    const [businesses, setBusinesses] = useState<Business[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBusinessManagement(0, 100);
                if (response.status !== 200) {
                    throw new Error("Network response was not ok");
                }
                const result = response.data;
                setBusinesses(result.content.content);
            } catch (error: any) { }

        }
        fetchData();
    }, []);
    const totalProfit = businesses.reduce((acc, business) => acc + business.profit, 0);

    return (
        <div className="min-h-screen w-full bg-gray-50 p-6">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Business Dashboard</h1>
                <div className="text-gray-600">
                    <span>Request Time: </span>
                    <strong>{new Date().toLocaleString()}</strong>
                </div>
            </header>

            {/* Overview Section */}
            <section className="mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-gray-600">Total Businesses</h2>
                        <p className="text-3xl font-bold text-blue-600">{businesses.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-gray-600">Total Profit</h2>
                        <p className="text-3xl font-bold text-green-600">{totalProfit.toLocaleString()} VND</p>
                    </div>
                </div>
            </section>

            {/* Business List Section */}
            <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Businesses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {businesses.map((business) => (
                        <div
                            key={business.id}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                            <img
                                src={business.avatarUrl}
                                alt={business.name}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-bold text-gray-800">{business.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{business.address}</p>
                            <p className="text-gray-700">
                                <strong>Profit:</strong> {business.profit.toLocaleString()} VND
                            </p>
                            <p className="text-gray-700">
                                <strong>Votes:</strong> {business.totalVote}
                            </p>
                            <p className="text-gray-700">
                                <strong>Average Vote:</strong> {business.averageVote ?? "N/A"}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
