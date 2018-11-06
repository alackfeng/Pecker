import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import ExplorerHeader from '../components/ExplorerHeader';
import ExplorerBlock from '../components/ExplorerBlock';

export default class ExplorerScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hiddenHead: false,
    }
  }
  render() {

    const { navigation } = this.props;

    return (
      <View style={ styles.container }>
        {!this.state.hiddenHead && <ExplorerHeader />}
        <ExplorerBlock navigation = {navigation} hiddenHead={ (hiddenHead) => { this.setState({hiddenHead})} } />
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