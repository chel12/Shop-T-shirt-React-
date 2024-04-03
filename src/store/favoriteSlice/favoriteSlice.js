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

export const onFavorite = createAsyncThunk(
	'favorite/postOnFavorite',
	async (obj, { getState, dispatch }) => {
		const state = getState();
		const findObj = state.favorite.favoriteItems.find(
			(item) => item.title === obj.title
		);

		if (findObj) {
			await axios.delete(
				`https://f4b4503d373ac905.mokky.dev/favorite/${findObj.id}`
			);
			dispatch(delFavorite(findObj));
			dispatch(fetchFavorite());
		} else {
			const { data } = await axios.post(
				'https://f4b4503d373ac905.mokky.dev/favorite',
				obj
			);
			dispatch(addFavorite(data));
			dispatch(fetchFavorite());
		}
	}
);

const initialState = {
	favoriteItems: [],
	status: 'loading',
};

export const favoriteSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		// addFavorite(state, action) {
		// 	state.favoriteItems.push(action.payload);
		// },
		addFavorite(state, action) {
			state.favoriteItems.push(action.payload);
		},
		delFavorite(state, action) {
			state.favoriteItems.filter((item) => item.id !== action.payload.id);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFavorite.pending, (state) => {
				state.status = 'loading';
				state.favoriteItems = [];
			})
			.addCase(fetchFavorite.fulfilled, (state, action) => {
				state.favoriteItems = action.payload;
				state.status = 'success';
			})
			.addCase(fetchFavorite.rejected, (state) => {
				state.status = 'error';
				state.favoriteItems = [];
			});
	},
});

export const { addFavorite, delFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
