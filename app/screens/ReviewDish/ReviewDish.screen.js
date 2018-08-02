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
import { fetchDishMappings } from '../../actions/dish.action';
import { Rating, AirbnbRating } from 'react-native-ratings';

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
        selectedRestaurantName: this.props.selectedDish.restaurant_name,
        selectedRestaurantId: this.props.selectedDish.restaurant_id,
        selectedDishName: this.props.selectedDish.dish_name,
        selectedDishId: this.props.selectedDish._id,
        rating: '',
      };
  }

  componentDidMount() {
    this.props.fetchRestaurants();
  }

  renderImage(image) {
    return <Image style={{width: 150, height: 150, resizeMode: 'contain'}} source={image} />
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
    formData.append('mapping_id',this.state.selectedDishId);
    formData.append('restaurant_id',this.state.selectedRestaurantId);
    formData.append('review', this.state.review);
    formData.append('rating', this.state.rating);
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
    this.setState({ selectedRestaurantName: text })
  }

  handleDish = (text) => {
    if(this.props.dishMappings){
    var searchedDishes = this.props.dishMappings.filter(function(dish) {
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
    this.props.fetchDishMappings(restaurant._id);     
    
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

  ratingCompleted = (rating) => {
    this.setState({rating: rating});
  }

  render(){      

    return(
    <View style={{flex:1}}>
      <ScrollView>
      <View style={[styles.textBoxView]}>
      <TextInput style={[styles.textBox]}
        placeholder = "Restaurant"
        underlineColorAndroid='transparent'
        value = {this.state.selectedRestaurantName}
        onChangeText = {this.handleRestaurant}/></View>

        {this.props.restaurantsLoading ? <Text>Loading...</Text>
          :
        <FlatList
        data = {this.state.searchedRestaurants}
        renderItem = {this.renderRestaurant}
        />
        }
      <View style={[styles.textBoxView]}>
        <TextInput style = {[styles.textBox]}
        placeholder = "Dish"
        underlineColorAndroid='transparent'
        value = {this.state.selectedDishName}
        onChangeText = {this.handleDish}/></View>

        {this.props.dishMappingsLoading ? <Text>Loading...</Text>
             :
        <FlatList
        data={this.state.searchedDishes}
        renderItem={this.renderDish}
        />
        }

        <View style={{marginLeft:10,
        marginRight:10,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        borderRadius:5}}>
        <TextInput style = {[styles.textBox]}
        multiline = {true}
        numberOfLines = {4}
        placeholder = "Review"
        underlineColorAndroid='transparent'
        value = { this.state.review}
        autoCapitalize = "none"
        onChangeText = {this.handleReview}/></View>

        <View style={[styles.ratingContainer]}>
        <AirbnbRating 
          ratingColor={"#ffa000"} 
          count={5}
          reviews={["Bad","Okayish","Good","Very Good","Recommend"]}
          defaultRating={0}
          size={30}
          onFinishRating={this.ratingCompleted}
        /></View>

      <View style={{marginTop: 10,flexWrap:'wrap', flexDirection: 'row'}}>
      
        {this.state.image ? this.renderAsset(this.state.image) : null}
        {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
      </View>
      <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
        <Text style={styles.text}>Add Images</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.submitButton}
        onPress = {
           () => this.addReview()
        }>
        <Text style = {styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      
      </ScrollView>
    </View>
  );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addReview: (formData) => dispatch(addReview(formData)),
    fetchDishMappings: (restaurant_id) => dispatch(fetchDishMappings(restaurant_id)),
    fetchRestaurants: () => dispatch(fetchRestaurants()),
  };
};

const mapStateToProps = (state) => ({
  dishMappings: state.dish.dishMappings,
  dishMappingsLoading: state.dish.dishMappingsLoading,
  dishMappingsError: state.dish.dishMappingsError,
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
  },
  textBox:{
    textAlign:'left',
    fontSize: 15,
    textAlign: 'auto',
    fontFamily: 'OpenSans-Regular',
    color: '#757575',
  },
  textBoxView:{
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    borderBottomColor: '#BDBDBD',
    borderColor: 'transparent',
    borderWidth: 1,
  },
  ratingContainer:{
    marginLeft:10,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDish);