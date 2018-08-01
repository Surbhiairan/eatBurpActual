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

export const FETCH_DISH_SEARCH_RESULTS = 'FETCH_DISH_SEARCH_RESULTS';
export const FETCH_DISH_SEARCH_RESULTS_SUCCESS = 'FETCH_DISH_SEARCH_RESULTS_SUCCESS';
export const FETCH_DISH_SEARCH_RESULTS_FAILURE = 'FETCH_DISH_SEARCH_RESULTS_FAILURE';

export const FETCH_CITY_SPECIAL = 'FETCH_CITY_SPECIAL';
export const FETCH_CITY_SPECIAL_SUCCESS = 'FETCH_CITY_SPECIAL_SUCCESS';
export const FETCH_CITY_SPECIAL_FAILURE = 'FETCH_CITY_SPECIAL_FAILURE';

export const FETCH_DISH_MAPPINGS = 'DISH_MAPPINGS';
export const FETCH_DISH_MAPPINGS_SUCCESS = 'DISH_MAPPINGS_SUCCESS';
export const FETCH_DISH_MAPPINGS_FAILURE = 'DISH_MAPPINGS_FAILURE';

export function fetchCitySpecial() {
    return (dispatch) => {
        dispatch(getCitySpecial());
        dispatch(authGetToken())
            .then(token => {
                return (
                    fetch(`${API_ROOT}/getCitySpecial?c_name=Indore`, {
                        method: 'GET',
                        headers: {
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
                console.log(json, "jsonnnn");
                dispatch(fetchCitySpecialSuccess(json));
                return json;
            })
            .catch(err => dispatch(fetchCitySpecialFailure(err)))
    }
}

export function getCitySpecial() {
    return{
        type: FETCH_CITY_SPECIAL
    }
}

export function fetchCitySpecialSuccess(citySpecial) {
    return {
        type: FETCH_CITY_SPECIAL_SUCCESS,
        payload: {citySpecial}
    }
}

export function fetchCitySpecialFailure(error) {
    return {
        type: FETCH_CITY_SPECIAL_FAILURE,
        payload: {error}
    }
}

export function fetchDishSearchResults(searchTag) {
    console.log("inside fetchDishSearchResults")
    return (dispatch) => {
        dispatch(getDishSearchResults());
        dispatch(authGetToken())
        .then(token => {
            return (
            fetch(`${API_ROOT}/getDishSearchResults?searchTag=`+searchTag, {
                method: 'GET',
                headers: {
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
                console.log(json,"jsonnnn");
                dispatch(fetchDishSearchResultsSuccess(json));
                return json;
            })  
        .catch(err => dispatch(fetchDishSearchResultsFailure(err)))
}
}
     
export function getDishSearchResults() {
    return {
        type: FETCH_DISH_SEARCH_RESULTS
    }
}

export function fetchDishSearchResultsSuccess(dishList) {
    return {
        type: FETCH_DISH_SEARCH_RESULTS_SUCCESS,
        payload: {dishList} 
    };
}

export function fetchDishSearchResultsFailure(error) {
    return {
        type: FETCH_DISH_SEARCH_RESULTS_FAILURE,
        payload: {error} 
    };
}

export function recommendDishDispatch(dish_rest_mapping_id) {
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
                        mappingId: dish_rest_mapping_id,
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

            dispatch(recommendDishSuccess(json.success));
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


       /*  dispatch(getTopDishes());
           return (fetch(`${API_ROOT}/getTopDishes`)
        ) 
        .then(res => res.json())
        .then(json => {
            console.log(json.success,"jsonnnnnnnnnnnnnn");
            
            dispatch(fetchTopDishesSuccess(json.success));
            return json.success;
        })  
        .catch(err => 
            {console.log(err,"err");
            dispatch(fetchTopDishesFailure(err))}) */

        dispatch(getTopDishes());
        dispatch(authGetToken())
        .then(token => {
            return fetch(`${API_ROOT}/getTopDishes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjM0OTFmZTYxMjI3MTVmZDQyNWViZWUiLCJpYXQiOjE1MzIwNzc0NzN9.kDPfSIplPEa-6-CwoIMqkd_336UxlmZSoLkhpMM2PdE"
                }
            })
        })
        .catch(() => {
            alert("No token found");
        })
        .then(res => res.json())
        .then(json => {
            dispatch(fetchTopDishesSuccess(json.success));
            console.log(json.success,"jsonnnnnnnnnnnnnn");
            return json.success;
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
            console.log(json,"jsonnnnnnnnnnnnnn");
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

export function fetchDishMappings(restaurantId) {
    return (dispatch) => {
        dispatch(getDishMappings());
        dispatch(authGetToken())  
        .then(token => {            
            return(
            fetch(`${API_ROOT}/getMenu?rid=`+restaurantId,{
                method: 'GET',
                headers: {
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
                dispatch(fetchDishMappingsSuccess(json.success));
                console.log(json.success,"jsonnnnnnnnnnnnnn");
                return json.success;
            })  
            .catch(err => dispatch(fetchDishMappingsFailure(err)))
    }
}
 
export function getDishMappings() {
    return {
        type: FETCH_DISH_MAPPINGS
    }
}

export function fetchDishMappingsSuccess(dishMappings) {
    return {
        type: FETCH_DISH_MAPPINGS_SUCCESS,
        payload: {dishMappings} 
    };
}

export function fetchDishMappingsFailure(error) {
    return {
        type: FETCH_DISH_MAPPINGS_FAILURE,
        payload: {error} 
    };
}