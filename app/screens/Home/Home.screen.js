import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import Geocoder from 'react-native-geocoder';

import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchTopDishes, fetchCitySpecial, fetchMeal } from '../../actions/dish.action';
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
       error: null,
       location: null,
       time: new Date().getHours()
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
        console.log("loction-------", res);
        this.setState({
          location: res[0]
        })
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
    this.props.fetchCitySpecial();  //To fetch city special from API and navigate to next screen
    this.props.navigator.push({
      screen: "CitySpecialScreen"
    })
  }

  mealHandler = () => {
    console.log(" time-------", this.state.time);
    /* let hour = this.state.time.getHours();
    console.log("hours---------", hour) */
    let selectedMeal = null;
    if(this.state.time < 11 && this.state.time > 6) {
      selectedMeal = 'breakfast';
    } else if ((this.state.time > 10 && this.state.time < 16)  ||  (this.state.time > 18 && this.state.time < 24)) {
                 selectedMeal = 'lunch/dinner';
            } else {
              selectedMeal = 'snacks';
            }
    this.props.fetchMeal(selectedMeal);  //To fetch the top 10 dishes from API and navigate to next screen
    this.props.navigator.push({
      screen: "MealsScreen",
      passProps: {
        selectedMeal: selectedMeal
      }
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
        <View elevation = {5} style={styles.mainIconsView}>
          <TouchableOpacity onPress={this.topTenDishesHandler}>
            <View>
              <View elevation={5} style={styles.topTenIconView} >
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
          {(this.state.location === null ? <ActivityIndicator /> : (<Text style={styles.locationText}>
            {this.state.location.subLocality} , {this.state.location.locality}
          </Text>))}
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
    justifyContent: 'space-evenly'
  },
  topTenIconView: {
    //marginLeft: 60,
  },
  topTenTextView: {
    fontFamily: "OpenSans-Bold",
    fontSize: 15,
    color: "#757575",
    marginTop: 4,
    textAlign: 'center',
    backgroundColor: 'blue'
    //marginLeft: 54,
  },
  citySpecialView: {
    //marginLeft: 50
  },
  citySpecialTextView: {
    fontFamily: "OpenSans-Bold",
    fontSize: 15,
    color: "#757575",
    marginTop: 4,
    //marginLeft: 34,
  },
  MealTextView: {
    fontFamily: "OpenSans-Bold",
    fontSize: 15,
    color: "#757575",
    marginTop: 4,
    //marginLeft: 36,
  },
  mealView: {
    //marginLeft: 40,
  },
  locationView: {
    marginTop: 44,
    alignItems: 'center',
    //marginLeft: 168,
  },
  locationText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 15,
    color: "#757575",
    textAlign: 'center'
    //marginLeft: 92,
  }
})

const mapDispatchToProps = dispatch => {
  return {
    fetchTopDishes: () => dispatch(fetchTopDishes()),
    fetchCitySpecial: () => dispatch(fetchCitySpecial()),
    fetchMeal: (selectedMeal) => dispatch(fetchMeal(selectedMeal))
  };
};


export default connect(null, mapDispatchToProps)(Home);
