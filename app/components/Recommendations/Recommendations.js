import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image
  } from 'react-native';
  
const recommendations = (props) => (
    <View>
      <Text>{props.recommendation.dish_name}</Text>
      <Text>{props.recommendation.restaurant_name}</Text>
      <Text>{props.recommendation.restaurant_location}</Text>
      <Image 
        source={{uri: props.recommendation.dish_images[0]}}
        style={{width: 400, height: 400}}
      />
    </View>
);

export default recommendations;
