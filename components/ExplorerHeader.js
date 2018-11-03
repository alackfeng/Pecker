import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

export default class ExplorerHeader extends React.Component {


  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Explorer Header</Text>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: 150,
    justifyContent:'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    color: '#3bb8eb',
    width: 300,
    textAlign: 'center',
    height: 100,
    lineHeight: 100,
    fontWeight: '800'
  },
});