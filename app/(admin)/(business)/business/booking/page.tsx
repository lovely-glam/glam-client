"use client"
import { IPaginationResponse } from "@/app/_services/baseService";
import { getBookings, changeBookingStatus } from "@/app/_services/businessService";
import React, { useEffect, useState } from "react";
import {toast, ToastContainer } from "react-toastify";

export type BookingResponse = {
    id: number;
    shopServiceName: string;
    userAccountName: string;
    makingDay: Date;
    startTime: Date;
    status: string;
}

const BookingBusinessPage = () => {
    const [bookings, setBookings] = useState<BookingResponse[]>([]);
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse<BookingResponse>>();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [filter, setFilter] = useState({
        appointmentStatus: '',
        makingDay: '',
    });
    const [query, setQuery] = useState<string>("");
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilter((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const fetchBookings = async (): Promise<IPaginationResponse<BookingResponse> | undefined> => {
        try {
            const result = await getBookings(currentPage, 5, query);

            if (result.status === 200 && result.data) {
                return result.data.content;
            } else {
                return undefined;
            }
        } catch (error) {
            console.error(error);
            return undefined
        }
    }
    const applyFilters = () => {
        const queryParams = [];
        if (filter.appointmentStatus) {
            queryParams.push(`appointmentStatus=${filter.appointmentStatus}`);
        }
        if (filter.makingDay) {
            queryParams.push(`makingDay=${filter.makingDay}`);
        }
        const queryResult = queryParams.length > 0 ? `${queryParams.join('&')}` : '';
        setQuery(encodeURIComponent(queryResult));
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        console.log(currentPage);
    }
    useEffect(() => {
        const fetch = async () => {
            const result = await fetchBookings();
            if (result) {
                setPaginationResponse(result);
                setBookings(result.content ?? []);
                setCurrentPage(result.page);
            }
        }
        fetch();
    }, [currentPage, query]);



    const changeBookingStatusClicked = async(status: "ACCEPTED" | "DENIED" | "DONE", id: number) => {
        const updateToast = toast.loading(
            'Updating', {
            toastId: 'bookingBusinessUpdateToast',
            autoClose: false,
            closeOnClick: false,
            hideProgressBar: true,
            draggable: false,
            position: 'bottom-right',
            pauseOnHover: false,
            progress: undefined,
            theme: 'light',
          });
        try {
            const result =await changeBookingStatus(id,status);
            if (result.status === 200) {
                toast.update(updateToast, {
                    render: 'Update Success',
                    type: 'success',
                    isLoading: false,
                    autoClose: 2500,
                    position: 'bottom-right',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'light',
                  });
            }else {
                toast.update(updateToast, {
                    render: 'Update Failed',
                    type: 'error',
                    isLoading: false,
                    autoClose: 2500,
                    position: 'bottom-right',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'light',
                  });
            }
        } catch(err) {
            toast.update(updateToast, {
                render: 'Update Failed',
                type: 'error',
                isLoading: false,
                autoClose: 2500,
                position: 'bottom-right',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: 'light',
              });
        }
    }

    return (
        <div className="container mx-auto p-6">
            <ToastContainer/>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Booking List</h1>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                        <label className="text-sm font-semibold">Status:</label>
                        <select
                            name="appointmentStatus"
                            value={filter.appointmentStatus}
                            onChange={handleFilterChange}
                            className="border rounded px-3 py-2 text-sm"
                        >
                            <option value="">None</option>
                            <option value="PENDING">Pending</option>
                            <option value="ACCEPTED">Accepted</option>
                            <option value="PENDING">Pending</option>
                            <option value="DENIED">Denied</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="text-sm font-semibold">Start Date:</label>
                        <input
                            type="date"
                            name="makingDay"
                            value={filter.makingDay}
                            onChange={handleFilterChange}
                            className="border rounded px-3 py-2 text-sm"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={applyFilters}
                            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold">
                            <th className="px-6 py-4 rounded-tl-lg">ID</th>
                            <th className="px-6 py-4">Shop Service</th>
                            <th className="px-6 py-4">User Account</th>
                            <th className="px-6 py-4">Making Day</th>
                            <th className="px-6 py-4">Start Time</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr
                                key={booking.id}
                                className={`text-sm ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100 transition-all`}
                            >
                                <td className="px-6 py-4 border-b">{booking.id}</td>
                                <td className="px-6 py-4 border-b">{booking.shopServiceName}</td>
                                <td className="px-6 py-4 border-b">{booking.userAccountName}</td>
                                <td className="px-6 py-4 border-b">
                                    {new Date(booking.makingDay).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 border-b">
                                    {new Date(booking.startTime).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 border-b">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "ACCEPTED"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 border-b relative">
                                    {booking.status === "BOOKED" && (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={async() => await changeBookingStatusClicked("ACCEPTED", booking.id)}
                                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={async() => await changeBookingStatusClicked("DENIED", booking.id)}
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Deny
                                            </button>
                                        </div>
                                    )}
                                    {booking.status === "ACCEPTED" && (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={async() => await changeBookingStatusClicked("DONE", booking.id)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Done
                                            </button>
                                            <button
                                                onClick={async() => await changeBookingStatusClicked("DENIED", booking.id)}
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Deny
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center p-4 bg-white border-t border-gray-300">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={paginationResponse?.firstPage}
                        className={`px-4 py-2 text-sm font-semibold text-gray-700 border rounded-lg ${paginationResponse?.firstPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                            }`}
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-700">
                        Page {currentPage + 1} of {paginationResponse?.totalPage}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={paginationResponse?.lastPage}
                        className={`px-4 py-2 text-sm font-semibold text-gray-700 border rounded-lg ${paginationResponse?.lastPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
export default BookingBusinessPage;