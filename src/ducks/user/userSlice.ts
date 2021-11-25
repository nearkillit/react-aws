import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { userType } from "../../types/apidata"
import { fetchUserDataAPI, fetchUserAPI, updateUserAPI } from "./userAPI"

//////// state ////////
export type userState = {
  user: userType,
  user_id: string,
  user_name: string,
  user_status: 'idle' | 'loading' | 'failed',
  user_group: string[]
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
  user_group: []
};

export interface updateUserType {
  id: string,
  event_id: string[]
}

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

export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async (data:updateUserType) => {            
      const response = await updateUserAPI(data);
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
        state.user.event_id = action.payload.data.getUser.event_id
        state.user.updatedAt = action.payload.data.getUser.updatedAt        
        state.user_status = 'idle';
      })
      .addCase(fetchUserAsync.pending, (state) => {
        state.user_status = 'loading';
      })
      .addCase(fetchUserAsync.fulfilled, (state, action:any) => {        
        state.user_id = action.payload.user_id
        state.user_name = action.payload.user_name
        state.user_status = 'idle';
        state.user_group = action.payload.user_group
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.user_status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action:any) => {        
        // state = action.payload
        console.log("user update ");        
        console.log(action);
        
      })
  },
});

//////// export ////////  
// export const { increment, decrement, incrementByAmount } = eventSlice.actions;
export const selectState = (state: RootState) => state;

export default userSlice.reducer;
