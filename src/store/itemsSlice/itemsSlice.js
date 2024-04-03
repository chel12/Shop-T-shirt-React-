import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//перейти,достать,вернуть (Санка получения данных)
export const fetchItems = createAsyncThunk(
	'items/fetchItemsStatus',
	async () => {
		const { data } = await axios.get(
			'https://f4b4503d373ac905.mokky.dev/items'
		);
		return data;
	}
);

const initialState = {
	items: [],
	status: 'loading', //loading | success | error (для контроля скелетона)
};

export const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		//обработка Санки и состояний её, где задаём статус загрузки
		builder
			.addCase(fetchItems.pending, (state) => {
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchItems.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = 'success';
			})
			.addCase(fetchItems.rejected, (state) => {
				state.status = 'error';
				state.items = [];
			});
	},
});

// Action creators are generated for each case reducer function
export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
