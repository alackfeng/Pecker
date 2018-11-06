import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import JsonTable from '../components/JsonTable';

import TransactionInfo from './objects/TransactionInfo';

export default class BlockTransaction extends React.Component {

  constructor(props) {
    super(props);

    const filtersInfo = ['id', 'block_num', 'block_time', 'last_irreversible_block'];
    const filtersTrans = ['core_liquid_balance', 'net_weight', 'cpu_weight', 'staked', 'unstaking'];
    this.state = {
      filtersTrans: filtersTrans,
      filtersInfo: filtersInfo,
    }
  }

  render() {

    const { transactionInfo } = this.props;
    const { filtersInfo } = this.state;

    let transReceiptObjs = null;
    let transTransObjs = [];
    const transactions = transactionInfo['trx'];
    if(transactions && transactions['receipt']) {
       transReceiptObjs = <JsonTable title={'Transaction Receipt'} items={transactions['receipt']} />
    }
    if(transactions && transactions['trx']) {
       transTransObjs.push(<JsonTable key={'title'} title={'Transaction Trx'} items={transactions['trx']} />);
    }
    if(transactions && transactions['trx'] && transactions['trx']['actions']) {

      for(let i in transactions['trx']['actions']) {
       transTransObjs.push(<JsonTable key={`'titles'${i}`} title={'Transaction Actions ' + i} items={transactions['trx']['actions'][i]} />);
      }
    }

    return (
      <View style={styles.container}>
        <JsonTable title={'Transaction Info'} items={transactionInfo} filters={filtersInfo} />
        { transReceiptObjs }
        { transTransObjs }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {

  }
});