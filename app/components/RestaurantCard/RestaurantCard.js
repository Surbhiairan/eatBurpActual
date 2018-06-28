import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const RestaurantCard = (props) => (
    <TouchableOpacity onPress={props.onRestaurantCardPressed}>
        <View>
            <Text> In Here </Text>
        <Text >{props.restaurant_name}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        marginBottom: 5,
        padding: 10,
        backgroundColor: "#fff"
    }
});

export default RestaurantCard;
