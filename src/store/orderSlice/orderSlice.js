import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: 0,
};

export const orderSlice = createSlice({
	name: 'slice/order',
	initialState,
	reducers: {
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {} = orderSlice.actions;

export default orderSlice.reducer;
