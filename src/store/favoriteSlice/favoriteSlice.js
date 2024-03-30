import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

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

// export const onFavorite = createAsyncThunk(
// 	'favorite/postOnFavorite',
// 	async (obj) => {
// 		if (findItem(obj)) {
// 			setFavoriteFilter(obj);
// 			await axios.delete(
// 				`https://f4b4503d373ac905.mokky.dev/favorite/${obj.id}`
// 			);
// 		} else {
// 			addFavorite(obj);
// 			const { data } = await axios.post(
// 				'https://f4b4503d373ac905.mokky.dev/favorite',
// 				obj
// 			);

// 			setFavorite((prev) =>
// 				prev.map((item) => {
// 					if (item.favoriteId === data.favoriteId) {
// 						return {
// 							...item,
// 							id: data.id,
// 						};
// 					} else {
// 						return item;
// 					}
// 				})
// 			);
// 		}
// 	}
// );

export const onFavorite = createAsyncThunk(
	'favorite/postOnFavorite',
	async (obj, { getState, dispatch }) => {
		try {
			const state = getState();
			const alreadyExists = state.favorite.favoriteItems.find(
				(item) => item.id === obj.id
			);

			if (!alreadyExists) {
				// Если объекта еще нет, выполняем асинхронное действие
				dispatch(addFavorite(obj));
				const { data } = await axios.post(
					'https://f4b4503d373ac905.mokky.dev/favorite',
					obj
				);
				return data;
			} else {
				// Если объект уже существует, удаляем его и проверяем, что удаление прошло успешно
				await dispatch(deleteFavorite(obj));
				await axios.delete(
					`https://f4b4503d373ac905.mokky.dev/favorite/${obj.id}`
				);
				const deletedState = getState();
				if (
					deletedState.favorite.favoriteItems.find(
						(item) => item.id === obj.id
					)
				) {
					throw new Error('Object was not deleted successfully');
				}
			}
		} catch (error) {
			console.error('Ошибка при добавлении в избранное: ', error);
			throw error;
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
		setFavoriteFilter(state, action) {
			state.favoriteItems = state.favoriteItems.filter(
				(item) => item.favoriteId !== action.payload.id
			);
		},
		addFavorite(state, action) {
			state.favoriteItems.push(action.payload);
		},
		deleteFavorite(state, action) {
			const find = state.favoriteItems.find(
				(item) => item.favoriteId === action.payload.favoriteId
			);
			if (find) {
				state.favoriteItems = state.favoriteItems.filter(
					(item) => item.favoriteId !== find.favoriteId
				);
			}
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
export const {
	setFavorite,
	findItem,
	setFavoriteFilter,
	addFavorite,
	deleteFavorite,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
