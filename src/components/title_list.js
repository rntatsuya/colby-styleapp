import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  WebView,
  ScrollView,
  Dimensions,
  ListView,
  TouchableHighlight,
  Navigator
} from 'react-native';

import Spinner from './activity_indicator';

const { height, width } = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class TitleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        viewOpacity: new Animated.Value(0)
    };

    this.runAnimations = runAnimations.bind(this);
  }

  componentWillMount = () => {
    this.runAnimations();
  }

  handlePress = (title) => {
    console.log("in title component: " + title);
  // return something that switches the navigation
    this.props.onSelectTitle(title);
//    this.props._handleNextPress();
  }

  // showSpinner = (loading) => {
  //   if (loading) {
  //     return <Spinner />;
  //   }
  // }
//contentContainerStyle={{opacity: this.state.viewOpacity}}
  render() {
    //console.log(this.props.title1);
    if (this.props.loading) {
      return <Spinner />;
    }
    else {
      return (
        <ListView
          dataSource={ds.cloneWithRows(this.props.titles)}
          enableEmptySections={true}

          renderRow={(title) =>
            <TouchableHighlight
              underlayColor="gray"
              style={styles.list_box}
              onPress={() => this.handlePress(title)}
            >
              <Text style={styles.list_text}>{title}</Text>
            </TouchableHighlight>
          }
        />
      );
    }
  }
}

function runAnimations() {
  Animated.timing(this.state.viewOpacity,
    {
      toValue:1,
      duration:1000,
      easing: Easing.easeOutBack
    }).start();
}

const styles = StyleSheet.create({
  list_box: {
    flex: 0,
    height: 40,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth:StyleSheet.hairlineWidth,
  },
  list_text: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Helvetica'
  }
});
