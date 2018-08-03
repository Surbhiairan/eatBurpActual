import { API_ROOT } from '../../api-config';
import {authGetToken} from './auth.action';

export const SEARCH_RESTAURANT = 'SEARCH_RESTAURANT';
export const SEARCH_RESTAURANT_SUCCESS = 'SEARCH_RESTAURANT_SUCCESS';
export const SEARCH_RESTAURANT_FAILURE = 'SEARCH_RESTAURANT_FAILURE';
export const SEARCH_DISH = 'SEARCH_DISH';
export const SEARCH_DISH_SUCCESS = 'SEARCH_DISH_SUCCESS';
export const SEARCH_DISH_FAILURE = 'SEARCH_DISH_FAILURE';

export function searchRestaurant(searchedText) {
  return (dispatch) => {
    dispatch(getsearchRestaurant());
    dispatch(authGetToken())
    .then(token => {
        console.log("token in get user", token)
        return (
            fetch(`${API_ROOT}/searchRestaurants?searchedText=`+searchedText,{
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
       dispatch(searchRestaurantSuccess(json));
       return json;
    })  
    .catch(err => dispatch(searchRestaurantFailure(err)))
  };
}
     
export function getsearchRestaurant() {
  return {
      type: SEARCH_RESTAURANT
  }
}

export function searchRestaurantSuccess(restaurants) {
  return {
      type: SEARCH_RESTAURANT_SUCCESS,
      payload: {restaurants} 
  };
}

export function searchRestaurantFailure(error) {
  return {
      type: SEARCH_RESTAURANT_FAILURE,
      payload: {error} 
  };
}

export function searchDish(searchedText) {
  return (dispatch) => {
    dispatch(getSearchDish());
    dispatch(authGetToken())
    .then(token => {
        console.log("token in get user", token)
        return (
            fetch(`${API_ROOT}/searchDishes?searchedText=`+searchedText,{
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
       dispatch(searchDishSuccess(json));
       return json;
    })  
    .catch(err => dispatch(searchDishFailure(err)))
  };
}
     
export function getSearchDish() {
  return {
      type: SEARCH_DISH
  }
}

export function searchDishSuccess(dishes) {
  return {
      type: SEARCH_DISH_SUCCESS,
      payload: {dishes} 
  };
}

export function searchDishFailure(error) {
  return {
      type: SEARCH_DISH_FAILURE,
      payload: {error} 
  };
}