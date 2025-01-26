'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
            question: "Do you enjoy working with technical tools and systems?",
            options: [
                " Yes, I love solving technical problems.",
                "I prefer a mix of technical and non-technical work.",
                "No, I prefer non-technical or creative work."
            ]
        },
        {
            question: "How do you approach solving problems",
            options: [
                "I like to break problems into smaller parts and solve them systematically.",
                "I prefer creative and out-of-the-box solutions.",
                "I focus on preventing problems before they occur."
            ]
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
            question: 'What do you like more?',
            options: [
                'Building from the inside out',
                'Creating comfort and visual delight',
                'Breaking things to see if they work',
                'Protecting things',
            ],
        },
        {
            question: 'How do you feel about math?',
            options: [
                'I am solid at math',
                'I am pretty good',
                'I am not bad',
                `I'd rather not`,
            ],
        },
        {
            question: "Do you prefer working independently or as part of a team?",
            options: [
                "I prefer working independently.",
                "I enjoy collaborating with a team.",
                "I like a mix of both."
            ]
        },
        {
            question: "How interested are you in design and aesthetics?",
            options: [
                "Very interested—I love creating visually appealing things.",
                "Somewhat interested—I appreciate good design but don’t want to focus on it.",
                "Not interested—I prefer functionality over aesthetics."
            ]
        },
        {
            question: "How do you prefer to learn new skills?",
            options: [
                'I prefer hands-on, practical learning.',
                'I like structured courses and theoretical learning.',
                " I learn best through experimentation and trial-and-error."

            ]
        },
        {
            question: 'How much time can you dedicate to learning?',
            options: [
                'A few months',
                'About six months',
                'A year',
                'Over a year',
            ],
        },

        {
            question: 'What is your name?',
            type: 'text', // Indicates this is a text input question
        },
        {
            question: 'What is your email?',
            type: 'text', // Indicates this is a text input question
        },
    ];


    const calculateCareerScores = () => {
        const careerScores = {
            softwareEngineering: 0,
            businessIntelligenceAnalytics: 0,
            dataScience: 0,
            uiUxDesign: 0,
            cyberSecurity: 0,
            qualityAssurance: 0,
        };

        // Question 1: Why do you want to change your career?
        switch (answers[0]) {
            case 'I want to earn more money':
                careerScores.softwareEngineering += 2;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 2;
                careerScores.uiUxDesign += 1;
                careerScores.cyberSecurity += 2;
                careerScores.qualityAssurance += 1;
                break;
            case 'I want to work in a more fulfilling job':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 3;
                careerScores.uiUxDesign += 3;
                careerScores.cyberSecurity += 3;
                careerScores.qualityAssurance += 2;
                break;
            case 'I want more opportunities':
                careerScores.softwareEngineering += 2;
                careerScores.businessIntelligenceAnalytics += 3;
                careerScores.dataScience += 2;
                careerScores.uiUxDesign += 2;
                careerScores.cyberSecurity += 2;
                careerScores.qualityAssurance += 2;
                break;
            case 'I want more opportunities to grow':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 3;
                careerScores.dataScience += 3;
                careerScores.uiUxDesign += 2;
                careerScores.cyberSecurity += 3;
                careerScores.qualityAssurance += 2;
                break;
        }

        // Question 2: Do you enjoy working with technical tools and systems?
        switch (answers[1]) {
            case 'Yes, I love solving technical problems':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 3;
                careerScores.uiUxDesign += 1;
                careerScores.cyberSecurity += 3;
                careerScores.qualityAssurance += 2;
                break;
            case 'I prefer a mix of technical and non-technical work':
                careerScores.softwareEngineering += 2;
                careerScores.businessIntelligenceAnalytics += 3;
                careerScores.dataScience += 2;
                careerScores.uiUxDesign += 2;
                careerScores.cyberSecurity += 2;
                careerScores.qualityAssurance += 2;
                break;
            case 'No, I prefer non-technical or creative work':
                careerScores.softwareEngineering += 1;
                careerScores.businessIntelligenceAnalytics += 1;
                careerScores.dataScience += 1;
                careerScores.uiUxDesign += 3;
                careerScores.cyberSecurity += 1;
                careerScores.qualityAssurance += 1;
                break;
        }

        // Question 3: How do you approach solving problems?
        switch (answers[2]) {
            case 'I like to break problems into smaller parts and solve them systematically':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 3;
                careerScores.uiUxDesign += 1;
                careerScores.cyberSecurity += 2;
                careerScores.qualityAssurance += 2;
                break;
            case 'I prefer creative and out-of-the-box solutions':
                careerScores.softwareEngineering += 1;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 1;
                careerScores.uiUxDesign += 3;
                careerScores.cyberSecurity += 1;
                careerScores.qualityAssurance += 1;
                break;
            case 'I focus on preventing problems before they occur':
                careerScores.softwareEngineering += 2;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 2;
                careerScores.uiUxDesign += 1;
                careerScores.cyberSecurity += 3;
                careerScores.qualityAssurance += 3;
                break;
        }

        // Question 4: What do you find most appealing about a potential career in tech?
        switch (answers[3]) {
            case 'The high earning potential':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 3;
                careerScores.uiUxDesign += 1;
                careerScores.cyberSecurity += 2;
                careerScores.qualityAssurance += 1;
                break;
            case 'Future-proof careers':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 3;
                careerScores.dataScience += 3;
                careerScores.uiUxDesign += 2;
                careerScores.cyberSecurity += 3;
                careerScores.qualityAssurance += 2;
                break;
            case 'The opportunity to work on innovative projects':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 3;
                careerScores.uiUxDesign += 2;
                careerScores.cyberSecurity += 2;
                careerScores.qualityAssurance += 1;
                break;
            case 'Good working conditions':
                careerScores.softwareEngineering += 2;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 2;
                careerScores.uiUxDesign += 3;
                careerScores.cyberSecurity += 2;
                careerScores.qualityAssurance += 2;
                break;
        }

        // Question 5: What do you like more?
        switch (answers[4]) {
            case 'Building from the inside out':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 1;
                careerScores.dataScience += 2;
                careerScores.uiUxDesign += 1;
                careerScores.cyberSecurity += 1;
                careerScores.qualityAssurance += 1;
                break;
            case 'Creating comfort and visual delight':
                careerScores.softwareEngineering += 1;
                careerScores.businessIntelligenceAnalytics += 1;
                careerScores.dataScience += 1;
                careerScores.uiUxDesign += 3;
                careerScores.cyberSecurity += 1;
                careerScores.qualityAssurance += 1;
                break;
            case 'Breaking things to see if they work':
                careerScores.softwareEngineering += 2;
                careerScores.businessIntelligenceAnalytics += 1;
                careerScores.dataScience += 1;
                careerScores.uiUxDesign += 1;
                careerScores.cyberSecurity += 3;
                careerScores.qualityAssurance += 3;
                break;
            case 'Protecting things':
                careerScores.softwareEngineering += 1;
                careerScores.businessIntelligenceAnalytics += 1;
                careerScores.dataScience += 1;
                careerScores.uiUxDesign += 1;
                careerScores.cyberSecurity += 3;
                careerScores.qualityAssurance += 2;
                break;
        }

        // Question 6: How do you feel about math?
        switch (answers[5]) {
            case 'I am solid at math':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 3;
                careerScores.dataScience += 2;
                careerScores.uiUxDesign += 1;
                careerScores.cyberSecurity += 2;
                careerScores.qualityAssurance += 2;
                break;
            case 'I am pretty good':
                careerScores.softwareEngineering += 2;
                careerScores.businessIntelligenceAnalytics += 3;
                careerScores.dataScience += 2;
                careerScores.uiUxDesign += 1;
                careerScores.cyberSecurity += 2;
                careerScores.qualityAssurance += 2;
                break;
            case 'I am not bad':
                careerScores.softwareEngineering += 1;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 1;
                careerScores.uiUxDesign += 1;
                careerScores.cyberSecurity += 1;
                careerScores.qualityAssurance += 3;
                break;
            case "I'd rather not":
                careerScores.softwareEngineering += 0;
                careerScores.businessIntelligenceAnalytics += 1;
                careerScores.dataScience += 0;
                careerScores.uiUxDesign += 1;
                careerScores.cyberSecurity += 0;
                careerScores.qualityAssurance += 1;
                break;
        }
        //Do you prefer working independently or as part of a team?
        switch (answers[6]) {
            case 'I prefer working independently':
                careerScores.softwareEngineering += 2;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 2;
                careerScores.uiUxDesign += 1;
                careerScores.cyberSecurity += 3;
                careerScores.qualityAssurance += 2;
                break;
            case 'I collaborating with a team':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 3;
                careerScores.dataScience += 3;
                careerScores.uiUxDesign += 3;
                careerScores.cyberSecurity += 2;
                careerScores.qualityAssurance += 3;
                break;
            case 'I like a mix of both':
                careerScores.softwareEngineering += 2;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 2;
                careerScores.uiUxDesign += 2;
                careerScores.cyberSecurity += 2;
                careerScores.qualityAssurance += 2;
                break;
        }
        //How interested are you in design and aesthetics?
        switch (answers[7]) {
            case 'Very interested—I love creating visually appealing things':
                careerScores.softwareEngineering += 1;
                careerScores.businessIntelligenceAnalytics += 1;
                careerScores.dataScience += 1;
                careerScores.uiUxDesign += 3;
                careerScores.cyberSecurity += 1;
                careerScores.qualityAssurance += 1;
                break;
            case 'Somewhat interested—I appreciate good design but don’t want to focus on it':
                careerScores.softwareEngineering += 2;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 2;
                careerScores.uiUxDesign += 2;
                careerScores.cyberSecurity += 2;
                careerScores.qualityAssurance += 2;
                break;
            case 'Not interested—I prefer functionality over aesthetics':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 3;
                careerScores.dataScience += 3;
                careerScores.uiUxDesign += 1;
                careerScores.cyberSecurity += 3;
                careerScores.qualityAssurance += 3;
                break;
        }

        //How do you prefer to learn new skills?
        switch (answers[8]) {
            case 'I prefer hands-on, practical learning':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 3;
                careerScores.uiUxDesign += 2;
                careerScores.cyberSecurity += 3;
                careerScores.qualityAssurance += 3;
                break;
            case 'I like structured courses and theoretical learning':
                careerScores.softwareEngineering += 2;
                careerScores.businessIntelligenceAnalytics += 3;
                careerScores.dataScience += 2;
                careerScores.uiUxDesign += 2;
                careerScores.cyberSecurity += 2;
                careerScores.qualityAssurance += 2;
                break;
            case 'I learn best through experimentation and trial-and-error':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 3;
                careerScores.uiUxDesign += 2;
                careerScores.cyberSecurity += 3;
                careerScores.qualityAssurance += 3;
                break;
        }

        //How much time can you dedicate to learning?
        switch (answers[8]) {
            case 'A few months':
                careerScores.softwareEngineering += 1;
                careerScores.businessIntelligenceAnalytics += 2;
                careerScores.dataScience += 1;
                careerScores.uiUxDesign += 2;
                careerScores.cyberSecurity += 1;
                careerScores.qualityAssurance += 2;
                break;
            case 'About six months':
                careerScores.softwareEngineering += 2;
                careerScores.businessIntelligenceAnalytics += 3;
                careerScores.dataScience += 2;
                careerScores.uiUxDesign += 3;
                careerScores.cyberSecurity += 2;
                careerScores.qualityAssurance += 3;
                break;
            case 'A year':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 3;
                careerScores.dataScience += 3;
                careerScores.uiUxDesign += 2;
                careerScores.cyberSecurity += 3;
                careerScores.qualityAssurance += 2;
                break;
            case 'Over a year':
                careerScores.softwareEngineering += 3;
                careerScores.businessIntelligenceAnalytics += 3;
                careerScores.dataScience += 3;
                careerScores.uiUxDesign += 2;
                careerScores.cyberSecurity += 3;
                careerScores.qualityAssurance += 2;
                break;
        }

        return careerScores;
    };

    const recommendCareer = () => {
        const careerScores = calculateCareerScores();
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

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 overflow-y-scroll">
            {!quizCompleted ? (
                <div className="w-full max-w-md space-y-28">
                    {QA.map((qa, index) => (
                        <AnimatePresence key={index}>
                            <div
                                ref={(el) => {
                                    if (el) {
                                        questionRefs.current[index] = el;
                                    }
                                }}
                                className={`rounded-md p-6 mb-12 ${index <= currentQuestionIndex ? 'block' : 'hidden'
                                    }`}
                            >
                                <div className="relative p-6 bg-blue-500 rounded-md mb-6">
                                    <h2 className="text-lg font-bold text-white">{qa.question}</h2>
                                    <div className="absolute w-0 h-0 border-t-[15px] border-blue-500 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent top-full left-8"></div>
                                </div>

                                {qa.type === 'text' ? (
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            value={answers[index]}
                                            onChange={(e) => handleAnswerUpdate(index, e.target.value)}
                                            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder={`Enter your ${qa.question.toLowerCase()}`}
                                        />
                                        <button
                                            onClick={handleNextQuestion}
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                                        >
                                            Next
                                        </button>
                                    </div>
                                ) : (
                                    <ul className="space-y-4">
                                        {qa.options?.map((option, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 50 }}
                                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                            >
                                                <button
                                                    onClick={() => {
                                                        handleAnswerUpdate(index, option);
                                                        handleNextQuestion();
                                                    }}
                                                    className={`flex items-center w-full py-2 px-4 rounded-lg transition-all ${answers[index] === option
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-white border-2 border-gray-300 text-gray-800 hover:border-blue-500'
                                                        }`}
                                                >
                                                    {option}
                                                    {answers[index] === option && <span className="ml-auto bg-white w-4 h-4 rounded-full"></span>}
                                                </button>
                                            </motion.li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </AnimatePresence>
                    ))}
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-md w-full max-w-md text-center p-6">
                    <h2 className="text-lg font-bold mb-4">Quiz Completed!</h2>
                    <p className="mb-4">Here are your answers:</p>
                    <ul className="list-disc list-inside text-left mb-4 space-y-2">
                        {QA.map((qa, index) => (
                            <li key={index}>
                                <strong>{qa.question}: </strong>
                                {answers[index]}
                            </li>
                        ))}
                    </ul>
                    <p className="mb-4">
                        Based on your answers, we recommend: <strong>{formatCareerName(recommendCareer())}</strong>
                    </p>
                    <button
                        onClick={handleRetakeQuiz}
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