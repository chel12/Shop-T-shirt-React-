import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';

export const useCard = () => {
	const { cartItems, setCartItems } = useContext(AppContext);
	const totalPrice = cartItems.reduce((acc, obj) => obj.price + acc, 0);
	return { cartItems, setCartItems, totalPrice };
};
