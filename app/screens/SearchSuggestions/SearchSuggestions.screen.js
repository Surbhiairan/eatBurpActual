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
import { searchDish, searchRestaurant } from '../../actions/search.action';
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

    // componentDidMount() {
    //   this.props.dispatch(fetchAllDishes())
    //   .then( data => {
    //     var tags = [];
    //     var searchedFood = data.filter(function(food) {
    //       if(food.search_tag && food.search_tag.length!=0){
    //         for( i in food.search_tag){
    //             if(! (tags.indexOf(food.search_tag[i]) > -1)) {
    //                 tags.push(food.search_tag[i]);
    //             }
    //         }
    //       }
    //        });
    //        this.setState({tags: tags});
    //   });
    // }

    handleChangeText = (searchedText) => {
      this.setState({listView: true});
      if(this.state.searchFilter === 'food'){
        this.props.dispatch(searchDish(searchedText));        
        var searchedFood = this.props.dishes.filter(function(dish) {
            return dish.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
        });
        this.setState({searchedItems: searchedFood});
      }
      
      if(this.state.searchFilter === 'place'){
        this.props.dispatch(searchRestaurant(searchedText));
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
    restaurants: state.search.searchRestaurants,
    restaurantsLoading: state.search.searchRestaurantsLoading,
    restaurantsError: state.search.searchRestaurantsError,
    dishes: state.search.searchDishes,
    dishesLoading: state.search.searchDishesLoading,
    dishesError: state.search.searchDishesError,
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