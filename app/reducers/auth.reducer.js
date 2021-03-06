import {
    AUTH_SET_TOKEN,
    AUTH_REMOVE_TOKEN
} from '../actions/auth.action';

const initialState = {
    token: null,
    user: [],
    error: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_TOKEN: 
            return { ...state, token: action.token};
        case AUTH_REMOVE_TOKEN: 
            return { ...state, token:null};
        /* case FETCH_USER:// start fetching posts and set loading = true
            return { ...state, error: null, loading: true };
        case POST_USER_SUCCESS:// return list of posts and make loading = false
            return { ...state, user: action.payload.user, error: null, loading: false };
        case POST_USER_FAILURE:// return error and make loading = false
            //error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, user: [], error: action.payload.error, loading: false }; */
        default:
            return state;
    }
};

export default reducer;