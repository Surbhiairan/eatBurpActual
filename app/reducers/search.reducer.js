import {
     SEARCH_DISH,
     SEARCH_DISH_FAILURE,
     SEARCH_DISH_SUCCESS,
     SEARCH_RESTAURANT,
     SEARCH_RESTAURANT_FAILURE,
     SEARCH_RESTAURANT_SUCCESS
  } from '../actions/search.action';
  
  const initialState = {
    searchDishes: [],
    searchDishesError: null,
    searchDishesLoading: false,
    searchRestaurants :[],
    searchRestaurantsError: null,
    searchRestaurantsLoading: false,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
    case SEARCH_DISH:// start fetching posts and set loading = true
      return { ...state, searchDishesError: null, searchDishesLoading: true }; 
    case SEARCH_DISH_SUCCESS:// return list of posts and make loading = false
      return { ...state, searchDishes: action.payload.dishes, searchDishesError:null, searchDishesLoading: false };
    case SEARCH_DISH_FAILURE:// return error and make loading = false
      //error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, searchDishes: [], searchDishesError: action.payload.error, searchDishesLoading: false};  
    case SEARCH_RESTAURANT:// start fetching posts and set loading = true
      return { ...state,  searchRestaurantsError: null, searchRestaurantsLoading: true }; 
    case SEARCH_RESTAURANT_SUCCESS:// return list of posts and make loading = false
      return { ...state, searchRestaurants: action.payload.restaurants, searchRestaurantsError:null, searchRestaurantsLoading: false };
    case SEARCH_RESTAURANT_FAILURE:// return error and make loading = false
      //error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, searchRestaurants: [], searchRestaurantsError: action.payload.error, searchRestaurantsLoading: false};  
    default:
      return state;
    }
  };
  
  export default reducer;