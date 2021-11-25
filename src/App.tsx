import React, { useState, useEffect } from 'react';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { Routes, 
         Route,               
         } from "react-router-dom";         
// aws
import { API, Auth, graphqlOperation, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
// aws qraphQL
import { getUser, listSubEvents, listSpEvents, listDelEvents, listUsersId } from './graphql/queries';
import { createSubEvent, createSpEvent, createDelEvent } from './graphql/mutations';

// components
import Calender from "./components/calender"
import Reserve from "./components/reserve"
import {  
  selectState as eventState,
  fetchSubEventAsync,
  fetchSpEventAsync,
  fetchDelEventAsync,
} from './ducks/event/eventSlice';
import { fetchAllUserEventAPI } from './ducks/event/eventAPI'
import {  
  selectState as userState,
  fetchUserDataAsync,
  fetchUserAsync,  
} from './ducks/user/userSlice';
// types
import { subEventType } from "./types/apidata"
import Admin from './components/eventRegister';
import SubEventRegister from './components/eventRegister';

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
// const instantData = {
//   name: "テストイベント",
//   time: 60,
//   manager: "テスト担当者",
//   color: "#FFF",
//   people: 20,
//   start: "2019-04-11T04:59:22.088Z"
// }
// delevent
// id: string,
  // day: string,
  // sub_event_id: string,
  // updatedAt: string
const instantData = {
    day: "2021-11-29",
    sub_event_id: "b124ea84-905c-4156-a0c3-7c3b1ef59dd1",    
  }

function App() {  
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

  async function testAdd() {    
    const res = await API.graphql({ query: createDelEvent, variables: { input: instantData } });
    console.log(res);
  }
  

  function consoleStore() {
    console.log(state);
  }

  // async function fetchUserDataAsyncs() {    
  //   dispatch(fetchUserDataAsync(state.user.user_id))    
  // }

  useEffect(()=>{
    state.user.user_id && dispatch(fetchUserDataAsync(state.user.user_id))    
  },[state.user.user_id])

  return (
    <div className="App">
      { state.user.user_name !== "" && 
      <h2>ようこそ！ {state.user.user_name}さん({state.user.user_group.includes("admin") && "＊管理者＊"})
      </h2>}
      <button onClick={consoleStore}>state</button>                 
      <Routes>
        <Route path="/" element={<Calender />} />
        <Route path="reserve/:id" element={<Reserve />}/>  
        <Route path="subeventregi/:id" element={<SubEventRegister />}/>        
        <Route element={<h1>404 Not Found</h1>} />                  
      </Routes>      
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);