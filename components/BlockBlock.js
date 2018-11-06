import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import JsonTable from '../components/JsonTable';

import BlockInfo from './objects/BlockInfo';

export default class BlockBlock extends React.Component {

  constructor(props) {
    super(props);

    const filtersInfo = ['block_num', 'id', 'ref_block_prefix', 'producer', 'timestamp', 'confirmed', 'previous', 
      'transaction_mroot', 'action_mroot', 'schedule_version', 'new_producers', 'header_extensions', 'producer_signature', 'block_extensions', ];
    const filtersTrans = ['core_liquid_balance', 'net_weight', 'cpu_weight', 'staked', 'unstaking'];
    this.state = {
      filtersTrans: filtersTrans,
      filtersInfo: filtersInfo,
    }
  }

  render() {

    const { blockInfo } = this.props;
    const { filtersInfo } = this.state;

    const transObjs = [];
    const transactions = blockInfo['transactions'];
    for(var i in transactions) {
      transactions[i];
      transObjs.push(<JsonTable title={'Transactions ' + i} items={transactions[i]} />)
    }

    return (
      <View style={styles.container}>
        <JsonTable title={'Block'} items={blockInfo} filters={filtersInfo} />
        { transObjs }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {

  }
});