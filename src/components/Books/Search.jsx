import { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, XIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../app/features/FiltersSlice";

const Search = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilter({ search: searchQuery.trim(), page: 1 }));
  };

  return (
    <form onSubmit={handleSearch} className="w-full" ref={containerRef}>
      <motion.div
        initial={false}
        animate={{
          boxShadow: isActive
            ? "0px 8px 20px rgba(0,0,0,0.1)"
            : "0px 4px 8px rgba(0,0,0,0.05)",
          backgroundColor: isActive ? "#ffffff" : "#f3f4f6",
          borderRadius: "999px",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
        onClick={() => {
          setIsActive(true);
          inputRef.current?.focus();
        }}
        className="flex items-center px-4 py-2 mb-4 border border-gray-200 cursor-text"
      >
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <SearchIcon
            className={`transition-colors ${
              isActive ? "text-yellow-800" : "text-gray-500"
            }`}
            size={18}
          />
        </motion.div>

        <AnimatePresence>
          {(isActive || searchQuery) && (
            <motion.div
              key="input"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex items-center ml-3 w-full"
            >
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, ISBN, or author..."
                className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
              />
              {searchQuery && (
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchQuery("");
                    dispatch(setFilter({ search: "", page: 1 }));
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                >
                  <XIcon size={16} />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </form>
  );
};

export default Search;
