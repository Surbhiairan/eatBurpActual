import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView
} from 'react-native';

import DishList from '../../components/DishList/DishList';
import SearchBar from '../../components/SearchBar/SearchBar';
import dishes from '../../data/data';
import { connect } from 'react-redux';
import { fetchTopDishes } from '../../actions/dish.action';
import { recommendDishDispatch } from '../../actions/dish.action';;

class TopTenDish extends Component {
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

    componentDidMount() {
        this.props.fetchTopDishes();
    }

    dishCardPressedHandler = dish => {
        console.log("pressed dish", dish);
        this.props.navigator.push({
            screen: "DishDetailScreen",
            title: dish.item.dish_name,
            passProps: {
                selectedDish: dish.item
            }
        });
    }

    recommendButtonPressHandler = dish => {
        // console.log("recommend", dish);
        //dispatch action to increase recommendation count, pass dish_restaurant_mapping id
        this.props.recommendDishDispatch(dish.item._id);
    }

    reviewButtonPressHandler = dish => {
        this.props.navigator.push({
            screen: "ReviewDishScreen",
            // title: dish.item.dish_name,
            passProps: {
                selectedDish: dish.item
            }
        });
        //this.props.reviewDishDispatch(dish.item._id);        
    }

    searchBarPressHandler = () => {
        //navigate to search suggestion screen
        console.log("pressed search bar");
        this.props.navigator.push({
            screen: "SearchSuggestionScreen",
            // title: dish.item.dish_name,
            // passProps: {
            //   selectedDish: dish.item
            // }
        });
    }

    render() {
        return (
            <View style={{ backgroundColor: '#eaecee' }}>
                <SearchBar
                    onSearchBarPressed={this.searchBarPressHandler}
                />
                <ScrollView>
                    <View style={style.container}>
                        <DishList
                            dishes={this.props.topDishes}
                            onRecommendButtonPressed={this.recommendButtonPressHandler}
                            onReviewButtonPressed={this.reviewButtonPressHandler}
                            onDishCardPressed={this.dishCardPressedHandler}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
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


export default connect(mapStateToProps, mapDispatchToProps)(TopTenDish);
