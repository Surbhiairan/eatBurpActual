import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import startHomeScreen from '../MainScreen/startHomeScreen';
class AuthScreen extends Component {
    loginHandler = () => {
        startHomeScreen();
    }

    render() {
        return (
            <View>
                <Text>Auth Screen</Text>
                <Button title="Login" onPress = {this.loginHandler} />
            </View>
        );
    }
}

export default AuthScreen;