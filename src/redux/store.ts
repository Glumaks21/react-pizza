import { MiddlewareAPI, Dispatch, Action, configureStore } from '@reduxjs/toolkit';
import cart from './slices/cart/slice';
import { useDispatch } from 'react-redux';

//FIND BETTER TYPES
const customMiddleware =
  (api: MiddlewareAPI<Dispatch<Action>>) => (next: Dispatch<Action>) => (action: Action) => {
    const res = next(action);

    if (action.type.startsWith('cart/')) {
      const serializedState = JSON.stringify(api.getState().cart);
      localStorage.setItem('cart', serializedState);
    }

    return res;
  };

const store = configureStore({
  reducer: {
    cart,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
