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
    <View style= {styles.container}>
      <Icon style = {styles.searchIcon} name="md-search" size={21.5} color="#757575" />
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
    //backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: '#BDBDBD',
    // borderBottomColor: '#BDBDBD',
    // borderWidth: 1,
    /* borderColor: '#BDBDBD',
    borderWidth: 1,
    alignItems: 'center',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15, */
  },
  searchIcon:{
    paddingLeft: '5%',
  },
  textBox: {
    flex:1,
    //backgroundColor:'blue',    
    //width: 240,
    height: 37, 
    alignItems: 'center',
    fontSize: 15,
    textAlign: 'auto',
    fontFamily: 'OpenSans-Regular',
    color: '#757575',
    //marginLeft: 9.5,
  },
});

export default searchBar;