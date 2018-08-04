import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//import Menu, { MenuDivider } from 'react-native-material-menu';

import MenuItem from '../MoreMenu/MoreMenuItem';
import Menu from '../MoreMenu/MoreMenu';
import LikeIcon from '../SvgIcons/like.icon';
import PenIcon from '../SvgIcons/pen.icon';

_menu = null;

setMenuRef = ref => {
    this._menu = ref;
};

hideMenu = () => {
    this._menu.hide();
};

showMenu = (event, dish) => {
    this._menu.show((event.nativeEvent.pageX - event.nativeEvent.locationX), (event.nativeEvent.pageY - event.nativeEvent.locationY), dish);
};

const ListCard = (props) =>{
    if (props.type === 'dishRestaurantMapping') { 
    return(
        <TouchableOpacity onPress={props.onPress}>
        <View style={{flexDirection:'column'}}>
            <View style={style.restaurantContainer}>
                <View style={style.image}>
                    <Image
                        source={{ uri: props.image[0] }}
                        style={{ width: 100, height: 100, borderRadius: 7, paddingBottom: 5, }}
                    />
                </View>
                <View style={style.info}>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', color: '#474040', fontSize: 16 }}>{props.restaurant_name}</Text>
                    <Text style={{ fontFamily: 'OpenSans-Regular', color: '#474040', fontSize: 13 }}>{props.locality}</Text>
                    <View style={{flexDirection:'row'}}> 
                    <Text style={{ fontFamily: 'OpenSans-Bold', color: '#474040', fontSize: 13 }}>{props.dish_name},</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', color: '#474040', fontSize: 13, paddingLeft:5 }}>Rs. {props.price}</Text>
                    </View>
                    <View style={{ marginTop: 5, backgroundColor: '#ffa000', borderRadius: 6, width: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'OpenSans-Bold', color: '#fff', fontSize: 14, padding: 2 }}>{props.dish_rating}</Text>
                    </View>
                </View>
                <View style={style.moreMenu}>
                    <Menu
                        ref={this.setMenuRef}
                        button={
                        <View >
                        <TouchableOpacity onPress={(evt) => this.showMenu(evt, props.dish)} 
                        style={{
                            paddingLeft: 8,
                            paddingRight: 8,
                            paddingBottom:8,
                            paddingTop:4 }}>
                        <Icon name="md-more" size={25} color="#757575" />
                        </TouchableOpacity></View>}
                        style={style.popUpStyle}
                        onPressLike={this.onPressLike}
                        onPressReview={props.onPressReview}
                    > 
                    </Menu>
                </View>
            </View>
            <View style={{ 
                borderBottomWidth: 1,
                borderBottomColor: '#eeeeee',
                marginLeft: 19,
                marginRight: 19,}}></View>
        </View>
        </TouchableOpacity>
    )
  } else 
     return (
         <TouchableOpacity onPress={props.onPress}>

             <View elevation={5} style={style.dishContainer}>
                 <View style={style.image}>
                     <Image
                         source={{ uri: props.image[0] }}
                         style={{ width: 150, height: 150, borderRadius: 7, paddingBottom: 5, }}
                     />
                 </View>
                 <View style={style.dishInfo}>
                     <View style={{flex:1,flexWrap: 'wrap'}}>
                         <Text style={style.dishTextStyle}>{props.dish_name}</Text>
                     </View>
                     <View style={{alignItems: 'flex-end'}}>
                 </View>
                 </View>
                 
             </View>
         </TouchableOpacity>
     )
}

onPressLike = (dish) => {
    alert("you have recommended this dish");
    this._menu.hide();
}

const style = StyleSheet.create({

    dishTextStyle: {
        fontFamily: 'OpenSans-Bold', 
        color: '#474040', 
        fontSize: 14,
        textAlign: 'center'
    },
    restaurantContainer: {
        flex:1,
        backgroundColor: '#fff', 
        flexDirection:'row',
        borderRadius: 10, 
        marginLeft: 19,
        marginRight: 19,
        marginTop:8,
        marginBottom:8,
       
    },
    dishContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin:10,
        padding:5,
        
    },
    image: {
       
    },
    info:{
        paddingLeft: 8,
        width: 200
    },
    dishInfo: { 
        flexDirection:'row'       
    },
    moreMenu:{
        alignItems: 'flex-end'
    },
    popUpStyle: {
        // padding:1,
        // backgroundColor: 'green'
    }
    
})

export default ListCard;