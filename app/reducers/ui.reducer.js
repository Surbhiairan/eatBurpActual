import {UI_START_LOADING, UI_STOP_LOADING} from '../actions/ui.action';

const intialState = {
    isLoading: false
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            };

        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            };
    
        default:
            return state
    }
}

export default reducer;