'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiClock, FiBook, FiStar, FiArrowUpRight } from 'react-icons/fi';
import { useUser } from '@/lib/context/UserContext';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Module {
  title: string;
  topics: string[];
}

interface CourseModules {
  basic?: Module[];
  intermediate?: Module[];
  advanced?: Module[];
}

export interface Course {
  id?: string; // Make the id optional
  title: string;
  duration: number;
  modules: CourseModules;
}

interface CourseDisplayProps {
  course: Course;
}

const CourseDisplay: React.FC<CourseDisplayProps> = ({ course }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { title, duration, modules } = course;
  const [activeTab, setActiveTab] = useState<'basic' | 'intermediate' | 'advanced'>('basic');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const user = useUser()
  const router = useRouter()

  console.log(title, duration, modules)

  const toggleModule = (moduleTitle: string) => {
    const newSet = new Set(expandedModules);
    newSet.has(moduleTitle) ? newSet.delete(moduleTitle) : newSet.add(moduleTitle);
    setExpandedModules(newSet);
  };

  const ModuleLevels = [
    { key: 'basic', label: 'Fundamentals', icon: <FiBook /> },
    { key: 'intermediate', label: 'Core Concepts', icon: <FiStar /> },
    { key: 'advanced', label: 'Advanced Topics', icon: <FiArrowUpRight /> },
  ];

  const enroll = async () => {
    setIsLoading(true)
    if (!user.user) {
      router.push('/sign-up');
    } else {
      try {
           // Add null check for user.user and uid
      if (!user.user?.uid) {
        throw new Error('User not properly authenticated');
      }
        // Reference to the user's document
        const userRef = doc(db, 'users', user.user?.uid);
        
        // Update the studentCourse field
        await updateDoc(userRef, {
          studentCourse: title // Make sure course is available in scope
        });
  
        // Optional: Redirect or show success message
        console.log('Enrollment successful!');
        setIsLoading(false)
         router.push(`/students/${user.user.uid}`);
        
      } catch (error) {
        console.error('Error updating document:', error);
        // Handle error (show error message to user)
      }
    }
  };

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
        {title}
      </h1>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {ModuleLevels.map((level) => (
          <button
            key={level.key}
            onClick={() => setActiveTab(level.key as typeof activeTab)}
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

      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="space-y-6"
        >
          {modules[activeTab]?.map((module, idx) => (
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
                    {module.topics.map((topic, index) => (
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

      <div className="mt-8 flex justify-end">
        <button 
          onClick={enroll}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
          {isLoading ? 'Enrolling...' : 'Enroll Now'}
          <FiArrowUpRight className="text-lg" />
        </button>
      </div>
    </motion.div>
  );
};

export default CourseDisplay;