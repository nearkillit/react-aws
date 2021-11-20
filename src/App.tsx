import React, { useState, useEffect } from 'react';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { Routes, 
         Route,
         useParams,         
         useLocation,         
         } from "react-router-dom";         
import { createBrowserHistory } from 'history';
// aws
import { API, Auth, graphqlOperation, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
// aws qraphQL
import { getUser, listSubEvents, listSpEvents, listDelEvents } from './graphql/queries';
import { createSubEvent, createSpEvent } from './graphql/mutations';

// components
import Calender from "./components/calender"
import Reserve from "./components/reserve"
import {  
  selectState as eventState,
  fetchSubEventAsync,
  fetchSpEventAsync,
  fetchDelEventAsync,
} from './ducks/event/eventSlice';
import {  
  selectState as userState,
  fetchUserDataAsync,
  fetchUserAsync,  
} from './ducks/user/userSlice';
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
// SubEvent
const instantData = {
  name: "テストイベント",
  time: 60,
  manager: "テスト担当者",
  color: "#FFF",
  people: 20,
  start: "2019-04-11T04:59:22.088Z"
}

function App() {
  const [subEvent, setSubEvent] = useState<subEventType>();  
  const event_state = useAppSelector(eventState);
  const user_state = useAppSelector(userState);
  const state = useAppSelector(userState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserAsync())
    dispatch(fetchSubEventAsync())
    dispatch(fetchSpEventAsync())
    dispatch(fetchDelEventAsync())
  }, []);  

  async function fetchSubEvents() {
    // const apiData = await API.graphql({ query: listSubEvents });
    // const user = await Auth.currentAuthenticatedUser()
    // console.log(user);                    
    // const apiDataById = await API.graphql(graphqlOperation(getTodo, {id: "25bbe2e8-3d85-4e95-a363-8794aaaddf64"}))
    // const apiDataById = await API.graphql(graphqlOperation(getUser, {id:"f9c852a2-b122-41a6-a535-f27379d2a066"}));
    // console.log(apiDataById);
    
  }  
  // Cannot return null for non-nullable type: 'AWSDateTime' within parent 'User' (/getUser/createdAt)

  async function testAddSubEvent() {    
    const res = await API.graphql({ query: createSubEvent, variables: { input: instanData } });
    console.log(res);
  }

  async function testAddSpEvent() {    
    const res = await API.graphql({ query: createSpEvent, variables: { input: instantData } });
    console.log(res);
  }

  function consoleStore() {
    console.log(state);
  }

  async function fetchSubEventAsyncs() {
    const apiData = await API.graphql({ query: listSubEvents });
    console.log(apiData);
  }

  async function fetchUserDataAsyncs() {    
    dispatch(fetchUserDataAsync(state.user.user_id))    
  }

  return (
    <div className="App">
      { user_state.user.user_name !== "" && 
      <h2>ようこそ！ {user_state.user.user_name}さん</h2>}
      <button onClick={consoleStore}>state</button>
      <button onClick={()=>dispatch(fetchUserAsync())}>fetchUserAsync</button>
      <button onClick={()=>dispatch(fetchSubEventAsync())}>fetchSubEventAsyncs</button>
      <button onClick={fetchUserDataAsyncs}>fetchUserDataAsyncs</button>      
      <Routes>
        <Route path="/" element={<Calender />} />
        <Route path="/reserve/:id" element={<Reserve />}/>        
        <Route element={<h1>404 Not Found</h1>} />                  
      </Routes>      
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);