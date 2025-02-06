'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { calculateCareerScores, courseMapping, QA } from '@/constants';
import { useRouter } from 'next/navigation';


const CareerQuiz = () => {
  const router = useRouter()

  const recommendCareer = () => {
    const careerScores = calculateCareerScores(answers);
    const careers = Object.keys(careerScores) as (keyof typeof careerScores)[];
    const recommendedCareer = careers.reduce((a, b) =>
      careerScores[a] > careerScores[b] ? a : b
    );
    return recommendedCareer;
  };


  const formatCareerName = (career: string): string => {
    return career
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, (str: string) => str.toUpperCase()); // Capitalize the first letter
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(QA.length).fill(''));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const questionRefs = useRef<HTMLDivElement[]>([]);

  // Animation for new questions
  useEffect(() => {
    if (currentQuestionIndex > 0) {
      questionRefs.current[currentQuestionIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentQuestionIndex]);

  // Update answer state
  const handleAnswerUpdate = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  // Advance to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < QA.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers(Array(QA.length).fill(''));
    setQuizCompleted(false);
  };

  const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
      <motion.div
        className="bg-blue-500 h-3 rounded-full transition-all duration-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
      />
    </div>
  );

  const proceedWithCourse = () => {
    const recommendedKey = recommendCareer();
    const firebaseCourseName = courseMapping[recommendedKey] || recommendedKey;
  router.push(`/course/${encodeURIComponent(firebaseCourseName)}`);
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 md:p-6 overflow-y-auto">
      {!quizCompleted ? (
        <div className="w-full max-w-2xl space-y-8">
          <ProgressBar progress={(currentQuestionIndex / QA.length) * 100} />

          {QA.map((qa, index) => (
            <AnimatePresence key={index}>
              {index === currentQuestionIndex && (
                <motion.div
                  ref={(el) => {
                    if (el) {
                      questionRefs.current[index] = el;
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-white">
                      {qa.question}
                    </h2>
                    <div className="absolute w-6 h-6 bg-purple-600 rotate-45 -bottom-3 left-8" />
                  </div>

                  {qa.type === 'text' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <input
                        type="text"
                        value={answers[index]}
                        onChange={(e) => handleAnswerUpdate(index, e.target.value)}
                        className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder={`Your answer...`}
                      />
                      <button
                        onClick={handleNextQuestion}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-600 transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2"
                      >
                        Continue
                        <FiArrowRight className="text-xl" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.ul className="grid gap-4 md:grid-cols-1">
                      {qa.options?.map((option, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                          <button
                            onClick={() => {
                              handleAnswerUpdate(index, option);
                              handleNextQuestion();
                            }}
                            className={`w-full p-4 text-left rounded-xl transition-all duration-300 ${answers[index] === option
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-md'
                              }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${answers[index] === option
                                  ? 'border-white'
                                  : 'border-gray-300'
                                }`}>
                                {answers[index] === option && (
                                  <FiCheck className="text-current" />
                                )}
                              </div>
                              <span className="text-lg">{option}</span>
                            </div>
                          </button>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quiz Completed! 🎉
            </h2>
            <p className="text-gray-600 text-lg">
              Based on your answers, we recommend
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              {formatCareerName(recommendCareer())}
            </h3>
            <p className="text-gray-700">
              This career path matches your skills, interests, and goals based on
              your quiz responses. Ready to start your journey?
            </p>
            <button onClick={proceedWithCourse}
              className='p-2 rounded-md mt-4 bg-brand text-white'>Check course outline</button>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Your Answers Summary</h3>
            <ul className="space-y-4">
              {QA.map((qa, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <p className="font-medium text-gray-700">{qa.question}</p>
                  <p className="text-gray-600 mt-1">{answers[index]}</p>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleRetakeQuiz}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            Retake Quiz
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CareerQuiz;