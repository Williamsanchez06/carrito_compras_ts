import { useEffect, useMemo, useState } from 'react';

import { db } from "../data/db";

import { CardItem, Product } from '../interfaces/indexInterface';


export const useCart = () => {

    const initialCart = () : CardItem[] =>  {

        const localStorageCart =  localStorage.getItem('products');
        return localStorageCart ? JSON.parse( localStorageCart ) : [];

    }

    const [data, setData] = useState<Product[]>([]);
    const [cart, setCart] = useState(initialCart);

    const MIN_QUANTITY_PRODUCT = 1;
    const MAX_QUANTITY_PRODUCT = 5;

    useEffect(() => {
        setData( db );
    }, []);

    useEffect(() => {

        if (cart.length > 0) {
            localStorage.setItem('products', JSON.stringify(cart));
        }

    }, [cart]);

    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const buyTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

    const addToCart = (product : Product ) => {

        const isInCart = cart.some(item => item.id === product.id);

        if (!isInCart) {

            const cardItem: CardItem = { ...product, quantity: 1 };
            setCart(prevCart => [...prevCart, cardItem]);

        } else {
            console.log('Ya existe');
        }

    }

    const getProductData = ( id : Product['id'] ) => {
        const productIndex = cart.findIndex(product => product.id === id);
        const updatedCart = [...cart];

        return {
            updatedCart,
            productIndex
        };
    }

    const increaseQuantity = ( id : Product['id'] ) => {
        const {updatedCart, productIndex} = getProductData(id);

        if (updatedCart[productIndex].quantity === MAX_QUANTITY_PRODUCT) return;

        updatedCart[productIndex].quantity++;
        setCart(updatedCart);
    }

    const decreaseQuantity = ( id : Product['id'] ) => {
        const {updatedCart, productIndex} = getProductData(id);

        if (updatedCart[productIndex].quantity === MIN_QUANTITY_PRODUCT) return;

        updatedCart[productIndex].quantity--;
        setCart(updatedCart);
    }

    const deleteToCart = ( id : Product['id']) => {

        const updateCart = cart.filter(product => product.id !== id);
        setCart(updateCart);

    }

    const clearCart = () => {
        setCart([]);
    }

    return {
        data,
        cart,
        clearCart,
        isEmpty,
        buyTotal,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        deleteToCart
    }

}