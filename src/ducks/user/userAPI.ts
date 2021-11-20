// aws
import { API, Auth, graphqlOperation } from 'aws-amplify';
// aws qraphQL
import { getUser } from '../../graphql/queries';

export async function fetchUserDataAPI(id:string) {    
    const apiDataById = await API.graphql(graphqlOperation(getUser, {id}))
    console.log(apiDataById);    
    return apiDataById
  }  

export async function fetchUserAPI() {     
    const user = await Auth.currentAuthenticatedUser()        
    return { user_id: user.attributes.sub, user_name: user.username } 
  }    
  
  