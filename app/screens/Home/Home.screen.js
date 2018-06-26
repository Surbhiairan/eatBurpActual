import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import DishList from '../../components/DishList/DishList';
import dishes from '../../data/data';
import { connect } from 'react-redux';
import { fetchTopDishes } from '../../actions/dish.action';


class Home extends Component {
  constructor(props) {
     super(props);
     this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }
  
  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };  

  state = {
      dishes: dishes
  }

  componentDidMount() {
      console.log("in component did mount");
      this.props.dispatch(fetchTopDishes());
  }

  dishCardPressedHandler = dish => {
      console.log("pressed dish",dish);
      this.props.navigator.push({
          screen: "DishDetailScreen",
          title: dish.item.dish_name,
          passProps: {
            selectedDish: dish.item
          }
      });
  }
    
  render() {
    return (
      <View style={{backgroundColor: '#fff'}}>    
        <DishList
          dishes = {this.props.topDishes}
          onDishCardPressed = {this.dishCardPressedHandler}                    
        />
      </View>
    );
  } 
}
  
const mapStateToProps = state => {
  return{
    topDishes: state.dish.topDishes,
    topDishesLoading: state.dish.topDishesLoading,
    topDishesError: state.dish.topDishesError
  };
};

export default connect(mapStateToProps)(Home) ;