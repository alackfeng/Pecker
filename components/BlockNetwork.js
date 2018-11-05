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

  parseNetworkInfo = ( info ) => {
  
    if(info && typeof info === 'object') {
      const itemObj = Object.keys(info).map(key => {
        const filter = this.state.filters.filter(f => (key === f));
        return filter.length 
          ? <ItemkeyValue key={key} item={key} value={info[key]} /> 
          : null
      });
      return itemObj;
    }
    return <ItemkeyValue key={0} item={'info'} value={'none'} />
  }

  render() {

    return (
      <View style={styles.container} >
        <View style={styles.titleContainer} ><Text style={styles.titleText} >Block NetWork </Text></View>
        <View>{ this.parseNetworkInfo(this.state.network) }</View>
      </View>
    );
  }

};

export default BlockNetwork;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  titleContainer: {
    marginLeft: 5,
  },
  titleText: {
    color: 'black',
    textAlign: 'left',
    fontSize: 14,
    alignItems: 'center',
    fontWeight: 'bold',
    lineHeight: 16,
  },
  itemContainer: {
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    height: 30,
  },
  itemTextContainerLeft: {
    marginLeft: 5,
    width: Layout.window.width * 0.3,

  },
  itemTextContainerRight: {
    marginLeft: 5,
  },
  itemTextLeft: {
    color: 'gray',
    textAlign: 'left',
    fontSize: 14,
    alignItems: 'center',
    fontWeight: 'bold',
    lineHeight: 14,
  },
  itemTextRight: {
    color: 'yellow',
    textAlign: 'right',
    alignItems: 'center',
    fontSize: 14,
    lineHeight: 14,
  },

});

