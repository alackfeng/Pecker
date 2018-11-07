import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import InfosHeader from '../components/InfosHeader';
import InfosNotice from '../components/InfosNotice';
import InfosTunnel from '../components/InfosTunnel';

export default class InfosMain extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <View style={styles.container} >
        <InfosHeader />
        <InfosNotice />
        <InfosTunnel />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent', //Colors.debugColor,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});