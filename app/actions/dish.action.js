import { API_ROOT } from '../../api-config';

export const FETCH_ALL_DISHES = 'FETCH_ALL_DISHES';
export const FETCH_ALL_DISHES_SUCCESS = 'FETCH_ALL_DISHES_SUCCESS';
export const FETCH_ALL_DISHES_FAILURE = 'FETCH_ALL_DISHES_FAILURE';
export const FETCH_TOP_DISHES = 'FETCH_TOP_DISHES';
export const FETCH_TOP_DISHES_SUCCESS = 'FETCH_TOP_DISHES_SUCCESS';
export const FETCH_TOP_DISHES_FAILURE = 'FETCH_TOP_DISHES_FAILURE';

export function fetchTopDishes() {
    
        return (dispatch) => {
            dispatch(getTopDishes());
            return(fetch(`${API_ROOT}/getTopDishes`))
            .then(res => res.json())
            .then(json => {
    
                dispatch(fetchTopDishesSuccess(json));
                console.log(json,"jsonnnnnnnnnnnnnn");
                return json.docs;
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
        return(fetch(`${API_ROOT}/getAllDishes`))
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