import React from 'react';
import { AppRegistry } from 'react-native';
import Home from './app/screens/Home/Home.screen';
import { Provider } from 'react-redux';
import store from './app/store/store';

const RNRedux = () =>(
    <Provider store = {store}>
        <Home />
    </Provider>
);

AppRegistry.registerComponent('eatBurpActual', () => RNRedux);
