// aws
import { API, graphqlOperation } from 'aws-amplify';
// aws qraphQL
import { listSubEvents, listSpEvents, listDelEvents, listUsersId } from '../../graphql/queries';
import { createSpEvent, updateSpEvent, deleteSpEvent, createSubEvent, updateSubEvent, createDelEvent, updateDelEvent } from '../../graphql/mutations'

export type subEventDays = {
  start_time: string,
  dow: number
}

export type crudSubEventType = {
  id?: string,
  name: string,
  time: number,
  manager: string,
  color: string,
  people: number,
  place: string,
  days: Array<subEventDays>,  
}

export type crudSpEventType = {
  id?: string,
  name: string,
  time: number,
  manager: string,
  color: string,
  people: number,
  place: string,
  start: string,  
}

export type crudDelEventType = {
  id?: string,  
  day: string,
  sub_event_id: string[]
}

export async function fetchSubEventsAPI() {
  const apiData = await API.graphql({ query: listSubEvents });    
  return apiData
}

export async function createSubEventAPI(input: crudSubEventType) {  
  const apiData = await API.graphql({ query: createSubEvent, variables: { input } });    
  return apiData
}

export async function updateSubEventAPI(input: crudSubEventType){
  const apiData = await API.graphql(graphqlOperation(updateSubEvent,{ input }))    
  return apiData
}

export async function fetchSpEventsAPI() {
  const apiData = await API.graphql({ query: listSpEvents });        
  return apiData
}  

export async function createSpEventAPI(input: crudSpEventType) {  
  let apiData;
  try { apiData = await API.graphql({ query: createSpEvent, variables: { input } });    
  } catch(err){console.log(err)}
  return apiData
}

export async function updateSpEventAPI(input: crudSpEventType ){
  const apiData = await API.graphql(graphqlOperation(updateSpEvent,{ input }))    
  return apiData
}

export async function deleteSpEventAPI(id: string) {  
  let apiData;
  try { apiData = await API.graphql(graphqlOperation(deleteSpEvent, { input:{id} } ))
  } catch(err){console.log(err)}
  return apiData
}

export async function fetchDelEventsAPI() {
    const apiData = await API.graphql({ query: listDelEvents });        
    return apiData
}  

export async function createDelEventAPI(data: crudDelEventType) {  
  const apiData = await API.graphql({ query: createDelEvent, variables: { input: data } });    
  return apiData
}

export async function updateDelEventAPI(input: crudDelEventType){
  const apiData = await API.graphql(graphqlOperation(updateDelEvent,{ input }))    
  return apiData
}

interface getEventReserveType{
  event_id: string,
  event_people: number
}

interface userIdType{
  id: string,
  event_id: string[]
}

export async function fetchAllUserEventAPI() {
  const apiData: any = await API.graphql({ query: listUsersId })

  let getEventReserve: getEventReserveType[] = []
  const reserveDate = apiData.data.listUsers.items.map((a: userIdType) => {    
    
    a.event_id && a.event_id.map((aei: string) => {
      let dipFlag: boolean = false

      getEventReserve = getEventReserve.map(gER => {
        if(gER.event_id === aei){
          gER.event_people += 1
          dipFlag = true
        }
        return gER
      })

      !dipFlag && getEventReserve.push({ event_id: aei, event_people: 1})    
    })
    
    return a
  })
    
  return getEventReserve
  
}    