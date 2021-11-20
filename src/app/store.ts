import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import eventReducer from '../ducks/event/eventSlice';
import userReducer from '../ducks/user/userSlice';

export const store = configureStore({
  reducer: {
    event: eventReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
