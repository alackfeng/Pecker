import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default class InfosHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <View style={styles.container} >
        <Text>InfosHeader ...</Text>
        <Text>左右滚动四栏Banner</Text>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.debugColorGray,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
});