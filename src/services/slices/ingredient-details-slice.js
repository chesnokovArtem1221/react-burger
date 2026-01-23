import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { getIngredients } from '@services/slices/burger-ingredients-slice';

export const initialState = {
  details: null,
};

export const ingredientsDetails = createAsyncThunk(
  'details/ingredientsDetails',
  async (id) => {
    return id;
  }
);

export const ingredientDetailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsDetails: (state) => state.details,
    getIngredientsDetailsToId: createSelector(
      () => ingredientDetailsSlice.getSelectors().getIngredientsDetails,
      () => getIngredients().find(ingredientsDetails)
    ),
  },
  extraReducers: (builder) =>
    builder.addCase(ingredientsDetails.fulfilled, (state, action) => {
      state.details = action.payload;
    }),
});

export const { getIngredientsDetails, getIngredientsDetailsToId } =
  ingredientDetailsSlice.selectors;
