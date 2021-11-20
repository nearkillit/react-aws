import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { userType } from "../../types/apidata"
import { fetchUserDataAPI, fetchUserAPI } from "./userAPI"

//////// state ////////
export type userState = {
  user: userType,
  user_id: string,
  user_name: string,
  user_status: 'idle' | 'loading' | 'failed',  
}

const intialUserState: userType = {
    id: "",
    name: "",
    email: "",
    event_id: [],
    updatedAt: ""  
}

const initialState: userState = {
  user: intialUserState,
  user_id: "",
  user_name: "",
  user_status: "idle",  
};



//////// AsyncThunk //////// 
export const fetchUserDataAsync = createAsyncThunk(
    'user/fetchUserData',
    async (id:string) => {              
      const response = await fetchUserDataAPI(id);
      return response;
    }
  );

export const fetchUserAsync = createAsyncThunk(
    'user/fetchUser',
    async () => {            
      const response = await fetchUserAPI();
      return response;
    }
  );  

//////// Slice ////////  
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },  
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataAsync.pending, (state) => {
        state.user_status = 'loading';
      })
      .addCase(fetchUserDataAsync.fulfilled, (state, action:any) => {
        // state.user = action.payload.data
        console.log(action);
        state.user_status = 'idle';
      })
      .addCase(fetchUserAsync.pending, (state) => {
        state.user_status = 'loading';
      })
      .addCase(fetchUserAsync.fulfilled, (state, action:any) => {        
        state.user_id = action.payload.user_id
        state.user_name = action.payload.user_name
        state.user_status = 'idle';
      })
  },
});

//////// export ////////  
// export const { increment, decrement, incrementByAmount } = eventSlice.actions;
export const selectState = (state: RootState) => state;

export default userSlice.reducer;
