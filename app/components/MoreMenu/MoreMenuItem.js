import React from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableHighlight, Platform, View } from 'react-native';
import LikeIcon from '../SvgIcons/like.icon';
import PenIcon from '../SvgIcons/pen.icon';

function MenuItem({
  style,
  onPressLike,
  onPressReview
}) {
  return (
    <View>
      <TouchableHighlight onPress={onPressLike} style={[styles.container, style]} >
        <LikeIcon width={23.17} height={21.55} fill= {'white'}/>
      </TouchableHighlight>
      <TouchableHighlight onPress={onPressReview} style={[styles.container, style]} >
        <PenIcon width={22.75} height={22.69} fill={'white'}/>
      </TouchableHighlight>
    </View>
  );
}

MenuItem.propTypes = {
  onPress: PropTypes.func,
  style: TouchableHighlight.propTypes.style,
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: 'center',
    maxWidth: 200,
    minWidth: 35,
  },
});

export default MenuItem;
