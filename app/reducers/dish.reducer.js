import {
    FETCH_ALL_DISHES,
    FETCH_ALL_DISHES_SUCCESS,
    FETCH_ALL_DISHES_FAILURE,
    FETCH_TOP_DISHES,
    FETCH_TOP_DISHES_SUCCESS,
    FETCH_TOP_DISHES_FAILURE,
    
} from '../actions/dish.action';

const initialState = {
    
        topDishes: [],
        topDishesError: null,
        topDishesLoading: false,
        allDishes: [],
        allDishesError: null,
        allDishesLoading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_TOP_DISHES:// start fetching posts and set loading = true
      return { ...state,  topDishesError: null, topDishesLoading: true }; 
    case FETCH_TOP_DISHES_SUCCESS:// return list of posts and make loading = false
      return { ...state, topDishes: action.payload.topDishes, topDishesError:null, topDishesLoading: false };
    case FETCH_TOP_DISHES_FAILURE:// return error and make loading = false
      //error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, topDishes: [], topDishesError: action.payload.error, topDishesLoading: false};  
    case FETCH_ALL_DISHES:// start fetching posts and set loading = true
      return { ...state,  allDishesError: null, allDishesLoading: true }; 
    case FETCH_ALL_DISHES_SUCCESS:// return list of posts and make loading = false
      return { ...state, allDishes: action.payload.allDishes, allDishesError:null, allDishesLoading: false };
    case FETCH_ALL_DISHES_FAILURE:// return error and make loading = false
      //error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, allDishes: [], allDishesError: action.payload.error, allDishesLoading: false};  
    default:
      return state;
    }
};

export default reducer;