import { combineReducers } from 'redux';

import dish from './dish.reducer';
import ui from './ui.reducer';
import auth from './auth.reducer';
import restaurant from './restaurant.reducer';
import menu from './menu.reducer';
import user from './user.reducer';

export default combineReducers({
    dish,
    ui,
    auth,
    restaurant,
    menu,
    user,
})