import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DishCard from '../DishCard/DishCard';

const dishList = (props) => {
    console.log("props",props);
    return (
    <View>
    <Text>Top Dishes</Text>
    <FlatList
        style = { styles.dishListContainer }
        data = { props.dishes }
        renderItem = {(dish) => (
            <DishCard 
                dish_name = {dish.item.dish_name}
                restaurant_name = {dish.item.restaurant_name}
                recommendation = {dish.item.recommendation}
                imageUrls = {dish.item.imageUrls}
                average_rating = {dish.item.average_rating}               
                onDishCardPressed={() => props.onDishCardPressed(dish)}
            />
        )}
    />
    </View>
    );
};

const styles = StyleSheet.create({
    dishCard: {
        //backgroundColor: "#00FF00"
    }
});

export default dishList;