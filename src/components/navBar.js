import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';

export default class NavBar extends Component {
  render() {
    if (this.props.hidden) {
      return null;
    }
    return <Navigator.NavigationBar {...this.props} />
  }
}
