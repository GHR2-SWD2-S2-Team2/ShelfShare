import { useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEditUserInfoMutation } from "../../app/features/usersApi";
import toast from "react-hot-toast";
import { FiEdit, FiCheck, FiLoader } from "react-icons/fi";

const Input = ({ label, name, value, editable = true, isVerified }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const [editUserInfo, { isLoading }] = useEditUserInfoMutation();

  const handleToggle = async () => {
    if (!editable) return;

    if (isEditing) {
      const newValue = inputRef.current?.value;
      if (newValue !== value) {
        try {
          await editUserInfo({
            data: { [name]: newValue },
            token: localStorage.getItem("userToken"),
          }).unwrap();
          toast.success(`${label} updated successfully`);
        } catch (err) {
          toast.error(err?.data?.message || `Failed to update ${label}`);
        }
      }
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="flex flex-col gap-1 w-full"
    >
      <label className="text-sm font-semibold text-gray-600">{label}</label>

      <div
        className={`relative flex items-center px-3 py-2 rounded-lg border transition-all duration-200 ${
          isEditing
            ? "border-blue-500 ring-2 ring-blue-200 shadow-sm bg-white"
            : "border-gray-200 bg-gray-50 hover:bg-gray-100"
        } ${
          editable
            ? "cursor-pointer hover:border-blue-400"
            : "cursor-not-allowed"
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          name={name}
          defaultValue={value}
          disabled={!isEditing}
          className={`flex-grow bg-transparent text-sm font-medium outline-none placeholder-gray-400 transition-colors ${
            isEditing ? "text-gray-900" : "text-gray-600"
          }`}
        />

        {editable && (
          <button
            type="button"
            onClick={handleToggle}
            disabled={isLoading}
            title={isEditing ? "Save changes" : "Edit"}
            className="ml-3 flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-all hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? (
              <FiLoader className="w-4 h-4 animate-spin" />
            ) : isEditing ? (
              <>
                <FiCheck className="w-4 h-4" />
                <span>Save</span>
              </>
            ) : (
              <>
                <FiEdit className="w-4 h-4" />
                <span>Edit</span>
              </>
            )}
          </button>
        )}
        {isVerified && (
          <span
            className={`absolute top-1/2 -translate-y-1/2 right-3 text-green-500 text-sm font-semibold ${
              isEditing ? "opacity-0" : "opacity-100"
            }`}
          >
            Verified
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default Input;
