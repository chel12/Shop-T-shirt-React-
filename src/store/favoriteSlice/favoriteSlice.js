import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//перейти,достать,вернуть (Санка получения данных)
export const fetchFavorite = createAsyncThunk(
	'favorite/fetchFavoriteStatus',
	async () => {
		try {
			const { data } = await axios.get(
				'https://f4b4503d373ac905.mokky.dev/favorite'
			);
			return data;
		} catch (error) {
			alert('Ошибка при запросе Избранных');
			console.log(error.message);
		}
	}
);

export const onFavorite = createAsyncThunk(
	'favorite/addOnFavorite',
	async (obj) => {
		console.log(obj);
		try {
			const findItem = (state) =>
				state.favorite.favoriteItems.find(
					(item) => Number(item.favoriteId) === Number(obj.id)
				);

			if (findItem) {
				setFavorite((prev) =>
					prev.filter(
						(item) => Number(item.favoriteId) !== Number(obj.id)
					)
				);
				await axios.delete(
					`https://f4b4503d373ac905.mokky.dev/favorite/${findItem.id}`
				);
			} else {
				setFavorite((prev) => [...prev, obj]);

				const { data } = await axios.post(
					'https://f4b4503d373ac905.mokky.dev/favorite',
					obj
				);

				setFavorite((prev) =>
					prev.map((item) => {
						if (item.favoriteId === data.favoriteId) {
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
		} catch (error) {
			alert('Ошибка при добавление в избранное');
			console.log(error.message);
		}
	}
);

const initialState = {
	favoriteItems: [],
	status: 'loading', //loading | success | error (для контроля скелетона)
};

export const favoriteSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		setFavorite(state, action) {
			state.favoriteItems = action.payload;
		},
	},
	extraReducers: (builder) => {
		//обработка Санки и состояний её, где задаём статус загрузки
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

// Action creators are generated for each case reducer function
export const { setFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
