import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';

const dishListItem = (props) => {
    console.log(props.dish,"anjali here");
    return(
     <View>
       <Text>{props.dish.dish_name}</Text>
       <Text>{props.dish.restaurant_name}</Text>
       <Text>{props.dish.restaurant_location}</Text>
       <Text>{props.dish.price}</Text>
       <Text>{props.dish.average_rating}</Text>
    </View>
    );
  };

export default dishListItem;