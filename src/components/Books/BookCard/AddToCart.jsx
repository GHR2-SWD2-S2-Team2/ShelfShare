import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { CartContext } from "../../../Context/cartContext";
import toast from 'react-hot-toast';

const AddToCart = ({ book }) => {
  const { addItem } = useContext(CartContext);

  const handleAddToCart = () => {
    addItem(book, 1);
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } bg-white shadow-lg rounded-lg pointer-events-auto p-3 flex items-center gap-2`}
      >
        <i className="bi bi-cart-check text-xl text-brown"></i>
        <div>
          <p className="text-sm font-medium text-brown">
            Added to Cart
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
  };

  return (
    <motion.div
      onClick={handleAddToCart}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="bg-yellow-800 p-2 flex items-center justify-center rounded-full cursor-pointer"
    >
      <AddShoppingCartIcon />
    </motion.div>
  );
};

export default AddToCart;
