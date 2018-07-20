import React from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const searchBar = (props) => {
  return(
    <View style={[styles.container, props.style]}>
      <Icon style = {styles.searchIcon} name="md-search" size={25} color="#757575" />
      <TextInput style={[styles.textBox]}
      autoFocus={props.autoFocus}
      onFocus={props.onSearchBarPressed}
      onChangeText={props.onChangeText}
      onSubmitEditing={props.onSubmitEditing}
      values = {props.value}
      placeholder='Search'
      underlineColorAndroid='transparent'           //to remove underline in textinput
      />
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#BDBDBD',
    borderWidth: 1,
    alignItems: 'center',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
  },
  searchIcon:{
    paddingLeft: 22
  },
  textBox: {
    width: 240,
    height: 37, 
    alignItems: 'center',
    
    fontSize: 15,
    textAlign: 'auto',
    fontFamily: 'OpenSans-Regular',
    color: '#757575',
    paddingLeft: 9,
    paddingTop: 8,
   // backgroundColor: '#ffa000'
  },
});

export default searchBar;