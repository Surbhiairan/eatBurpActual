import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const ListCard = (props) =>{
    console.log("prop", props);

    if(props.type === 'restaurant') { 
    return(

        <View elevation={5} style= {style.container}>
            <View style={style.image}>
            <Image 
              source={{uri: props.image}}
              style={{width: 100, height: 100 , borderRadius: 7, paddingBottom:5, }}
            />
            </View>
            <View style = {style.info}>
                <Text style = {{fontFamily: 'OpenSans-Bold', color: '#474040', fontSize: 16}}>{props.restaurant_name}</Text>
                <Text style = {{fontFamily: 'OpenSans-Regular', color: '#474040', fontSize: 13}}>{props.restaurant_location}</Text>
                <Text style = {{fontFamily: 'OpenSans-Regular', color: '#474040', fontSize: 13}}>{props.restaurant_type}</Text>
                <View style = {{marginTop:5, backgroundColor: '#ffa000', borderRadius: 6, width:30, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style = {{fontFamily: 'OpenSans-Bold', color: '#fff', fontSize: 14, padding: 2}}>{props.restaurant_rating}</Text>
                </View>
            </View>
            <View style={style.moreMenu}>
                <TouchableOpacity onPress={props.onMoreMenuPressed} style={{padding:4}}>      
                    <Icon style = {style.searchIcon} name="md-more" size={25} color="#757575" />
                </TouchableOpacity>
            </View>
        </View>
    )
  } else 
     return (
        <View elevation={5} style= {style.container}>
        <View style={style.image}>
        <Image 
          source={{uri: props.image}}
          style={{width: 100, height: 100 , borderRadius: 7, paddingBottom:5, }}
        />
        </View>
        <View style = {style.info}>
            <Text style = {{fontFamily: 'OpenSans-Bold', color: '#474040', fontSize: 16}}>{props.dish_name}</Text>
            <Text style = {{fontFamily: 'OpenSans-SemiBold', color: '#474040', fontSize: 13}}>Rs. {props.dish_price}</Text>
            <Text style = {{fontFamily: 'OpenSans-Regular', color: '#474040', fontSize: 13}}>{props.restaurant_name}</Text>
            <Text style = {{fontFamily: 'OpenSans-Regular', color: '#474040', fontSize: 13}}>{props.restaurant_location}</Text>
            <View style = {{marginTop:5, backgroundColor: '#ffa000', borderRadius: 6, width:30, justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {{fontFamily: 'OpenSans-Bold', color: '#fff', fontSize: 14, padding: 2}}>{props.dish_rating}</Text>
            </View>
        </View>
        <View style={style.moreMenu}>
            <TouchableOpacity onPress={props.onMoreMenuPressed} style={{padding:4}}>      
                <Icon style = {style.searchIcon} name="md-more" size={25} color="#757575" />
            </TouchableOpacity>
        </View>
    </View>
     )
}

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff', 
        flexDirection:'row',
        borderRadius: 10, 
        marginLeft: 19,
        marginRight: 19,
        marginTop:15  
    },
    image: {
       
    },
    info:{
        paddingLeft: 8,
        width: 200
    },
    moreMenu:{
        alignItems: 'flex-end'
    },
    
})

export default ListCard;