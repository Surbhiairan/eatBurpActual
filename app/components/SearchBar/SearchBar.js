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
    <Icon type='ionicon' size={15} name="search" color="#757575" />
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
    borderColor: '#BDBDBD',
    borderWidth: 1,
    height: 37, 
    width: 250,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
  },
  textBox: {
    fontSize: 15,
    textAlign: 'auto',
    fontFamily: 'OpenSans-Regular',
    color: '#757575',
    paddingLeft: 47,
    paddingTop: 8
  },
});

export default searchBar;