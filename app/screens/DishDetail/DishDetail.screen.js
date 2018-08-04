import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import SearchBar from '../../components/SearchBar/SearchBar';

import DishCard from '../../components/DishCard/DishCard';
import Icon from 'react-native-vector-icons/Ionicons';

//import Icon from "react-native-vector-icons/Ionicons";
//import { deletePlace } from "../../store/actions/index";

class DishDetail extends Component {

  static navigatorStyle = {
    navBarHidden: true
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  backIconPress = () => {
    this.props.navigator.pop();
  }
  searchBarPressHandler = () => {
    //navigate to search suggestion screen
    this.props.navigator.push({
      screen: "SearchSuggestionScreen",
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.backIconPress}>
            <Icon style={styles.backIcon} name="ios-arrow-round-back-outline" size={45} color="#757575" />
          </TouchableOpacity>
          <View style={styles.searchbar}>
            <SearchBar
              onSearchBarPressed={this.searchBarPressHandler}
            />
          </View >
        </View>
        <View>
          <ScrollView>
          <DishCard 
            dish_name = {this.props.selectedDish.dish_name}
            price = {this.props.selectedDish.price}
            restaurant_name = {this.props.selectedDish.restaurant_name}
            recommended = {this.props.selectedDish.recommended}
            dish_images = {this.props.selectedDish.images}
            reviews = {this.props.selectedDish.reviews}
            average_rating = {this.props.selectedDish.average_rating}               
            onDishCardPressed={() => props.onDishCardPressed(this.props.selectedDish)}
            onRecommendButtonPressed={() => props.onRecommendButtonPressed(this.props.selectedDish)}
            onReviewButtonPressed={() => props.onReviewButtonPressed(this.props.selectedDish)}
          /></ScrollView>
        </View>
        {/* <View>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon size={30} name="ios-trash" color="red" />
            </View>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: "center"
  },
  header: {
    paddingTop: 10,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  backIcon: {
    paddingLeft: 10,

  },
  searchbar: {
    paddingLeft: 10,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginLeft: 10,
  },
});

// const mapDispatchToProps = dispatch => {
// //   return {
// //     onDeletePlace: key => dispatch(deletePlace(key))
// //   };
// };

export default (DishDetail);
