import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  NativeModules,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import { addReview } from '../../actions/reviews.action';
import { fetchRestaurants, fetchRestaurantsSuccess, fetchRestaurantsFailure} from '../../actions/restaurant.action';
import { fetchMenu } from '../../actions/menu.action';

var ImagePicker = NativeModules.ImageCropPicker;

class ReviewDish extends Component {

  constructor(props){
      super(props);
      this.state = {
        image: null,
        images: null,
        review: '',   
        searchedRestaurants: [],
        searchedDishes: [],     
        selectedRestaurantName: '',
        selectedRestaurantId: '',
        selectedDishName: '',
        selectedDishId: ''
      };
  }

  componentDidMount() {
    this.props.fetchRestaurants();
  }

  renderImage(image) {
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      //includeBase64: true,
      waitAnimationEnd: false,
      includeExif: true,
    }).then(images => {
      this.setState({
        image: null,
        images: images.map(i => {
          console.log('received image', i);
          return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
        })
      });
    }).catch(e => alert(e));
  }

  addReview() {
    let formData = new FormData();
    imageDetails = this.state.images;
    var photo = [];
    var i=0;
    var item;
    for(i=0; i<imageDetails.length; i++){
      photo[i] = {
        mime : imageDetails[i].mime,
        name : 'test',
        uri: imageDetails[i].uri,
      }
    }

    photo.forEach((photo) => {
      formData.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg', // or photo.type
        name: photo.name
      });
    });
    formData.append('dish_rest_mapping_id',this.props.selectedDish._id);
    formData.append('restaurant_id',this.props.selectedDish.restaurant_id);
    formData.append('review', this.state.review);
    this.props.addReview(formData);
  }

  handleReview = (text)=> {
    this.setState({ review: text })
  }

  handleRestaurant = (text) => {
    console.log("this.props.restaurants=============",this.props.restaurants);
    var searchedRestaurants = this.props.restaurants.filter(function(restaurant) {
        return restaurant.restaurant_name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
    this.setState({searchedRestaurants: searchedRestaurants});
    this.setState({ restoName: text })
  }

  handleDish = (text) => {
    if(this.props.menu){
    var searchedDishes = this.props.menu.filter(function(dish) {
        //console.log('foooooooo************************dddddddddddd',food);
        if(dish.dish_name)
        return dish.dish_name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
    this.setState({ searchedDishes: searchedDishes});
    this.setState({ selectedDishName: text })
    }
  }

  _handlePressRestaurant = (restaurant) => {
    this.setState ( { selectedRestaurantName: restaurant.restaurant_name});
    this.setState ( { selectedRestaurantId: restaurant._id});      
    this.setState ( { searchedRestaurants: []});
    this.props.fetchMenu(restaurant._id);     
    
    //console.log("in handle press restaurant", this.state.restoName);
  }

  _handlePressFood = (dish) => {
    this.setState ( { selectedDishName: dish.dish_name});
    this.setState ( { selectedDishId: dish._id })        
    this.setState ( { searchedDishes: []});
    //console.log("in handle press food item", this.state.itemName);       
  }

  renderRestaurant = (restaurant) => {
    return (
      <View           
      style= {styles.listItem}>
        <Text 
          style={styles.listItemText}
          onPress={() => this._handlePressRestaurant(restaurant.item)}
        >
        {restaurant.item.restaurant_name}</Text>
      </View>
    );
  };

  renderDish = (dish) => {
      return (
        <View           
        style= {styles.listItem}>
          <Text 
            style={styles.listItemText}
            onPress={() => this._handlePressFood(dish.item)}
          >
          {dish.item.dish_name}</Text>
        </View>
      );
  };

  render(){      
    return(
    <View>

      <TextInput
        underlineColorAndroid = "transparent"
        placeholder = "Restaurant"
        onChangeText = {this.handleRestaurant}/>
        {this.props.restaurantsLoading ? <Text>Loading...</Text>
          :
        <FlatList
        data = {this.state.searchedRestaurants}
        renderItem = {this.renderRestaurant}
        />
        // <ListView
        // dataSource={ds.cloneWithRows(this.state.searchedRestaurants)}
        // renderRow={this.renderRestaurant} 
        // enableEmptySections = {true}/>
        }

        <TextInput
        underlineColorAndroid = "transparent"
        placeholder = "Dish"
        onChangeText = {this.handleDish}/>
        {this.props.menuLoading ? <Text>Loading...</Text>
             :
        <FlatList
        data={this.state.searchedDishes}
        renderItem={this.renderDish}
        />
        }

        <TextInput style = {styles.input}
        underlineColorAndroid = "transparent"
        placeholder = "Review"
        value = { this.state.review}
        placeholderTextColor = "#9a73ef"
        autoCapitalize = "none"
        onChangeText = {this.handleReview}/>

      <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
        <Text style={styles.text}>Add Images</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.submitButton}
        onPress = {
           () => this.addReview()
        }>
        <Text style = {styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      
      <ScrollView>
        {this.state.image ? this.renderAsset(this.state.image) : null}
        {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
      </ScrollView>
    </View>
  );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addReview: (formData) => dispatch(addReview(formData)),
    fetchMenu: (restaurant_id) => dispatch(fetchMenu(restaurant_id)),
    fetchRestaurants: () => dispatch(fetchRestaurants()),
  };
};

const mapStateToProps = (state) => ({
  menu: state.menu.menu,
  menuLoading: state.menu.menuLoading,
  menuError: state.menu.menuError,
  isLoading: state.ui.isLoading,
  restaurants: state.restaurant.restaurants,
  restaurantsLoading: state.restaurant.restaurantsLoading,
  restaurantsError: state.restaurant.restaurantsError,
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#ffa000',
    borderRadius: 12,
    margin: 18,
    height: 35,
    alignItems: 'center',
    justifyContent : 'center'
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontFamily:'OpenSans-Regular',
    textAlign: 'center'
  },
  submitButton: {
    backgroundColor: '#ffa000',
    borderRadius: 12,
    margin: 18,
    height: 50,
    alignItems: 'center',
    justifyContent : 'center'
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 19,
    fontFamily:'OpenSans-Regular',
    textAlign: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDish);