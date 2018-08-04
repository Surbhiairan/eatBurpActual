import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import DishCard from '../DishCard/DishCard';

class ButtonComponent extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.dish);
    };

    render() {
        const { selected, dish, id } = this.props;
        const textColor = selected === id ? "red" : "black";
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View>
                    <Text style={{ color: textColor }}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default class DishList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null,
            selected: null,
        };
    }

    //state = {selected: (new Map(): Map<string, boolean>)};

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, "nextProps");
        this.setState({ selectedDish: nextProps.dishes[0] })

    }

    // componentDidMount(){

    //     this.setState({selectedDish: this.props.dishes[0]})
    //     console.log("in component did mount",this.state.selectedDish);
    //     console.log(this.props.dishes[0],"props in componentDidMount");

    //     if((this.props.dishes && this.props.dishes[0])!=null)
    //     {   console.log(this.props.dishes[0], "this.props.dishes[0]");
    //     this.setState({selectedDish: this.props.dishes[0]})

    //     }
    // }
    _keyExtractor = (item, index) => item._id;

    renderDishNames = (dish) => {
        console.log("dish", dish);
        console.log(this.props.dishes[0], "props in renderDishNames");
        console.log(this.state.selectedDish, "this.state.selectedDish");
        //if(this.state.selectedDish)
        return (
            <ButtonComponent
                id={dish.item._id}
                dish={dish.item}
                onPressItem={this._onPressItem}
                selected={this.state.selected}
                title={dish.item.dish_name}
            />
            //     <View elevation = {5} style={{borderRadius: 16, backgroundColor:'#fff', margin: 5, paddingLeft: 10, paddingRight: 10,paddingTop: 5, paddingBottom: 10}}>
            //     <Text  style= {{ color: '#212121', fontFamily: 'OpenSans-Bold', fontSize: 13}}      
            //       onPress={() => this._handlePressDishName(dish)} >
            //     {dish.item.dish_name}</Text>
            //   </View>
        );
    };

    _onPressItem = (dish) => {
        console.log('dish =========>', dish);
        console.log('dish =========>', dish);
        this.setState({ selected: dish._id, selectedDish: dish });
        // this.setState({ selectedDish: dish })
        // updater functions are preferred for transactional updates
        //   this.setState((state) => {
        //     // copy the map rather than modifying state.
        //     const selected = new Map(state.selected);
        //     selected.set(id, !selected.get(id)); // toggle
        //     return {selected};
        //   });
    };
    // _handlePressDishName = (dish) => {
    //   this.setState({selectedDish: dish.item});
    // }

    // reviewButtonPressHandler = dish => {
    //     console.log("in review",dish);
    //     alert("review pressed")
    //     this.props.navigator.push({
    //         screen: "ReviewDishScreen",
    //         // title: dish.item.dish_name,
    //         passProps: {
    //             selectedDish: dish.item
    //         }
    //     });
    //     //this.props.reviewDishDispatch(dish.item._id);        
    // }

    render() {

        console.log(this.props.dishes[0], "props in render");

        return (
            <View style={{ flex: 1 }}>

                <FlatList
                    style={styles.dishListContainer}
                    data={this.props.dishes}
                    horizontal={true}
                    renderItem={this.renderDishNames}
                    showsHorizontalScrollIndicator={false}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                />
                <ScrollView>
                    <View >
                        {(this.state.selectedDish) &&
                            <DishCard
                                dish_name={this.state.selectedDish.dish_name}
                                price={this.state.selectedDish.price}
                                restaurant_name={this.state.selectedDish.restaurant_name}
                                recommended={this.state.selectedDish.recommended}
                                dish_images={this.state.selectedDish.images}
                                reviews={this.state.selectedDish.reviews}
                                average_rating={this.state.selectedDish.average_rating}
                                onDishCardPressed={() => props.onDishCardPressed(this.state.selectedDish)}
                                onRecommendButtonPressed={() => this.props.onRecommendButtonPressed(this.state.selectedDish)}
                                onReviewButtonPressed={() => this.props.onReviewButtonPressed(this.state.selectedDish)}
                            />
                        }
                    </View>
                </ScrollView>
            </View>
        );
    };
}

const styles = StyleSheet.create({

    dishCard: {
    },
    dishListContainer: {
        marginLeft: 10
    },
    dishName: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 13,
        color: '#212121',
        padding: 8
    },
    dishNameContainer: {
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 2,
        marginLeft: 18,
    },
    selectedDishNameContainer: {
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFA000',
        elevation: 2,
        marginLeft: 18,
    },
    selectedDishName: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 15,
        color: '#fff',
        padding: 8
    }
});