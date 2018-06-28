import { combineReducers } from 'redux';

import dish from './dish.reducer';
import restaurant from './restaurant.reducer';

export default combineReducers({
    dish, restaurant
})