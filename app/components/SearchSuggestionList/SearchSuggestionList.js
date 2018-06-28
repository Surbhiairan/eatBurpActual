import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SearchSuggestionItem from '../SearchSuggestionItem/SearchSuggestionItem';

const searchSuggestionList = (props) => {
    console.log("props in search suggestion", props)
    return (
    <View>
    <FlatList
        data = { props.suggestions }
        renderItem = {({item}) => (
            // <Text>{item.restaurant_name}</Text>
            <SearchSuggestionItem 
                item_name = {item}
                onItemPressed={() => props.onItemPressed(item)}
            />
        )}
    />
    </View>
    );
};

const styles = StyleSheet.create({
   
});

export default searchSuggestionList;