import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';

import DishList from '../../components/DishList/DishList';
import SearchBar from '../../components/SearchBar/SearchBar';
import dishes from '../../data/data';
import { connect } from 'react-redux';
import { fetchTopDishes, recommendDishDispatch } from '../../actions/dish.action';
import { fetchSelectedRestaurant } from '../../actions/restaurant.action';
import Icon from 'react-native-vector-icons/Ionicons';

class TopTenDish extends Component {

    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
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

    state = {
        dishes: dishes
    }

    recommendButtonPressHandler = dish => {
        this.props.recommendDishDispatch(dish._id);
    }

    reviewButtonPressHandler = dish => {
        this.props.navigator.push({
            screen: "ReviewDishScreen",
            title: 'Add Review',
            passProps: {
                selectedDish: dish
            }
        });
    }

    searchBarPressHandler = () => {
        this.props.navigator.push({
            screen: "SearchSuggestionScreen",
        });
    }

    backIconPress = () => {
        this.props.navigator.pop();
    }

    restaurantPressedHandler = (restaurantId) => {
        this.props.fetchSelectedRestaurant(restaurantId);
        this.props.navigator.push({
            screen: "RestaurantDetailScreen",
            passProps: {
                id: restaurantId
            }
        });
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={style.header}>
                <View style={style.backIconContainer}>
                    <TouchableOpacity onPress={this.backIconPress}>
                        <Icon name="ios-arrow-round-back-outline" size={45} color="#757575" />
                    </TouchableOpacity></View>
                    <View style={style.searchbar}>
                        <SearchBar
                            onSearchBarPressed={this.searchBarPressHandler}
                        />
                    </View >
                </View>
                <View>
                <Text style={style.topTen}>Top Ten Dishes</Text>
                </View>

                {this.props.topDishesError ? 
                (Alert.alert(
                  'Oops!',
                  'Please refresh!',
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
                ):
                (<View style={style.container}>
                    {
                        this.props.topDishesLoading? <ActivityIndicator/>:
                        (<DishList
                        dishes={this.props.topDishes}
                        onRecommendButtonPressed={this.recommendButtonPressHandler}
                        onReviewButtonPressed={this.reviewButtonPressHandler}
                        onRestaurantPressed={this.restaurantPressedHandler}
                    />)

                    }
                </View>)}
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIconContainer:{
        marginTop: '5%',
        marginLeft: '5%',
    },
    searchbar: {
        flex:1,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius:15,
        marginTop: '5%',
        marginLeft: '5%',
        marginRight:'5%'
    },
    topTen: {
        paddingLeft: '5%',
        paddingTop: '2%',
        fontFamily: 'OpenSans-ExtraBold',
        fontSize: 22,
        color: '#212121'
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
        fetchSelectedRestaurant: (restaurantId) => dispatch(fetchSelectedRestaurant(restaurantId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TopTenDish);
