import axios from "axios";
import { createContext} from "react";

let headers = {
    token : localStorage.getItem('userToken')
}


export const CartContext = createContext();


export default function CartContextProvider(props) {
    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, 
            { productId : productId }, 
            { headers : headers})
            .then((response) => response)
            .catch((error) => (error)
            )
    }
    function getProductToCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers : headers})
            .then((response) => response)
            .catch((error) => (error)
            )
    }
    function deleteProductFromCart(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers : headers})
            .then((response) => response)
            .catch((error) => (error)
            )
    }
    function updateProductInCart(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count : count }, { headers : headers})
            .then((response) => response)
            .catch((error) => (error)
            )
    }
    return <CartContext.Provider value={{addProductToCart , getProductToCart , deleteProductFromCart , updateProductInCart}}>
    { props.children }

</CartContext.Provider>

}








// import React, { createContext, useState } from 'react';

// export const CartContext = createContext();

// export default function CartContextProvider({ children }) {
//   const [cartCount, setCartCount] = useState(0);

//   const addToCart = () => setCartCount(prev => prev + 1);
//   const removeFromCart = () => setCartCount(prev => (prev > 0 ? prev - 1 : 0));

//   return (
//     <CartContext.Provider value={{ cartCount, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// } 