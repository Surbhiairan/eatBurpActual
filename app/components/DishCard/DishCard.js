import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions
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
          style={{  borderRadius: 10, width: win.width , height: win.height * .6, }} >
          <View style={styles.textOnImageContainer}>
            <Text style={styles.textOnImage}>{props.average_rating}</Text>
          </View>
        </ImageBackground>
      </View>
    )
}



const dishCard = (props) => {
  if(props.recommended===0){
    recommendMessage = "Start Recommending"
  }
  else{
    recommendMessage = props.recommended+" people recommended this"
  }
  return (
    <View elevation={3} style={styles.dishCard} >
      <View style={{margin:'1%'}}>
      <Text style={{ color: '#212121', fontFamily: 'OpenSans-SemiBold', fontSize: 16, marginLeft: 16 }}>{this.recommendMessage} </Text>
      </View>   
       <View style={{alignItems:'center', }}>
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
      <Text style={{ color: '#212121', fontFamily: 'OpenSans-Bold', fontSize: 18, marginLeft: 10, marginTop: 5, marginBottom: 2 }}>
        Reviews
      </Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={props.reviews}
        renderItem={(item) => {
          return (
            <View style={{ marginLeft: 8, marginRight: 8, borderBottomWidth: 1,
              borderBottomColor: '#eeeeee', }}>
              <View style={{ flexDirection: 'row', }}>
                <Text style={{ color: '#212121', fontFamily: 'OpenSans-Bold', fontSize: 16, paddingLeft: 4 }}>{item.item.user.first_name}</Text>
                <Text style={{ color: '#212121', fontFamily: 'OpenSans-Bold', fontSize: 16, paddingLeft: 4 }}>{item.item.user.last_name}</Text>
              </View>
              <Text style={{ color: '#ffa000', fontFamily: 'OpenSans-SemiBold', fontSize: 14, marginLeft:4, paddingLeft: 4}}>Rating {item.item.rating}</Text>
              <Text style={{ color: '#757575', fontFamily: 'OpenSans-Regular', fontSize: 15, paddingLeft: 4,marginLeft:4,  }}>{item.item.review}</Text>
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
});

export default dishCard;