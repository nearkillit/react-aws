// aws
import { API } from 'aws-amplify';
// aws qraphQL
import { listSubEvents } from '../graphql/queries';

export async function fetchSubEventsAPI() {
    const apiData = await API.graphql({ query: listSubEvents });
    return apiData
  }  