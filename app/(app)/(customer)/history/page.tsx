"use client"
import { useState, useEffect } from 'react';
import { getUserPaymentHistories } from '@/app/_services/userService';
import { IPaginationResponse} from '@/app/_services/baseService';
import { pay } from '@/app/_services/bookingService';
import { useRouter } from 'next/navigation';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCEL' | 'REFUNDED';
export type Status = 'PAID' | 'PENDING';
export type BookingPaymentResponse = {
    id: number;
    paymentStatus: PaymentStatus;
    totalPayment: number;
    shopName: string;
    nailService: string;
    user: string;
};

export type PaymentHistoryItem = {
    bookId: number;
    nailService: string;
    shopName: string;
    status: Status;
    paymentHistory: BookingPaymentResponse[];
};

const PaymentHistory: React.FC = () => {
    const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([]);
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse<PaymentHistoryItem>>()
    const [currentPage, setCurrentPage] = useState<number>(0);
    const router = useRouter();
    const fetchPaymentHistory = async(): Promise<IPaginationResponse<PaymentHistoryItem> | undefined> => {
        try {
            const result = await getUserPaymentHistories(currentPage,5);
            if (result.status === 200) {
                return result.data.content;
            }
        }catch(err) {
            console.error(err);
        }
    }
    useEffect(() => {
        const fetch = async () => {
            const result = await fetchPaymentHistory();
            if(result) {
                setPaginationResponse(result)
                setPaymentHistory(result.content);
            }
        }
        fetch();
    }, [currentPage]);
    const handlePaymentRetry = async(id: number) => {
        const paymentLink = await pay({
            bookingId: id,
            callbackUrl: `${window.location.origin}/payment?thankyou=next`
        });
        if (paymentLink.status === 200) {
            router.push(paymentLink.data.content);
          } else {
            console.error('Payment failed:', paymentLink.data);
          }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 p-10'>
            <h2 className='text-4xl font-bold mb-10 text-center text-gray-800'>
                Payment History
            </h2>
            <div className='space-y-6'>
                {paymentHistory.map((paymentItem, index) => (
                    <div key={index} className='p-6 bg-white shadow-lg rounded-lg relative'>
                        <div className='absolute top-4 right-6 text-lg font-bold text-pink-600'>
                            #{paymentItem.bookId}
                        </div>
                        <h3 className='text-xl font-semibold mb-4'>{paymentItem.nailService}</h3>
                        <p className='text-sm text-gray-500'>Shop: {paymentItem.shopName}</p>
                        <p className='text-sm text-gray-500'>Status: {paymentItem.status}</p>
                        {paymentItem.status !== 'PAID' ? (
                            <div className='mt-4'>
                                <button
                                    className='btn btn-warning'
                                    onClick={() => handlePaymentRetry(1)}
                                >
                                    Back To Payment
                                </button>
                            </div>
                        ) : (
                            <div className='mt-4'>
                                <p className='text-green-600 font-semibold'>Payment completed successfully.</p>
                            </div>
                        )}
                        <div className='mt-6'>
                            <h4 className='text-lg font-semibold'>Payment History</h4>
                            <ul className='mt-4 space-y-4'>
                                {paymentItem.paymentHistory.map((payment, idx) => (
                                    <li key={idx} className='p-4 bg-pink-50 rounded-lg'>
                                        <div className='flex justify-between'>
                                            <span className='font-semibold'>Payment ID: {payment.id}</span>
                                            <span className='font-semibold'>Total: {payment.totalPayment} VND</span>
                                        </div>
                                        <p className='text-sm'>Status: {payment.paymentStatus}</p>
                                        <p className='text-sm'>Service: {payment.nailService}</p>
                                        <p className='text-sm'>User: {payment.user}</p>
                                        <p className='text-sm'>Shop: {payment.shopName}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
                        onClick={() => { setCurrentPage(index)}}
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
};

export default PaymentHistory;
