'use client';
import CareerQuiz from '@/components/CareerQuiz';
import Image from 'next/image';
import React, { useState } from 'react';

const Page = () => {
    const [showQuiz, setShowQuiz] = useState(false);

    return (
        <div className="bg-brand-100 flex flex-col items-center justify-center h-screen relative">
            {/* Image Container */}
            <div className="relative">
                <Image
                    src="/assets/Images/trip2.png"
                    alt="banner"
                    width={400}
                    height={400}
                    className="rounded-lg"
                />
                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-center">
                    <h1 className="text-4xl font-bold mb-2">
                        Find your Ideal Job and Potential Earnings
                    </h1>
                    <p className="text-lg">
                        Take a quick career quiz, then get a free personalized career
                        consultation!
                    </p>
                    <button
                        className="mt-6 bg-black text-white py-2 px-4 rounded-lg font-medium text-sm transition-transform duration-300 hover:scale-110"
                        onClick={() => setShowQuiz(true)} // Show quiz on click
                    >
                        Start Now
                    </button>
                </div>
            </div>

            {/* Render CareerQuiz when showQuiz is true */}
            {showQuiz && (
                <div className="absolute top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50">
                    <div className="relative w-full max-w-3xl bg-gray-100 rounded-lg shadow-lg p-6">
                        <button
                            className="absolute top-4 right-4 bg-red-500 text-white py-1 px-2 rounded-full"
                            onClick={() => setShowQuiz(false)} // Hide quiz on click
                        >
                            Close
                        </button>
                        <CareerQuiz />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;

