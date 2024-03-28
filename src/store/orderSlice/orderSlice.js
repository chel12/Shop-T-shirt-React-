import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//перейти,достать,вернуть (Санка получения данных)
export const fetchOrder = createAsyncThunk(
	'order/fetchOrdersStatus',
	async () => {
		try {
			const { data } = await axios.get(
				'https://f4b4503d373ac905.mokky.dev/orders'
			);
			return data;
		} catch (error) {
			alert('Ошибка при запросе покупок');
			console.log(error.message);
		}
	}
);

const initialState = {
	orderItems: { items: [] },
	status: 'loading', //loading | success | error (для контроля скелетона)
};

export const itemsSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrder(state, action) {
			state.orderItems = action.payload;
		},
	},
	extraReducers: (builder) => {
		//обработка Санки и состояний её, где задаём статус загрузки
		builder
			.addCase(fetchOrder.pending, (state) => {
				state.status = 'loading';
				state.orderItems = [];
			})
			.addCase(fetchOrder.fulfilled, (state, action) => {
				state.orderItems = action.payload;
				state.status = 'success';
			})
			.addCase(fetchOrder.rejected, (state) => {
				state.status = 'error';
				state.orderItems = [];
			});
	},
});

// Action creators are generated for each case reducer function
export const { setOrder } = itemsSlice.actions;

export default itemsSlice.reducer;
