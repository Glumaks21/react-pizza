import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectCartItems = (state: RootState) => state.cart.items;

export const totalCostSelector = createSelector(selectCartItems, (items) =>
  items.reduce((sum, i) => (sum += i.price * i.count), 0),
);

export const totalCountSelector = createSelector(selectCartItems, (items) =>
  items.reduce((count, i) => (count += i.count), 0),
);
