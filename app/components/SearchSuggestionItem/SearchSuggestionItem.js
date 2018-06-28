import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';

const searchSuggestionItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.dishCard}>
      <Text style={{color: '#000'}}>{props.item_name}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    dishCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor:'#fff',
        borderWidth:2,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingTop: 5,
    }
});

export default searchSuggestionItem;