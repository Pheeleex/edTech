// app/quiz/page.tsx
'use client';
import CareerQuiz from '@/components/CareerQuiz';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiX } from 'react-icons/fi';

const Page = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-500 flex flex-col items-center justify-center p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300">
          <Image
            src="/assets/Images/trip2.png"
            alt="Career Path"
            width={1200}
            height={800}
            className="object-contain w-full h-96 brightness-90"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end p-8">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Discover Your Ideal Tech Career Path
              </h1>
              <p className="text-xl text-gray-200">
                Take our 2-minute quiz and unlock personalized career recommendations
              </p>
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-white text-blue-600 py-3 px-8 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
              >
                Start Free Quiz
                <FiArrowRight className="text-xl text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {showQuiz && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowQuiz(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX className="text-2xl text-gray-600" />
            </button>
            <CareerQuiz />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Page;