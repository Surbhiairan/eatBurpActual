import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
  } from 'react-native';
  
const DEFAULT_IMAGE = require('../../data/images/sandwich.jpg');
  
const recommendations = (props) => {
  let CustomImage = (
    <View>
      <Image
        source={DEFAULT_IMAGE}
        style={styles.imageStyle}
      />
    </View>
  )
  if(props.recommendation.images.length> 0) {
    CustomImage = (
      <View >
        <Image
          source={{ uri: props.recommendation.images[0] }}
          style={styles.imageStyle}
        />
      </View>
    )
  }
  
return(
  <View>
  <TouchableOpacity onPress={props.onDishPressed}>
  <View style={{backgroundColor:'red',marginLeft: 6,marginTop: 4,}}>
      {CustomImage}
    <View style={styles.dishNameStyle}>
      <Text style={styles.dishNameText}> 
        {props.recommendation.dish_name}
      </Text>
    </View>
    <View style={styles.restaurantNameStyle}>
    <Text style={styles.restaurantNameText}>
     {props.recommendation.restaurant_name}
    </Text></View>
  </View>
  </TouchableOpacity>
</View>
)

    // <View>
    //   <Text>{props.recommendation.dish_name}</Text>
    //   <Text>{props.recommendation.restaurant_name}</Text>
    //   <Text>{props.recommendation.restaurant_location}</Text>
    //   <Image 
    //     source={{uri: props.recommendation.dish_images[0]}}
    //     style={{width: 400, height: 400}}
    //   />
    // </View>
}

var styles = StyleSheet.create({

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
  restaurantNameStyle: {
    alignSelf: 'flex-start', 
    width: 100,
  },
  restaurantNameText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#463D3D'
  }
});

export default recommendations;
