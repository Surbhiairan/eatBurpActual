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
  
const reviews = (props) => {
    return(
    <View>
      <Text>{props.review.dish_name}</Text>
      <Text>{props.review.restaurant_name}</Text>
      <Text>{props.review.rating}</Text>
      <Text>{props.review.review}</Text>
      <Image 
        source={{uri: props.review.review_images[0]}}
        style={{width: 400, height: 400}}
      />
    </View>
    );
};

export default reviews;