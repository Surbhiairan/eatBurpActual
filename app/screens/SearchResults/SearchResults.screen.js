import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  NativeModules,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import { fetchDishSearchResults } from '../../actions/dish.action';
import DishSearchResultListItem from '../../components/DishSearchResultItem/DishSearchResultListItem';
import ListCard from '../../components/ListCard/ListCard';

class SearchResults extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishSearchResults(this.props.dish_id);
  }

  listCardPressedHandler = (item) => {
    this.props.navigator.push({
        screen: "DishDetailScreen",
        passProps: {
            selectedDish: item.item
        }
    })
  }

  renderDish = (dish) => {
    console.log("in render", dish);
    return(
      <ListCard
        type = "dishRestaurantMapping"
        dish_name = {dish.item.dish_name}
        price = {dish.item.price}
        restaurant_name = {dish.item.restaurant_name}
        restaurant_location = {dish.item.restaurant_location}
        dish_rating = {dish.item.average_rating}
        restaurant_type = {dish.item.restaurant_type}
        image = {dish.item.images} 
        onPress={() => this.listCardPressedHandler(item)}
        onPressLike={this.recommendDishHandler}
        onPressRating={this.ratingDishHandler}
        onPressReview={this.reviewDishHandler}
      />   
    );
  }

  render(){
    return(
      <View>
        {this.props.dishSearchResultsLoading ? 
            <Text>Loading...</Text>
            : 
          <FlatList 
            data = {this.props.dishSearchResults}
            renderItem = {this.renderDish}
          />
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    dishSearchResults: state.dish.dishSearchResults,
    dishSearchResultsLoading: state.dish.dishSearchResultsLoading,
    dishSearchResultsError: state.dish.dishSearchResultsError
  }
};
  
const mapDispatchToProps = dispatch => {
  return {
    fetchDishSearchResults: (dish_id) => dispatch(fetchDishSearchResults(dish_id)),
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);