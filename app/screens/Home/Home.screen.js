import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Geocoder from 'react-native-geocoder';

import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchTopDishes } from '../../actions/dish.action';
import MealIcon from '../../components/SvgIcons/clock.icon';
import CitySpecialIcon from '../../components/SvgIcons/citySpecial.icon';
import DonutIcon from '../../components/SvgIcons/donut.icon';
import TopTenIcon from '../../components/SvgIcons/topTen.icon';
import LocationIcon from '../../components/SvgIcons/location.icon';

class Home extends Component {

  constructor(props) {
     super(props);
     this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

     this.state = {
       latitude: null,
       longitude: null,
       error: null
     }
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

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.getAddress();
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  /* state = {
      dishes: dishes
  } */

  getAddress = () => {
    let position = {
      lat: this.state.latitude,
      lng: this.state.longitude
    }
    Geocoder.geocodePosition(position)
      .then(res => {
        console.log("loction-------", res)
      })
      .catch(err => {
        console.log("error----------", err)
      })
  }

  topTenDishesHandler = () => {
    this.props.fetchTopDishes();  //To fetch the top 10 dishes from API and navigate to next screen
    this.props.navigator.push({
      screen: "TopTenDishScreen"
    })
  }

  citySpecialHandler = () => {
    this.props.fetchTopDishes();  //To fetch the top 10 dishes from API and navigate to next screen
    this.props.navigator.push({
      screen: "CitySpecialScreen"
    })
  }

  mealHandler = () => {
    this.props.fetchTopDishes();  //To fetch the top 10 dishes from API and navigate to next screen
    this.props.navigator.push({
      screen: "MealsScreen"
    })
  }

  searchBarPressHandler = () => {
    //navigate to search suggestion screen
    this.props.navigator.push({
      screen: "SearchSuggestionScreen",
    });
  }

  render() {
    return (
      <View style={[styles.mainContainer]}>
        <View style={styles.donutTextView}>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>
              What.
            </Text>
            <Text style={styles.textStyle}>
              Where.
            </Text>
            <Text style={styles.textStyle}>
              Food.
            </Text>
          </View>
          <View style={styles.donutView}>
            <DonutIcon />
          </View>
        </View>
        <View style={styles.searchBarView}>
          <SearchBar 
            onSearchBarPressed={this.searchBarPressHandler} />
        </View>
        <View style={styles.mainIconsView}>
          <TouchableOpacity onPress={this.topTenDishesHandler}>
            <View>
              <View style={styles.topTenIconView}>
                <TopTenIcon />
              </View>
              <Text style={styles.topTenTextView}>
                Top Ten
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.citySpecialHandler}>
          <View>
            <View style={styles.citySpecialView}>
              <CitySpecialIcon  />
            </View>
            <Text style={styles.citySpecialTextView}>
              City Special
            </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.mealHandler}>
          <View>
            <View style={styles.mealView}>
              <MealIcon />
            </View>
            <Text style={styles.MealTextView}>
              Meals
            </Text>
          </View>
          </TouchableOpacity>
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
    marginLeft: 105,
    position: 'absolute'
  },
  textStyle:{
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 30,
  },
  textView: {
    marginTop: 170,
    marginLeft: 31,
    flexDirection: 'column',
  },
  donutTextView: {
    flexDirection: 'row',
  },
  searchBarView: {
    borderBottomColor: '#BDBDBD',
    borderColor: 'transparent',
    borderWidth: 1,
    marginTop: 55,
    marginLeft: 35,
    marginRight: 35,
  },
  mainIconsView: {
    marginTop: 25,
    flexDirection: 'row',
  },
  topTenIconView: {
    elevation: 5,
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

const mapDispatchToProps = dispatch => {
  return {
    fetchTopDishes: () => dispatch(fetchTopDishes()),
  };
};


export default connect(null, mapDispatchToProps)(Home);
