import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import { fetchMenu } from '../../actions/menu.action';
import { recommendRestaurantDispatch} from '../../actions/restaurant.action';
import RestaurantMenu from '../../components/RestaurantMenu/RestaurantMenu';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';

class RestaurantDetail extends Component {

  componentDidMount() {
    console.log("selected restaurant",this.props.id);
    let restaurantId = this.props.id || this.props.searchedRestaurant._id;
    this.props.dispatch(fetchMenu(restaurantId));        
  }

  renderRestaurantMenuCategory = (item) => (
    <RestaurantMenu 
      title={item.item.category}
      menu={item.item.dishes}
      onDishPressed={this.dishPressedHandler}  
      >
    </RestaurantMenu >
  )

  dishPressedHandler = (item) => {
    this.props.navigator.push({
      screen: "DishDetailScreen",
      passProps: {
        selectedDish: item
      }
    })
  }

  recommendButtonPressedHandler = (detail) => {
    console.log("details--------", detail);
    this.props.dispatch(recommendRestaurantDispatch(detail._id));
  }

  reviewButtonPressedHandler = (restaurant) => {
    this.props.navigator.push({
      screen: "ReviewDishScreen",
      title: 'Add Review',
      passProps: {
        selectedRestaurant: restaurant
      }
    });
  }

  render() {
    console.log("props---------", this.props)
    let menuList = <FlatList
      data={this.props.menu}
      keyExtractor={(item, index) => index.toString()}
      renderItem={this.renderRestaurantMenuCategory} />
    if(this.props.isLoading) (
      menuList = <ActivityIndicator/>
    )
    let restaurantDetail = this.props.searchedRestaurant || this.props.selectedRestaurant
    return(
      <View>
        <ScrollView>
          <View>
            {
              (this.props.selectedRestaurantLoading) ? <ActivityIndicator/> : (
                <RestaurantCard
                  restaurantName={restaurantDetail.restaurant_name}
                  restaurantCuisines={restaurantDetail.cuisines}
                  restaurantBuilding={restaurantDetail.address.building}
                  restaurantStreet={restaurantDetail.address.street}
                  restaurantLocality={restaurantDetail.address.locality}
                  restaurantFamousDishes={restaurantDetail.famous_dishes}
                  restaurantOpenTime={restaurantDetail.open_time}
                  restaurantCloseTime={restaurantDetail.close_time}
                  restaurantAverageCost={restaurantDetail.average_cost_for_two}
                  restaurantCategory={restaurantDetail.category}
                  restaurantImage={restaurantDetail.images}
                  restaurantRating={restaurantDetail.average_rating}
                  restaurantContact={restaurantDetail.phone_number}
                  onRecommendButtonPressed={() => this.recommendButtonPressedHandler(restaurantDetail)}
                  onReviewButtonPressed={() => this.reviewButtonPressedHandler(restaurantDetail)}
                />
              )
            }
          
          </View>
          <View elevation={5} style={styles.menuContainer}>
            {menuList}
          </View>
        </ScrollView>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  
  menuContainer: {
    margin: 11,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  
})

const mapStateToProps = (state) => ({
    menu: state.menu.menu,
    menuLoading: state.menu.menuLoading,
    menuError: state.menu.menuError,
    isLoading: state.ui.isLoading,
    selectedRestaurant: state.restaurant.selectedRestaurant,
    selectedRestaurantLoading: state.restaurant.selectedRestaurantLoading,
    selectedRestaurantError: state.restaurant.selectedRestaurantError
})

export default connect(mapStateToProps)(RestaurantDetail) ;