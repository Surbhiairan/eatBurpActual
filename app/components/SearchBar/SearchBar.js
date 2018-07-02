import React from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const searchBar = (props) => {
  return(
    <View style={styles.container}>
      <TextInput style={styles.textBox}
      autoFocus={props.autoFocus}
      onFocus={props.onSearchBarPressed}
      onChangeText={props.onChangeText}
      onSubmitEditing={props.onSubmitEditing}
      values = {props.value}
      placeholder='Find best food in the city'
      underlineColorAndroid='transparent'           //to remove underline in textinput
      />
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft:20,
    justifyContent: 'center',
    marginRight: 10,
    marginTop:10,
    marginLeft:10,
    marginBottom:10,
    //backgroundColor: '#efefef',             //actual grey
    backgroundColor: '#fff',
    height: 40, 
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    elevation:4,
    //borderWidth:1,
    //borderColor: '#e9e9e9',
  },
  textBox: {
    fontSize: 20,
    textAlign: 'auto',
    fontFamily: 'open-sans-regular',
    color: '#4d5656',    // grey
    //color: '#000',
    //fontWeight: 'bold'
  },
});

export default searchBar;