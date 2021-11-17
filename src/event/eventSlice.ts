import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { subEventType } from "../types/apidata"
import { fetchSubEventsAPI } from "./eventAPI"

export type CounterState = {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

const intialEventState: subEventType = {
  name: "テストイベント",
  time: 60,
  manager: "テスト担当者",
  color: "#FFF",
  people: 20,
  days: [
    { start_time: "18:00:00.000", dow: 1},
    { start_time: "19:00:00.000", dow: 3},
    { start_time: "17:30:00.000", dow: 5},
  ]
}

export const fetchSubEventAsync = createAsyncThunk(
    'counter/fetchSubEvent',
    async () => {            
      const response = await fetchSubEventsAPI();
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  );

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {      
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },    
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },  
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubEventAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubEventAsync.fulfilled, (state, action) => {
        console.log(action);
        state.status = 'idle';        
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;
export const selectState = (state: RootState) => state;

export default counterSlice.reducer;
