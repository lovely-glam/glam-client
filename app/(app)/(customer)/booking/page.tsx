"use client"
import { IPaginationResponse } from "@/app/_services/baseService";
import { sendServiceFeedback } from "@/app/_services/feedbackService";
import { getUserBookings } from "@/app/_services/userService";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export type AppointmentStatus = 'BOOKED' | 'ACCEPTED' | 'DENIED' | 'DONE';

export type Booking = {
    id: number;
    shopServiceName: string;
    userAccountName: string;
    makingDay: string;
    startTime: string;
    status: AppointmentStatus;
};


const BookingCalender: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [currentFeedback, setCurrentFeedback] = useState<number>(-1);
    const [statusFilter, setStatusFilter] = useState<AppointmentStatus>('ACCEPTED');
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse<Booking>>();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isFeedbackFormOpen, setFeedbackFormOpen] = useState<boolean>(false);

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
            }
        }
        fetch();
    }, [currentPage, statusFilter])

    const handleModalOpen = (id: number) => {
        setCurrentFeedback(id);
        setFeedbackFormOpen(true);
    }

    const handleSubmitFeedback = async (data: { bookId: number, comment: string, vote: number }) => {
        const updateToast = toast.loading(
            'Sending', {
            toastId: 'sendFeedbackToast',
            autoClose: false,
            closeOnClick: false,
            hideProgressBar: true,
            draggable: false,
            position: 'bottom-right',
            pauseOnHover: false,
            progress: undefined,
            theme: 'light',
        });
        const result = await sendServiceFeedback(data);
        if (result.status === 200) {
            toast.update(updateToast, {
                render: 'Send Feedback Success',
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
        }
        toast.update(updateToast, {
            render: 'Send Feedback Error',
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
    return (
        <div className='min-h-screen bg-gradient-to-br from-pink-200 via-red-100 to-yellow-100 p-10'>
            <ToastContainer />
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
            <FeedbackModal bookId={currentFeedback} isOpen={isFeedbackFormOpen} onClose={() => {
                setCurrentFeedback(-1);
                setFeedbackFormOpen(false);
            }} onSubmit={handleSubmitFeedback} />
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
                                <button
                                    className='bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-pink-500'
                                    onClick={() => { handleModalOpen(booking.id) }}
                                >
                                    Feedback
                                </button>
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
                        onClick={() => { setCurrentPage(index) }}
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
const FeedbackModal: React.FC<{
    bookId: number,
    isOpen: boolean,
    onClose: () => void,
    onSubmit: (data: { bookId: number, comment: string, vote: number }) => void
}> = ({ bookId, isOpen, onClose, onSubmit }) => {
    const [comment, setComment] = useState('');
    const [vote, setVote] = useState(0);

    const handleFormSubmit = () => {
        onSubmit({ bookId, comment, vote });
        onClose();
    };

    return (
        isOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md'>
                    <h2 className='text-2xl font-semibold mb-4'>Leave Your Feedback</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700' htmlFor='bookId'>
                                Book ID
                            </label>
                            <input
                                type='number'
                                id='bookId'
                                className='mt-1 block w-full border border-gray-300 rounded-md p-2'
                                value={bookId}
                                disabled={true}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700' htmlFor='comment'>
                                Comment
                            </label>
                            <textarea
                                id='comment'
                                className='mt-1 block w-full border border-gray-300 rounded-md p-2'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700' htmlFor='vote'>
                                Rating (1-5)
                            </label>
                            <input
                                type='number'
                                id='vote'
                                className='mt-1 block w-full border border-gray-300 rounded-md p-2'
                                value={vote}
                                onChange={(e) => setVote(Number(e.target.value))}
                                min={1}
                                max={5}
                                required
                            />
                        </div>
                        <div className='flex justify-end space-x-4'>
                            <button
                                type='button'
                                className='text-gray-500 hover:text-gray-700'
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-pink-500 transition'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default BookingCalender;