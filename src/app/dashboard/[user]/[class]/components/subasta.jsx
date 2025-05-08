'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const Subasta = () => {
  const [title, setTitle] = useState('Nueva subasta');
  const [count, setCount] = useState(0);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    setCount(prev => prev - 1);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-50 rounded-xl shadow-sm max-w-md mx-auto w-full border border-gray-100 flex flex-col items-center">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="w-full text-xl font-light mb-6 p-2 border-b border-green-200 focus:outline-none focus:border-green-400 bg-transparent dark:text-gray-800 transition-colors duration-200 placeholder-gray-400"
        placeholder="Auction Title"
      />
      <div className="flex items-center justify-center space-x-8 mt-2">
        <button
          onClick={handleDecrement}
          className="p-3 rounded-full bg-red-50 hover:bg-red-100 text-red-500 font-bold text-xl transition-colors duration-200 border border-red-100 shadow-none focus:outline-none"
        >
          -
        </button>
        <motion.div
          key={count}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-3xl font-light text-gray-800"
        >
          {count}
        </motion.div>
        <button
          onClick={handleIncrement}
          className="p-3 rounded-full bg-green-50 hover:bg-green-100 text-green-600 font-bold text-xl transition-colors duration-200 border border-green-100 shadow-none focus:outline-none"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Subasta;