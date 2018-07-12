import {
  FETCH_USER_DETAILS,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from '../actions/user.action';

const initialState = {
  userDetails: [],
  userError: null,
  userLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_USER_DETAILS:// start fetching posts and set loading = true
    return { ...state,  userError: null, userLoading: true }; 
  case FETCH_USER_SUCCESS:// return list of posts and make loading = false
    return { ...state, userDetails: action.payload.user, userError:null, userLoading: false };
  case FETCH_USER_FAILURE:// return error and make loading = false
    //error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, userDetails: [], userError: action.payload.error, userLoading: false};  
  default:
    return state;
  }
};

export default reducer;