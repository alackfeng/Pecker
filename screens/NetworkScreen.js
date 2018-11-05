import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import BlockNetwork from '../components/BlockNetwork';

export default class NetworkScreen extends Component {
  render() {

    const { navigation } = this.props;

    return (
      <View style={ styles.container }>
        <BlockNetwork navigation = {navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tintColor,
    flex: 1,
    justifyContent: 'space-between'
  },
  titleText: {
    color: Colors.tabIconDefault,
    textAlign: 'center'
  },
});