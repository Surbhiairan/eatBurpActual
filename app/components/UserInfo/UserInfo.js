import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    Button } from 'react-native';

const userInfo = (props) => (
  <View>
    <Text style={{color: '#000'}}>{props.first_name}</Text>
    <Text style={{color: '#000'}}>{props.last_name}</Text>
    <Text style={{color: '#000'}}>{props.no_of_reviews}</Text>
    <Text style={{color: '#000'}}>{props.no_of_recommendations}</Text>
    <Text style={{color: '#000'}}>{props.foodie_level}</Text>
    <Image source ={{ uri: props.profile_image}}/>  
  </View>
);
 
export default userInfo;