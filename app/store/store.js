import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const middleware = [];
if(process.env.NODE_ENV === 'development'){
    middleware.push(logger);
}

export default createStore(reducers, applyMiddleware(thunk, logger));