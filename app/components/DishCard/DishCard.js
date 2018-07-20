import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Button } from 'react-native';

const DEFAULT_IMAGE = require('../../data/images/sandwich.jpg');

const CustomImage = (props) => {
  console.log(props, "propsssssssssssssssss");
  if (props.dishImages.length > 0)
  {
    return (
        <Image style={{ width: 316, height: 316, borderRadius: 19 }} source={{ uri: props.dishImages[0] }} />
      )
  }
  else 
    return <Image source={DEFAULT_IMAGE} style={{ width: 316, height: 316,borderRadius: 19}} />
}

const dishCard = (props) => {
  console.log("inside dishcard", props)
  return (
    <TouchableOpacity onPress={props.onDishCardPressed}>
      <View style={styles.dishCard}>
        <Text style={{ color: '#212121', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>{props.recommended} people recommended this</Text>
        <CustomImage dishImages = {props.dish_images}/>
        <Text style={{ color: '#212121', fontFamily: 'OpenSans-Bold', fontSize: 22 }}>{props.dish_name}</Text>
        <Text style={{ color: '#000' }}>{props.restaurant_name}</Text>
        <Text style={{ color: '#000' }}>{props.average_rating}</Text>
        <Text style={{ color: '#000' }}>{props.reviews[0].review}</Text>
        <Button
          onPress={props.onRecommendButtonPressed}
          title="Recommend"
        />
        <Button
          onPress={props.onReviewButtonPressed}
          title="Review"
        />
      </View>
    </TouchableOpacity>
  )
}

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

export default dishCard;