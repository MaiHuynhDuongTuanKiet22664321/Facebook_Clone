"use client";

import { motion } from "framer-motion";

export default function Loader() {
  const dotVariants = {
    hidden: { y: 0, opacity: 0.3 },
    visible: (i) => ({
      y: [-6, 6, -6],
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-blue-600 dark:bg-blue-900 z-50">
      {/* Logo Facebook */}
      <div className="relative w-40 h-40">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-full h-full text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <path
            fill="currentColor"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </motion.svg>
      </div>

      {/* 3 chấm loading */}
      <div className="flex space-x-3">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-5 h-5 bg-white rounded-full"
            initial="hidden"
            animate="visible"
            custom={index}
            variants={dotVariants}
          />
        ))}
      </div>

      {/* Tên thương hiệu */}
      <motion.div
        className="text-3xl mt-4 font-extrabold tracking-widest bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent drop-shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Facebook
      </motion.div>

      {/* Thông báo phụ */}
      <motion.div
        className="text-sm text-white mt-1 tracking-wide opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Đang tải nội dung...
      </motion.div>
    </div>
  );
}
