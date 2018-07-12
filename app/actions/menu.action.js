import { API_ROOT } from '../../api-config';

export const FETCH_MENU = 'FETCH_MENU';
export const FETCH_MENU_SUCCESS = 'FETCH_MENU_SUCCESS';
export const FETCH_MENU_FAILURE = 'FETCH_MENU_FAILURE';

export function fetchMenu(restaurantId) {
    return (dispatch) => {       
        dispatch(getMenu());
        return(fetch(`${API_ROOT}/getMenu?rid=`+restaurantId))
        .then(res => res.json())
        .then(data => {
            result = data.reduce(function (r, a) {
            r[a.dish_category] = r[a.dish_category] || [];
            r[a.dish_category].push(a);
            return r;
        }, Object.create(null));
        
        var ja = [];
        for( item in result) {
            ja.push({
                "category": item,
                "dishes": result[item]
            }) 
        }
    
            dispatch(fetchMenuSuccess(ja));
            return ja;
        })  
        .catch(err => dispatch(fetchMenuFailure(err)))
    }
}
 
export function getMenu() {
    return {
        type: FETCH_MENU
    }
}

export function fetchMenuSuccess(menu) {
    return {
        type: FETCH_MENU_SUCCESS,
        payload: {menu} 
    };
}

export function fetchMenuFailure(error) {
    return {
        type: FETCH_MENU_FAILURE,
        payload: {error} 
    };
}