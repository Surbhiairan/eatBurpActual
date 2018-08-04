import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
  } from 'react-native';
    
const reviews = (props) => {
    return(
    <View style ={{padding:10,borderRadius:5, margin: 3,backgroundColor : "#fff"}}>
      <Text style={{color:"#212121", fontFamily: "OpenSans-SemiBold", fontSize: 16}}>{props.review.dish_detail.dish_name}</Text>
      <View style={{flexDirection:'row'}}>
      <Text style={{color:"#757575", fontFamily: "OpenSans-Bold", fontSize: 13}}>{props.review.dish_detail.restaurant_name},</Text>
      <Text style={{paddingLeft: 4, color:"#757575", fontFamily: "OpenSans-Bold", fontSize: 13}}>{props.review.dish_detail.locality}</Text>
      </View>
      <Text style={{color:"#757575", fontFamily: "OpenSans-Regular", fontSize: 13}}>Your Rating {props.review.review.rating}</Text>
      <Text style={{color:"#212121", fontFamily: "OpenSans-Regular", fontSize: 14}}>{props.review.review.review}</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        numColumns = {4}
        data={props.review.review.images}
        renderItem = {({item})=>
         <Image 
          source={{uri: item}}
          style={{width: 100, height: 100}}
          />
        }
      />
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