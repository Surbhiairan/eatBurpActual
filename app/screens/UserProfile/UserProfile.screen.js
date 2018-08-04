import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { fetchUser } from '../../actions/user.action';
import { fetchReviews } from '../../actions/reviews.action';
import { fetchRecommendations } from '../../actions/reviews.action'
import UserInfo from '../../components/UserInfo/UserInfo';
import Reviews from '../../components/Reviews/Reviews';
import Recommendations from '../../components/Recommendations/Recommendations';

import LikeFilledIcon from '../../components/SvgIcons/likeFilled.icon';
import LikeIcon from '../../components/SvgIcons/like.icon';
import PenIcon from '../../components/SvgIcons/pen.icon';

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buttonPressed: "reviews",
      recommendations: true,
      reviews: false
    }
  }

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchReviews();
    this.props.fetchRecommendations();
  }

  renderReview = (review) => {
    console.log("review items---------", review)
    return (
      <Reviews
        review={review.item}
      />
    );
  }
  renderRecommendation = (recommendation) => {
    return (
      <Recommendations
        recommendation={recommendation.item}
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
      <View style={{ flex: 1}}>
        <ScrollView>
          {this.props.userLoading ?
            <ActivityIndicator /> :
            <View style={{  }}>
              <UserInfo
                first_name={this.props.userDetails.first_name}
                last_name={this.props.userDetails.last_name}
                profile_image={this.props.userDetails.profile_image}
                no_of_reviews={this.props.userDetails.no_of_reviews}
                no_of_recommendations={this.props.userDetails.no_of_recommendations}
                foodie_level={this.props.userDetails.foodie_level}
              />
              <View elevation={3} style={{ borderRadius: 5, padding: 5, margin: 5, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row',paddingTop:10}}>
                <View style={{flex:1, alignItems:'center'}}>
                  <TouchableOpacity
                    onPress={() => this.setState({
                      buttonPressed: "recommendations",
                      recommendations: true,
                      reviews: false
                    })} >
                    <View style={style.selectedTab}>
                      {this.state.recommendations ? 
                      <View style={{flexDirection: 'row'}}>
                      <LikeFilledIcon fill={'#ffa000'} height={26} width={26} />
                      <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 15, color: '#ffa000'}}>Recommendations</Text>
                      </View> 
                        : 
                      <View style={{flexDirection: 'row'}}>
                      <LikeIcon fill={'#757575'} height={26} width={26} />
                      <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 15, color: '#757575'}}>Recommendations</Text>
                      </View> 
                      }
                    </View>
                  </TouchableOpacity></View>

                  <View style={{flex:1,alignItems:'center'}}>
                  <TouchableOpacity
                    onPress={() => this.setState({
                      buttonPressed: "reviews",
                      recommendations: false,
                      reviews: true
                    })} >
                    <View style={style.selectedTab}>
                      {this.state.reviews ? 
                      <View style={{flexDirection: 'row'}}>
                      <PenIcon fill={'#ffa000'} height={26} width={26} />
                      <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 15, color: '#ffa000'}}>Reviews</Text>
                      </View>  
                        : 
                      <View style={{flexDirection: 'row'}}>
                      <PenIcon fill={'#757575'} height={26} width={26} />
                      <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 15, color: '#757575'}}>Reviews</Text>
                      </View>}
                    </View>
                  </TouchableOpacity></View>

                </View>

                <View>
                  {(this.state.reviews) && (this.props.reviewsLoading ? <ActivityIndicator /> :
                    <FlatList
                      data={this.props.reviews}
                      renderItem={this.renderReview}
                      keyExtractor={(item, index) => index.toString()}
                    />)}

                  {(this.state.recommendations) && (this.props.recommendationsLoading ? <ActivityIndicator /> :
                      <FlatList
                        numColumns={3}
                        style={style.recommendationList}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.props.recommendations}
                        renderItem={this.renderRecommendation} />
                  )
                  }
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
    padding: 5,
    //backgroundColor: '#808000',
    borderRadius: 10,
    // height: 40,
    // width: 60
  },
  tab: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 7,
    // width: 60,
    // height: 40
  },
  recommendationList: {

  }
})

const mapStateToProps = state => {
  return {
    userDetails: state.user.userDetails,
    userLoading: state.user.userLoading,
    userError: state.user.userError,
    reviews: state.reviews.reviews,
    reviewsError: state.reviews.reviewsError,
    reviewsLoading: state.reviews.reviewsLoading,
    recommendations: state.reviews.recommendations,
    recommendationsError: state.reviews.recommendationsError,
    recommendationsLoading: state.reviews.recommendationsLoading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchReviews: () => dispatch(fetchReviews()),
    fetchRecommendations: () => dispatch(fetchRecommendations())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);