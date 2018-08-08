import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  Image
} from 'react-native';

import LikeIcon from '../../components/SvgIcons/like.icon';
import PenIcon from '../../components/SvgIcons/pen.icon';

const DEFAULT_IMAGE = require('../../data/images/sandwich.jpg');
const win = Dimensions.get('window');

const CustomImage = (props) => {
  console.log(props, "propsssssssssssssssss");
  if (props.dishImages.length > 0) {
    return (
      <View >
        <ImageBackground
          //resizeMode="contain"
          imageStyle={{ borderRadius: 10 }}
          style={{borderRadius: 10, width: win.width*.9, height: win.height * .6, }}
          source={{ uri: props.dishImages[0] }} >
          <Rating average_rating={props.average_rating} />
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
          style={{  borderRadius: 10, width: win.width , height: win.height * .6, }} >
          <Rating average_rating = {props.average_rating} />
        </ImageBackground>
      </View>
    )
}

const Recommendations = (props) => {
  if(props.recommended > 0) {
    return (
      <Text style={{ color: '#212121', fontFamily: 'OpenSans-SemiBold', fontSize: 16, marginLeft: 16 }}>
        {props.recommended} people recommended this
    </Text>
    )
  }
   else {return null}
}

const Rating = (props) => {
  if (props.average_rating > 0) {
    return (
      <View style={styles.textOnImageContainer}>
        <Text style={styles.textOnImage}>{props.average_rating}</Text>
      </View>
    )
  }
  else { return (
    <View style={styles.textOnImageContainer}>
      <Text style={{
        fontSize: 18,
        color: '#fff',
        fontFamily: 'OpenSans-Regular'}}>New</Text>
    </View>
  ) }
}

const Reviews = (props) => {
  if(props.reviews.length > 0) {
    return (
      <View>
      <Text style={{ color: '#212121', fontFamily: 'OpenSans-Bold', fontSize: 18, marginLeft: 10, marginTop: 5, marginBottom: 2 }}>
        Reviews
      </Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={props.reviews}
        renderItem={(item) => {
          return (
            <View style={{ marginLeft: 8, marginRight: 8, borderRadius: 8 }}>
              <View style={{ flexDirection: 'row', margin: 4 }}>
                <Text style={{ color: '#212121', fontFamily: 'OpenSans-Bold', fontSize: 15, paddingLeft: 4 }}>{item.item.user.first_name}</Text>
                <Text style={{ color: '#212121', fontFamily: 'OpenSans-Bold', fontSize: 15, paddingLeft: 4 }}>{item.item.user.last_name}</Text>
              </View>
              <Text style={{ color: '#ffa000', fontFamily: 'OpenSans-SemiBold', fontSize: 14, marginLeft:4, paddingLeft: 4}}>Rating {item.item.rating}</Text>
              <Text style={{ color: '#212121', fontFamily: 'OpenSans-Regular', fontSize: 14, padding: 4, margin: 4 }}>{item.item.review}</Text>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                style={styles.imageStyle}
                numColumns={3}
                data={item.item.images}
                renderItem={({ item }) =>
                  <Image
                    source={{ uri: item }}
                    style={{ width: 100, height: 100 }}
                  />
                }
              />
            </View>
          )
        }}
      />
      </View>
    )
  } else {
    return (
      <Text style={{ color: '#212121', fontFamily: 'OpenSans-SemiBold', fontSize: 14, marginLeft: 10, marginTop: 5, marginBottom: 2 }}>
        No Reviews
      </Text>
    )
  }
}

const dishCard = (props) => {
  return (  
    <View elevation={3} style={styles.dishCard} >
      <View style={{margin:'1%'}}><Recommendations recommended = {props.recommended} /></View>
      <View style={{ alignItems: 'center' }}>
        <CustomImage
          average_rating={props.average_rating}
          dishImages={props.dish_images} /></View>
      <View style={{ flexDirection: 'row', marginLeft: '3%' }}>
        <TouchableOpacity onPress={props.onRecommendButtonPressed} style={{ padding: 4 }}>
          <LikeIcon fill={'#ffa000'} height={26} width={26} />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onReviewButtonPressed} style={{ padding: 4 }}>
          <PenIcon fill={'#ffa000'} height={26} width={26} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row',marginLeft:'3%', marginRight:'3%'}}>
      <View style={{flex:3}}>
        <Text style={{color: '#212121', fontFamily: 'OpenSans-SemiBold', fontSize: 18}}>
          {props.dish_name}
        </Text></View>
        <View style={{flex:1,alignItems:'flex-end'}}>
        <Text style={{color: '#212121', fontFamily: 'OpenSans-SemiBold', fontSize: 18}}>
          {props.price}/-
        </Text></View>
      </View>
      <TouchableOpacity onPress={props.onRestaurantPressed}>
      <Text style={{ color: '#212121', fontFamily: 'OpenSans-Bold', fontSize: 16, marginLeft: 10, paddingTop: 5, paddingBottom: 5,}}>
        {props.restaurant_name}, {props.locality}
      </Text>
      </TouchableOpacity>
      <Reviews reviews = {props.reviews}/>
    </View>

  )
}

const styles = StyleSheet.create({
  dishCard: {
    flex: 1,
    //backgroundColor: '#ffa000',
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingTop: 5,
    margin:'2%'
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
  imageStyle: {
    flexWrap: 'wrap',
  }
});

export default dishCard;