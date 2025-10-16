import React from 'react';
import { MdLock } from 'react-icons/md';

const statData = [
  { label: 'Materials', value: 0 },
  { label: 'Flashcards', value: 0 },
  { label: 'Tests & QuizFetch', value: 0 },
  { label: 'Tutor Me', value: 0 },
  // { label: 'Arcade', value: 1 },
  { label: 'Audio Recap', value: 0 },
];

const DashboardPage = () => (
  <section className="px-4 md:px-10 py-8">
    <div className="flex flex-wrap gap-4 md:gap-8 mb-8">
      {statData.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl shadow p-4 md:p-8 flex flex-col items-center min-w-[90px] md:min-w-[120px] text-indigo-900">
          <span className="text-base md:text-lg">{stat.label}</span>
          <span className="text-xl md:text-2xl font-bold mt-1">{stat.value}</span>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-2xl shadow p-6 md:p-10 flex flex-col items-center max-w-2xl mx-auto">
      <div className="text-center w-full">
        <span className="inline-block bg-gray-200 text-gray-500 rounded px-3 py-1 text-sm mb-2">Not Started</span>
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">Upload First Material</h2>
        <p className="text-gray-500 mb-4">Start by uploading your first study material to this study set.</p>
        <div className="flex gap-4 justify-center mb-4 flex-wrap">
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white rounded px-4 py-2 font-medium transition">Upload Materials</button>
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white rounded px-4 py-2 font-medium transition">Generate Materials from Topic</button>
        </div>
      </div>
      <div className="relative w-full flex flex-col items-center mt-6 border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl py-6 min-w-[180px] md:min-w-[350px]">
        <span className="absolute -top-4 left-6 bg-gray-200 text-gray-500 rounded px-3 py-1 text-sm">Locked</span>
        <div className="flex flex-col items-center gap-2 mt-2 w-full">
          <div className="w-32 h-4 bg-gray-300 rounded mb-1" />
          <div className="w-32 h-4 bg-gray-300 rounded mb-1" />
          <MdLock className="text-3xl text-gray-400 mt-2" />
        </div>
      </div>
    </div>
  </section>
);

export default DashboardPage;
