import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    TouchableHighlight
  } from 'react-native';
  
const DEFAULT_IMAGE = require('../../data/images/sandwich.jpg');
  
const recommendations = (props) => (
  <View>
  <TouchableHighlight onPress={props.onDishPressed}>
  <View style={{marginLeft: 6,marginTop: 4,}}>
    <Image 
      source={DEFAULT_IMAGE}
      style={styles.imageStyle}
    />
    <View style={styles.dishNameStyle}>
      <Text style={styles.dishNameText}> 
        {props.recommendation.dish_name}
      </Text>
    </View>
    <Text style={styles.priceText}>
     {props.recommendation.restaurant_name}
    </Text>
  </View>
  </TouchableHighlight>
</View>

    // <View>
    //   <Text>{props.recommendation.dish_name}</Text>
    //   <Text>{props.recommendation.restaurant_name}</Text>
    //   <Text>{props.recommendation.restaurant_location}</Text>
    //   <Image 
    //     source={{uri: props.recommendation.dish_images[0]}}
    //     style={{width: 400, height: 400}}
    //   />
    // </View>
);

var styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container: {
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold'
  },
  button: {
  },
  buttonImage: {
    width: 30,
    height: 25
  },
  body: {
    //padding: 10,
    paddingTop: 0
  },
  item: {
    backgroundColor: 'red',
    margin: 3,
    width: 100
  },
  imageStyle: {
    width: 96, 
    height: 96
  },
  dishNameStyle: { 
    alignSelf: 'flex-start', 
    width: 100,
    
  },
  dishNameText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    color: '#463D3D'
  },
  priceText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#463D3D'
  }
});

export default recommendations;
