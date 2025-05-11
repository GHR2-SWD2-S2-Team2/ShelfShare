import React, { createContext, useState, useContext } from "react";

// Create context
export const CartContext = createContext();

// Provider
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (book, qty = 1) => {
    console.log("book", book);
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.book._id === book._id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.book._id === book._id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      } else {
        return [...prevItems, { book, qty }];
      }
    });
  };

  const removeItem = (bookId) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.book._id !== bookId)
    );
  };

  const updateItemQty = (bookId, qty) => {
    if (qty < 1) {
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.book._id === bookId ? { ...item, qty } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateItemQty }}
    >
      {children}
    </CartContext.Provider>
  );
}