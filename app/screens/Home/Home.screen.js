import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import DishCard from '../../components/DishCard/DishCard';

export default class Home extends Component {

    render() {
        return(
            <View>
                <DishList
                    dishes = {this.props.dishes}
                    onDishSelect = {this.dishSelectHandler}
                />
            </View>
        );
    }
}