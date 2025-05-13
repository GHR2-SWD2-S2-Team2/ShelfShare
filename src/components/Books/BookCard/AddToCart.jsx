import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { CartContext } from "../../../Context/cartContext";
const AddToCart = ({ book }) => {

    let { addItem } = useContext(CartContext);
  const handleAddToCart = () => {
    addItem(book, 1);
  };

  return (
    <motion.div
      onClick={handleAddToCart}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="bg-yellow-800 p-2 flex items-center justify-center rounded-full"
    >
      <AddShoppingCartIcon />
    </motion.div>
  );
};

export default AddToCart;
