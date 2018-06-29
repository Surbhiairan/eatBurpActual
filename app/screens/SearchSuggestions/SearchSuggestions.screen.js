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
            underlineButton1: true,
            underlineButton2: false,
            searchedFood: [],
            searchedPlace: [],
            tags: [],
            searchFilter: 'food',
            listView: false
        };  
    }

    componentDidMount() {
        this.props.dispatch(fetchRestaurants());
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
        this.setState({listView: true});
        console.log('list view-------', this.state.listView);
        if(this.state.searchFilter === 'food'){
            
          var searchedFood = this.state.tags.filter(function(tag) {
              return tag.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
          });
          //this.setState({searchedFood: searchedFood});
          this.setState({searchedItems: searchedFood});
          console.log("searchedItems", this.state.searchedItems);          
        }
        
        if(this.state.searchFilter === 'place'){
          var searchedPlace = this.props.restaurants.filter(function(place) {
            return place.restaurant_name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
          });
          //this.setState({searchedPlace: searchedPlace});
          this.setState({searchedItems: searchedPlace});
          console.log("searchedItems", this.state.searchedItems);                    
        }
    }

        // if(this.state.underlineButton1)
        // {
        //     var searchedFood = this.state.tags.filter(function(tag) {
        //         return tag.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
        //       });
        //     this.setState({searchedFood: searchedFood});}
        // else{
        //     var searchedPlace = this.props.restaurants.filter(function(place) {
        //         return place.restaurant_name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
        //       });
        //       this.setState({searchedPlace: searchedPlace});}
        // this.setState({text: searchedText});      
    

    searchFilterButtonPressedHandler = (searchFilter) => {
        console.log("searchfilter", searchFilter);

        this.setState({searchFilter: searchFilter, listView: false});
    }

    // whatButtonPressedHandler = () => {
    //     this.setState({underlineButton1: true,underlineButton2: false,})
    // }

    // whereButtonPressedHandler = () => {
    //     this.setState({underlineButton1: false,underlineButton2: true,})
    // }


    itemPressHandler = (item, type) => {
        console.log("item pressed ", item);
        if(type === 'place'){
          this.props.navigator.push({
              screen: "RestaurantDetailScreen",
              title: dish.item.dish_name,
              passProps: {
                selectedDish: dish.item
              }
          });
        }else if( type === 'food'){
          this.props.navigator.push({
              screen: "SearchResultScreen",
              title: dish.item.dish_name,
              passProps: {
                selectedDish: dish.item
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
          onChangeText={this.handleChangeText} />
                 
        <View style={{flexDirection: 'row',}}>
          <Button 
            onPress = {() => this.searchFilterButtonPressedHandler("food")}
            title = {"Food"}/>
          <Button 
            onPress = {() => this.searchFilterButtonPressedHandler("place")}
            title = {"Places"}/>
        </View>
        {searchList}
        

        {/* <SearchSuggestionList 
          suggestions = {this.state.underlineButton1? this.state.searchedFood: this.state.searchedPlace}
          onItemPressed = {this.itemPressHandler}
          type = {this.state.underlineButton1? "dish": "restaurant"}/>  */}
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

const styles = {
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
};

export default connect(mapStateToProps)(SearchSuggestions) ;