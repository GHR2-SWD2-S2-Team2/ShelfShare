import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import BookRate from "./BookRate";
import AddToCart from "./AddToCart";
import AddToFavorites from "./AddToFavorites";

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const BookDetails = ({ book }) => {
  return (
    <>
      <motion.div
        variants={childVariants}
        className="flex items-start justify-between"
      >
        <BookRate
          bookId={book._id}
          rate={book.rating}
          userRate={book.myRate}
          canReview={book.canReview}
        />
        <AddToFavorites bookId={book._id} isFavorited={book.isFavorited} />
      </motion.div>

      <motion.div variants={childVariants} className="flex justify-between">
        <div>
          <motion.h3
            variants={childVariants}
            className="font-bold text-xl tracking-wide"
          >
            {book.title}
          </motion.h3>
          <motion.p variants={childVariants} className="text-sm text-gray-200">
            {book.mainCategory}, {book.subCategory}
          </motion.p>
          <motion.p variants={childVariants} className="text-md font-semibold">
            {book.price}$
          </motion.p>
        </div>
        <AddToCart book={book} />
      </motion.div>
    </>
  );
};

export default BookDetails;
