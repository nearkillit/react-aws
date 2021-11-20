// aws
import { API } from 'aws-amplify';
// aws qraphQL
import { listSubEvents, listSpEvents, listDelEvents } from '../../graphql/queries';

export async function fetchSubEventsAPI() {
    const apiData = await API.graphql({ query: listSubEvents });    
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
  