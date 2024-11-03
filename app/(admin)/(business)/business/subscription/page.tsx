"use client"

import SubscriptionCard from "@/app/_components/business/SubscriptionCard";

const SubscriptionPage = () => {
    return (
        <section className="py-10 w-full">
            <div className="absolute h-[36.5rem] w-full top-0 bg-gradient-to-r from-[#b44b4b] to-[#843232] -z-10"></div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="font-manrope text-5xl text-center font-bold text-[#3b0d0d] mb-4">
                        Suitable pricing plans
                    </h2>
                    <p className="text-[#5c1a1a] text-xl text-center leading-6">
                        7 Days free trial. No credit card required.
                    </p>
                </div>
                <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-8 lg:space-y-0 lg:items-center lg:justify-items-center">
                    {/* Pricing Card */}
                    <SubscriptionCard type={'basic'} onPurchase={() => { }} title="Basic" benefits={["AI advisor for a day", "2 auto tracking", "7 Day transaction clearing"]} price={1000000} />
                    <SubscriptionCard type={'premium'} onPurchase={() => { }} title="Premium" benefits={["AI advisor for a day", "2 auto tracking", "7 Day transaction clearing"]} price={2500000} />
                </div>

            </div>
        </section>

    );
}

export default SubscriptionPage;