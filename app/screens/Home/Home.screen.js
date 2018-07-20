import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import DishList from '../../components/DishList/DishList';
import SearchBar from '../../components/SearchBar/SearchBar';
import dishes from '../../data/data';
import { connect } from 'react-redux';
import { fetchTopDishes } from '../../actions/dish.action';
import { recommendDishDispatch } from '../../actions/dish.action';
import MealIcon from '../../components/SvgIcons/clock.icon';
import CitySpecialIcon from '../../components/SvgIcons/citySpecial.icon';
import DonutIcon from '../../components/SvgIcons/donut.icon';
import TopTenIcon from '../../components/SvgIcons/topTen.icon';
import LocationIcon from '../../components/SvgIcons/location.icon';
class Home extends Component {

 
  
  constructor(props) {
     super(props);
     this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }
  
  onNavigatorEvent = event => {
    console.log("event--------------", event)
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

  render() {
    return (
      <View style={[styles.mainContainer]}>
        <View style={styles.donutView}> 
          <DonutIcon />
        </View>
        <View style={styles.mainIconsView}>
          <View >
            <View style={styles.topTenIconView}>
              <TopTenIcon />
            </View>
            <Text style={styles.topTenTextView}>
              Top Ten
            </Text>
          </View>
          <View>
            <View style={styles.citySpecialView}>
              <CitySpecialIcon  />
            </View>
            <Text style={styles.citySpecialTextView}>
              City Special
            </Text>
          </View>
          <View>
            <View style={styles.mealView}>
              <MealIcon />
            </View>
            <Text style={styles.MealTextView}>
              Meals
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.locationView}>
            <LocationIcon />
          </View>
          <Text style={styles.locationText}>
            Kanchanbag, Geetabhavan
          </Text>
        </View>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'#fff'
  },
  donutView: {
    marginLeft: 109
  },
  mainIconsView: {
    //backgroundColor: 'blue',
    marginTop: 136.3,
    flexDirection: 'row',
  },
  topTenIconView: {
    marginLeft: 60,
  },
  topTenTextView: {
    fontFamily: "OpenSans-Bold",
    fontSize: 15,
    color: "#757575",
    marginTop: 4,
    marginLeft: 54,
  },
  citySpecialView: {
    marginLeft: 50
  },
  citySpecialTextView: {
    fontFamily: "OpenSans-Bold",
    fontSize: 15,
    color: "#757575",
    marginTop: 4,
    marginLeft: 34,
  },
  MealTextView: {
    fontFamily: "OpenSans-Bold",
    fontSize: 15,
    color: "#757575",
    marginTop: 4,
    marginLeft: 36,
  },
  mealView: {
    marginLeft: 40,
  },
  locationView: {
    marginTop: 44,
    marginLeft: 168,
  },
  locationText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 15,
    color: "#757575",
    marginLeft: 92,
  }
})
  
const mapStateToProps = state => {
  return{
    topDishes: state.dish.topDishes,
    topDishesLoading: state.dish.topDishesLoading,
    topDishesError: state.dish.topDishesError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTopDishes: () => dispatch(fetchTopDishes()),
    recommendDishDispatch: (dish_id) => dispatch(recommendDishDispatch(dish_id)),
    //reviewDishDispatch: (dish_id) => dispatch(reviewDishDispatch(dish_id)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
