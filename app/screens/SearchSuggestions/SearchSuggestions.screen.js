import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import SearchBar from '../../components/SearchBar/SearchBar';
import { searchDish, searchRestaurant } from '../../actions/search.action';
import { fetchDishSearchResults } from '../../actions/dish.action';
import SearchSuggestionList from '../../components/SearchSuggestionList/SearchSuggestionList';
import Button from '../../components/Button/Button';

class SearchSuggestions extends Component {

  static navigatorStyle = {
    navBarHidden: true
  };

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
    this.setState({ listView: true });
    if (this.state.searchFilter === 'food') {
      this.props.searchDish(searchedText);
      var searchedFood = this.props.dishes.filter(function (dish) {
        return dish.search_tag.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
      });
      this.setState({ searchedItems: searchedFood });
    }

    if (this.state.searchFilter === 'place') {
      this.props.searchRestaurant(searchedText);
      var searchedPlace = this.props.restaurants.filter(function (place) {
        return place.restaurant_name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
      });
      this.setState({ searchedItems: searchedPlace });
    }
  }

  searchFilterButtonPressedHandler = (searchFilter) => {
    this.setState({ searchFilter: searchFilter, listView: false, searchedItems: null });
  }

  itemPressHandler = (item, type) => {
    if (type === 'place') {
      this.props.navigator.push({
        screen: "RestaurantDetailScreen",
        title: item.restaurant_name,
        passProps: {
          selectedRestaurant: item
        }
      });
    } else if (type === 'food') {
      this.props.fetchDishSearchResults(item.search_tag);
      console.log("item in itemPressHandler", item)
      this.props.navigator.push({
        screen: "SearchResultScreen",
        title: item.search_tag
      });
    }
  }

  backIconPress = () => {
    this.props.navigator.pop();
  }

  render() {
    let searchList = null;
    if (this.state.listView) {
      searchList = (
        <SearchSuggestionList
          suggestions={this.state.searchedItems}
          onItemPressed={this.itemPressHandler}
          type={this.state.searchFilter} />
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.backIconPress}>
            <Icon style={styles.backIcon} name="ios-arrow-round-back-outline" size={45} color="#757575" />
          </TouchableOpacity>
          <View style={styles.searchbar}>
            <SearchBar
              autoFocus={true}
              onChangeText={(text) => {
                setTimeout(() => { this.handleChangeText(text) }, 2000);
              }
              }
            />
          </View >
        </View>

        <View style={{ flexDirection: 'row', backgroundColor: '#fff', justifyContent: 'space-around', }}>
          <TouchableOpacity onPress={() => this.searchFilterButtonPressedHandler("food")} >
            <Text style={this.state.searchFilter === 'food' ? styles.selectedSearch : styles.unselectedText}>
              Dishes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.searchFilterButtonPressedHandler("place")} >
            <Text style={this.state.searchFilter === 'place' ? styles.selectedSearch : styles.unselectedText}>
              Restaurant
            </Text>
          </TouchableOpacity>
        </View>

        {searchList}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    marginTop: 20,
  },
  defaultText: {
    fontSize: 15,
    color: '#7e7e7e',
    fontFamily: 'open-sans-regular'
  },
  textOnSelect: {
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3d3d3d',
    color: '#3d3d3d',
    fontFamily: 'open-sans-semibold',
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 1,
  },
  listItem: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7',
    justifyContent: 'flex-start',
    padding: 10,
  },
  listItemText: {
    color: '#283747',
    fontSize: 15,
    fontFamily: 'open-sans-light',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  backIcon: {
    paddingLeft: 10,

  },
  searchbar: {
    paddingLeft: 10,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginLeft: 10,
  },
  unselectedText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#757575'
  },
  selectedSearch: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#212121'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    fetchDishSearchResults: (searchTag) => dispatch(fetchDishSearchResults(searchTag)),
    searchDish: (searchedText) => dispatch(searchDish(searchedText)),
    searchRestaurant: (searchedText) => dispatch(searchRestaurant(searchedText))
  };
};
const mapStateToProps = (state) => ({
  restaurants: state.search.searchRestaurants,
  restaurantsLoading: state.search.searchRestaurantsLoading,
  restaurantsError: state.search.searchRestaurantsError,
  dishes: state.search.searchDishes,
  dishesLoading: state.search.searchDishesLoading,
  dishesError: state.search.searchDishesError,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchSuggestions);