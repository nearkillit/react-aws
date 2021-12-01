import Amplify from 'aws-amplify';
import config from '../aws-exports';
import reducer, { fetchAllUserEventAsync, fetchSubEventAsync, createSubEventAsync, updateSubEventAsync, fetchSpEventAsync, createSpEventAsync, updateSpEventAsync, deleteSpEventAsync, fetchDelEventAsync, createDelEventAsync, updateDelEventAsync } from '../ducks/event/eventSlice'
import type { eventState } from '../ducks/event/eventSlice'

Amplify.configure(config);

describe('UserSlice ExtraReducer test', () => {
  let initialState: eventState = {
    sub_event: [],
    sub_event_status: "idle",
    sp_event: [],
    sp_event_status: "idle",
    del_event: [],
    del_event_status: "idle",
    reserve_event: []
  };

  it('fetchAllUserEventAsync.fulfilled', async () => {
    const action = {
      type: fetchAllUserEventAsync.fulfilled.type, payload: [
        {
          event_id: "123",
          event_people: "Taro",
        }
      ]
    }
    const state = reducer(initialState, action);
    expect(state.reserve_event[0].event_id).toEqual("123");
    expect(state.reserve_event[0].event_people).toEqual("Taro");
  })

  it('fetchSubEventAsync.pending', async () => {
    const action = { type: fetchSubEventAsync.pending.type }
    const state = reducer(initialState, action);
    expect(state.sub_event_status).toEqual("loading");
  })
  it('fetchSubEventAsync.fulfilled', async () => {
    const action = {
      type: fetchSubEventAsync.fulfilled.type, payload: {
        data: {
          listSubEvents: {
            items: [
              "item1"
            ]
          }
        }
      }
    }
    const state = reducer(initialState, action);
    expect(state.sub_event).toEqual(["item1"]);
    expect(state.sub_event_status).toEqual("completed");
  })

  it('createSubEventAsync.pending', async () => {
    const action = { type: createSubEventAsync.pending.type }
    const state = reducer(initialState, action);
    expect(state.sub_event_status).toEqual("loading");
  })
  it('createSubEventAsync.fulfilled', async () => {
    const action = {
      type: createSubEventAsync.fulfilled.type, payload: {
        data: {
          createSubEvent: {
            id: "123"
          }
        }
      }
    }
    const state = reducer(initialState, action);
    expect(state.sub_event).toEqual([{ id: "123" }]);
    expect(state.sub_event_status).toEqual("completed");
  })

  it('updateSubEventAsync.pending', async () => {
    const action = { type: updateSubEventAsync.pending.type }
    const state = reducer(initialState, action);
    expect(state.sub_event_status).toEqual("loading");
  })
  it('updateSubEventAsync.fulfilled/id matched', async () => {
    initialState = {
      sub_event: [
        {
          id: "123",
          name: "string",
          time: 1,
          manager: "string",
          color: "string",
          people: 1,
          place: "string",
          days: [],
          updatedAt: "string"
        }
      ],
      sub_event_status: "idle",
      sp_event: [],
      sp_event_status: "idle",
      del_event: [],
      del_event_status: "idle",
      reserve_event: []
    };

    const action = {
      type: updateSubEventAsync.fulfilled.type, payload: {
        data: {
          updateSubEvent: {
            id: "123",
            name: "Mike"
          }
        }
      }
    }
    const state = reducer(initialState, action);
    expect(state.sub_event[0].name).toEqual("Mike");
    expect(state.sub_event_status).toEqual("completed");
  })
  it('updateSubEventAsync.fulfilled/id did not match', async () => {
    initialState = {
      sub_event: [
        {
          id: "123",
          name: "string",
          time: 1,
          manager: "string",
          color: "string",
          people: 1,
          place: "string",
          days: [],
          updatedAt: "string"
        }
      ],
      sub_event_status: "idle",
      sp_event: [],
      sp_event_status: "idle",
      del_event: [],
      del_event_status: "idle",
      reserve_event: []
    };

    const action = {
      type: updateSubEventAsync.fulfilled.type, payload: {
        data: {
          updateSubEvent: {
            id: "456",
            name: 'Mike'
          }
        }
      }
    }
    const state = reducer(initialState, action);
    expect(state.sub_event[0].name).toEqual("string");
    expect(state.sub_event_status).toEqual("completed");
  })

  it('fetchSpEventAsync.pending', async () => {
    const action = { type: fetchSpEventAsync.pending.type }
    const state = reducer(initialState, action);
    expect(state.sp_event_status).toEqual("loading");
  })
  it('fetchSpEventAsync.fulfilled', async () => {
    const action = {
      type: fetchSpEventAsync.fulfilled.type, payload: {
        data: {
          listSpEvents: {
            items: [
              "item1"
            ]
          }
        }
      }
    }
    const state = reducer(initialState, action);
    expect(state.sp_event).toEqual(["item1"]);
    expect(state.sp_event_status).toEqual("completed");
  })

  it('createSpEventAsync.pending', async () => {
    const action = { type: createSpEventAsync.pending.type }
    const state = reducer(initialState, action);
    expect(state.sp_event_status).toEqual("loading");
  })
  it('createSpEventAsync.fulfilled', async () => {
    const action = {
      type: createSpEventAsync.fulfilled.type, payload: {
        data: {
          createSpEvent: {
            id: "123"
          }
        }
      }
    }
    const state = reducer(initialState, action);
    expect(state.sp_event).toEqual([{ id: "123" }]);
    expect(state.sp_event_status).toEqual("completed");
  })

  it('updateSpEventAsync.pending', async () => {
    const action = { type: updateSpEventAsync.pending.type }
    const state = reducer(initialState, action);
    expect(state.sp_event_status).toEqual("loading");
  })
  it('updateSpEventAsync.fulfilled/id matched', async () => {
    initialState = {
      sub_event: [],
      sub_event_status: "idle",
      sp_event: [{
        id: "123",
        name: "string",
        time: 1,
        manager: "string",
        color: "string",
        people: 1,
        place: "string",
        start: "string",
        updatedAt: "string"
      }],
      sp_event_status: "idle",
      del_event: [],
      del_event_status: "idle",
      reserve_event: []
    };

    const action = {
      type: updateSpEventAsync.fulfilled.type, payload: {
        data: {
          updateSpEvent: {
            id: "123",
            name: "Mike"
          }
        }
      }
    }
    const state = reducer(initialState, action);
    expect(state.sp_event[0].name).toEqual("Mike");
    expect(state.sp_event_status).toEqual("completed");
  })
  it('updateSpEventAsync.fulfilled/id did not match', async () => {
    initialState = {
      sub_event: [],
      sub_event_status: "idle",
      sp_event: [{
        id: "123",
        name: "string",
        time: 1,
        manager: "string",
        color: "string",
        people: 1,
        place: "string",
        start: "string",
        updatedAt: "string"
      }],
      sp_event_status: "idle",
      del_event: [],
      del_event_status: "idle",
      reserve_event: []
    };

    const action = {
      type: updateSpEventAsync.fulfilled.type, payload: {
        data: {
          updateSpEvent: {
            id: "456",
            name: 'Mike'
          }
        }
      }
    }
    const state = reducer(initialState, action);
    expect(state.sp_event[0].name).toEqual("string");
    expect(state.sp_event_status).toEqual("completed");
  })

  it('deleteSpEventAsync.pending', async () => {
    const action = { type: deleteSpEventAsync.pending.type }
    const state = reducer(initialState, action);
    expect(state.sp_event_status).toEqual("loading");
  })
  it('deleteSpEventAsync.fulfilled', async () => {
    initialState = {
      sub_event: [],
      sub_event_status: "idle",
      sp_event: [
        {
          id: "123",
          name: "Mike",
          time: 1,
          manager: "string",
          color: "string",
          people: 1,
          place: "string",
          start: "string",
          updatedAt: "string"
        },
        {
          id: "456",
          name: "Taro",
          time: 1,
          manager: "string",
          color: "string",
          people: 1,
          place: "string",
          start: "string",
          updatedAt: "string"
        },
      ],
      sp_event_status: "idle",
      del_event: [],
      del_event_status: "idle",
      reserve_event: []
    };

    const action = {
      type: deleteSpEventAsync.fulfilled.type, payload: {
        data: {
          deleteSpEvent: {
            id: "123",
            name: "Mike"
          }
        }
      }
    }
    const state = reducer(initialState, action);
    expect(state.sp_event[0].name).toEqual("Taro");
    expect(state.sp_event_status).toEqual("completed");
  })

  it('fetchDelEventAsync.pending', async () => {
    const action = { type: fetchDelEventAsync.pending.type }
    const state = reducer(initialState, action);
    expect(state.sp_event_status).toEqual("loading");
  })
  it('fetchDelEventAsync.fulfilled', async () => {
    const action = {
      type: fetchDelEventAsync.fulfilled.type, payload: {
        data: {
          listDelEvents: {
            items: [
              "item1"
            ]
          }
        }
      }
    }
    const state = reducer(initialState, action);
    expect(state.del_event).toEqual(["item1"]);
    expect(state.del_event_status).toEqual("completed");
  })

  it('createDelEventAsync.pending', async () => {
    const action = { type: createDelEventAsync.pending.type }
    const state = reducer(initialState, action);
    expect(state.del_event_status).toEqual("loading");
  })

  it('updateDelEventAsync.pending', async () => {
    const action = { type: updateDelEventAsync.pending.type }
    const state = reducer(initialState, action);
    expect(state.del_event_status).toEqual("loading");
  })
})


// .addCase(createDelEventAsync.fulfilled, (state, action:any) => {
//   console.log(action.payload);
// })//state change

// .addCase(updateDelEventAsync.fulfilled, (state, action:any) => {
//   console.log(action.payload);
// })
