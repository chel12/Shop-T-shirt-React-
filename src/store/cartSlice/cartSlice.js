import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//перейти,достать,вернуть (Санка получения данных)
export const fetchCart = createAsyncThunk('cart/fetchCartsItems', async () => {
	const { data } = await axios.get('https://f4b4503d373ac905.mokky.dev/cart');
	return data;
});

//добавление карточки в корзину
export const onAddToCart = createAsyncThunk(
	'cart/onAddToCart',
	async (obj, { getState, dispatch }) => {
		const state = getState();
		const findObj = state.cart.cartItems.find(
			(item) => item.title === obj.title
		);

		if (findObj) {
			await axios.delete(
				`https://f4b4503d373ac905.mokky.dev/cart/${findObj.id}`
			);
			dispatch(removeCartItems(findObj));
		} else {
			const { data } = await axios.post(
				'https://f4b4503d373ac905.mokky.dev/cart',
				obj
			);
			dispatch(addCartItems(data));
		}
		// это как setCartItems([...cartItems, obj]);
	}
);

export const onRemoveItem = createAsyncThunk(
	'cart/onRemoveCart',
	async (obj, { dispatch }) => {
		await axios.delete(`https://f4b4503d373ac905.mokky.dev/cart/${obj.id}`);
		dispatch(delCartItem(obj));
	}
);

const initialState = {
	cartItems: [] || null,
	totalPrice: 0,
	status: 'loading', //loading | success | error (для контроля скелетона)
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartItems(state, action) {
			state.cartItems = action.payload;
		},
		addCartItems(state, action) {
			state.cartItems.push(action.payload);
		},
		removeCartItems(state, action) {
			state.cartItems = state.cartItems.filter(
				(item) => item.id !== action.payload.id
			);
		},
		delCartItem(state, action) {
			state.cartItems = state.cartItems.filter(
				(item) => item.parentId !== action.payload.parentId
			);
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
//
export const getTotalPrice = (state) => {
	return state.cart.cartItems?.reduce((acc, item) => item.price + acc, 0);
};

// Action creators are generated for each case reducer function
export const { setCartItems, addCartItems, removeCartItems, delCartItem } =
	cartSlice.actions;

export default cartSlice.reducer;
