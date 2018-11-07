import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default class InfosNotice extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <View style={styles.container} >
        <View style={styles.noticeContainer} >
          <Text>InfosNotice ...</Text>
          <Text>滚动官方公告标题</Text>
        </View>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.debugColorWhite,
    // flex: 1,
    justifyContent: 'center',
    height: 50,
  },
  noticeContainer: {
    marginLeft: 10,
    flexDirection: 'row'
  }
});