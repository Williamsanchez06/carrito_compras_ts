import { useEffect, useMemo, useState } from 'react';
import { db } from "../data/db.ts";

export const useCart = () => {

    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);

    const MIN_QUANTITY_PRODUCT = 1;
    const MAX_QUANTITY_PRODUCT = 5;

    useEffect(() => {

        setData(db);
        const productsLocalStorage = JSON.parse(localStorage.getItem('products')) || [];
        setCart(productsLocalStorage);

    }, []);

    useEffect(() => {

        if (cart.length > 0) {
            localStorage.setItem('products', JSON.stringify(cart));
        }

    }, [cart]);

    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const buyTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

    const addToCart = (product) => {

        const isInCart = cart.some(item => item.id === product.id);

        if (!isInCart) {

            product.quantity = 1;
            setCart(prevCart => [...prevCart, product]);

        } else {
            console.log('Ya existe');
        }

    }

    const getProductData = (id) => {
        const productIndex = cart.findIndex(product => product.id === id);
        const updatedCart = [...cart];

        return {
            updatedCart,
            productIndex
        };
    }

    const increaseQuantity = (id) => {
        const {updatedCart, productIndex} = getProductData(id);

        if (updatedCart[productIndex].quantity === MAX_QUANTITY_PRODUCT) return;

        updatedCart[productIndex].quantity++;
        setCart(updatedCart);
    }

    const decreaseQuantity = (id) => {
        const {updatedCart, productIndex} = getProductData(id);

        if (updatedCart[productIndex].quantity === MIN_QUANTITY_PRODUCT) return;

        updatedCart[productIndex].quantity--;
        setCart(updatedCart);
    }

    const deleteToCart = (id) => {

        const updateCart = cart.filter(product => product.id !== id);
        setCart(updateCart);

    }

    return {
        data,
        cart,
        setCart,
        isEmpty,
        buyTotal,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        deleteToCart
    }

}