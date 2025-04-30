import { StarIcon } from "lucide-react";

const STAR_COUNT = [1, 2, 3, 4, 5];

const Stars = ({
  isFilled,
  interactive,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => (
  <>
    {STAR_COUNT.map((value) => (
      <StarIcon
        key={value}
        size={20}
        className={`transition-transform duration-150 ${
          isFilled(value)
            ? "text-yellow-500 fill-yellow-500 scale-110"
            : "text-gray-300 hover:text-yellow-400 hover:scale-105"
        }`}
        onClick={() => interactive && onClick(value)}
        onMouseEnter={() => interactive && onMouseEnter(value)}
        onMouseLeave={() => interactive && onMouseLeave()}
      />
    ))}
  </>
);
export default Stars;
