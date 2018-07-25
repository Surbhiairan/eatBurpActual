import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    FlatList
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
          ratings: false
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
    />
    )
  }

  render() {
    return (
      <View> 
        {/* <HeadingText> 
          {this.props.userDetails.first_name}
        </HeadingText> */}
        {this.props.userLoading ?
        <Text>Loading</Text>:
        <View>
        <UserInfo
         first_name={this.props.userDetails.first_name}
         last_name={this.props.userDetails.last_name}
         profile_image={this.props.userDetails.profile_image}
         no_of_reviews={this.props.userDetails.no_of_reviews}
         no_of_recommendations={this.props.userDetails.no_of_recommendations}
         foodie_level={this.props.userDetails.foodie_level}
        />

        <View style={{flexDirection: 'row', margin: 10}}>
        <TouchableOpacity 
          onPress={() => this.setState({buttonPressed:"recommendations",
          recommendations: true,
          reviews: false,
          ratings: false })} 
          style={{margin: 10}}>
          <View elevation = {5} style={style.selectedTab}>
            {this.state.recommendations ? <LikeFilledIcon fill={'#ffa000'} height={26} width={26}/>
            : <LikeIcon fill={'#ffa000'} height={26} width={26}/>}
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => this.setState({buttonPressed:"reviews",
          recommendations: false,
          reviews: true,
          ratings: false })} 
          style={{margin: 10}}>
          <View elevation = {5} style={style.selectedTab}>
           {this.state.reviews ? <PenIcon fill={'#ffa000'} height={26} width={26}/>
            : <PenIcon fill={'#ffa000'} height={26} width={26}/>}
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => this.setState({buttonPressed:"ratings",
          recommendations: false,
          reviews: false,
          ratings: true })} 
          style={{margin: 10}}>
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
          data = {this.props.userDetails.reviews}
          renderItem = {this.renderReview}/>}
        {(this.state.ratings) && 
          <FlatList 
          data = {this.props.userDetails.ratings}
          renderItem = {this.renderRating}/>}
        {(this.state.recommendations) && 
          <FlatList 
          data = {this.props.userDetails.recommendations}
          renderItem = {this.renderRecommendation}/>}

        </View>
        </View>}
      </View>
    )
  }  
}

const style = StyleSheet.create({
  selectedTab: {
    alignItems: 'center',
    justifyContent: 'center',
    padding:5,
    backgroundColor: '#fff', 
    borderRadius: 7,
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