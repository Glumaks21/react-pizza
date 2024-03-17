import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItemComparisonFields, CartItem } from './types';

const getInitialState = (): CartState => {
  const cartState = localStorage.getItem('cart');
  if (cartState) return JSON.parse(cartState);
  return { items: [] };
};

const isPizzaEquals = (p1: CartItemComparisonFields, p2: CartItemComparisonFields): boolean =>
  p1.id === p2.id && p1.size === p2.size && p1.type === p2.type;

const findPizzaIndex = (
  pizza: CartItemComparisonFields,
  items: CartItemComparisonFields[],
): number => items.findIndex((i) => isPizzaEquals(i, pizza));

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState(),
  reducers: {
    add(state: CartState, action: PayloadAction<Omit<CartItem, 'count'>>) {
      const itemInd = findPizzaIndex(action.payload, state.items);

      if (itemInd >= 0) {
        state.items[itemInd].count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },

    remove(state: CartState, action: PayloadAction<CartItemComparisonFields>) {
      const itemInd = findPizzaIndex(action.payload, state.items);

      if (itemInd >= 0 && state.items[itemInd].count > 1) {
        state.items[itemInd].count--;
      } else if (itemInd >= 0) {
        state.items.splice(itemInd, 1);
      }
    },

    removeAll(state: CartState, action: PayloadAction<CartItemComparisonFields>) {
      const itemInd = findPizzaIndex(action.payload, state.items);

      if (itemInd >= 0) {
        state.items.splice(itemInd, 1);
      }
    },

    clear(state: CartState) {
      state.items = [];
    },
  },
});

export const { add, remove, removeAll, clear } = cartSlice.actions;
export default cartSlice.reducer;
