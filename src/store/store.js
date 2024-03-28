import { configureStore } from '@reduxjs/toolkit';
import favorite from './favoriteSlice/favoriteSlice';
import order from './orderSlice/orderSlice';
import cart from './cartSlice/cartSlice';
import items from './itemsSlice/itemsSlice';

export const store = configureStore({
	reducer: {
		favorite,
		order,
		cart,
		items,
	},
});
