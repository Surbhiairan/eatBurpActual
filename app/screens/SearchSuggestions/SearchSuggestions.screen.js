import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchRestaurants, fetchRestaurantsSuccess, fetchRestaurantsFailure, selectedRestaurantDetails, fetchTopDishRestaurants } from '../../actions/restaurant.action';
import { fetchAllDishes } from '../../actions/dish.action';
import { connect } from 'react-redux';
import SearchSuggestionList from '../../components/SearchSuggestionList/SearchSuggestionList';
import Button from '../../components/Button/Button';

class SearchSuggestions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchedItems: [], 
            text: '',
            tags: [],
            searchFilter: 'food',
            listView: false
        };  
    }

    componentDidMount() {
      this.props.dispatch(fetchAllDishes())
      .then( data => {
        var tags = [];
        var searchedFood = data.filter(function(food) {
          if(food.search_tag && food.search_tag.length!=0){
            for( i in food.search_tag){
                if(! (tags.indexOf(food.search_tag[i]) > -1)) {
                    tags.push(food.search_tag[i]);
                }
            }
          }
           });
           this.setState({tags: tags});
      });
    }

    handleChangeText = (searchedText) => {
      searchedTextLength = searchedText.length;
      console.log("check")
      this.setState({listView: true});
      if(this.state.searchFilter === 'food'){
          
        var searchedFood = this.state.tags.filter(function(tag) {
            return tag.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
        });
        this.setState({searchedItems: searchedFood});
      }
      
      if(this.state.searchFilter === 'place'){
        this.props.dispatch(fetchRestaurants());
        var searchedPlace = this.props.restaurants.filter(function(place) {
          return place.restaurant_name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
        });
        this.setState({searchedItems: searchedPlace});
      }
    }

    searchFilterButtonPressedHandler = (searchFilter) => {
      this.setState({searchFilter: searchFilter, listView: false});
    }

    itemPressHandler = (item, type) => {
      if(type === 'place'){
        this.props.navigator.push({
            screen: "RestaurantDetailScreen",
            title: item.restaurant_name,
            passProps: {
              selectedRestaurant: item
            }
        });
      }else if( type === 'food'){
        console.log("item in itemPressHandler",item)
        this.props.navigator.push({
            screen: "SearchResultScreen",
            passProps: {
              dish_id: item._id
            }
        });
      }
    }

    render(){
      let searchList = null;
      if(this.state.listView) {
        searchList = (
        <SearchSuggestionList 
        suggestions = {this.state.searchedItems}
        onItemPressed = {this.itemPressHandler}
        type = {this.state.searchFilter}/> 
       ) 
      }
      return(
       <View>
        <SearchBar
          autoFocus={true}
          onChangeText = {(text) => {
            setTimeout(() => {this.handleChangeText(text)}, 2000);
           }
          } 
        />
                 
        <View style={{flexDirection: 'row',}}>
          <Button 
            onPress = {() => this.searchFilterButtonPressedHandler("food")}
            title = {"Food"}/>
          <Button 
            onPress = {() => this.searchFilterButtonPressedHandler("place")}
            title = {"Places"}/>
        </View>
        {searchList}
       </View> 
      );
    }
}
const mapStateToProps = (state) => ({
    restaurants: state.restaurant.restaurants,
    restaurantsLoading: state.restaurant.restaurantsLoading,
    restaurantsError: state.restaurant.restaurantsError,
    allDishes: state.dish.allDishes,
    alldishesLoading: state.dish.alldishesLoading,
    allDishesError: state.dish.allDishesError,
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    searchBarContainer: {
        marginTop: 20,
    },
    defaultText:{
        fontSize:15,
        color:'#7e7e7e',
        fontFamily: 'open-sans-regular'
    },
    textOnSelect:{
        fontSize:15,
        borderBottomWidth: 1, 
        borderBottomColor: '#3d3d3d',
        color:'#3d3d3d',
        fontFamily: 'open-sans-semibold',
    },
    button: {
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom:1,
    },
    listItem: {
        backgroundColor: '#fff',
        borderBottomWidth:1,
        borderBottomColor:'#f7f7f7',
        justifyContent: 'flex-start',
        padding: 10,
    },
    listItemText: {
        color: '#283747',
        fontSize: 15,
        fontFamily: 'open-sans-light',
    }
});

export default connect(mapStateToProps)(SearchSuggestions) ;