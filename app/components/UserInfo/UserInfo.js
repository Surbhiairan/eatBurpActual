import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    Button } from 'react-native';

const userInfo = (props) => (
  <View elevation = {5} style = {{borderRadius :5, margin: 16, flexDirection: 'row'}}>
  <View>
  <Image source ={{ uri: props.profile_image}}/>  
  </View>
  <View>
   <View style={{flexDirection: 'row'}}>
    <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 20, color: '#212121'}}>{props.first_name}</Text>
    <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 20, color: '#212121'}}>{props.last_name}</Text>
   </View>
    <Text style={{color: '#000'}}>Reviews {props.no_of_reviews}</Text>
    <Text style={{color: '#000'}}>Recommendations {props.no_of_recommendations}</Text>
    <Text style={{color: '#000'}}>Foodie Level {props.foodie_level}</Text>
    </View>
  </View>
);
 
export default userInfo;