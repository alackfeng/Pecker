import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import InfosMain from '../components/InfosMain';

export default class InfosScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    
    const { navigation } = this.props;

    return (
      <View style={styles.container} >
        <InfosMain navigation = {navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    // alignItems: 'center', 
    // justifyContent: 'center', 
    backgroundColor: 'transparent', //Colors.screenBackGround,
  }
});

