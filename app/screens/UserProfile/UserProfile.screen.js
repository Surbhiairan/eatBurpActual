import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView
} from "react-native";
import { connect } from "react-redux";
import { fetchUser } from '../../actions/user.action';
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import UserInfo from '../../components/UserInfo/UserInfo';
import Reviews from '../../components/Reviews/Reviews';
import Recommendations from '../../components/Recommendations/Recommendations';

import StarFilledIcon from '../../components/SvgIcons/starFilled.icon';
import LikeFilledIcon from '../../components/SvgIcons/likeFilled.icon';
import LikeIcon from '../../components/SvgIcons/like.icon';
import PenIcon from '../../components/SvgIcons/pen.icon';
import StarIcon from '../../components/SvgIcons/star.icon';

class UserProfile extends Component {

  constructor(props){
      super(props);
      this.state = {
          buttonPressed : "reviews",
          recommendations: true,
          reviews: false,
          ratings: false,
          userReviews:[
            {
              _id:1,
              user:{
                first_name: "Anjali",
                last_name: "Prajapati"
              },
              dish_name: "Poha Jalebi",
              restaurant_name: "Young Tarang",
              restaurant_location: "56 Dukan, Palasia",
              review: "jdhfjsd fdsklj jdfh jdflsda jdflfl jfsd jdfld jdlj. jkdhf jdhfl"
            },
            {
              _id:1,
              user:{
                first_name: "Anjali",
                last_name: "Prajapati"
              },
              dish_name: "Poha Jalebi",
              restaurant_name: "Young Tarang",
              restaurant_location: "56 Dukan, Palasia",
              review: "jdhfjsd fdsklj jdfh jdflsda jdflfl jfsd jdfld jdlj. jkdhf jdhfl"
            },
            {
              _id:2,
              user:{
                first_name: "Anjali",
                last_name: "Prajapati"
              },
              dish_name: "Poha Jalebi",
              restaurant_name: "Young Tarang",
              restaurant_location: "56 Dukan, Palasia",
              review: "jdhfjsd fdsklj jdfh jdflsda jdflfl jfsd jdfld jdlj. jkdhf jdhfl"
            },
            {
              _id:3,
              user:{
                first_name: "Anjali",
                last_name: "Prajapati"
              },
              dish_name: "Poha Jalebi",
              restaurant_name: "Young Tarang",
              restaurant_location: "56 Dukan, Palasia",
              review: "jdhfjsd fdsklj jdfh jdflsda jdflfl jfsd jdfld jdlj. jkdhf jdhfl"
            }
          ],
          userRecommendations:[
            {
              _id: 1,
              dish_name: "Jalebi",
              restaurant_name: "Mathurawala",

            },
            {
              _id: 2,
              dish_name: "Jalebi",
              restaurant_name: "Mathurawala",
              
            },
            {
              _id: 3,
              dish_name: "Jalebi",
              restaurant_name: "Mathurawala",
              
            },
            {
              _id: 4,
              dish_name: "Jalebi",
              restaurant_name: "Mathurawala",
              
            },
            {
              _id: 5,
              dish_name: "Jalebi",
              restaurant_name: "Mathurawala",
              
            }
          ]
      }
  }
  componentDidMount(){
    this.props.fetchUser();
  } 

  renderRating = (rating) => {

  }

  renderReview = (review) => {
    return(
    <Reviews
      review = {review.item}
    />
    );
  }
  renderRecommendation = (recommendation) => {
    return(
    <Recommendations
      recommendation = {recommendation.item}
      //onDishPressed={this.dishPressedHandler(recommendation.item)}  
    />
    )
  }

  dishPressedHandler = (item) => {
    this.props.navigator.push({
      screen: "DishDetailScreen",
      passProps: {
        selectedDish: item
      }
    })
  }

  render() {
    return (
      <View style = {{flex:1, backgroundColor: "#efefef"}}> 
      <ScrollView>
        {/* <HeadingText> 
          {this.props.userDetails.first_name}
        </HeadingText> */}
        {this.props.userLoading ?
        <Text>Loading</Text>:
        <View style = {{backgroundColor: "#ffa000"}}>
        <UserInfo
         first_name={this.props.userDetails.first_name}
         last_name={this.props.userDetails.last_name}
         profile_image={this.props.userDetails.profile_image}
         no_of_reviews={this.props.userDetails.no_of_reviews}
         no_of_recommendations={this.props.userDetails.no_of_recommendations}
         foodie_level={this.props.userDetails.foodie_level}
        />
        <View elevation={5} style={{borderRadius: 5, backgroundColor: '#000' }}>
        <View style={{flexDirection: 'row',backgroundColor: 'red', alignContent:'stretch'}}>
        <TouchableOpacity 
          onPress={() => this.setState({buttonPressed:"recommendations",
          recommendations: true,
          reviews: false,
          ratings: false })} >
          {/* style={{marginLeft: 20, marginRight: 20, backgroundColor: 'blue'}}> */}
          <View elevation = {5} style={style.selectedTab}>
            {this.state.recommendations ? <LikeFilledIcon fill={'#ffa000'} height={26} width={26}/>
            : <LikeIcon fill={'#ffa000'} height={26} width={26}/>}
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => this.setState({buttonPressed:"reviews",
          recommendations: false,
          reviews: true,
          ratings: false })} >
          {/* style={{marginLeft: 20, marginRight: 20}}> */}
          <View elevation = {5} style={style.selectedTab}>
           {this.state.reviews ? <PenIcon fill={'#ffa000'} height={26} width={26}/>
            : <PenIcon fill={'#ffa000'} height={26} width={26}/>}
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => this.setState({buttonPressed:"ratings",
          recommendations: false,
          reviews: false,
          ratings: true })} >
          {/* style={{marginLeft: 20, marginRight: 20}}> */}
          <View elevation = {5} style={style.selectedTab}>
          {this.state.ratings ? <StarFilledIcon fill={'#ffa000'} height={26} width={26}/>
          : <StarIcon fill={'#ffa000'} height={26} width={26}/>}
          </View>
        </TouchableOpacity>
        </View>

        {/* <View style={{ flexDirection: 'row' }}>
        <Button
         title="Reviews"
         onPress = {() => this.setState({buttonPressed:"reviews"})}
        />
        <Button
         title = "Recommendations"
         onPress = {() => this.setState({buttonPressed:"recommendations"})}
        />
        </View> */}
        
        <View>
        {(this.state.reviews) && 
          <FlatList 
          data = {this.state.userReviews}
          //data = {this.props.userDetails.reviews}
          renderItem = {this.renderReview}/>}
        {(this.state.ratings) && 
          <FlatList 
          data = {this.state.userRatings}
          //data = {this.props.userDetails.ratings}
          renderItem = {this.renderRating}/>}
        {(this.state.recommendations) && 
        <View elevation={5} style={{borderRadius: 10, padding: 10, margin: 10, alignItems: 'center'}}>
          <FlatList 
          numColumns = {3}
          style= {style.recommendationList}
          keyExtractor={(item, index) => index}
          //data = {this.props.userDetails.recommendations}
          data = {this.state.userRecommendations}
          renderItem = {this.renderRecommendation}/></View>}

        </View>
        </View>
        </View>}
        </ScrollView>
      </View>
    )
  }  
}

const style = StyleSheet.create({
  selectedTab: {
    alignItems: 'center',
    justifyContent: 'center',
    padding:5,
    backgroundColor: '#808000', 
    borderRadius: 10,
    height: 40,
    width: 60
  },
  tab:{
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 7,
    width: 60,
    height: 40   
  },
  recommendationList:{
    // flexDirection: 'column',
    // flexWrap: 'wrap'
  }
})

const mapStateToProps = state => {
  return {
    userDetails: state.user.userDetails,
    userLoading: state.user.userLoading,
    userError: state.user.userError
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);