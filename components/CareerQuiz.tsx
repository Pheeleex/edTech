'use client';
import React, { useState } from 'react';

const CareerQuiz = () => {
  const QA = [
    {
      question: 'Why do you want to change your career?',
      options: [
        'I want to earn more money',
        'I want to work in a more fulfilling job',
        'I want more opportunities',
        'I want more opportunities to grow',
      ],
    },
    {
      question: 'What do you find most appealing about a potential career in tech?',
      options: [
        'The high earning potential',
        'Future proof careers',
        'The opportunity to work on innovative projects',
        'Good working conditions',
      ],
    },
    {
      question: 'What do you like more',
      options: [
        'Building from the inside out',
        'Creating comfort and visual delight',
        'Breaking things to see if they work',
        'Protecting things',
      ],
    },
    {
      question: 'How do you feel about math',
      options: [
        'I am solid at maths',
        'I am pretty good',
        'I am not bad',
        `I'd rather not`,
      ],
    },
    {
      question: 'What do you primarily do in your current job?',
      options: [
        'I work with numbers and data',
        'I work with people',
        'I work in the service industry',
        'I work with words',
        'I work in sales or marketing',
        'I work in transportation or logistics',
        'I work in manufacturing or construction',
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (option: string) => {
    setSelectedOption(option);
    setAnswers((prevAnswers) => [...prevAnswers, option]);

    setTimeout(() => {
      setSelectedOption(null); // Reset the selected option
      if (currentQuestionIndex < QA.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 500); // Delay for animation feedback
  };

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center p-6">
      {!quizCompleted ? (
        <div className=" rounded-md w-full max-w-md">
          {/* Question styled as a comic speech bubble */}
          <div className="relative p-6 bg-brand-100 rounded-md  mb-6">
            <h2 className="text-lg font-bold text-white">
              {QA[currentQuestionIndex].question}
            </h2>
            <div className="absolute w-0 h-0 border-t-[15px] border-brand-100 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent top-full left-8"></div>
          </div>
          {/* Options */}
          <ul className="space-y-4">
            {QA[currentQuestionIndex].options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleAnswerSelect(option)}
                  disabled={!!selectedOption} // Disable other options once one is selected
                  className={`flex items-center w-full py-2 px-4 rounded-lg transition-all ${
                    selectedOption === option
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white border-2 border-gray-300 text-gray-800 hover:border-blue-500'
                  }`}
                >
                  <span
                    className={`w-6 h-6 mr-4 flex items-center justify-center border-2 rounded-full transition-colors ${
                      selectedOption === option ? 'bg-white text-blue-500' : 'border-gray-300'
                    }`}
                  >
                    {selectedOption === option && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className="bg-white shadow-md rounded-md w-full max-w-md text-center p-6 opacity-0 transform translate-y-5 animate-fade-in"
        >
          <h2 className="text-lg font-bold mb-4">Quiz Completed!</h2>
          <p className="mb-4">Here are your answers:</p>
          <ul className="list-disc list-inside text-left mb-4 space-y-2">
            {answers.map((answer, index) => (
              <li
                key={index}
                className="opacity-0 transform translate-x-5 animate-slide-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <strong>Q{index + 1}: </strong>
                {answer}
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setCurrentQuestionIndex(0);
              setAnswers([]);
              setQuizCompleted(false);
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default CareerQuiz;
