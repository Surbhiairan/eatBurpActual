import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";

import {authLogout} from '../../actions/auth.action';

class SideDrawer extends Component {

  navigateToUserProfile = () => {
    this.props.navigator.push({
      screen: "UserProfileScreen",
      title: "User Profile"
    });
    this.props.navigator.toggleDrawer();
  }

  navigateToAddReview = () => {
    this.props.navigator.push({
      screen: "ReviewDishScreen",
      title: "Write a Review"
    });
    this.props.navigator.toggleDrawer();
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width * 0.8 }
        ]}
      >
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateToUserProfile}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-person" : "ios-person"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>User Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateToAddReview}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-book" : "ios-book"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Write a Review</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "white",
    flex: 1
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee"
  },
  drawerItemIcon: {
    marginRight: 10
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout())
  }
}

export default connect(null, mapDispatchToProps)(SideDrawer);
