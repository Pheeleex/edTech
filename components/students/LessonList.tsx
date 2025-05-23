'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiPlay, FiClock } from 'react-icons/fi';
import { FullCourseDetails } from '@/types';

interface LessonCardProps {
  lessonName: string;
  lessonTitle: string;
  isLocked: boolean;
  index: number;
}



const LessonCard: React.FC<LessonCardProps> = ({ 
  lessonName, 
  lessonTitle, 
  isLocked,
  index
}) => {
  // Generate a unique gradient for each card
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-indigo-500 to-purple-600',
    'from-purple-500 to-pink-600',
    'from-rose-500 to-red-600',
    'from-red-500 to-orange-600',
    'from-orange-500 to-amber-600',
  ];
  
  const gradient = gradients[index % gradients.length];
  
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 h-full group hover:shadow-xl hover:-translate-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Status badge */}
      {isLocked ? (
        <div className="absolute top-3 right-3 z-10 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
          <FiLock className="text-gray-600" />
          <span>Locked</span>
        </div>
      ) : (
        <div className="absolute top-3 right-3 z-10 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
          <FiPlay className="text-blue-600" />
          <span>Available</span>
        </div>
      )}

      {/* Image with gradient overlay */}
      <div className={`w-full h-48 relative bg-gradient-to-br ${gradient}`}>
        {/* Module number overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-5xl font-bold opacity-30">{index + 1}</span>
        </div>
        
        {/* Time duration indicator */}
        <div className="absolute bottom-3 left-3 z-10 bg-black bg-opacity-50 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
          <FiClock />
          <span>{Math.floor(Math.random() * 30) + 15} mins</span>
        </div>
      </div>

      {/* Content section */}
      <div className="bg-white p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{lessonName}</h3>
        <p className="text-gray-600 mb-4 text-sm">{lessonTitle}</p>
        
        {/* Interactive button */}
        {isLocked ? (
          <button disabled className="w-full py-2 px-4 rounded-lg bg-gray-200 text-gray-500 flex items-center justify-center gap-2 cursor-not-allowed">
            <FiLock />
            <span>Unlock Later</span>
          </button>
        ) : (
          <button className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center gap-2 transition-colors group-hover:shadow-md">
            <FiPlay />
            <span>Start Lesson</span>
          </button>
        )}
      </div>

      {/* Highlight border that appears on hover */}
      <div className="absolute inset-0 border-2 border-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </motion.div>
  );
};

interface LessonListProps {
  courseDetails: FullCourseDetails;
}




const LessonList: React.FC<LessonListProps> = ({ courseDetails }) => {
  const { modules, courseName, groupedModules } = courseDetails;
  console.log(modules, 'modules')
  const lockedLessons = modules.slice(1); // Lock all lessons except the first one; // Lock all lessons except the first one

  // Calculate progress
  const completedCount = modules.length > 0 ? 1 : 0; // First module is unlocked
  const progressPercentage = modules.length > 0 ? Math.round((completedCount / modules.length) * 100) : 0;


   // Flatten groupedModules to a lookup map: { [lessonId]: title }
   const lessonMap: Record<string, string> = {};

   ['basic', 'intermediate', 'advanced'].forEach(level => {
     if (groupedModules[level]) {
       groupedModules[level].forEach((mod: any) => {
         lessonMap[mod.lessonId] = mod.title;
         console.log(mod, 'mod', mod.title)
       });
     }
   });
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{courseName} Lessons</h2>
          <p className="text-gray-600">Complete all lessons to master this course</p>
        </div>
        
        {/* Progress indicator */}
        <div className="bg-white p-4 rounded-xl shadow-md mt-4 md:mt-0">
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 rounded-full bg-blue-100"></div>
              <svg className="h-14 w-14 transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#E0E7FF" 
                  strokeWidth="8"
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#4F46E5" 
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * (completedCount / Math.max(1, modules.length)))}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-bold text-indigo-600 text-lg">
                  {progressPercentage}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Course Progress</p>
              <p className="font-semibold">{completedCount}/{modules.length} completed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((lessonId, index) => {
          const lessonTitle = lessonMap[lessonId] || `Module ${lessonId}`;
          const lessonName = `Lesson ${index + 1}`;
          const isLocked = lockedLessons.includes(lessonId);

          return (
            <LessonCard
              key={lessonId}
              lessonName={lessonName}
              lessonTitle={lessonTitle}
              isLocked={isLocked}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LessonList;