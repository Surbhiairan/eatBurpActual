import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';

const searchSuggestionItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.container}>
      <Text style={{color: '#212121', fontFamily: 'OpenSans-SemiBold', fontSize: 16}}>{props.item_name}</Text>
      <Text style={{color: '#757575', fontFamily: 'OpenSans-Regular', fontSize: 12}}>{props.address}</Text>

    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginLeft:30,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingTop: 5,
    }
});

export default searchSuggestionItem;