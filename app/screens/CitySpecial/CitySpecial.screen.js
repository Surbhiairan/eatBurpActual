import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchTopDishes } from '../../actions/dish.action';
import ListCard from '../../components/ListCard/ListCard';

class CitySpecial extends Component {

    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        this.state ={
            selected: "restaurant",
            restaurant: true,
            dishes: false,
            citySpecialRestaurants:[
                {
                    _id: "5ae865b2f36d282906c4c7b4",
                    restaurant_name: "Tinkus",
                    phone_number: "999999999",
                    average_cost_for_two: 250,
                    open_time: "10AM",
                    close_time: "12PM",
                    rush_hours: "",
                    delivery_offered_in_kms: "4 km",
                    average_rating: 4.3,
                    cuisines: [
                        "Indian",
                        "Italian"
                    ],
                    reviews: [],
                    days_closed: [
                        ""
                    ],
                    images: [
                        "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&h=650&w=940"
                    ],
                    famous_dishes: [
                        "cold coffee",
                        "cheee chutney sandwich"
                    ],
                    payment_mode: [
                        "cash",
                        "card"
                    ],
                    category: [
                        "Cafe"
                    ],
                    address: {
                        "building": "LG 9-10",
                        "latitude": 22.7251,
                        "longitude": 75.8902,
                        "street": "Captain C S Naidu Arcade",
                        "locality": "Old Palasia",
                        "pincode": "452001",
                        "state": "Madhya Pradesh",
                        "country": "India"
                    }
                },
                {
                    _id: "5ae865b2f36d282906c4c7b4",
                    restaurant_name: "BakeWell",
                    phone_number: "999999999",
                    average_cost_for_two: 250,
                    open_time: "10AM",
                    close_time: "12PM",
                    rush_hours: "",
                    delivery_offered_in_kms: "4 km",
                    average_rating: 4.2,
                    cuisines: [
                        "Indian",
                        "Italian"
                    ],
                    reviews: [],
                    days_closed: [
                        ""
                    ],
                    images: [
                        "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&h=650&w=940"
                    ],
                    famous_dishes: [
                        "cold coffee",
                        "cheee chutney sandwich"
                    ],
                    payment_mode: [
                        "cash",
                        "card"
                    ],
                    category: [
                        "Cafe"
                    ],
                    address: {
                        "building": "LG 9-10",
                        "latitude": 22.7251,
                        "longitude": 75.8902,
                        "street": "Captain C S Naidu Arcade",
                        "locality": "Old Palasia",
                        "pincode": "452001",
                        "state": "Madhya Pradesh",
                        "country": "India"
                    }
                },
                {
                    _id: "5ae865b2f36d282906c4c7b4",
                    restaurant_name: "Just my Bakes",
                    phone_number: "999999999",
                    average_cost_for_two: 300,
                    open_time: "10AM",
                    close_time: "12PM",
                    rush_hours: "",
                    delivery_offered_in_kms: "4 km",
                    average_rating: 4.0,
                    cuisines: [
                        "Indian",
                        "Italian"
                    ],
                    reviews: [],
                    days_closed: [
                        ""
                    ],
                    images: [
                        "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&h=650&w=940"
                    ],
                    famous_dishes: [
                        "cold coffee",
                        "cheee chutney sandwich"
                    ],
                    payment_mode: [
                        "cash",
                        "card"
                    ],
                    category: [
                        "Cafe"
                    ],
                    address: {
                        "building": "LG 9-10",
                        "latitude": 22.7251,
                        "longitude": 75.8902,
                        "street": "Captain C S Naidu Arcade",
                        "locality": "Old Palasia",
                        "pincode": "452001",
                        "state": "Madhya Pradesh",
                        "country": "India"
                    }
                },
                {
                    _id: "5ae865b2f36d282906c4c7b4",
                    restaurant_name: "Tinkus",
                    phone_number: "999999999",
                    average_cost_for_two: "250",
                    open_time: "10AM",
                    close_time: "12PM",
                    rush_hours: "",
                    delivery_offered_in_kms: "4 km",
                    average_rating: 0,
                    cuisines: [
                        "Indian",
                        "Italian"
                    ],
                    reviews: [],
                    days_closed: [
                        ""
                    ],
                    images: [
                        "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&h=650&w=940"
                    ],
                    famous_dishes: [
                        "cold coffee",
                        "cheee chutney sandwich"
                    ],
                    payment_mode: [
                        "cash",
                        "card"
                    ],
                    category: [
                        "Cafe"
                    ],
                    address: {
                        "building": "LG 9-10",
                        "latitude": 22.7251,
                        "longitude": 75.8902,
                        "street": "Captain C S Naidu Arcade",
                        "locality": "Old Palasia",
                        "pincode": "452001",
                        "state": "Madhya Pradesh",
                        "country": "India"
                    }
                },
                {
                    _id: "5ae865b2f36d282906c4c7b4",
                    restaurant_name: "Veg Bites",
                    phone_number: "999999999",
                    average_cost_for_two: 250,
                    open_time: "10AM",
                    close_time: "12PM",
                    rush_hours: "",
                    delivery_offered_in_kms: "4 km",
                    average_rating: 4.5,
                    cuisines: [
                        "Indian",
                        "Italian"
                    ],
                    reviews: [],
                    days_closed: [
                        ""
                    ],
                    images: [
                        "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&h=650&w=940"
                    ],
                    famous_dishes: [
                        "cold coffee",
                        "cheee chutney sandwich"
                    ],
                    payment_mode: [
                        "cash",
                        "card"
                    ],
                    category: [
                        "Cafe"
                    ],
                    address: {
                        "building": "LG 9-10",
                        "latitude": 22.7251,
                        "longitude": 75.8902,
                        "street": "Captain C S Naidu Arcade",
                        "locality": "Old Palasia",
                        "pincode": "452001",
                        "state": "Madhya Pradesh",
                        "country": "India"
                    }
                },
            ],
            citySpecialDishes:[
                {
                    _id: 1,
                    dish_name: "French Fries",
                    price: "145",
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    dish_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                
                },
                {
                    _id: 1,
                    dish_name: "French Fries",
                    price: "145",
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    dish_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                
                },
                {
                    _id: 1,
                    dish_name: "French Fries",
                    price: "145",
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    dish_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                
                },
                {
                    _id: 1,
                    dish_name: "French Fries",
                    price: "145",
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    dish_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                
                },
                {
                    _id: 1,
                    dish_name: "French Fries",
                    price: "145",
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    dish_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                
                },
                {
                    _id: 1,
                    dish_name: "French Fries",
                    price: "145",
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    dish_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                
                },{
                    _id: 1,
                    dish_name: "French Fries",
                    price: "145",
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    dish_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                
                }
            ]
        }
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    };

    listCardPressedHandler = (item) => {
        if(this.state.restaurant){
            this.props.navigator.push({
                screen: "DishDetailScreen",
                passProps: {
                    selectedDish: item.item
                }
            })
        }else {
            this.props.navigator.push({
                screen: "SearchResultScreen",
                passProps: {
                    dish_id: item.item._id
                }
            })
        }
    }

    renderListComponent = (item) => {
        if(this.state.restaurant === true)
        return(
            <ListCard 
                type= "dishRestaurantMapping"
                restaurant_name = {item.item.restaurant_name}
                restaurant_location = {item.item.locality}
                dish_rating={item.item.average_rating}
                dish_name={item.item.dish_name}
                price={item.item.price}
                image = {item.item.images}
                onPress={() => this.listCardPressedHandler(item)}
                onPressLike={this.recommendDishHandler}
                onPressRating={this.ratingDishHandler}
                onPressReview={this.reviewDishHandler}
            />
            )
        else
        return(
            <ListCard 
                type = "dish"
                dish_name = {item.item.dish_name}
                image = {item.item.images}
                onPress = {() => this.listCardPressedHandler(item)}
                onPressLike = {this.recommendDishHandler}
                onPressRating = {this.ratingDishHandler}
                onPressReview = {this.reviewDishHandler}
            />
        )
    }

    recommendDishHandler = () => {
        alert("recommended");
    }

    ratingDishHandler = () => {
        alert("rated");
    }

    reviewDishHandler = () => {
        alert("reviewed")
    }

    onButtonPress = (type) => {
        this.setState({selected: type})
    }

    render() {
        let flatListRestaurant = <ActivityIndicator />
        let flatListDishes = <ActivityIndicator />

        return (
            <View style = {{ backgroundColor: '#fff', flex:1 }}>
                <View style = {style.header}>
                <TouchableOpacity>
                <Icon style = {style.backIcon} name="ios-arrow-round-back-outline" size={45} color="#757575" />
                </TouchableOpacity>
                <View style = {style.searchbar}>
                    <SearchBar
                        onSearchBarPressed={this.searchBarPressHandler}
                    />
                </View >
                </View>
                <Text style = {style.topTen}>City Special</Text>
                <View style = {style.tabBar}>
                <TouchableOpacity onPress = {() => this.setState({restaurant: true, dishes: false})}>
                    <View elevation = {5} style = {[this.state.restaurant? style.selectedTab : style.tab]}>
                        <Text style = {[this.state.restaurant? style.selectedTabText : style.tabText]}>Restaurant</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.setState({restaurant: false, dishes: true})}>
                    <View elevation = {5} style = {[this.state.dishes? style.selectedTab : style.tab]}>
                        <Text style = {[this.state.dishes? style.selectedTabText : style.tabText]}>Dish</Text>
                    </View>
                </TouchableOpacity>
                </View>
                
                <View style={{flex: 1}}>
                    {
                        (this.state.restaurant) && 
                       (
                            this.props.citySpecialLoading ? <ActivityIndicator /> : (<FlatList
                                data={this.props.citySpecial[0].city_special_restaurant_dish}
                                renderItem={this.renderListComponent}
                            />)
                            )
                    }
                    {
                        (this.state.dishes) && 
                       <FlatList
                            numColumns = {2}
                            data={this.props.citySpecial[0].city_special_dishes}
                            renderItem={this.renderListComponent}
        />
                    }
                </View>
                
            </View>
        );
    }
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
    tabBar: {
        flexDirection: 'row',
        paddingLeft: 15,
       // marginLeft: 20,
    },
    selectedTab: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffa000', 
        borderRadius: 18,
        margin: 5,
    },
    tab:{
        
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        borderRadius: 18,   
        margin: 5,        
    },
    selectedTabText:{
        padding: 6,
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 15, 
        color: '#fff'
    },
    tabText:{
        padding: 6,
        fontFamily: 'OpenSans-Bold',
        fontSize: 13, 
        color: '#212121'
    },
    header: {
        paddingTop:10,
        paddingBottom: 6,
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    backIcon :{
        paddingLeft:10,

    },
    searchbar: {
        paddingLeft: 10,
    },
    topTen:{
        paddingLeft:25,
        paddingTop:5,
        fontFamily: 'OpenSans-ExtraBold',
        fontSize: 22,
        color:'#212121'
    }
})

const mapStateToProps = state => {
    console.log("city special-------", state.dish)
    return {
        citySpecial: state.dish.citySpecial,
        citySpecialLoading: state.dish.citySpecialLoading,
        citySpecialError: state.dish.citySpecialError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDishes: () => dispatch(fetchTopDishes()),
        recommendDishDispatch: (dish_id) => dispatch(recommendDishDispatch(dish_id)),
        //reviewDishDispatch: (dish_id) => dispatch(reviewDishDispatch(dish_id)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CitySpecial);