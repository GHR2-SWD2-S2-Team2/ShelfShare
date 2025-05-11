import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import BookDetails from "./BookDetails";

const overlayVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const BookCard = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-2xl w-51 mx-4 shadow-xl cursor-pointer transition-transform  relative overflow-hidden"
    >
      <motion.div
        whileHover={{ scale: 1.07 }}
        className="h-70 w-full transition-transform duration-300"
      >
        <motion.img
          animate={isHovered ? { scale: 1.07 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover pointer-events-none"
        />
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 p-2 flex flex-col justify-between text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {book.qty > 0 ? (
          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-700 dark:text-green-200 ">
            In Stock ({book.qty})
          </span>
        ) : (
          <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-700 dark:text-red-200 ">
            Out of Stock
          </span>
        )}
      </motion.div>

      <motion.div
        variants={overlayVariants}
        animate={isHovered ? "visible" : "hidden"}
        initial="hidden"
        className="absolute top-0 left-0 h-full w-full p-4 flex flex-col justify-between text-white bg-black/50 backdrop-blur-xs rounded-2xl"
      >
        <BookDetails book={book} />
      </motion.div>
    </div>
  );
};

export default BookCard;
