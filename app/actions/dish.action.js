import { API_ROOT } from '../../api-config';
import {authGetToken} from './auth.action';

export const FETCH_ALL_DISHES = 'FETCH_ALL_DISHES';
export const FETCH_ALL_DISHES_SUCCESS = 'FETCH_ALL_DISHES_SUCCESS';
export const FETCH_ALL_DISHES_FAILURE = 'FETCH_ALL_DISHES_FAILURE';

export const FETCH_TOP_DISHES = 'FETCH_TOP_DISHES';
export const FETCH_TOP_DISHES_SUCCESS = 'FETCH_TOP_DISHES_SUCCESS';
export const FETCH_TOP_DISHES_FAILURE = 'FETCH_TOP_DISHES_FAILURE';

export const RECOMMEND_DISH = 'RECOMMEND_DISH';
export const RECOMMEND_DISH_SUCCESS = 'RECOMMEND_DISH_SUCCESS';
export const RECOMMEND_DISH_FAILURE = 'RECOMMEND_DISH_FAILURE';


export function recommendDishDispatch(dish_mapping_id) {
    
    
        return (dispatch) => {
            dispatch(recommendDish());
            dispatch(authGetToken())
            .then(token => {
                return(
                    fetch(`${API_ROOT}/addRecommendedDish`, {
                        method: 'POST',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': token
                        //'Content-Type': 'multipart/form-data',
                        },
                        body: JSON.stringify({
                            mappingId: dish_mapping_id,
                            //userId: user_id,
                        }),
                        }
                    )
                )
            })
            .catch(() => {
                alert("No token found");
            })
            .then(res => res.json())
            .then(json => {
    
                dispatch(recommendDishSuccess(json));
                console.log(json,"recommended dish");
                return json;
            })  
            .catch(err => dispatch(recommendDishFailure(err)))
        }
    }
     
    export function recommendDish() {
        return {
            type: RECOMMEND_DISH
        }
    }
    
    export function recommendDishSuccess(recommendedDish) {
        return {
            type: RECOMMEND_DISH_SUCCESS,
            payload: {recommendedDish} 
        };
    }
    
    export function recommendDishFailure(error) {
        return {
            type: RECOMMEND_DISH_FAILURE,
            payload: {error} 
        };
    }


export function fetchTopDishes() {
        return dispatch => {
            dispatch(getTopDishes());
            //return(
            dispatch(authGetToken())
            .then(token => {
                return fetch(`${API_ROOT}/getTopDishes`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                })
            })
            .catch(() => {
                alert("No token found");
            })
           // )
            .then(res => res.json())
            .then(json => {
                dispatch(fetchTopDishesSuccess(json));
                console.log(json,"jsonnnnnnnnnnnnnn");
                return json;
            })  
            .catch(err => dispatch(fetchTopDishesFailure(err)))
        }
}
     
export function getTopDishes() {
    return {
        type: FETCH_TOP_DISHES
    }
}

export function fetchTopDishesSuccess(topDishes) {
    return {
        type: FETCH_TOP_DISHES_SUCCESS,
        payload: {topDishes} 
    };
}

export function fetchTopDishesFailure(error) {
    return {
        type: FETCH_TOP_DISHES_FAILURE,
        payload: {error} 
    };
}

export function fetchAllDishes() {

    return (dispatch) => {
        dispatch(getAllDishes());
        return(fetch(`${API_ROOT}/getFoodItems`))
        .then(res => res.json())
        .then(json => {

            dispatch(fetchAllDishesSuccess(json.docs));
            //console.log(json,"jsonnnnnnnnnnnnnn");
            return json.docs;
        })  
        .catch(err => dispatch(fetchAllDishesFailure(err)))
    }
}
 
export function getAllDishes() {
    return {
        type: FETCH_ALL_DISHES
    }
}

export function fetchAllDishesSuccess(allDishes) {
    return {
        type: FETCH_ALL_DISHES_SUCCESS,
        payload: {allDishes} 
    };
}

export function fetchAllDishesFailure(error) {
    return {
        type: FETCH_ALL_DISHES_FAILURE,
        payload: {error} 
    };
}