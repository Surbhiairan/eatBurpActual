import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';

const dishCard = (props) => (
    <TouchableOpacity onPress={props.onDishCardPressed}>
    <View style={styles.dishCard}>
      <Text style={{color: '#000'}}>{props.dish_name}</Text>
      <Text style={{color: '#000'}}>{props.restaurant_name}</Text>
      <Text style={{color: '#000'}}>{props.recommended}</Text>
      <Text style={{color: '#000'}}>{props.average_rating}</Text>
      <Text style={{color: '#000'}}>{props.reviews[0].review}</Text>
      <Image source ={{ uri: props.dish_images[0]}} style ={{width: 200, height: 200}}/>
      <Button 
        onPress={props.onRecommendButtonPressed}
        title="Recommend"
      />
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

export default dishCard;