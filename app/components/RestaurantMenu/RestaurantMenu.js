import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet, 
  Image, 
  TouchableHighlight, 
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import MenuItem from '../MenuItem/MenuItem';
import DishCard from '../DishCard/DishCard';

export default class RestaurantMenu extends Component {

constructor(props) {
    super(props);
    this.state = {
        categorizedMenu: [],
        selectedDishCategory: [],
        title: props.title,
        expanded: true,
        animation: new Animated.Value(0)
    };  
}

renderMenuCategory = (menu) => {
  return (
    <View>
      <Text         
        onPress={() => this._handlePressDishCategory(menu)} >
      {menu.item.category}</Text>
    </View>
  );
};

_handlePressDishCategory = (menu) => {
  this.setState({selectedDishCategory: menu.item.dishes});
}

  renderRestaurantDishes = (category) => {
  return (
    <Text>Menu</Text>
    // <DishCard  
    //   dish_name = {category.item.dish_name}
    //   restaurant_name = {category.item.restaurant_name}
    //   recommended = {category.item.recommended}
    //   dish_images = {category.item.dish_images}
    //   average_rating = {category.item.average_rating}               
    //   onDishCardPressed={() => props.onDishCardPressed(category)}
    //   onRecommendButtonPressed={() => props.onRecommendButtonPressed(category)}
    // />
  )
};

toggle() {
  let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
    finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

  this.setState({
    expanded: !this.state.expanded  //Step 2
  });

  this.state.animation.setValue(initialValue);  //Step 3
  Animated.spring(     //Step 4
    this.state.animation,
    {
      toValue: finalValue
    }
  ).start();  //Step 5
}
  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  }

render(){
  let icon = <Icon name={'ios-arrow-down'} size={20}/>
  if(this.state.expanded) (
    icon = <Icon name={'ios-arrow-up'} size={20}/>
  )
  /* if(this.props.menu == null)
    return(<Text>No menu</Text>)
  else */
  return(
    <Animated.View style={[styles.container, { height: this.state.animation }]} >
      <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
        <Text style={styles.title}>{this.state.title}</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={this.toggle.bind(this)}
          underlayColor="#f1f1f1">
          {icon}
        </TouchableHighlight>
      </View>

      <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
        <FlatList
          data={this.props.menu}
          keyExtractor={(item, index) => index}
          renderItem={this.renderRestaurantDishes} />
      </View>
    </Animated.View>
  );
}
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold'
  },
  button: {
  },
  buttonImage: {
    width: 30,
    height: 25
  },
  body: {
    padding: 10,
    paddingTop: 0
  }
});