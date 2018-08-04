import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import DishCard from '../DishCard/DishCard';

class ButtonComponent extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.dish);
    };

    render() {
        const { selected, dish, id } = this.props;
        //const textColor = selected === id ? "red" : "black";
        if(selected === id)
        return(
            <TouchableOpacity onPress={this._onPress}>
                <View style={{backgroundColor:'#ffa000',borderRadius: 16, paddingLeft:10, paddingRight:10,paddingTop:8, paddingBottom:8, marginRight:10}}>
                    <Text style={{ color: '#fff', fontFamily:'OpenSans-SemiBold', fontSize:15 }}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
        else return(
        <TouchableOpacity onPress={this._onPress}>
        <View style={{backgroundColor:'#F9F9F9',borderRadius:16 ,paddingLeft:10, paddingRight:10,paddingTop:8, paddingBottom:8, marginRight:10}}>
            <Text style={{ color: '#212121', fontFamily:'OpenSans-Bold', fontSize:13 }}>
                {this.props.title}
            </Text>
        </View>
    </TouchableOpacity>
    )
    }
}

export default class DishList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDish: props.dishes[0],
            selected: props.dishes[0]._id,
        };
    }

    //state = {selected: (new Map(): Map<string, boolean>)};

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps, "nextProps");
    //     this.setState({ selectedDish: nextProps.dishes[0] })

    // }

    renderDishNames = (dish) => {
    
        return (
            <ButtonComponent
                id={dish.item._id}
                dish={dish.item}
                onPressItem={this._onPressItem}
                selected={this.state.selected}
                title={dish.item.dish_name}
            />
           
        );
    };

    _onPressItem = (dish) => {
        console.log('dish =========>', dish);
        this.setState({ selected: dish._id, selectedDish: dish });
    };

    render() {

        console.log(this.props.dishes[0], "props in render");

        return (
            <View style={{ flex: 1 }}>
            <View style={{marginTop:5}}>
                <FlatList 
                    style={styles.dishListContainer}
                    data={this.props.dishes}
                    horizontal={true}
                    renderItem={this.renderDishNames}
                    showsHorizontalScrollIndicator={false}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
            />
            </View>
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
                                locality={this.state.selectedDish.locality}
                                onRecommendButtonPressed={() => this.props.onRecommendButtonPressed(this.state.selectedDish)}
                                onReviewButtonPressed={() => this.props.onReviewButtonPressed(this.state.selectedDish)}
                                onRestaurantPressed={() => this.props.onRestaurantPressed(this.state.selectedDish.restaurant_id[0])}
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
        marginLeft: 10,
        //marginTop:10,
        //marginBottom:10
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