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

//import MenuItem from '../MenuItem/MenuItem';
import DishCard from '../DishCard/DishCard';

const DEFAULT_IMAGE = require('../../data/images/sandwich.jpg');


export default class RestaurantMenu extends Component {

constructor(props) {
    super(props);
    this.state = {
        categorizedMenu: [],
        selectedDishCategory: [],
        title: props.title,
        expanded: true,
        animation: new Animated.Value()
    };  
}

  renderRestaurantDishes = (category) => {
    console.log(category)
    let CustomImage = (
      <View>
        <Image
          source={DEFAULT_IMAGE}
          style={styles.imageStyle}
        />
      </View>
    )
    if(category.item.images.length> 0) {
      CustomImage = (
        <View >
          <Image
            source={{ uri: category.item.images[0] }}
            style={styles.imageStyle}
          />
        </View>
      )
    }
    return (
      <View>
        <TouchableHighlight onPress={() => this.props.onDishPressed(category.item)}>
        <View style={{marginLeft: 6,marginTop: 4,}}>
          {CustomImage}
          <View style={styles.dishNameStyle}>
            <Text style={styles.dishNameText}> 
              {category.item.dish_name}
            </Text>
          </View>
          <Text style={styles.priceText}>
           Rs. {category.item.price}
          </Text>
        </View>
        </TouchableHighlight>
      </View>
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
      toValue: finalValue,
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
          style={styles.list}
          data={this.props.menu}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderRestaurantDishes}
           />
      </View>
    </Animated.View>
  );
}
}

var styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
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
    //padding: 10,
    paddingTop: 0
  },
  item: {
    backgroundColor: 'red',
    margin: 3,
    width: 100
  },
  imageStyle: {
    width: 96, 
    height: 96
  },
  dishNameStyle: { 
    alignSelf: 'flex-start', 
    width: 100,
    
  },
  dishNameText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    color: '#463D3D'
  },
  priceText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#463D3D'
  }
});