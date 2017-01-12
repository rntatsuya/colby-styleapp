import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from 'react-native';

 export default class LiveSeachBar extends Component {
   constructor(props) {
     super(props);

     this.state = {
       keyword: ''
     }
   }

  render() {
    return (
      <View style={container}>
        <TextInput
          style={styles.input}
          onKeyPress={this.handleSubmitKey}
          value={this.state.keyword}
          onChangeText={(text) => this.setState({keyword: text})}
        />
      </View>
    );
  }
