import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
export const CartContext = createContext();

// Provider
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Debug log whenever items change
  useEffect(() => {
    console.log('Cart Items Updated:', items);
  }, [items]);

  const addItem = (book, qty = 1) => {
    if (!book) return;
    
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.book._id === book._id);

      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.book._id === book._id
            ? { ...item, qty: item.qty + qty }
            : item
        );
        console.log('Updated Items:', updatedItems);
        return updatedItems;
      } else {
        const newItems = [...prevItems, { book, qty }];
        console.log('New Items:', newItems);
        return newItems;
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
      removeItem(bookId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.book._id === bookId ? { ...item, qty } : item
      )
    );
  };

  const getCartCount = () => {
    return items.reduce((total, item) => total + (item.qty || 1), 0);
  };

  return (
    <CartContext.Provider
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateItemQty,
        getCartCount,
        cartCount: getCartCount()
      }}
    >
      {children}
    </CartContext.Provider>
  );
}