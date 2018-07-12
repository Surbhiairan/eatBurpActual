import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  NativeModules,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import { fetchDishSearchResults } from '../../actions/dish.action';
import DishSearchResultListItem from '../../components/DishSearchResultItem/DishSearchResultListItem';
class SearchResults extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishSearchResults(this.props.selectedTag);
  }

  renderDish = (dish) => {
    console.log("in render", dish);
    return(
      <DishSearchResultListItem 
        dish = {dish.item}
      />   
    );
  }

  render(){
    return(
      <View>
        {this.props.dishSearchResultsLoading ? 
            <Text>Loading...</Text>
            : 
          <FlatList 
            data = {this.props.dishSearchResults}
            renderItem = {this.renderDish}
          />
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    dishSearchResults: state.dish.dishSearchResults,
    dishSearchResultsLoading: state.dish.dishSearchResultsLoading,
    dishSearchResultsError: state.dish.dishSearchResultsError
  }
};
  
const mapDispatchToProps = dispatch => {
  return {
    fetchDishSearchResults: (searchTag) => dispatch(fetchDishSearchResults(searchTag)),
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);