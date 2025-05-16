import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import BookRate from "./BookRate";
import AddToFavorite from "./AddToFavorite";
import AddToCart from "./AddToCart";

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const BookDetails = ({ book }) => {
  return (
    <div className="h-full flex flex-col">
      <motion.div
        variants={childVariants}
        className="flex items-start justify-between mb-auto"
      >
        <BookRate rate={book.rate} />
        <AddToFavorite book={book} />
      </motion.div>

      <motion.div
        variants={childVariants}
        className="flex justify-between items-center mt-auto"
      >
        <div>
          <motion.h6 variants={childVariants} className="font-bold">
            {book.title}
          </motion.h6>
          <motion.p variants={childVariants} className="text-xs text-gray-200">
            {book.mainCategory} <span className="opacity-80"> • </span>
            {book.subCategory}
          </motion.p>
          <motion.p variants={childVariants} className="text-md font-semibold">
            {book.price} EGP
          </motion.p>
        </div>
        {book.qty > 0 && <AddToCart book={book} />}
      </motion.div>
    </div>
  );
};

export default BookDetails;
