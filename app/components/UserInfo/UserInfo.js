import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    Button } from 'react-native';

import UserProfileIcon from '../../components/SvgIcons/userProfile.icon';
    
const CustomImage = (props) => {
  console.log(props, "propsssssssssssssssss");
  if (props.profile_image != null)
  {
    return (
      <View >      
        <Image
          //resizeMode="contain"
          imageStyle={{ borderRadius: 10 }}
          style={{ width: 316, height: 316, borderRadius: 10 }} 
          source={{ uri: props.profile_image }} >
        </Image>
      </View>
      )
  }
  else 
    return (
      <View>      
        <UserProfileIcon height={60} width={60} fill={'#ffa000'}/>
      </View>
      )
}

const userInfo = (props) => (
  <View elevation = {5} style = {{borderRadius :5, padding: 10, margin: 16, flexDirection: 'row'}}>
  <View style ={{marginLeft: 5}}>
    <CustomImage 
      profile_image = {props.profile_image}/>
  </View>
  <View style={{marginLeft:10}}>
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