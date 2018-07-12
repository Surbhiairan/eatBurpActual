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

class UserProfile extends Component {

  constructor(props){
      super(props);
      this.state = {
          buttonPressed : "reviews",
      }
  }
  componentDidMount(){
    this.props.fetchUser();
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
        <HeadingText> 
          {this.props.userDetails.first_name}
        </HeadingText>
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
        <View style={{ flexDirection: 'row' }}>
        <Button
         title="Reviews"
         onPress = {() => this.setState({buttonPressed:"reviews"})}
        />
        <Button
         title = "Recommendations"
         onPress = {() => this.setState({buttonPressed:"recommendations"})}
        />
        </View>
        <View>
        {(this.state.buttonPressed === "reviews") ? 
        <FlatList 
          data = {this.props.userDetails.reviews}
          renderItem = {this.renderReview}/>
        :<FlatList 
          data = {this.props.userDetails.recommendations}
          renderItem = {this.renderRecommendation}/>
        }
        </View>
        </View>}
      </View>
    )
  }  
}

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