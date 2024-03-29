import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

//перейти,достать,вернуть (Санка получения данных)
export const fetchCart = createAsyncThunk('cart/fetchCartsItems', async () => {
	const { data } = await axios.get('https://f4b4503d373ac905.mokky.dev/cart');
	return data;
});

//добавление карточки в корзину
export const onAddToCart = createAsyncThunk('cart/onAddToCart', async (obj) => {
	const dispatch = useDispatch();

	const findItem = (state) =>
		state.cart.cartItems.find(
			(item) => Number(item.parentId) === Number(obj.id)
		);

	if (findItem) {
		dispatch(
			setCartItems((prev) =>
				prev.filter((item) => Number(item.parentId) !== Number(obj.id))
			)
		);
		await axios.delete(
			`https://f4b4503d373ac905.mokky.dev/cart/${findItem.id}`
		);
	} else {
		dispatch(setCartItems((prev) => [...prev, obj]));
		const { data } = await axios.post(
			'https://f4b4503d373ac905.mokky.dev/cart',
			obj
		);
		dispatch(
			setCartItems((prev) =>
				prev.map((item) => {
					if (item.parentId === data.parentId) {
						return {
							...item,
							id: data.id,
						};
					} else {
						return item;
					}
				})
			)
		);
	}
	// это как setCartItems([...cartItems, obj]);
});
export const onRemoveItem = createAsyncThunk(
	'cart/onRemoveCart',
	async (id) => {
		const dispatch = useDispatch();

		await axios.delete(`https://f4b4503d373ac905.mokky.dev/cart/${id}`);
		dispatch(
			setCartItems((prev) =>
				prev.filter((item) => Number(item.id) !== Number(id))
			)
		);
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
export const { setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
