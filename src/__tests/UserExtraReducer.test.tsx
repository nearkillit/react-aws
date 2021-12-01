import Amplify from 'aws-amplify';
import config from '../aws-exports';
import reducer, { fetchUserDataAsync,updateUserAsync,fetchUserAsync } from '../ducks/user/userSlice'
import type { userState } from '../ducks/user/userSlice'

Amplify.configure(config);

describe('UserSlice ExtraReducer test', () => {
  const initialState:userState = {
    user: {
      id: "",
      name: "",
      email: "",
      event_id: [""],
      updatedAt: ""
    },
    user_id: "",
    user_name: "",
    user_status: "idle",
    user_group: [""]
  };

  it('fetchUserDataAsync.pending', async () => {
    const action = {
      type: fetchUserDataAsync.pending.type, payload: {
        user_status: "loading"
      }
    }
    const state = reducer(initialState, action);
    expect(state.user_status).toEqual("loading");
  })
  it('fetchUserDataAsync.fulfilled', async () => {
    const action = {
      type: fetchUserDataAsync.fulfilled.type, payload: {
        data:{
          getUser:{
            event_id:["123"],
            updatedAt:"1111-11-11"
          }
        },
        user_status : 'complited'
      }
    }
    const state = reducer(initialState, action);
    expect(state.user.event_id[0]).toEqual("123");
    expect(state.user.updatedAt).toEqual("1111-11-11");
    expect(state.user_status).toEqual("complited");
  })
  
  
  it('fetchUserAsync.pending', async () => {
    const action = {
      type: fetchUserAsync.pending.type, payload: {
        user_status: "loading"
      }
    }
    const state = reducer(initialState, action);
    expect(state.user_status).toEqual("loading");
  })
  it('fetchUserAsync.fulfilled', async () => {
    const action = {
      type: fetchUserAsync.fulfilled.type, payload: {
        user_id: "123",
        user_name: "John",
        user_group: ["Hello"]
      }
    }
    const state = reducer(initialState, action);
    expect(state.user_id).toEqual("123");
    expect(state.user_name).toEqual("John");
    expect(state.user_group[0]).toEqual("Hello");
  })
  
  it('updateUserAsync.pending', async () => {
    const action = {
      type: updateUserAsync.pending.type, payload: {
        user_status: "loading"
      }
    }
    const state = reducer(initialState, action);
    expect(state.user_status).toEqual("loading");
  })
  it('updateUserAsync.fulfilled', async () => {
    const action = {
      type: updateUserAsync.fulfilled.type, payload: {
        data:{
          updateUser:{
            event_id:["123"],
          }
        },
        user_status : 'complited'
      }
    }
    const state = reducer(initialState, action);
    expect(state.user.event_id[0]).toEqual("123");
    expect(state.user_status).toEqual("complited");
  })
})