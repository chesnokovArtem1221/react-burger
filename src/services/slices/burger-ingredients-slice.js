import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getIngredientsAPI } from '@utils/featch-api';

export const loadBurgerIngredients = createAsyncThunk(
  'ingredients/loadBurgerIngredients',
  async () => {
    return getIngredientsAPI();
  }
);

export const initialState = {
  ingredients: [],
  loading: false,
  error: null,
};

export const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.loading,
    getIngredientsError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBurgerIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBurgerIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Unknown error';
      })
      .addCase(loadBurgerIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload.data;
      });
  },
});

export const { getIngredients, getIngredientsLoading, getIngredientsError } =
  burgerIngredientsSlice.selectors;
