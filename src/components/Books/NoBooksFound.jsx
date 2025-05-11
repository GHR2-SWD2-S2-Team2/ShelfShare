import { BookX } from "lucide-react";
import React from "react";

const NoBooksFound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 mb-40 text-center">
      <BookX
        size={150}
        color="var(--color-primary)"
        className=" opacity-20 mb-4"
      />
      <span className="font-bold text-xl opacity-50 text-gray-700">
        No Books Founded
      </span>
    </div>
  );
};

export default NoBooksFound;
