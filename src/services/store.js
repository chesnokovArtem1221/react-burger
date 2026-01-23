import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { constructorSlice } from '@services/slices/burger-constructor-slice';
import { burgerIngredientsSlice } from '@services/slices/burger-ingredients-slice';
import { ingredientDetailsSlice } from '@services/slices/ingredient-details-slice';
import { orderSlice } from '@services/slices/order-details-slice';

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  ingredientDetailsSlice,
  orderSlice,
  constructorSlice
);

export const configureStoreAPI = (initialState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
};
