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
import Icon from '../../components/SvgIcons/SvgIcons';

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

  searchBarPressHandler = () =>  {
    //navigate to search suggestion screen
    console.log("pressed search bar");
    this.props.navigator.push({
        screen: "SearchSuggestionScreen",
        // title: dish.item.dish_name,
        // passProps: {
        //   selectedDish: dish.item
        // }
    });
  }

  render() {
    return (
      <View style={[styles.mainContainer]}>
          <Icon name= "likeYellowFilled" 
             height="50" 
             width="50"
             fill="#FFA000"
       />
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'#fff'
    //alignItems: 'center',
    //justifyContent: 'center',

  },
  searchContainer: {
    paddingLeft: 20,
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: 'red',
    height: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    //justifyContent: 'center',
    // alignItems: 'center',
  },
  textBox: {
    fontSize: 20,
    textAlign: 'auto',
    fontFamily: 'open-sans-regular',
    color: '#4d5656',    // grey
    //color: '#000',
    //fontWeight: 'bold'
  },
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
