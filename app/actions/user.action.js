import { API_ROOT } from '../../api-config';
import {authGetToken} from './auth.action';

export const FETCH_USER_DETAILS = 'FETCH_USER_DETAILS';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export function fetchUser() {
  return (dispatch) => {
    dispatch(getUser());
    dispatch(authGetToken())
    .then(token => {
        console.log("token in get user", token)
        return (
            fetch(`${API_ROOT}/getUserDetails`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
    )
    })
    .catch(() => {
        alert("No token found");
    })
    .then(res => res.json())
    .then(json => {
       dispatch(fetchUserSuccess(json));
       return json;
    })  
    .catch(err => dispatch(fetchUserFailure(err)))
  };
}
     
export function getUser() {
  return {
      type: FETCH_USER_DETAILS
  }
}

export function fetchUserSuccess(user) {
  return {
      type: FETCH_USER_SUCCESS,
      payload: {user} 
  };
}

export function fetchUserFailure(error) {
  return {
      type: FETCH_USER_FAILURE,
      payload: {error} 
  };
}