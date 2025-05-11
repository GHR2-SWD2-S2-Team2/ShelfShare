import { StarIcon } from "lucide-react";
const BookRate = ({ rate }) => {
  return (
    <div className="relative inline-block">
      <div className={`flex items-center gap-1`}>
        <StarIcon size={20} className="text-yellow-500 fill-yellow-500" />
        <span className="text-sm font-semibold">
          {rate?.toFixed(1) ?? "0.0"}
        </span>
      </div>
    </div>
  );
};

export default BookRate;
