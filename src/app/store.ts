import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import eventReducer from '../ducks/event/eventSlice';
import userReducer from '../ducks/user/userSlice';
import { save, load } from 'redux-localstorage-simple';

export const store = configureStore({
  reducer: {
    event: eventReducer,
    user: userReducer,
  },
  preloadedState: load(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
