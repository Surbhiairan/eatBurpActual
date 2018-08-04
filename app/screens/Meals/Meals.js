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
        this.state = {
            selected: props.selectedMeal,
            snacks: true,
            lunch: false,
            breakfast:false,
        }
    }

    componentWillMount() {
        if(this.state.selected === 'breakfast') {
            this.setState({
                snacks: false,
                lunch: false,
                breakfast: true,
            })
        } else if (this.state.selected === 'lunch/dinner') {
            this.setState({
                snacks: false,
                lunch: true,
                breakfast: false,
            })
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


    reviewDishHandler = (dish) => {
        console.log("reviewDishHandler", dish)
        this.props.navigator.push({
            screen: "ReviewDishScreen",
            // title: dish.item.dish_name,
            passProps: {
                selectedDish: dish
            }
        });
        alert("reviewed");
    }

    renderListComponent = (item) => {
        return(
            <ListCard 
                type = "dishRestaurantMapping"
                dish={item.item}
                dish_name = {item.item.dish_name}
                price = {item.item.price}
                restaurant_name = {item.item.restaurant_name}
                restaurant_location = {item.item.locality}
                dish_rating = {item.item.average_rating}
                image = {item.item.images}
                onPress = {() => this.listCardPressedHandler(item)}
                onPressReview={this.reviewDishHandler}

            />
        )
    }

    onButtonPress = (type) => {
        this.setState({selected: type})
    }

    backIconPress = () => {
        this.props.navigator.pop();
    }

    searchBarPressHandler = () => {
        //navigate to search suggestion screen
        this.props.navigator.push({
            screen: "SearchSuggestionScreen",
        });
    }

    render() {
        return (
            <View style = {{ backgroundColor: '#fff', flex:1 }}>
                <View style = {style.header}>
                    <TouchableOpacity onPress={this.backIconPress}>
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
                    {
                        (this.state.snacks) 
                            && 
                        (this.props.mealLoading ? 
                            <ActivityIndicator/> : 
                            (<FlatList 
                                data = {this.props.meal}
                                renderItem = {this.renderListComponent}
                                keyExtractor={(item, index) => index.toString()}
                            />)
                        )
                    }
                    {
                        (this.state.lunch) && 
                            (this.props.mealLoading ?
                            <ActivityIndicator /> :
                            (<FlatList
                                data={this.props.meal}
                                renderItem={this.renderListComponent}
                                keyExtractor={(item, index) => index.toString()}
                            />)
                        )
                    }
                    {
                        (this.state.breakfast) && (this.props.mealLoading ?
                            <ActivityIndicator /> :
                            (<FlatList
                                data={this.props.meal}
                                renderItem={this.renderListComponent}
                                keyExtractor={(item, index) => index.toString()}
                            />)
                        )
                    }
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
        borderColor: '#BDBDBD',
        borderWidth: 1,
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginLeft: 10,
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
        meal: state.dish.meal,
        mealLoading: state.dish.mealLoading,
        mealError: state.dish.mealError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMeal: () => dispatch(fetchMeal()),
        recommendDishDispatch: (dish_id) => dispatch(recommendDishDispatch(dish_id)),
        //reviewDishDispatch: (dish_id) => dispatch(reviewDishDispatch(dish_id)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Meals);