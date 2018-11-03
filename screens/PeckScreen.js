import React from 'react';
import { View, Text } from 'react-native';

import PeckHeader from '../components/PeckHeader';
import PeckSectionList from '../components/PeckSectionList';

export default class PeckScreen extends React.Component {

	static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={{backgroundColor: 'transparent', flex: 1}}>
        <PeckHeader />
        <PeckSectionList navigation = {navigation} />
      </View>
    );
  }
}
