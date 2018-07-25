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

import DishCard from '../../components/DishCard/DishCard';

//import Icon from "react-native-vector-icons/Ionicons";
//import { deletePlace } from "../../store/actions/index";

class DishDetail extends Component {



  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ScrollView>
          <DishCard 
            dish_name = {this.props.selectedDish.dish_name}
            price = {this.props.selectedDish.price}
            restaurant_name = {this.props.selectedDish.restaurant_name}
            recommended = {this.props.selectedDish.recommended}
            dish_images = {this.props.selectedDish.image}
            reviews = {this.props.selectedDish.reviews}
            average_rating = {this.props.selectedDish.dish_rating}               
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
  }
});

// const mapDispatchToProps = dispatch => {
// //   return {
// //     onDeletePlace: key => dispatch(deletePlace(key))
// //   };
// };

export default (DishDetail);
