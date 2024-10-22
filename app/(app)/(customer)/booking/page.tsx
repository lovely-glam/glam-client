"use client"
import { IPaginationResponse } from "@/app/_services/baseService";
import { getUserBookings } from "@/app/_services/userService";
import { useEffect, useState } from "react";

export type AppointmentStatus = 'BOOKED' | 'ACCEPTED' | 'DENIED' | 'DONE';

export type Booking = {
    id: string;
    shopServiceName: string;
    userAccountName: string;
    makingDay: string;
    startTime: string;
    status: AppointmentStatus;
};


const BookingCalender: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [feedback, setFeedback] = useState<{ [key: string]: string }>({});
    const [statusFilter, setStatusFilter] = useState<AppointmentStatus>('ACCEPTED');
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse<Booking>>();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const fetchBooking = async (): Promise<IPaginationResponse<Booking> | undefined> => {
        try {
            const result = await getUserBookings(currentPage, 5, encodeURIComponent(`appointmentStatus=${statusFilter}`));
            if (result.status === 200 && result.data.success) {
                return result.data.content as IPaginationResponse<Booking>;
            }
            return undefined;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }
    useEffect(() => {
        const fetch = async () => {
            const result = await fetchBooking();
            if (result) {
                setPaginationResponse(result);
                setBookings(result.content);
                console.log(result)
            }
        }
        fetch();
    }, [currentPage, statusFilter])

    const handleFeedbackChange = (id: string, value: string) => {
        setFeedback({ ...feedback, [id]: value });
    };
    return (
        <div className='min-h-screen bg-gradient-to-br from-pink-200 via-red-100 to-yellow-100 p-10'>
            <h2 className='text-4xl font-bold mb-10 text-center text-gray-800 drop-shadow-lg'>
                Booking Calendar
            </h2>
            <div className='mb-6'>
                <label className='font-semibold mr-2' htmlFor='statusFilter'>Filter by Status:</label>
                <select
                    id='statusFilter'
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus)}
                    className='select select-bordered'
                >
                    <option value='BOOKED'>Booked</option>
                    <option value='ACCEPTED'>Accepted</option>
                    <option value='DENIED'>Denied</option>
                    <option value='DONE'>Done</option>
                </select>
            </div>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {bookings.map((booking, index) => (
                    <div
                        key={index}
                        className='bg-gradient-to-br from-white to-pink-50 rounded-xl p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl'
                    >
                        <div className='mb-4'>
                            <h3 className='text-xl font-bold text-pink-600'>{booking.shopServiceName}</h3>
                            <p className='text-sm text-gray-500'>Service</p>
                        </div>
                        <div className='mb-4'>
                            <h4 className='text-lg font-semibold text-gray-700'>{booking.userAccountName}</h4>
                            <p className='text-sm text-gray-500'>Customer</p>
                        </div>
                        <div className='mb-4'>
                            <h4 className='text-lg font-semibold text-gray-700'>{booking.makingDay}</h4>
                            <p className='text-sm text-gray-500'>Date</p>
                        </div>
                        <div className='mb-4'>
                            <h4 className='text-lg font-semibold text-gray-700'>
                                {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </h4>
                            <p className='text-sm text-gray-500'>Start Time</p>
                        </div>
                        <div className='mb-4'>
                            <h4
                                className={`text-lg font-semibold ${booking.status === 'DONE' ? 'text-green-600' : 'text-gray-700'
                                    }`}
                            >
                                {booking.status}
                            </h4>
                            <p className='text-sm text-gray-500'>Status</p>
                        </div>
                        {booking.status === 'DONE' && (
                            <div className='mt-6'>
                                <textarea
                                    className='textarea textarea-bordered w-full rounded-xl p-4 focus:ring-4 focus:ring-pink-300 transition-all duration-300'
                                    placeholder='Leave your feedback'
                                    value={feedback[booking.id] || ''}
                                    onChange={(e) => handleFeedbackChange(booking.id, e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className='mt-8 flex justify-center space-x-4'>
                <button
                    className={`btn ${paginationResponse?.firstPage ? 'btn-disabled' : ''}`}
                    onClick={() => { setCurrentPage(currentPage - 1) }}
                    disabled={paginationResponse?.firstPage}
                >
                    Previous
                </button>
                {Array.from({ length: Number(paginationResponse?.totalPage) }, (_, index) => (
                    <button
                        key={index}
                        className={`btn ${paginationResponse?.page === index + 1 ? 'btn-active' : ''}`}
                        onClick={() => { }}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={`btn ${paginationResponse?.lastPage ? 'btn-disabled' : ''}`}
                    onClick={() => { setCurrentPage(currentPage + 1) }}
                    disabled={paginationResponse?.lastPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default BookingCalender;