import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FavoriteContext } from "../../../Context/favoriteContext";
import toast from 'react-hot-toast';

const AddToFavorite = ({ book }) => {
  const { addToFavorites, removeFromFavorites, isInFavorites } = useContext(FavoriteContext);

  const handleToggleFavorite = () => {
    const isFavorite = isInFavorites(book._id);
    if (isFavorite) {
      removeFromFavorites(book._id);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } bg-white shadow-lg rounded-lg pointer-events-auto p-3 flex items-center gap-2`}
        >
          <i className="fa-solid fa-heart-crack text-xl text-brown"></i>
          <div>
            <p className="text-sm font-medium text-brown">
              Removed from Favorites
            </p>
            <p className="text-xs text-gray-500">
              {book.title}
            </p>
          </div>
        </div>
      ), {
        duration: 2000,
        position: 'top-center',
      });
    } else {
      addToFavorites(book);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } bg-white shadow-lg rounded-lg pointer-events-auto p-3 flex items-center gap-2`}
        >
          <i className="fa-solid fa-heart text-xl text-brown"></i>
          <div>
            <p className="text-sm font-medium text-brown">
              Added to Favorites
            </p>
            <p className="text-xs text-gray-500">
              {book.title}
            </p>
          </div>
        </div>
      ), {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  return (
    <motion.div
      onClick={handleToggleFavorite}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="favorite-btn cursor-pointer"
    >
      <i className={`fa-${isInFavorites(book._id) ? 'solid' : 'regular'} fa-heart fs-5 text-brown`}></i>
    </motion.div>
  );
};

export default AddToFavorite; 