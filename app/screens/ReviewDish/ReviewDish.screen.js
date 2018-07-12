import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  NativeModules,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import { addReview } from '../../actions/reviews.action';

var ImagePicker = NativeModules.ImageCropPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});

class ReviewDish extends Component {

  constructor(props){
      super(props);
      this.state = {
        image: null,
        images: null,
        review: '',        
      };
  }

  renderImage(image) {
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      //includeBase64: true,
      waitAnimationEnd: false,
      includeExif: true,
    }).then(images => {
      this.setState({
        image: null,
        images: images.map(i => {
          console.log('received image', i);
          return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
        })
      });
    }).catch(e => alert(e));
  }

  addReview() {
    let formData = new FormData();
    imageDetails = this.state.images;
    var photo = [];
    var i=0;
    var item;
    for(i=0; i<imageDetails.length; i++){
      photo[i] = {
        mime : imageDetails[i].mime,
        name : 'test',
        uri: imageDetails[i].uri,
      }
    }

    photo.forEach((photo) => {
      formData.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg', // or photo.type
        name: photo.name
      });
    });
    formData.append('dish_rest_mapping_id',this.props.selectedDish._id);
    formData.append('restaurant_id',this.props.selectedDish.restaurant_id);
    formData.append('review', this.state.review);
    this.props.addReview(formData);
  }

  handleReview = (text)=> {
    this.setState({ review: text })
  }

  render(){      
    return(
    <View>
      <Text>{this.props.selectedDish.dish_name}</Text>
      <TextInput
        underlineColorAndroid = "transparent"
        placeholder = "Review"
        onChangeText = {this.handleReview}/>

      <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
        <Text style={styles.text}>Select Multiple</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress = {
           () => this.addReview()
        }>
        <Text style = {styles.submitButtonText}> Submit </Text>
      </TouchableOpacity>
      <ScrollView>
        {this.state.image ? this.renderAsset(this.state.image) : null}
        {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
      </ScrollView>
    </View>
  );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addReview: (formData) => dispatch(addReview(formData)),
  };
};

export default connect(null, mapDispatchToProps)(ReviewDish);