import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../app/features/FiltersSlice";

const Tab = ({ to, text, hoveredTab, setHoveredTab }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const isHovered = hoveredTab === to;
  const isFocused = isHovered || (!hoveredTab && isActive);
  const dispatch = useDispatch();
  if (isActive) {
    if (text === "All") {
      dispatch(setFilter({ mainCategory: "", page: 1 }));
    } else {
      dispatch(setFilter({ mainCategory: text, page: 1 }));
    }
  }
  return (
    <Link
      to={to}
      className="flex text-center flex-grow text-sm font-medium duration-300 text-decoration-none"
      style={{
        color: isFocused ? "white" : "var(--color-primary)",
      }}
    >
      <motion.div
        className="relative h-full w-full px-4 py-2 rounded-full cursor-pointer"
        onMouseEnter={() => setHoveredTab(to)}
        onMouseLeave={() => setHoveredTab(null)}
      >
        {isFocused && (
          <motion.div
            layoutId="categories"
            className="absolute inset-0 -z-1 rounded-full"
            transition={{ type: "tween", duration: 0.3 }}
            style={{ backgroundColor: "var(--color-primary)" }}
          />
        )}

        {text}
      </motion.div>
    </Link>
  );
};

export default Tab;
