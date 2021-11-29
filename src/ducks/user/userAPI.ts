// aws
import { API, Auth, graphqlOperation } from 'aws-amplify';
// aws qraphQL
import { getUser } from '../../graphql/queries';
import { updateUser } from '../../graphql/mutations';
import { updateUserType } from './userSlice'

export async function fetchUserDataAPI(id:string) {    
    const apiDataById = await API.graphql(graphqlOperation(getUser, {id}))    
    return apiDataById
}  

export async function fetchUserAPI() {
    const user = await Auth.currentAuthenticatedUser()     
    console.log(user);
    
    const userGroups = user.signInUserSession.idToken.payload["cognito:groups"]

    return { user_id: user.attributes.sub, 
             user_name: user.username,
             user_group: userGroups ? userGroups : []
        } 
}    

export async function updateUserAPI(input: updateUserType) {    
    const apiDataById = await API.graphql(graphqlOperation(updateUser, {input}))    
    return apiDataById
}  