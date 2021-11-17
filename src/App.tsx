import React, { useState, useEffect } from 'react';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
// aws
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
// aws qraphQL
import { listSubEvents } from './graphql/queries';
import { createSubEvent } from './graphql/mutations';

// components
import Calender from "./components/calender"
import {
  selectCount,
  selectState,
  fetchSubEventAsync,
} from './event/eventSlice';
// types
import { subEventType } from "./types/apidata"

// SubEvent
const instanData = {
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

function App() {
  const [subEvent, setSubEvent] = useState<subEventType>();
  const count = useAppSelector(selectCount);
  const state = useAppSelector(selectState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // fetchSubEvents();        
  }, []);  

  async function fetchSubEvents() {
    const apiData = await API.graphql({ query: listSubEvents });
    console.log(apiData);    
    // const apiDataById = await API.graphql(graphqlOperation(getTodo, {id: "25bbe2e8-3d85-4e95-a363-8794aaaddf64"}))
    // console.log(apiDataById);
    // setSubEvent(apiData.data.listTodos.items);
  }  

  async function testAddSubEvent() {    
    const res = await API.graphql({ query: createSubEvent, variables: { input: instanData } });
    console.log(res);
  }

  function consoleStore() {
    console.log(state);
  }

  return (
    <div className="App">
      <button onClick={consoleStore}>state</button>
      <button onClick={()=>dispatch(fetchSubEventAsync())}>fetchSubEventAsync</button>
      <Calender />      
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);