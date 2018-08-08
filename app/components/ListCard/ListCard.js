import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { recommendDishDispatch } from '../../actions/dish.action';
import MenuItem from '../MoreMenu/MoreMenuItem';
import Menu from '../MoreMenu/MoreMenu';
import LikeIcon from '../SvgIcons/like.icon';
import PenIcon from '../SvgIcons/pen.icon';


 class ListCard extends Component {

    constructor(props){
        super(props);
    }
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

     onPressLike = (dish) => {
         let alreadyRecommended = false;
         //dispatch action to increase recommendation count, pass dish_restaurant_mapping id
         console.log(" user recommendations", this.props.recommendations)
         for (let i = 0; i < this.props.recommendations.length; i++) {
             if (this.props.recommendations[i].dish_id[0] === dish.dish_id[0]) {
                 console.log("you have already recommended this dish");
                 alreadyRecommended = true;
                 Alert.alert(
                     '',
                     'you have already recommended this dish',
                     [
                         { text: 'OK', onPress: () => console.log('OK Pressed') },
                     ],
                     { cancelable: false }
                 )
                 break;
             }
         }
         if (alreadyRecommended === false) {
             this.props.recommendDishDispatch(dish._id);
         }
         //alert("you have recommended this dish");
         this._menu.hide();
     }

    render() {
        if(this.props.dish_rating===0){
        rating='New'
    }else{
        rating=this.props.dish_rating;
    }
    if (this.props.type === 'dishRestaurantMapping') { 
    return(
        <TouchableOpacity onPress={this.props.onPress}>
        <View style={{flexDirection:'column'}}>
            <View style={style.restaurantContainer}>
                <View style={style.image}>
                    <Image
                        source={{ uri: this.props.image[0] }}
                        style={{flex:1,height: undefined, width: undefined }}
                        //resizeMode="contain"
                    />
                </View>
                <View style={style.info}>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', color: '#474040', fontSize: 16 }}>{this.props.restaurant_name}</Text>
                    <Text style={{ fontFamily: 'OpenSans-Regular', color: '#474040', fontSize: 13 }}>{this.props.locality}</Text>
                    <View style={{flexDirection:'row'}}> 
                    <View style={{flex:3}}>
                        <Text style={{ fontFamily: 'OpenSans-Bold', color: '#474040', fontSize: 13 }}>{this.props.dish_name}</Text></View>
                        <View style={{flex:1,alignItems:'flex-end'}}><Text style={{ fontFamily: 'OpenSans-SemiBold', color: '#474040', fontSize: 13, paddingLeft:5 }}>{this.props.price}/-</Text></View>
                    </View>
                    <View style={{ marginTop: 5,   alignItems: 'flex-start' }}>
                        <Text style={{ justifyContent: 'center', textAlign:'center',alignContent:'center',width:45,borderRadius: 6,backgroundColor: '#ffa000',fontFamily: 'OpenSans-Bold', color: '#fff', fontSize: 14, paddingTop:2, paddingBottom:2, paddingLeft:5, paddingRight:5 }}>{rating}</Text>
                    </View>
                </View>
                <View style={style.moreMenu}>
                    <Menu
                        ref={this.setMenuRef}
                        button={
                        <View >
                        <TouchableOpacity onPress={(evt) => this.showMenu(evt, this.props.dish)} 
                        style={{
                            paddingLeft: 8,
                            paddingRight: 8,
                            paddingBottom:8,
                            paddingTop:4 }}>
                        <Icon name="md-more" size={25} color="#757575" />
                        </TouchableOpacity></View>}
                        style={style.popUpStyle}
                        onPressLike={this.onPressLike}
                        onPressReview={this.props.onPressReview}
                    > 
                    </Menu>
                </View>
            </View>
            <View style={{ 
                borderBottomWidth: 1,
                borderBottomColor: '#eeeeee',
                marginTop:5
                }}></View>
        </View>
        </TouchableOpacity>
    )
  } else 
     return (
         <TouchableOpacity onPress={this.props.onPress}>
             <View elevation={5} style={style.dishContainer}>
                 <View style={style.dishImage}>
                     <Image
                         source={{ uri: this.props.image[0] }}
                         style={{ width: 150, height: 150, paddingBottom: 5, paddingTop: 5 }}
                     />
                 </View>
                 <View style={style.dishInfo}>
                     <View style={{flex:1,flexWrap: 'wrap'}}>
                         <Text style={style.dishTextStyle}>{this.props.dish_name}</Text>
                     </View>
                 </View>  
             </View>
         </TouchableOpacity>
     )
    }
}


const style = StyleSheet.create({
    restaurantContainer: {
        flex:1,
        flexDirection:'row',
        //backgroundColor: 'red', 
        flexDirection:'row',
        //borderRadius: 10, 
        marginLeft: '4%',
        marginRight:'4%',
        marginTop:'2%',
        marginBottom:'2%', 
    },
    dishContainer: {
        flex:1,
        //backgroundColor: '#fff',
        alignItems:'center',
        //borderRadius: 10,
        margin:10,
        padding:5,       
    },
    dishInfo: { 
        flexDirection:'row'       
    },
    dishTextStyle: {
        fontFamily: 'OpenSans-Bold', 
        color: '#474040', 
        fontSize: 14,
        textAlign: 'center'
    },
    dishImage:{

    },
    image: {
       flex:3
    },
    info:{
        //backgroundColor:'blue',
        flex:5,
        paddingLeft: '2%',
    },
    moreMenu:{
        flex:1,
        //backgroundColor:'green',
        alignItems:'flex-end'
        //alignSelf: 'flex-end'
    },
    popUpStyle: {
        // padding:1,
        // backgroundColor: 'green'
    }
    
})

const mapStateToProps = state => {
    return {
        reviews: state.reviews.reviews,
        reviewsError: state.reviews.reviewsError,
        reviewsLoading: state.reviews.reviewsLoading,
        recommendations: state.reviews.recommendations,
        recommendationsError: state.reviews.recommendationsError,
        recommendationsLoading: state.reviews.recommendationsLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        recommendDishDispatch: (dish_id) => dispatch(recommendDishDispatch(dish_id)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ListCard);
