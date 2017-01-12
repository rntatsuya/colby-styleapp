import React, { Component } from 'react';
import {
   ActivityIndicator,
   View,
   StyleSheet
} from 'react-native';

export default ActivitySpinner = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
});
