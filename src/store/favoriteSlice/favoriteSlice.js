import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//перейти,достать,вернуть (Санка получения данных)
export const fetchFavorite = createAsyncThunk(
	'favorite/fetchFavoriteStatus',
	async () => {
		const { data } = await axios.get(
			'https://f4b4503d373ac905.mokky.dev/favorite'
		);
		return data;
	}
);

const initialState = {
	favoriteItems: { items: [] },
	status: 'loading', //loading | success | error (для контроля скелетона)
};

export const favoriteSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		setFavorite(state, action) {
			state.favoriteItems.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		//обработка Санки и состояний её, где задаём статус загрузки
		builder
			.addCase(fetchFavorite.pending, (state) => {
				state.status = 'loading';
				state.favoriteItems.items = [];
			})
			.addCase(fetchFavorite.fulfilled, (state, action) => {
				state.favoriteItems.items = action.payload;
				state.status = 'success';
			})
			.addCase(fetchFavorite.rejected, (state) => {
				state.status = 'error';
				state.favoriteItems.items = [];
			});
	},
});
//селекторы
// export const selectGameData = (state) => state.game;

// Action creators are generated for each case reducer function
export const { setFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
