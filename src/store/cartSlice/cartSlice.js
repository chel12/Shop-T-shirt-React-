import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//перейти,достать,вернуть (Санка получения данных)
export const fetchCart = createAsyncThunk('cart/fetchCartsItems', async () => {
	try {
		const { data } = await axios.get(
			'https://f4b4503d373ac905.mokky.dev/cart'
		);
		return data;
	} catch (error) {
		alert('Ошибка при запросе карточек корзины');
		console.log(error.message);
	}
});

//добавление карточки в корзину
export const onAddToCart = createAsyncThunk('cart/onAddToCart', async (obj) => {
	try {
		const findItem = (state) =>
			state.cart.cartItems.find(
				(item) => Number(item.parentId) === Number(obj.id)
			);

		if (findItem) {
			setCartItems((prev) =>
				prev.filter((item) => Number(item.parentId) !== Number(obj.id))
			);
			await axios.delete(
				`https://f4b4503d373ac905.mokky.dev/cart/${findItem.id}`
			);
		} else {
			setCartItems((prev) => [...prev, obj]);
			const { data } = await axios.post(
				'https://f4b4503d373ac905.mokky.dev/cart',
				obj
			);
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
			);
		}
		// это как setCartItems([...cartItems, obj]);
	} catch (error) {
		alert('Ошибка при добавление в  корзину');
	}
});
export const onRemoveItem = createAsyncThunk(
	'cart/onRemoveCart',
	async (id) => {
		try {
			await axios.delete(`https://f4b4503d373ac905.mokky.dev/cart/${id}`);
			setCartItems((prev) =>
				prev.filter((item) => Number(item.id) !== Number(id))
			);
		} catch (error) {
			alert('Ошибка при удаление товара из корзины');
			console.log(error.message);
		}
	}
);

const initialState = {
	cartItems: [],
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
		getTotalPrice(state, action) {
			state.totalPrice = state.cartItems.reduce(
				(acc, item) => item.price + acc,
				0
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

// Action creators are generated for each case reducer function
export const { setCartItems, getTotalPrice } = cartSlice.actions;

export default cartSlice.reducer;
