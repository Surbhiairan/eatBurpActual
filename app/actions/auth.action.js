import { AsyncStorage } from 'react-native'

import { API_ROOT } from '../../api-config';
import {uiStopLoading, uiStartLoading} from './ui.action';
import startHomeScreen from '../screens/MainScreen/startHomeScreen';
import App from '../../App';

export const AUTH_REMOVE_TOKEN = 'AUTH_REMOVE_TOKEN';
export const TRY_AUTH = 'TRY_AUTH';
export const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN';
export const FETCH_USER = 'FETCH_USER';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';
export const POST_USER_FAILURE = 'POST_USER_FAILURE';

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        let url = `${ API_ROOT }/signIn`;
        if(authMode === 'signup') {
            url = `${API_ROOT}/signUp`;
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: authData.email,
                password: authData.password
            })
        })
        .then(res => res.json())
        .then(json => {
            dispatch(uiStopLoading());
            console.log('json--------', json);
            if (!json.token) {
                console.log('error', json.error);
                alert("Authentication failed, please try again");
            } else {
                dispatch(authStoreToken(json.token));
                startHomeScreen();
            }
            //dispatch(postUserSuccess(json));
            //deviceStorage.saveItem('currentUser_Token', json.token);
            //return json;
        })
        .catch(err => {
            console.log('err-------', err)
            dispatch(uiStopLoading())
            //dispatch(postUserFailure(err))
            alert("Authentication failed, please try again");
        })
    };
}

export const authStoreToken = token => {
    return dispatch => {
        dispatch(authSetToken(token));
        AsyncStorage.setItem('auth:token', token);
    }
}

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if(!token) {
                AsyncStorage.getItem('auth:token')
                .catch(err => reject(err))
                .then(tokenFromStorage => {
                    if(!tokenFromStorage) {
                        reject();
                        return;
                    }
                dispatch(authSetToken(tokenFromStorage));
                resolve(tokenFromStorage);
                });
            } else {
                resolve(token);
            }
        });
        promise.catch(err => {
            dispatch(authClearStorage())
        });
        return promise;
    }
}

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            startHomeScreen();
        })
        .catch((err) => { 
            console.log("Failed to sign in", err)
        })
    }
}

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem('auth:token');
    }
}

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage())
        App();
        dispatch(authRemoveToken());
    }
}

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    }
}

/* export function getUser() {
    return {
        type: FETCH_USER
    }
}

export function postUserSuccess(user) {
    return {
        type: POST_USER_SUCCESS,
        payload: { user }
    }
}

export function postUserFailure(err) {
    return {
        type: POST_USER_FAILURE,
        payload: { err }
    }
} */