import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  ImageBackground,
  FlatList
} from 'react-native';

import LikeIcon from '../../components/SvgIcons/like.icon';
import PenIcon from '../../components/SvgIcons/pen.icon';
import StarIcon from '../../components/SvgIcons/star.icon';


const DEFAULT_IMAGE = require('../../data/images/sandwich.jpg');

const CustomImage = (props) => {
  console.log(props, "propsssssssssssssssss");
  if (props.dishImages.length > 0) {
    return (
      <View >
        <ImageBackground
          //resizeMode="contain"
          imageStyle={{ borderRadius: 10 }}
          style={{ width: 316, height: 316, borderRadius: 10 }}
          source={{ uri: props.dishImages[0] }} >
          <View style={styles.textOnImageContainer}>
            <Text style={styles.textOnImage}>{props.average_rating}</Text>
          </View>
        </ImageBackground>
      </View>
    )
  }
  else
    return (
      <View>
        <ImageBackground
          //resizeMode="contain"
          imageStyle={{ borderRadius: 10 }}
          source={DEFAULT_IMAGE}
          style={{ width: 316, height: 316, borderRadius: 10 }} >
          <View style={styles.textOnImageContainer}>
            <Text style={styles.textOnImage}>{props.average_rating}</Text>
          </View>
        </ImageBackground>
      </View>
    )
}

const dishCard = (props) => {
  console.log("inside dishcard", props)
  return (


    <View elevation={5} style={styles.dishCard} >
      <Text style={{ color: '#212121', fontFamily: 'OpenSans-SemiBold', fontSize: 16, marginLeft: 16 }}>{props.recommended} people recommended this</Text>
      <View style={{ padding: 5, alignItems: 'center' }}>
        <CustomImage
          average_rating={props.average_rating}
          dishImages={props.dish_images} />
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 10 }}>
        <TouchableOpacity onPress={props.onRecommendButtonPressed} style={{ padding: 4 }}>
          <LikeIcon fill={'#ffa000'} height={26} width={26} />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onReviewButtonPressed} style={{ padding: 4 }}>
          <PenIcon fill={'#ffa000'} height={26} width={26} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row',}}>
        <Text style={{ color: '#757575', fontFamily: 'OpenSans-SemiBold', fontSize: 18, marginLeft: 10 }}>
          {props.dish_name}
        </Text>
        <Text style={{ color: '#757575', fontFamily: 'OpenSans-SemiBold', fontSize: 18, paddingLeft: 10, }}>
          {props.price}/-
        </Text>
      </View>
      
      <Text style={{ color: '#212121', fontFamily: 'OpenSans-Bold', fontSize: 16, marginLeft: 10, paddingTop: 5, paddingBottom: 5,}}>
        {props.restaurant_name}
      </Text>
      <Text style={{ color: '#757575', fontFamily: 'OpenSans-SemiBold', fontSize: 12, marginLeft: 10, }}>
        Rs. {props.price}
      </Text>
      
      <Text style={{ color: '#212121', fontFamily: 'OpenSans-Bold', fontSize: 18, marginLeft: 10, marginTop: 5, marginBottom: 2 }}>
        Reviews
      </Text>
      <FlatList
        data={props.reviews}
        renderItem={(item) => {
          return (
            <View elevation={2} style={{ backgroundColor: '#fff', marginLeft: 8, marginRight: 8, borderRadius: 8 }}>
              <View style={{ flexDirection: 'row', margin: 4 }}>
                <Text style={{ color: '#212121', fontFamily: 'OpenSans-Bold', fontSize: 15, paddingLeft: 4 }}>{item.item.user.first_name}</Text>
                <Text style={{ color: '#212121', fontFamily: 'OpenSans-Bold', fontSize: 15, paddingLeft: 4 }}>{item.item.user.last_name}</Text>
              </View>
              <Text style={{ color: '#212121', fontFamily: 'OpenSans-Regular', fontSize: 14, padding: 4, margin: 4 }}>{item.item.review}</Text>
            </View>
          )
        }}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  dishCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingTop: 5,
    margin: 8
  },
  textOnImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    borderRadius: 10,
    backgroundColor: '#FFA000',
    padding: 2,
    margin: 5
  },
  textOnImage: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'OpenSans-Bold'
  },
});

export default dishCard;