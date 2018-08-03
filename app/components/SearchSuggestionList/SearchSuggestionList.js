import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SearchSuggestionItem from '../SearchSuggestionItem/SearchSuggestionItem';

const searchSuggestionList = (props) => {
    searchSuggestion = ({item}) =>(
      <SearchSuggestionItem 
        item_name = {item.search_tag}
        onItemPressed={() => props.onItemPressed(item, props.type)}
    />
    )
    if(props.type === 'place') {
      searchSuggestion = ({item}) => (
        <SearchSuggestionItem 
        item_name = {item.restaurant_name}
        address = {item.address.locality}
        onItemPressed={() => props.onItemPressed(item, props.type)}
      />
      )
    }
    return (       
      <View>
      <FlatList
          data = { props.suggestions }
          renderItem = {this.searchSuggestion} />
      </View>
    );
};

const styles = StyleSheet.create({
   
});

export default searchSuggestionList;