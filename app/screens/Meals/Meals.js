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

import { connect } from 'react-redux';

import SearchBar from '../../components/SearchBar/SearchBar';

import { fetchTopDishes } from '../../actions/dish.action';

import ListCard from '../../components/ListCard/ListCard';

class Meals extends Component {

    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        this.state ={
            selected: "snacks",
            snacks: true,
            lunch: false,
            breakfast:false,
            citySpecialRestaurants:[
                {
                    _id:1,
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    restaurant_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:"https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                },
                {
                    _id:2,
                    restaurant_name: "Foobae",
                    restaurant_location: "Anand Bazaar, Palasia",
                    restaurant_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:"https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                },
                {
                    _id:3,
                    restaurant_name: "Midtown Cafe",
                    restaurant_location: "Anand Bazaar, Palasia",
                    restaurant_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:"https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                }
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
                    image:"https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                
                }
            ],
            snacksDishes:[
                {
                    _id: 1,
                    dish_name: "French Fries",
                    price: "145",
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    dish_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                
                }
            ],
            lunchDishes:[
                {
                    _id: 1,
                    dish_name: "Dal Baati",
                    price: "145",
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    dish_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                
                }
            ],
            breakfastDishes:[
                {
                    _id: 1,
                    dish_name: "Cheese Omlette",
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
        this.props.navigator.push({
            screen: "DishDetailScreen",
            passProps: {
                selectedDish: item.item
            }
        })
    }

    renderListComponent = (item) => {
        return(
            <ListCard 
                type = "dish"
                dish_name = {item.item.dish_name}
                price = {item.item.price}
                restaurant_name = {item.item.restaurant_name}
                restaurant_location = {item.item.restaurant_location}
                dish_rating = {item.item.dish_rating}
                restaurant_type = {item.item.restaurant_type}
                image = {item.item.image}
                onPress = {() => this.listCardPressedHandler(item)}
            />
        )
    }

    onButtonPress = (type) => {
        this.setState({selected: type})
    }

    render() {
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
            <Text style = {style.meals}>Meals</Text>

            <View style = {style.tabBar}>
            <TouchableOpacity onPress = {() => this.setState({snacks: true, lunch: false, breakfast: false})}>
                <View elevation = {5} style = {[this.state.snacks? style.selectedTab : style.tab]}>
                    <Text style = {[this.state.snacks? style.selectedTabText : style.tabText]}>Snacks</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => this.setState({lunch: true, snacks: false, breakfast: false})}>
                <View elevation = {5} style = {[this.state.lunch? style.selectedTab : style.tab]}>
                    <Text style = {[this.state.lunch? style.selectedTabText : style.tabText]}>Lunch/Dinner</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => this.setState({breakfast: true, snacks: false, lunch: false})}>
                <View elevation = {5} style = {[this.state.breakfast? style.selectedTab : style.tab]}>
                    <Text style = {[this.state.breakfast? style.selectedTabText : style.tabText]}>Breakfast</Text>
                </View>
            </TouchableOpacity>
            </View>
            <View>
                {(this.state.snacks) && <FlatList 
                data = {this.state.snacksDishes}
                renderItem = {this.renderListComponent}/>}
                {(this.state.lunch) && <FlatList 
                data = {this.state.lunchDishes}
                renderItem = {this.renderListComponent}/>}
                {(this.state.breakfast) && <FlatList 
                data = {this.state.breakfastDishes}
                renderItem = {this.renderListComponent}/>}

            </View>
                
            </View>
        );
    }
} 

const style = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        paddingLeft: 15,
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
        paddingLeft:10
    },

    meals:{
        paddingLeft:25,
        paddingTop:5,
        fontFamily: 'OpenSans-ExtraBold',
        fontSize: 22,
        color:'#212121'
    }
})

const mapStateToProps = state => {
    return {
        topDishes: state.dish.topDishes,
        topDishesLoading: state.dish.topDishesLoading,
        topDishesError: state.dish.topDishesError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDishes: () => dispatch(fetchTopDishes()),
        recommendDishDispatch: (dish_id) => dispatch(recommendDishDispatch(dish_id)),
        //reviewDishDispatch: (dish_id) => dispatch(reviewDishDispatch(dish_id)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Meals);