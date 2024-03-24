import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//перейти,достать,вернуть (Санка получения данных)
export const fetchCart = createAsyncThunk(
	'cart/fetchCartsStatus',
	async () => {
		const { data } = await axios.get(
			'https://f4b4503d373ac905.mokky.dev/cart'
		);
		return data;
	}
);

const initialState = {
	cartItems: [],
	status: 'loading', //loading | success | error (для контроля скелетона)
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartItems(state, action) {
			state.cartItems = action.payload;
		},
	},
	extraReducers: (builder) => {
		//обработка Санки и состояний её, где задаём статус загрузки
		builder
			.addCase(fetchCart.pending, (state) => {
				state.status = 'loading';
				state.cartItems = [];
			})
			.addCase(fetchCart.fulfilled, (state, action) => {
				state.cartItems = action.payload;
				state.status = 'success';
			})
			.addCase(fetchCart.rejected, (state) => {
				state.status = 'error';
				state.cartItems = [];
			});
	},
});
//селекторы
// export const selectGameData = (state) => state.game;

// Action creators are generated for each case reducer function
export const { setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
