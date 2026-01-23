import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    bun: null,
    items: [],
  },
  selectors: {
    getConstructorIngredients: (state) => state.items,
    getConstructorBun: (state) => state.bun,
  },
  reducers: {
    addItem: {
      reducer: (state, action) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.items.push(action.payload);
        }
      },
      prepare: (ingredient) => {
        return { payload: { ...ingredient, uuid: uuid() } };
      },
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.uuid !== action.payload);
    },
    moveItem: (state, action) => {
      if (!Array.isArray(state.items)) return;

      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.items[dragIndex];

      if (draggedItem) {
        const newIngredients = [...state.items];
        newIngredients.splice(dragIndex, 1);
        newIngredients.splice(hoverIndex, 0, draggedItem);
        state.items = newIngredients;
      }
    },
  },
});

export const { addItem, removeItem, moveItem } = constructorSlice.actions;
export const { getConstructorIngredients, getConstructorBun } =
  constructorSlice.selectors;
