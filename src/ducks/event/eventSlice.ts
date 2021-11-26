import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { subEventType, spEventType, delEventType } from "../../types/apidata"
import { fetchSubEventsAPI, 
         fetchSpEventsAPI, 
         fetchDelEventsAPI, 
         createSubEventAPI,
         createSpEventAPI,
         createDelEventAPI,
         updateSubEventAPI,
         updateSpEventAPI,
         updateDelEventAPI,
         crudSubEventType,
         crudSpEventType,
         crudDelEventType,
        } from "./eventAPI"

//////// state ////////
export type eventState = {
  sub_event: Array<subEventType>,
  sub_event_status: 'idle' | 'loading' | 'failed' | 'completed' ,
  sp_event: Array<spEventType>,
  sp_event_status: 'idle' | 'loading' | 'failed' | 'completed',
  del_event: Array<delEventType>,
  del_event_status: 'idle' | 'loading' | 'failed' | 'completed',
}

const initialState: eventState = {
  sub_event: [],
  sub_event_status: "idle",
  sp_event: [],
  sp_event_status: "idle",
  del_event: [],
  del_event_status: "idle"
};

const intialEventState: subEventType = {
  id: "test",
  name: "テストイベント",
  time: 60,
  manager: "テスト担当者",
  color: "#FFF",
  people: 20,
  days: [
    { start_time: "18:00:00.000", dow: 1},
    { start_time: "19:00:00.000", dow: 3},
    { start_time: "17:30:00.000", dow: 5},
  ],
  updatedAt: "2021-11-18T23:24:52.785Z"
}

//////// AsyncThunk //////// 
export const fetchSubEventAsync = createAsyncThunk(
    'event/fetchSubEvent',
    async () => {            
      const response = await fetchSubEventsAPI();            
      return response;
    }
  );

export const createSubEventAsync = createAsyncThunk(
    'event/createSubEvent',
    async (data: crudSubEventType) => {            
      const response = await createSubEventAPI(data);
      return response;
    }
  );

export const updateSubEventAsync = createAsyncThunk(
    'event/updateSubEvent',
    async (data: crudSubEventType) => {            
      const response = await updateSubEventAPI(data);
      return response;
    }
  );
  
export const fetchSpEventAsync = createAsyncThunk(
    'event/fetchSpEvent',
    async () => {            
      const response = await fetchSpEventsAPI();      
      return response;
    }
  );

  export const createSpEventAsync = createAsyncThunk(
    'event/createSpEvent',
    async (data: crudSpEventType) => {            
      const response = await createSpEventAPI(data);
      return response;
    }
  );

export const updateSpEventAsync = createAsyncThunk(
    'event/updateSpEvent',
    async (data: crudSpEventType) => {            
      const response = await updateSpEventAPI(data);
      return response;
    }
  );

export const fetchDelEventAsync = createAsyncThunk(
    'event/fetchDelEvent',
    async () => {            
      const response = await fetchDelEventsAPI();      
      return response;
    }
  );  

export const createDelEventAsync = createAsyncThunk(
    'event/createDelEvent',
    async (data: crudDelEventType) => {            
      const response = await createDelEventAPI(data);
      return response;
    }
  );

export const updateDelEventAsync = createAsyncThunk(
    'event/updateDelEvent',
    async (data: crudDelEventType) => {            
      const response = await updateDelEventAPI(data);
      return response;
    }
  );

//////// Slice ////////  
export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    // increment: (state) => {      
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },    
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },  
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubEventAsync.pending, (state) => {
        state.sub_event_status = 'loading';
      })
      .addCase(fetchSubEventAsync.fulfilled, (state, action:any) => {
        state.sub_event = action.payload.data.listSubEvents.items
        state.sub_event_status = 'completed';
      })//state change
      .addCase(createSubEventAsync.pending, (state) => {
        state.sub_event_status = 'loading';
      })//state change
      .addCase(createSubEventAsync.fulfilled, (state, action:any) => {
        console.log(action.payload);        
      })
      .addCase(updateSubEventAsync.pending, (state) => {
        state.sub_event_status = 'loading';
      })
      .addCase(updateSubEventAsync.fulfilled, (state, action:any) => {        
        state.sub_event = state.sub_event.map(se=>{
          if(se.id === action.payload.data.updateSubEvent.id){
            return action.payload.data.updateSubEvent
          }else{
            return se
          }           
        })                
      })
      .addCase(fetchSpEventAsync.pending, (state) => {
        state.sp_event_status = 'loading';
      })
      .addCase(fetchSpEventAsync.fulfilled, (state, action:any) => {
        state.sp_event = action.payload.data.listSpEvents.items
        state.sp_event_status = 'completed';   
      })//state change
      .addCase(createSpEventAsync.pending, (state) => {
        state.sp_event_status = 'loading';
      })//state change
      .addCase(createSpEventAsync.fulfilled, (state, action:any) => {
        console.log(action.payload);        
      })//state change
      .addCase(updateSpEventAsync.pending, (state) => {
        state.sp_event_status = 'loading';
      })//state change
      .addCase(updateSpEventAsync.fulfilled, (state, action:any) => {
        console.log(action.payload);        
      })
      .addCase(fetchDelEventAsync.pending, (state) => {
        state.sp_event_status = 'loading';
      })
      .addCase(fetchDelEventAsync.fulfilled, (state, action:any) => {
        state.del_event = action.payload.data.listDelEvents.items
        state.del_event_status = 'completed';   
      })//state change
      .addCase(createDelEventAsync.pending, (state) => {
        state.del_event_status = 'loading';
      })//state change
      .addCase(createDelEventAsync.fulfilled, (state, action:any) => {
        console.log(action.payload);        
      })//state change
      .addCase(updateDelEventAsync.pending, (state) => {
        state.del_event_status = 'loading';
      })//state change
      .addCase(updateDelEventAsync.fulfilled, (state, action:any) => {
        console.log(action.payload);        
      })

  },
});

//////// export ////////  
// export const { increment, decrement, incrementByAmount } = eventSlice.actions;
export const selectState = (state: RootState) => state;
export const selectSubEvent = (state: RootState) => state.event.sub_event;
export const selectSpEvent = (state: RootState) => state.event.sp_event;
export const selectDelEvent = (state: RootState) => state.event.del_event;

export default eventSlice.reducer;
