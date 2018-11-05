import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import EosManager from '../libcommon/EosManager';
import BlockInfo from '../components/BlockInfo';


const ItemkeyValue = ({item, value} = props) => (
  <View style={styles.itemContainer} >
    <View style={styles.itemTextContainerLeft} >
      <Text style={styles.itemTextLeft} >{item}</Text>
    </View>
    <View style={styles.itemTextContainerRight} >
      <Text style={styles.itemTextRight} >{value}</Text>
    </View>
  </View>
);

class BlockNetwork extends React.Component {


  constructor(props) {
    super(props);

    const filterInfo = ["server_version", "server_version_string", "chain_id", "head_block_num", 
      "last_irreversible_block_num", /*"last_irreversible_block_id", "head_block_id",*/ 
      "head_block_time", "head_block_producer", ];

    this.state = {
      filters: filterInfo,
      network: null,
    }

  }

  componentWillMount() {

    EosManager.getinfo().then( result => {
      console.log('===== BlockNetwork:: RESULT: ' , result);
      this.setState({network: result.info});
    }).catch( err => {
      console.error('===== BlockNetwork:: ERROR: ' , err);
    });
  }

  render() {

    return (
      <View style={styles.container} >
        <Text>Block NetWork </Text>
        <BlockInfo info={this.state.network} />
      </View>
    );
  }

};

export default BlockNetwork;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  itemContainer: {
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 5,
    borderLeftWidth: 3,
    borderLeftColor: Colors.leftBorder, //'gray'
  },
  itemTextContainerLeft: {
    flex: 1,
    // borderBottomWidth: .5,
    // borderBottomColor: Colors.underline,
    marginLeft: 5,
    // width: Layout.window.width * 0.8,
  },
  itemTextContainerRight: {
    flex: 1,
    marginTop: 5,
    marginLeft: 5,
  },
  itemTextLeft: {
    color: 'red',
    textAlign: 'left',
    fontSize: 12,
  },
  itemTextRight: {
    color: 'yellow',
    textAlign: 'right',
    fontSize: 12,
  },

});

