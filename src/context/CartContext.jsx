import {createContext, useContext, useEffect, useState} from "react";
import {AUTH_ENDPOINTS} from "../api/authApi.js";
import {usePostMutation} from "../hooks/usePostMutation.js";

export const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    const cartKey = 'cart';

    useEffect(() => {
        const savedCart = localStorage.getItem(cartKey);
        setCartProducts(savedCart ? JSON.parse(savedCart) : [])
    }, []);

    const setCartProducts = (products) => {
        setCartItems(products)
        if(products){
            localStorage.setItem(cartKey, JSON.stringify(products));
        } else{
            localStorage.removeItem(cartKey)
        }
    }

    const addItemToCart = (item) => {
        const foundItem = cartItems.find(cartItem => cartItem.id === item.id);
        console.log(item?.quantity ? 'si' : 1)
        // const quantity =

        cartItems.map(p => {
            if(p == item.id) {
                return {...item}
            }
        })

        const newItem = {
            ...item,
            quantity: item?.quantity ? (foundItem ? item.quantity++ : item.quantity) : 1,
        }

        setCartItems(cart => ([
            newItem,
            ...cart,
        ]))
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }

    return (
        <CartContext.Provider value={{cartItems, setCartProducts, addItemToCart}}>
            {children}
        </CartContext.Provider>
    )
}