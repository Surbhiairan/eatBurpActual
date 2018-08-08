import React from "react";
import { View, 
        Text, 
        StyleSheet, 
        ImageBackground,
        TouchableOpacity
    } from "react-native";

import PenIcon from '../SvgIcons/pen.icon';
import LikeIcon from '../SvgIcons/like.icon';

const DEFAULT_IMAGE = require('../../data/images/sandwich.jpg');

const CustomImage = (props) => {
    console.log(props, "propsssssssssssssssss");
    if (props.restaurantImage.length > 0) {
        return (
            <View >
                <ImageBackground
                    //resizeMode="contain"
                    imageStyle={{ borderRadius: 10 }}
                    style={styles.imageBackgroundStyle}
                    source={{ uri: props.restaurantImage[0] }} >
                    <Rating restaurantRating={props.restaurantRating} />
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
                    style={styles.imageBackgroundStyle} >
                    <Rating restaurantRating = {props.restaurantRating} />
                </ImageBackground>
            </View>
        )
}

const Rating = (props) => {
    if (props.restaurantRating > 0) {
        return (
            <View style={styles.textOnImageContainer}>
                <Text style={styles.textOnImage}>{props.restaurantRating}</Text>
            </View>
        )
    }
    else {
        return (
            <View style={styles.textOnImageContainer}>
                <Text style={{
                    fontSize: 18,
                    color: '#fff',
                    fontFamily: 'OpenSans-Regular'
                }}>New</Text>
            </View>
        )
    }
} 

const RestaurantCard = (props) => (
    <View elevation={5} style={styles.container}>
        <Text style={styles.restaurantNameView}>
            {props.restaurantName}
        </Text>
        <Text style={styles.locationView}>
            {props.restaurantLocality}
        </Text>
        <View>
            <CustomImage
                restaurantRating={props.restaurantRating}
                restaurantImage={props.restaurantImage} />
        </View>
        <View style={styles.addressAndIcons}>
            <Text style={styles.addressText}>
                {props.restaurantBuilding} {props.restaurantStreet}
            </Text>
            <TouchableOpacity onPress={props.onRecommendButtonPressed} style={{ padding: 4 }}>
                <View style={styles.likeIcon}>
                    <LikeIcon height={22.67}
                        width={22.67}
                        fill={'#FFA000'} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onReviewButtonPressed} style={{ padding: 4 }}>
                <View style={styles.penIcon}>
                    <PenIcon height={22.67}
                        width={22.67}
                        fill={'#FFA000'} />
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.cuisineAndPhone}>
            <Text style={styles.cuisineView}>
                {props.restaurantCuisines[0]}, {props.restaurantCuisines[1]}
            </Text>
            <Text style={styles.contactText}>
                {props.restaurantContact}
            </Text>
        </View>
        <Text style={styles.famousDishesHeading}>
            Famous Dishes
        </Text>
        <Text style={styles.famousDishesText}>
            {props.restaurantFamousDishes[0]}, {props.restaurantFamousDishes[1]}
        </Text>
        <Text style={styles.timingText}>
            Open from {props.restaurantOpenTime} - {props.restaurantCloseTime}
        </Text>
        <Text style={styles.averageCostText}>
            Average Cost for Two Rs {props.restaurantAverageCost}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        margin: 11,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        //height: 474
    },
    restaurantNameView: {
        marginTop: 5,
        fontFamily: 'OpenSans-Regular',
        fontSize: 28,
        color: '#212121',
        textAlign: 'center'
    },
    locationView: {
        textAlign: 'center',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 15,
        color: '#757575'
    },
    imageBackgroundStyle: {
        height: 247.5,
        width: 353,
        marginTop: 9,
    },
    textOnImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 51,
        borderRadius: 10,
        backgroundColor: '#FFA000',
        // padding: 2,
        marginLeft: 10,
        marginTop: 5,
        height: 36
    },
    textOnImage: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'OpenSans-Bold'
    },
    cuisineView: {
        // marginLeft: 10,
        // marginTop: 11,
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14,
        color: '#212121',
        width: 175
        //textAlign: 'left'
    },
    addressAndIcons: {
        marginTop: 7,
        marginLeft: 10,
        //backgroundColor: 'blue',
        flexDirection: 'row',
    },
    addressText: {
        marginTop: 7,
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: '#212121',
        width: 175
    },
    likeIcon: {
        marginLeft: 60,
        marginTop: 7,
    },
    penIcon: {
        marginLeft: 20,
        marginTop: 7,
    },
    cuisineAndPhone: {
        marginTop: 11,
        marginLeft: 10,
        flexDirection: 'row',
    },
    contactText: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14,
        color: '#212121',
        marginLeft: 50,
    },
    famousDishesHeading: {
        marginLeft: 10,
        marginTop: 12,
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14,
        color: '#212121'
    },
    famousDishesText: {
        marginLeft: 10,
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: '#212121',
        width: 175
    },
    timingText: {
        marginLeft: 10,
        marginTop: 12,
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: '#212121'
    },
    averageCostText: {
        marginLeft: 10,
        marginTop: 4,
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: '#212121',
        marginBottom: 3
    }
});

export default RestaurantCard;
