import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	
};

export const favoriteSlice = createSlice({
	name: 'slice/favorite',
	initialState,
	reducers: {
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {} = favoriteSlice.actions;

export default favoriteSlice.reducer;
