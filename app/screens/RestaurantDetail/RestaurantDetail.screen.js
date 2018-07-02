import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import { connect } from 'react-redux';
import { fetchMenu } from '../../actions/menu.action';
import RestaurantInfo from '../../components/RestaurantInfo/RestaurantInfo';
import RestaurantMenu from '../../components/RestaurantMenu/RestaurantMenu';

class RestaurantDetail extends Component {

    componentDidMount() {
        console.log("selected restaurant",this.props.selectedRestaurant._id);
        this.props.dispatch(fetchMenu(this.props.selectedRestaurant._id));        
    }

    render() {
        return(
          <View>
           <Text>{this.props.selectedRestaurant.restaurant_name}</Text>
           <RestaurantInfo
             restaurant_name = {this.props.selectedRestaurant.restaurant_name}
             phone_number = {this.props.selectedRestaurant.phone_number}
             cuisines = {this.props.selectedRestaurant.cuisines}
             avg_cost_for_two = {this.props.selectedRestaurant.avg_cost_for_two}
             address = {this.props.selectedRestaurant.address}
            />

            {this.props.menuLoading ? 
            <Text>Loading...</Text>
            : 
            <RestaurantMenu
              menu = {this.props.menu}/>
            }
          </View>
        );
    }
}

const mapStateToProps = (state) => ({
    menu: state.menu.menu,
    menuLoading: state.menu.menuLoading,
    menuError: state.menu.menuError,
})

export default connect(mapStateToProps)(RestaurantDetail) ;