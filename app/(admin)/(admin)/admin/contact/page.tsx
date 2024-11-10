"use client"
import { getSystemContact } from '@/app/_services/adminService';
import React, { useEffect, useState, useRef } from 'react';

export type Feedback = {
    id: string;
    contactName: string;
    email: string;
    message: string;
    response?: string;
};

const SystemContactPage = () => {
    const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 5;

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchData = async (currentPage: number) => {
            setLoading(true);
            try {
                const response = await getSystemContact(currentPage, pageSize);
                const data = response.data.content.content;
                setFeedbackList((prevList) => {
                    const uniqueData = data.filter(
                        (newFeedback) => !prevList.some((existingFeedback) => existingFeedback.id === newFeedback.id)
                    );
                    return [...prevList, ...uniqueData];
                });
                setHasMore(data.length === pageSize);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchData(page);
    }, [page]);

    const handleScroll = () => {
        if (
            scrollContainerRef.current &&
            scrollContainerRef.current.scrollTop + scrollContainerRef.current.clientHeight >=
                scrollContainerRef.current.scrollHeight - 100 &&
            !loading &&
            hasMore
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loading, hasMore]);

    const handleResponseChange = (id: string, response: string) => {
        setFeedbackList((prevList) =>
            prevList.map((feedback) =>
                feedback.id === id ? { ...feedback, response } : feedback
            )
        );
    };

    const handleResponseSubmit = async (id: string) => {
        const feedback = feedbackList.find((f) => f.id === id);
        if (feedback) {
        }
    };

    return (
        <div className="container mx-auto px-12 py-8 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-8">Feedback Management</h2>
            <div
                ref={scrollContainerRef}
                className="space-y-8 max-h-[600px] overflow-y-auto border-2 border-gray-200 p-4 rounded-lg"
            >
                {feedbackList.map((feedback) => (
                    <div key={feedback.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">{feedback.contactName}</h3>
                            <span className="text-sm text-gray-600">{feedback.email}</span>
                        </div>
                        <p className="text-gray-700 mb-6"><strong>Message:</strong> {feedback.message}</p>
                        <div>
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor={`response-${feedback.id}`}
                            >
                                Response
                            </label>
                            <textarea
                                id={`response-${feedback.id}`}
                                value={feedback.response || ''}
                                onChange={(e) => handleResponseChange(feedback.id, e.target.value)}
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="Write your response here..."
                            />
                            <button
                                onClick={() => handleResponseSubmit(feedback.id)}
                                className="mt-3 w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
                            >
                                Submit Response
                            </button>
                        </div>
                    </div>
                ))}
                {loading && <p className="text-center mt-8">Loading more feedback...</p>}
                {!hasMore && !loading && <p className="text-center mt-8 text-gray-500">No more feedback to display</p>}
            </div>
        </div>
    );
};

export default SystemContactPage;
