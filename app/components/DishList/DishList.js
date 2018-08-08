import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import DishCard from '../DishCard/DishCard';

class ButtonComponent extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.dish);
    };

    render() {
        const { selected, dish, id } = this.props;
        if(selected === id)
        return(
            <TouchableOpacity onPress={this._onPress}>
                <View style={styles.selectedDishNameContainer}>
                    <Text style={{ color: '#fff', fontFamily:'OpenSans-SemiBold', fontSize:15 }}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
        else return(
        <TouchableOpacity onPress={this._onPress}>
        <View style={styles.dishNameContainer}>
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
        this.setState({ selected: dish._id, selectedDish: dish });
    };

    render() {
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
                                onRestaurantPressed={() => this.props.onRestaurantPressed(this.state.selectedDish)}
                            />
                        }
                    </View>
                </ScrollView>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    dishListContainer: {
        marginLeft: '5%',
    },
    dishNameContainer: {
        backgroundColor:'#F9F9F9',
        borderRadius:16,
        paddingLeft:10, 
        paddingRight:10,
        paddingTop:8, 
        paddingBottom:8, 
        marginRight:10
    },
    selectedDishNameContainer: {
        backgroundColor:'#ffa000',
        borderRadius: 16, 
        paddingLeft:10, 
        paddingRight:10,
        paddingTop:8, 
        paddingBottom:8, 
        marginRight:10,
    }
});