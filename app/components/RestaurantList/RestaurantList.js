import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";

//import ListItem from "../ListItem/ListItem";
import RestaurantCard from '../RestaurantCard/RestaurantCard'

const restaurantList = (props) => {
    console.log("props=---------", props)
    return (
        <View> 
            <Text> Top Restaurants </Text>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                style={styles.listContainer}
                data={props.restaurants}
                renderItem={(info) => (
                    <RestaurantCard
                        restaurant_name = {info.item.restaurant_name}
                        onRestaurantCardPressed = {() => props.onRestaurantCardPressed(info)}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: "#0000ff"
    }
});

export default restaurantList;
