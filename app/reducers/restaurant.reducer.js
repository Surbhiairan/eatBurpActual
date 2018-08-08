import {
  FETCH_RESTAURANTS,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE,
  FETCH_TOP_DISH_RESTAURANT,
  FETCH_TOP_DISH_RESTAURANT_FAILURE,
  FETCH_TOP_DISH_RESTAURANT_SUCCESS,
  FETCH_SELECTED_RESTAURANT,
  FETCH_SELECTED_RESTAURANT_FAILURE,
  FETCH_SELECTED_RESTAURANT_SUCCESS,
  RECOMMEND_RESTAURANT,
  RECOMMEND_RESTAURANT_FAILURE,
  RECOMMEND_RESTAURANT_SUCCESS
} from '../actions/restaurant.action';

const initialState = {

  restaurants: [],
  restaurantsError: null,
  restaurantsLoading: false,
  selectedRestaurant: null,
  selectedRestaurantLoading: false,
  selectedRestaurantError: null,
  topDishRestaurants: [],
  topDishRestaurantsLoading: false,
  topDishRestaurantsError: null,
  recommended: null,
  recommendedError: null,
  recommendedLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESTAURANTS:// start fetching posts and set loading = true
      return { ...state, restaurantsError: null, restaurantsLoading: true };
    case FETCH_RESTAURANTS_SUCCESS:// return list of posts and make loading = false
      return { ...state, restaurants: action.payload.restaurants, restaurantsError: null, restaurantsLoading: false };
    case FETCH_RESTAURANTS_FAILURE:// return error and make loading = false
      //error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, restaurants: [], restaurantsError: action.payload.error, restaurantsLoading: false };
    case FETCH_SELECTED_RESTAURANT:
      return { ...state, selectedRestaurantError: null, selectedRestaurantLoading: true };
    case FETCH_SELECTED_RESTAURANT_SUCCESS:
      return { ...state, selectedRestaurant: action.payload.selectedRestaurant, selectedRestaurantLoading: false }
    case FETCH_SELECTED_RESTAURANT_FAILURE:
      return { ...state, selectedRestaurant: null, selectedRestaurantError: action.payload.error, selectedRestaurantLoading: false };
    case FETCH_TOP_DISH_RESTAURANT:
      return { ...state, topDishRestaurantsError: null, topDishRestaurantsLoading: true };
    case FETCH_TOP_DISH_RESTAURANT_FAILURE:
      return { ...state, topDishRestaurants: [], topDishRestaurantsError: action.payload.error, topDishRestaurantsLoading: false };
    case FETCH_TOP_DISH_RESTAURANT_SUCCESS:
      return { ...state, topDishRestaurants: action.payload.topDishRestaurants, topDishRestaurantsError: null, topDishRestaurantsLoading: false };
    case RECOMMEND_RESTAURANT:
      return { ...state, recommendedError: null, recommendedLoading: true };
    case RECOMMEND_RESTAURANT_FAILURE:
      return { ...state, recommended: [], recommendedError: action.payload.error, recommendedLoading: false };
    case RECOMMEND_RESTAURANT_SUCCESS:
      return { ...state, recommended: action.payload.recommendedRestaurant, recommendedError: null, recommendedLoading: false };

      default:
      return state;
  }
};

// console.log('initialState', initialState);
// console.log('changeSearchedText', reducer(initialState, changeSearchedText('pizzas')));
// console.log('changeSelectedFood', reducer(initialState, changeSelectedFood('1')));

export default reducer;