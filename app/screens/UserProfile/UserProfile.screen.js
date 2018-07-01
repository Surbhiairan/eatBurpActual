import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

import HeadingText from '../../components/UI/HeadingText/HeadingText'

class UserProfile extends Component {
    render() {
        return (
            <View> 
                <HeadingText> 
                    On User Profile Screen
                </HeadingText>
            </View>
        )
    }
}

export default (UserProfile);