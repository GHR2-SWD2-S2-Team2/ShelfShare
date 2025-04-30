import { StarIcon } from "lucide-react";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Stars from "./Stars";
import { useReviewBookMutation } from "../../../app/features/booksApi";

const animationProps = {
  initial: { opacity: 0, scale: 0.95, y: -5 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -5 },
  transition: { duration: 0.15, ease: "easeOut" },
};

const BookRate = ({ bookId, rate, userRate = 0, canReview }) => {
  const [hoverState, setHoverState] = useState({ hovered: false, value: 0 });
  const [reviewBook] = useReviewBookMutation();

  const handleRate = async (value) => {
    try {
      await reviewBook({ bookId, rate: value }).unwrap();
      toast.success("Rating submitted successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit rating.");
    }
  };

  const handleMouseEnter = (value) => setHoverState({ hovered: true, value });
  const handleMouseLeave = () => setHoverState({ hovered: false, value: 0 });

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => handleMouseEnter(hoverState.value)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`flex items-center gap-1 ${
          canReview ? "cursor-pointer hover:opacity-80" : "cursor-default"
        }`}
      >
        <StarIcon size={20} className="text-yellow-500 fill-yellow-500" />
        <span className="text-sm font-semibold">
          {rate?.toFixed(1) ?? "0.0"}
        </span>
      </div>

      <AnimatePresence>
        {hoverState.hovered && (
          <div className="relative mt-2 z-20">
            {userRate > 0 && (
              <motion.div
                {...animationProps}
                className="absolute left-0 top-0 flex rounded-xl shadow-xl pr-1"
              >
                <Stars
                  isFilled={(value) =>
                    hoverState.value >= value ||
                    (!hoverState.value && userRate >= value)
                  }
                  interactive={false}
                />
              </motion.div>
            )}

            {canReview && (
              <motion.div
                {...animationProps}
                className="flex items-center rounded-xl shadow-xl pr-1"
              >
                <Stars
                  isFilled={(value) =>
                    hoverState.value >= value ||
                    (!hoverState.value && userRate >= value)
                  }
                  interactive={true}
                  onClick={handleRate}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
                {hoverState.value > 0 && (
                  <span className="font-bold ml-1">{hoverState.value}</span>
                )}
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookRate;
