import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const button = (props) => (
    <TouchableOpacity onPress = {props.onPress}>
    <View style = {styles.button} >
    <Text>{props.title}</Text>
    </View>
    </TouchableOpacity>            
);

const styles = StyleSheet.create({
    button: {
        padding: 5,
        margin:5,
        backgroundColor: '#eaecee',
    }
})

export default button;

