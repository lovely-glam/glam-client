"use client"
import BusinessAccountTable from '@/app/_components/admin/BusinessAccountTable';
import UserAccountTable from '@/app/_components/admin/UserAccountTable';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify'; // If you use toast notification
const AccountManagement = () => {
    
    const [activeTab, setActiveTab] = useState<'user' | 'business'>('business');
    
    return (
        <main className="flex-1 p-6">
                <ToastContainer />

                <h1 className="text-3xl font-bold text-gray-800 mb-6">Account Management</h1>

                <div className="mb-4">
                    <button
                        className={`px-4 py-2 rounded-lg ${activeTab === 'business' ? 'bg-pink-600 text-white' : 'bg-white text-gray-800'} transition duration-200`}
                        onClick={() => {
                            setActiveTab('business');
                        }}
                    >
                        Business Accounts
                    </button>
                    <button
                        className={`ml-4 px-4 py-2 rounded-lg ${activeTab === 'user' ? 'bg-pink-600 text-white' : 'bg-white text-gray-800'} transition duration-200`}
                        onClick={() => {
                            setActiveTab('user');
                        }}
                    >
                        User Accounts
                    </button>
                </div>

                {activeTab === 'business' && (
                    <BusinessAccountTable/>
                )}

                {activeTab === 'user' && (
                    <UserAccountTable/>
                )}
            </main>
    );
};

export default AccountManagement;
