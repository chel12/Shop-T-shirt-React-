import { configureStore } from '@reduxjs/toolkit';
import favoriteSlice from './favoriteSlice/favoriteSlice';
import orderSlice from './orderSlice/orderSlice';
import cartSlice from './cartSlice/cartSlice';
export const store = configureStore({
	reducer: {
		favoriteSlice,
		orderSlice,
		cartSlice,
	},
});
