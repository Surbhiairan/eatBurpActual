import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import { fetchMenu } from '../../actions/menu.action';
import RestaurantInfo from '../../components/RestaurantInfo/RestaurantInfo';
import RestaurantMenu from '../../components/RestaurantMenu/RestaurantMenu';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';



class RestaurantDetail extends Component {

  componentDidMount() {
    console.log("selected restaurant",this.props.selectedRestaurant._id);
    this.props.dispatch(fetchMenu(this.props.selectedRestaurant._id));        
  }

  /* static navigatorStyle = {
    navBarHidden: true
  }; */

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

  render() {
    console.log("props---------", this.props)
    let menuList = <FlatList
      data={this.props.menu}
      keyExtractor={(item, index) => index}
      renderItem={this.renderRestaurantMenuCategory} />
    if(this.props.isLoading) (
      menuList = <ActivityIndicator/>
    )
    return(
      <View>
        <ScrollView>
          <View>
          <RestaurantCard 
              restaurantName={this.props.selectedRestaurant.restaurant_name}
              restaurantLocality={this.props.selectedRestaurant.address.locality}
              restaurantCuisines= {this.props.selectedRestaurant.cuisines}
              restaurantBuilding={this.props.selectedRestaurant.address.building}
              restaurantStreet={this.props.selectedRestaurant.address.street}
              restaurantFamousDishes={this.props.selectedRestaurant.famous_dishes}
              restaurantOpenTime={this.props.selectedRestaurant.open_time}
              restaurantCloseTime={this.props.selectedRestaurant.close_time}
              restaurantAverageCost={this.props.selectedRestaurant.average_cost_for_two}
              restaurantCategory={this.props.selectedRestaurant.category}
              restaurantImage={this.props.selectedRestaurant.images}
              restaurantRating={this.props.selectedRestaurant.average_rating}
              restaurantContact={this.props.selectedRestaurant.phone_number}
          />
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
    isLoading: state.ui.isLoading
})

export default connect(mapStateToProps)(RestaurantDetail) ;