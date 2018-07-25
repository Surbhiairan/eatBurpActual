import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import { fetchMenu } from '../../actions/menu.action';
import RestaurantInfo from '../../components/RestaurantInfo/RestaurantInfo';
import RestaurantMenu from '../../components/RestaurantMenu/RestaurantMenu';
const DEFAULT_IMAGE = require('../../data/images/sandwich.jpg');


class RestaurantDetail extends Component {

  componentDidMount() {
        //console.log("selected restaurant",this.props.selectedRestaurant._id);
      this.props.dispatch(fetchMenu('5b457350a87d230004c20ae5'));        
  }

  static navigatorStyle = {
    navBarHidden: true
  };

  renderRestaurantMenuCategory = (item) => (
    <RestaurantMenu 
      title={item.item.category}
      menu={item.item.dishes}
      onDishPressed={this.dishPressedHandler}  
      >
      
    </RestaurantMenu >
  )

  dishPressedHandler = (item) => {
    this.props.navigator.push({
      screen: "DishDetailScreen",
      passProps: {
        selectedDish: item
      }
    })
  }

  render() {
    console.log("props---------", this.props)
    let menuList = <FlatList
      data={this.props.menu}
      keyExtractor={(item, index) => index}
      renderItem={this.renderRestaurantMenuCategory} />
    if(this.props.isLoading) (
      menuList = <ActivityIndicator/>
    )
    return(
      <View>
        <ScrollView>
        <View elevation={5} style={styles.container}>
          <Text style={styles.restaurantNameView}>
            Tinku's
          </Text>
          <Text style={styles.locationView}>
            City Center, High Court
          </Text>
          <View>
            <ImageBackground
              //resizeMode="contain"
              imageStyle={{ borderRadius: 10 }}
              source={DEFAULT_IMAGE}
              style={styles.imageBackgroundStyle} >
              <View elevation={10} style={styles.textOnImageContainer}>
                <Text style={styles.textOnImage}>4.8</Text>
              </View>
            </ImageBackground>
          </View>
          <Text style={styles.cuisineView}>
            Italian, Mexican
          </Text>
          <Text style={styles.addressText}>
            221-B Baker Street
          </Text>
          <Text style={styles.famousDishesHeading}>
            Famous Dishes
          </Text>
          <Text style={styles.famousDishesText}>
            Italian Pizza, Creme Brulee
          </Text>
          <Text style={styles.timingText}>
            Open from 11 AM to 11 PM
          </Text>
          <Text style={styles.averageCostText}>
            Average Cost for Two Rs 220
          </Text>
        </View>
          <View elevation={5} style={styles.menuContainer}>
            {menuList}
          </View>
        </ScrollView>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 11,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    height: 474
  },
  menuContainer: {
    margin: 11,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  restaurantNameView: {
    marginTop: 5,
    fontFamily: 'OpenSans-Regular',
    fontSize: 28,
    color: '#212121',
    textAlign: 'center'
  },
  locationView: {
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 15,
    color: '#757575'
  },
  imageBackgroundStyle: {
    height:247.5,
    width: 353,
    marginTop: 9,
  },
  textOnImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 51,
    borderRadius: 10,
    backgroundColor: '#FFA000',
   // padding: 2,
    marginLeft: 10,
    marginTop: 5,
    height:36
  },
  textOnImage: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'OpenSans-Bold'
  },
  cuisineView: {
    marginLeft: 10,
    marginTop: 11,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    color: '#212121',
    //textAlign: 'left'
  },
  addressText: {
    marginTop: 4,
    marginLeft: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#212121',
  },
  famousDishesHeading: {
    marginLeft: 10,
    marginTop: 12,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    color: '#212121'
  },
  famousDishesText: {
    marginLeft: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#212121'
  },
  timingText: {
    marginLeft: 10,
    marginTop: 12,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#212121'
  },
  averageCostText: {
    marginLeft: 10,
    marginTop: 4,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#212121'
  }

})

const mapStateToProps = (state) => ({
    menu: state.menu.menu,
    menuLoading: state.menu.menuLoading,
    menuError: state.menu.menuError,
    isLoading: state.ui.isLoading
})

export default connect(mapStateToProps)(RestaurantDetail) ;