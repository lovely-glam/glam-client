"use client"
import { submitSubscriptionPlan } from "@/app/_services/businessService";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SubscriptionPaymentConfirm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const role = searchParams.get('role') as 'basic' | 'premium';
    const price = parseInt(searchParams.get('price') || '0', 10);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"none" | "payos" | "vnpay">("none");
    const [paymentStatus, setPaymentStatus] = useState<"none" | "success" | "failed">("none");
    const handlePaymentConfirm = async () => {
        try {
            const subscriptionRole: "BASIC" | "PREMIUM" = role === 'basic' ? "BASIC" : "PREMIUM";
    
            const data: { subscriptionRole: "BASIC" | "PREMIUM"; callbackUrl: string, type: "PAY_OS"|"VN_PAY" } = {
                subscriptionRole,
                callbackUrl: `${window.location.origin}/business/payment`,
                type: (paymentMethod !== "none" && paymentMethod === "payos") ? "PAY_OS" : "VN_PAY"
            };
            const result = await submitSubscriptionPlan(data);
            if (result.status === 200 && result.data.success) {
                router.push(result.data.content.paymentUrl);
            }
            console.log('Subscription successful:', result);
        } catch (err) {
            console.error('Error signing subscription:', err);
        }
    };
    useEffect(() => {
        const status = searchParams.get("status");
        if (status === "success") setPaymentStatus("success");
        else if (status === "failed") setPaymentStatus("failed");
    }, [searchParams]);
    return (
        <section className="py-10 w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="font-manrope text-3xl font-bold text-center mb-4">
                    Payment Confirmation
                </h2>
                <div className="text-center mb-6">
                    <p className="text-lg font-medium">Subscription Role: {role?.toUpperCase()}</p>
                    <p className="text-lg font-medium">Price: {price?.toLocaleString('vi-VN')} VND</p>
                </div>

                {paymentStatus === "none" && (
                    <>
                        <div className="mt-8">
                            <h3 className="font-manrope text-2xl mb-2">Select Payment Method:</h3>
                            <select 
                                value={paymentMethod} 
                                onChange={(e) => setPaymentMethod(e.target.value as "none" | "payos" | "vnpay")} 
                                className="p-2 border rounded w-full max-w-xs mx-auto block"
                            >
                                <option value="none">Select a payment method</option>
                                <option value="payos">PayOS</option>
                                <option value="vnpay">VN Pay</option>
                            </select>
                        </div>
                        <button 
                            onClick={handlePaymentConfirm}
                            className={`mt-6 py-2 px-4 w-full max-w-xs mx-auto block rounded ${
                                paymentMethod === "none" || isProcessing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                            } text-white transition-all duration-300`}
                            disabled={paymentMethod === "none" || isProcessing}
                        >
                            {isProcessing ? "Processing..." : "Confirm Payment"}
                        </button>
                    </>
                )}

                {paymentStatus === "success" && (
                    <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded text-green-700 text-center">
                        Payment successful! Thank you for your subscription.
                    </div>
                )}

                {paymentStatus === "failed" && (
                    <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded text-red-700 text-center">
                        Payment failed. Please try again or select a different payment method.
                    </div>
                )}
            </div>
        </section>
    );
}

export default SubscriptionPaymentConfirm;