// aws
import { API } from 'aws-amplify';
// aws qraphQL
import { listSubEvents, listSpEvents, listDelEvents, listUsersId } from '../../graphql/queries';
import { createSpEvent, createSubEvent } from '../../graphql/mutations'

export async function fetchSubEventsAPI() {
    const apiData = await API.graphql({ query: listSubEvents });    
    return apiData
}

export type subEventDays = {
  start_time: string,
  dow: number
}

export type createSubEventType = {
  name: string,
  time: number,
  manager: string,
  color: string,
  people: number,
  days: Array<subEventDays>,  
}

export async function createSubEventAPI(data: createSubEventType) {  
  const apiData = await API.graphql({ query: createSubEvent, variables: { input: data } });    
  return apiData
}

export async function fetchSpEventsAPI() {
    const apiData = await API.graphql({ query: listSpEvents });        
    return apiData
}  

export async function fetchDelEventsAPI() {
    const apiData = await API.graphql({ query: listDelEvents });        
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