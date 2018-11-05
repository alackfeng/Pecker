import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';


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

class BlockInfo extends React.Component {


  constructor(props) {
    super(props);

    const filterInfo = ["server_version", "server_version_string", "chain_id", "head_block_num", 
      "last_irreversible_block_num", /*"last_irreversible_block_id", "head_block_id",*/ 
      "head_block_time", "head_block_producer", ];

    this.state = {
      filters: filterInfo,
    }

  }

  parseBlockInfo = ( info ) => {
  
    info = info ? info : this.props.info;
    console.log('===== BlockInfo:: info - typeof ', typeof info);

    if(info && typeof info === 'object') {
      // console.log('===== BlockInfo:: info - ', info);
      const itemObj = Object.keys(info).map(key => {
        const filter = this.state.filters.filter(f => (key === f));
        // console.log('filter - ', filter);

        return filter.length ? <ItemkeyValue key={key} item={key} value={info[key]} /> : null
      });

      console.log('===== BlockInfo:: info - OBJ ', itemObj);

      return itemObj;
    }

    return <ItemkeyValue key={0} item={'info'} value={'none'} />
  }

  render() {

    const { info } = this.props;

    const networkinfo = this.parseBlockInfo();

    return (
      <View style={styles.container} >
        <Text>Block NetWork Info</Text>
        { networkinfo }
      </View>
    );
  }

};

export default BlockInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: 'space-between'
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

