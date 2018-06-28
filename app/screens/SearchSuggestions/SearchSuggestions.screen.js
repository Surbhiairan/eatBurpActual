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

class SearchSuggestions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchedItem: [], 
            text: '',
            underlineButton1: true,
            underlineButton2: false,
            searchedFood: [],
            searchedPlace: [],
            tags: [],
        };  
    }

    componentDidMount() {
        this.props.dispatch(fetchRestaurants());
        this.props.dispatch(fetchAllDishes())
        .then( data => {
          //console.log("data", data);
          var tags = [];
          var searchedFood = data.filter(function(food) {
            if(food.search_tag && food.search_tag.length!=0){
              //console.log("search taggggggggggggggg", food.search_tag);
              for( i in food.search_tag){
                  //console.log("iiiiiiiiiiiiiiiiiiiiiiiii",i);
                  //console.log("food.searchtag[i]", food.search_tag[i]);
                  if(! (tags.indexOf(food.search_tag[i]) > -1)) {
                      tags.push(food.search_tag[i]);
                  }
              }
                //console.log("tagsssssssssssssssssssssssssss", tags);
               
             //return food.search_tag[0].toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
             }
             });
             this.setState({tags: tags});
        });
    }

    handleChangeText = (searchedText) => {

        if(this.state.underlineButton1)
        {
            var searchedFood = this.state.tags.filter(function(tag) {
                //console.log("tagssss", tag);
                return tag.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
              });
            this.setState({searchedFood: searchedFood});
        }
        else{
            //console.log(searchedText,'second condition')
            var searchedPlace = this.props.restaurants.filter(function(place) {
                return place.restaurant_name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
              });
              this.setState({searchedPlace: searchedPlace});
        }
        this.setState({text: searchedText});
        
    }

    render(){
        return(
            <View>
                <SearchBar
                  autoFocus={true}
                  onChangeText={this.handleChangeText} />
                 
            <View style={{flexDirection: 'row',}}>
        
            <View style={{flex:1,}}>
              <TouchableOpacity
              style={styles.button}
              onPress={()=> this.setState( {underlineButton1: true,underlineButton2: false,})}
              >
              <Text
              style={this.state.underlineButton1 ? styles.textOnSelect:styles.defaultText}> 
              What? 
              </Text>
  
              </TouchableOpacity>
              </View>
  
              <View style={{flex:1,}}>
              <TouchableOpacity
              style={styles.button}
              onPress={()=> this.setState({underlineButton1: false,underlineButton2: true,})}
              >
              <Text style={this.state.underlineButton2 ? styles.textOnSelect: styles.defaultText}> Where? </Text>
              </TouchableOpacity>
            </View>
            </View>

            <SearchSuggestionList 
                  suggestions = {this.state.underlineButton1? this.state.searchedFood: this.state.searchedPlace}
                  onItemPressed = {this.itemPressHandler}
            /> 

            </View>
        )
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
        //backgroundColor: '#DDDDDD',
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