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
  
const DEFAULT_IMAGE = require('../../data/images/review.jpg');
  
const reviews = (props) => {
    return(
    <View elevation = {5} style ={{padding:10,borderRadius:10, margin: 10,backgroundColor : "#fff"}}>
    <Image 
      source={DEFAULT_IMAGE}
      style={styles.imageStyle}
    />
      {/* <Text>{props.review.user.first_name}</Text><Text>{props.review.user.last_name}</Text> */}
      <Text style={{color:"#212121", fontFamily: "OpenSans-Bold", fontSize: 20}}>{props.review.dish_name}</Text>
      <Text style={{color:"#212121", fontFamily: "OpenSans-Semibold", fontSize: 16}}>{props.review.restaurant_name}</Text>
      <Text>{props.review.rating}</Text>
      <Text style={{color:"#212121", fontFamily: "OpenSans-Regular", fontSize: 12}}>{props.review.review}</Text>

      {/* <Image 
        source={{uri: props.review.review_images[0]}}
        style={{width: 400, height: 400}}
      /> */}
    </View>
    );
};

var styles = StyleSheet.create({
  imageStyle: {
    width: '100%', 
    height: 200
  },
})
export default reviews;