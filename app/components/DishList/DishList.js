import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DishCard from '../DishCard/DishCard';

export default class DishList extends Component {
    
    constructor(props) {
        super(props);
        console.log(props,"propssssssssssssssssssss");
        this.state = {
            selectedDish: this.props.dishes[0]
        };
    }

    componentDidMount(){

        this.setState({selectedDish: this.props.dishes[0]})
        console.log("in component did mount",this.state.selectedDish);
        console.log(this.props.dishes[0],"props in componentDidMount");
        
        // if((this.props.dishes && this.props.dishes[0])!=null)
        // {   console.log(this.props.dishes[0], "this.props.dishes[0]");
        //     const {selectedDish} = this.props.dishes[0];
        // this.setState({selectedDish});}
    }
    renderDishNames = (dish) => { 
        console.log("dish", dish); 
        console.log(this.props.dishes[0],"props in renderDishNames");
        console.log(this.state.selectedDish,"this.state.selectedDish");
        if(this.state.selectedDish)
        return (
            <View>
            <Text  style= {{ backgroundColor: this.state.selectedDish === dish.item ? 'red' : 'grey' }}      
              onPress={() => this._handlePressDishName(dish)} >
            {dish.item.dish_name}</Text>
          </View>
        );
      };

    _handlePressDishName = (dish) => {
      this.setState({selectedDish: dish.item});
    }

render(){

    console.log(this.props.dishes[0],"props in render");
    
    return (
    <View>

    <FlatList
        style = { styles.dishListContainer }
        data = { this.props.dishes }
        horizontal = {true}
        renderItem={this.renderDishNames} 
        showsHorizontalScrollIndicator={false}
        
    />
    <View>
        {(this.state.selectedDish) && 
          <DishCard 
            dish_name = {this.state.selectedDish.dish_name}
            restaurant_name = {this.state.selectedDish.restaurant_name}
            recommended = {this.state.selectedDish.recommended}
            dish_images = {this.state.selectedDish.dish_images}
            reviews = {this.state.selectedDish.reviews}
            average_rating = {this.state.selectedDish.average_rating}               
            onDishCardPressed={() => props.onDishCardPressed(this.state.selectedDish)}
            onRecommendButtonPressed={() => props.onRecommendButtonPressed(this.state.selectedDish)}
            onReviewButtonPressed={() => props.onReviewButtonPressed(this.state.selectedDish)}
          />
        }
      </View>
    </View>
    );
};
}

const styles = StyleSheet.create({

    dishCard: {
    },
    dishName: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 13,
        color: '#212121',
        padding:8
    },
    dishNameContainer:{
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 2,
        marginLeft:18,
    },
    selectedDishNameContainer:{
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFA000',
        elevation: 2,
        marginLeft:18,
    },
    selectedDishName:{
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 15,
        color: '#fff',
        padding:8
    }
});