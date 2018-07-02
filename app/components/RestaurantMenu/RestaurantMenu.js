import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';

import MenuItem from '../MenuItem/MenuItem';
import DishCard from '../DishCard/DishCard';

export default class RestaurantMenu extends Component {

constructor(props) {
    super(props);
    this.state = {
        categorizedMenu: [],
        selectedDishCategory: []
    };  
}

renderMenuCategory = (menu) => {
  return (
    <View>
      <Text         
        onPress={() => this._handlePressDishCategory(menu)} >
      {menu.item.category}</Text>
    </View>
  );
};

_handlePressDishCategory = (menu) => {
  this.setState({selectedDishCategory: menu.item.dishes});
}

renderSelectedDishCategoryDishes = (category) => {
  return (
    <DishCard  
      dish_name = {category.item.dish_name}
      restaurant_name = {category.item.restaurant_name}
      recommended = {category.item.recommended}
      dish_images = {category.item.dish_images}
      average_rating = {category.item.average_rating}               
      onDishCardPressed={() => props.onDishCardPressed(category)}
      onRecommendButtonPressed={() => props.onRecommendButtonPressed(category)}
    />
  )
};

render(){
  if(this.props.menu == null)
    return(<Text>No menu</Text>)
  else
  return(
    <View>
      <View>
        <FlatList
          horizontal={true}
          keyExtractor={(item, index) => index}
          data={this.props.menu}
          renderItem={this.renderMenuCategory} 
          showsHorizontalScrollIndicator={false}/>
      </View>
      <View>
        {(this.state.selectedDishCategory) && 
        <FlatList
          data = { this.state.selectedDishCategory }
          keyExtractor={(item, index) => index}
          renderItem = {this.renderSelectedDishCategoryDishes}/>
        }
      </View>
    </View>
  );
}
}