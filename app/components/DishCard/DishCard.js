import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const dishCard = (props) => (
    <TouchableOpacity onPress={props.onDishCardPressed}>
    <View style={styles.dishCard}>
      <Text style={{color: '#000'}}>{props.dish_name}</Text>
      <Text style={{color: '#000'}}>{props.restaurant_name}</Text>
      <Text style={{color: '#000'}}>{props.recommendation}</Text>
      <Text style={{color: '#000'}}>{props.average_rating}</Text>
      <Image source ={{ uri: props.imageUrls[0]}} style ={{width: 200, height: 200}}/>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    dishCard: {
        flex: 1,
        backgroundColor: '#fdfefe',
        borderRadius: 10,
        
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingTop: 5,
    }
});

export default dishCard;