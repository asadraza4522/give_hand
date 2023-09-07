import {createSlice} from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'adminMain',
  initialState: {
    categoriesData: '',
  },
  reducers: {
    setCategoriesData: (state, action) => {
      state.categoriesData = action.payload;
    },
  },
});

export const {setCategoriesData} = adminSlice.actions;

export default adminSlice.reducer;
