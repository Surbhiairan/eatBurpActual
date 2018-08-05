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
import { fetchDishSearchResults } from '../../actions/dish.action';
import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchTopDishes } from '../../actions/dish.action';
import ListCard from '../../components/ListCard/ListCard';
import { recommendDishDispatch } from '../../actions/dish.action';

class CitySpecial extends Component {

    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        this.state = {
            selected: "restaurant",
            restaurant: true,
            dishes: false,
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
        if (this.state.restaurant) {
            this.props.navigator.push({
                screen: "DishDetailScreen",
                passProps: {
                    selectedDish: item.item
                }
            })
        } else {
            this.props.fetchDishSearchResults(item.search_tag);
            console.log("item in itemPressHandler", item)
            this.props.navigator.push({
              screen: "SearchResultScreen",
              title: item.search_tag
            });
        }
    }

    renderListComponent = (item) => {
        if(this.state.restaurant === true)
        return(
            <ListCard 
                dish = {item.item}
                type= "dishRestaurantMapping"
                restaurant_name = {item.item.restaurant_name}
                locality = {item.item.locality}
                dish_rating={item.item.average_rating}
                dish_name={item.item.dish_name}
                price={item.item.price}
                image = {item.item.images}
                onPress={() => this.listCardPressedHandler(item)}
                onPressReview={this.reviewDishHandler}
            />
            )
        else
        return(
            <ListCard 
                dish = {item.item}
                type = "dish"
                dish_name = {item.item.dish_name}
                image = {item.item.images}
                onPress = {() => this.listCardPressedHandler(item)}
            />
        )
    }

    reviewDishHandler = (dish) => { 
        this.props.navigator.push({
            screen: "ReviewDishScreen",
            title: 'Add Review',
            passProps: {
                selectedDish: dish
            }
        });
        alert("reviewed");
    }

    onButtonPress = (type) => {
        this.setState({ selected: type })
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
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={style.header}>
                    <TouchableOpacity onPress={this.backIconPress}>
                        <Icon style={style.backIcon} name="ios-arrow-round-back-outline" size={45} color="#757575" />
                    </TouchableOpacity>
                    <View style={style.searchbar}>
                        <SearchBar
                            onSearchBarPressed={this.searchBarPressHandler}
                        />
                    </View >
                </View>
                <Text style={style.topTen}>City Special</Text>
                <View style={style.tabBar}>
                    <TouchableOpacity onPress={() => this.setState({ restaurant: true, dishes: false })}>
                        <View elevation={5} style={[this.state.restaurant ? style.selectedTab : style.tab]}>
                            <Text style={[this.state.restaurant ? style.selectedTabText : style.tabText]}>Restaurant</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ restaurant: false, dishes: true })}>
                        <View elevation={5} style={[this.state.dishes ? style.selectedTab : style.tab]}>
                            <Text style={[this.state.dishes ? style.selectedTabText : style.tabText]}>Dish</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1}}>
                    {
                        (this.state.restaurant) &&
                        (
                            this.props.citySpecialLoading ? <ActivityIndicator /> : (
                            <FlatList
                                data={this.props.citySpecial[0].city_special_restaurant_dish}
                                renderItem={this.renderListComponent}
                                keyExtractor={(item, index) => index.toString()}
                            />)
                        )
                    }
                    {
                        (this.state.dishes) &&
                        <FlatList
                            numColumns={2}
                            data={this.props.citySpecial[0].city_special_dishes}
                            renderItem={this.renderListComponent}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    }
                </View>

            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: 10,
        marginLeft: 19,
        marginRight: 19,
        marginTop: 15
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
    tab: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        borderRadius: 18,
        margin: 5,
    },
    selectedTabText: {
        padding: 6,
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 15,
        color: '#fff'
    },
    tabText: {
        padding: 6,
        fontFamily: 'OpenSans-Bold',
        fontSize: 13,
        color: '#212121'
    },
    header: {
        paddingTop: 10,
        paddingBottom: 6,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    backIcon: {
        paddingLeft: 10,
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
    topTen: {
        paddingLeft: 25,
        paddingTop: 5,
        fontFamily: 'OpenSans-ExtraBold',
        fontSize: 22,
        color: '#212121'
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
        fetchDishSearchResults: (searchTag) => dispatch(fetchDishSearchResults(searchTag)),        
        fetchTopDishes: () => dispatch(fetchTopDishes()),
        recommendDishDispatch: (dish_id) => dispatch(recommendDishDispatch(dish_id)),
        //reviewDishDispatch: (dish_id) => dispatch(reviewDishDispatch(dish_id)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CitySpecial);