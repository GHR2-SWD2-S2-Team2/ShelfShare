import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../app/features/FiltersSlice";

const PriceRange = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setFilter({
        minPrice: minPrice.trim(),
        maxPrice: maxPrice.trim(),
        page: 1,
      })
    );
  }, [minPrice, maxPrice, dispatch]);

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <div className="w-full">
        <label
          htmlFor="minPrice"
          className="block text-sm font-medium  text-gray-700"
        >
          Min Price
        </label>

        <input
          id="minPrice"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="mt-1 block  px-3 py-2   border rounded-xl w-full focus:outline-none"
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="maxPrice"
          className="block text-sm font-medium text-gray-700"
        >
          Max Price
        </label>
        <input
          id="maxPrice"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="mt-1 block  px-3 py-2  border w-full rounded-xl focus:outline-none"
        />
      </div>
    </div>
  );
};

export default PriceRange;
