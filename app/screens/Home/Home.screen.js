import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import restaurants from '../../data/restautants';
import RestaurantList from '../../components/RestaurantList/RestaurantList'
// import DishCard from '../../components/DishCard/DishCard';

export default class Home extends Component {

    state = {
        restaurant: restaurants
    }
    restoCardPressHandler = resto => {
        console.log("pressed", resto);
    }

    render() {
        return(
            <View>
                <RestaurantList 
                    restaurants={this.state.restaurant}
                    onRestaurantCardPressed = {this.restoCardPressHandler }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 26,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "flex-start"
    }
});
