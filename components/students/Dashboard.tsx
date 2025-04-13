'use client';

import React from 'react';
import { FiBook, FiCalendar, FiClock, FiStar } from 'react-icons/fi';

const Dashboard = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 rounded-2xl">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome back!</h1>
          <p className="text-gray-600 mt-1">Your learning journey continues today.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3 w-full sm:w-auto">
          <FiCalendar size={20} className="text-indigo-600" />
          <div>
            <p className="text-sm text-gray-500">Today</p>
            <p className="font-medium">{formattedDate}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-full">
            <FiBook size={24} className="text-indigo-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Completed lessons</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <FiClock size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Hours Learned</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <FiStar size={24} className="text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Achievements</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
