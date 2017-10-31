import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from 'react-native';
import Svg, {
  Rect
} from 'react-native-svg';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
//      enterKeyword: ''
    };
  }

  handleSubmitButton = () => {
    this.props.onSubmitEditing(this.state.keyword);
  }

  handleSubmitKey = (e) => {
    if (e.nativeEvent.key == "Enter") {
      this.props.onSubmitEditing(this.state.keyword);
    }
  }

  submitButton() {
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleSubmitButton}
      style={styles.button}
      >
      <Text>
        Submit
      </Text>
    </TouchableHighlight>
  }

  onInputChange = (keyword) => {
    this.setState({keyword});
    this.props.onSearchTermChange(keyword);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontFamily:'Helvetica'}}>Enter a keyword:</Text>
        <View style={styles.changeOrientation}>
          <TextInput
            style={styles.input}
            value={this.state.keyword}
            onChangeText={(keyword) => this.onInputChange(keyword)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  changeOrientation: {
    flexDirection: 'row',
  },
  input: {
    flex: 3,
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    marginRight: 5,
    width: 230,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white'
  },
  button: {
    flex: 1,
    borderWidth: 2,
    height: 40,
    width: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3'
  }
});
