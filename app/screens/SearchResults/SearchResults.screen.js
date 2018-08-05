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
  Image,
  ActivityIndicator
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
    //this.props.fetchDishSearchResults(this.props.dish_id);
  }

  listCardPressedHandler = (item) => {
    this.props.navigator.push({
        screen: "DishDetailScreen",
        passProps: {
            selectedDish: item
        }
    })
  }

  reviewDishHandler = (dish) => {
    this.props.navigator.push({
        screen: "ReviewDishScreen",
        title: 'Add Review',        
        passProps: {
            selectedDish: dish
        }
    });
    alert("reviewed");
  }

  renderDish = (dish) => {
    console.log("in render", dish);
    return(
      <ListCard
        type = "dishRestaurantMapping"
        dish = {dish.item}
        dish_name = {dish.item.dish_name}
        price = {dish.item.price}
        restaurant_name = {dish.item.restaurant_name}
        locality = {dish.item.locality}
        dish_rating = {dish.item.average_rating}
        restaurant_type = {dish.item.restaurant_type}
        image = {dish.item.images} 
        onPress={() => this.listCardPressedHandler(dish.item)}
        onPressReview={this.reviewDishHandler}
      />   
    );
  }

  render(){
    return(
      <View>
        <Text style={styles.heading}>
          Search Result
        </Text>
        {this.props.dishSearchResultsLoading ? 
           <ActivityIndicator/>
            : 
          <FlatList 
            data = {this.props.dishSearchResults}
            renderItem = {this.renderDish}
            keyExtractor={(item, index) => index.toString()}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 22,
    color: '#212121',
    marginLeft: 19,
    marginTop: 7,
  }
})

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