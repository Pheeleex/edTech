'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiClock, FiBook, FiStar, FiArrowUpRight } from 'react-icons/fi';
import { FullCourseDetails, LessonLevel } from '@/types';

interface ModuleItem {
  title: string;
  topics: string[];
}

interface CourseDisplayProps {
  course: FullCourseDetails;
}

const CourseDisplay: React.FC<CourseDisplayProps> = ({ course }) => {
  const { courseName, duration, groupedModules } = course;
  const [activeTab, setActiveTab] = useState<LessonLevel>('basic');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const toggleModule = (moduleTitle: string) => {
    const newSet = new Set(expandedModules);
    if (newSet.has(moduleTitle)) {
      newSet.delete(moduleTitle);
    } else {
      newSet.add(moduleTitle);
    }
    setExpandedModules(newSet);
  };

  const ModuleLevels = [
    { key: 'basic' as LessonLevel, label: 'Fundamentals', icon: <FiBook /> },
    { key: 'intermediate' as LessonLevel, label: 'Core Concepts', icon: <FiStar /> },
    { key: 'advanced' as LessonLevel, label: 'Advanced Topics', icon: <FiArrowUpRight /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-xl mt-12 hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="absolute -top-6 left-6 bg-indigo-600 text-white px-6 py-2 rounded-full flex items-center gap-2">
        <FiClock className="text-lg" />
        <span className="font-semibold">
          {duration} month{duration > 1 ? 's' : ''}
        </span>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
        {courseName}
      </h1>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {ModuleLevels.map((level) => (
          <button
            key={level.key}
            onClick={() => setActiveTab(level.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === level.key
                ? 'bg-indigo-600 text-white'
                : 'hover:bg-indigo-50 text-gray-600'
            }`}
          >
            {level.icon}
            <span className="font-medium">{level.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="space-y-6"
        >
          {groupedModules[activeTab]?.map((module: ModuleItem, idx: number) => (
            <div 
              key={idx}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div 
                onClick={() => toggleModule(module.title)}
                className="flex justify-between items-center cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-gray-800">{module.title}</h3>
                <motion.div
                  animate={{ rotate: expandedModules.has(module.title) ? 180 : 0 }}
                >
                  <FiChevronDown className="text-gray-600 text-xl" />
                </motion.div>
              </div>

              <AnimatePresence>
                {expandedModules.has(module.title) && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2 pl-6 border-l-2 border-indigo-200"
                  >
                    {module.topics.map((topic: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-2"
                      >
                        <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                        {topic}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default CourseDisplay;
