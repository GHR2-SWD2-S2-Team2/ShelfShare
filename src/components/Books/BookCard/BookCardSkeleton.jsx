// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Heart, StarIcon } from "lucide-react";

const BookCardSkeleton = () => {
  return (
    <div className="rounded-2xl w-72 mx-4 shadow-xl  relative overflow-hidden animate-pulse">
      <div className="h-96 w-full bg-gray-100" />

      <motion.div className="absolute top-0 left-0 h-full w-full p-4 flex flex-col justify-between text-white bg-black/10 rounded-2xl">
        <div className="flex items-start justify-between mb-4">
          <StarIcon size={20} className="text-gray-400 fill-gray-400" />

          <Heart className="text-gray-400 fill-gray-400" size={24} />
        </div>

        <div className="flex justify-between ">
          <div>
            <div className="h-6 w-40 bg-gray-400 rounded-md mb-2" />
            <div className="h-4 w-28 bg-gray-400 rounded mb-2" />
            <div className="h-5 w-16 bg-gray-400 rounded" />
          </div>
          <div className="bg-gray-400 w-fit h-fit p-5 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default BookCardSkeleton;
