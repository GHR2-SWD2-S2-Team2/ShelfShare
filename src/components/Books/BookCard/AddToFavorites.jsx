import { Heart } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

const AddToFavorites = ({ bookId, isFavorited }) => {
  const [isFav, setIsFav] = useState(isFavorited);

  const handleToggle = async () => {
    // TODO:
  };

  return (
    <motion.div
      onClick={handleToggle}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className="relative group cursor-pointer transition-colors"
    >
      <Heart
        className="transition-colors duration-300"
        size={24}
        strokeWidth={2}
        color={isFav ? "red" : "white"}
        fill={isFav ? "red" : "none"}
      />
    </motion.div>
  );
};

export default AddToFavorites;
