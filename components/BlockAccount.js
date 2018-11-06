import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import JsonTable from '../components/JsonTable';

export default class BlockAccount extends React.Component {

  constructor(props) {
    super(props);

    const filtersInfo = ['account_name', 'privileged', 'created', 'last_code_update'];
    const filtersAsset = ['core_liquid_balance', 'ram_quota', 'ram_usage', 'net_weight', 'cpu_weight'];
    this.state = {
      filtersAsset: filtersAsset,
      filtersInfo: filtersInfo,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <JsonTable title={'Account'} items={this.props.accountInfo} filters={this.state.filtersInfo} />
        <JsonTable title={'Asset'} items={this.props.accountInfo} filters={this.state.filtersAsset} />
        <JsonTable title={'Net Limit'} items={this.props.accountInfo['net_limit']} filters={this.state.filtersAsset1} />
        <JsonTable title={'Cpu Limit'} items={this.props.accountInfo['cpu_limit']} filters={this.state.filtersAsset1} />
        <JsonTable title={'Permissions Active'} items={this.props.accountInfo['permissions'][0]} filters={this.state.filtersAsset1} />
        <JsonTable title={'Permissions Owner'} items={this.props.accountInfo['permissions'][1]} filters={this.state.filtersAsset1} />
        <JsonTable title={'Total Resources'} items={this.props.accountInfo['total_resources']} filters={this.state.filtersAsset1} />
        <JsonTable title={'Self Delegated Bandwidth'} items={this.props.accountInfo['self_delegated_bandwidth']} filters={this.state.filtersAsset1} />
        <JsonTable title={'Voter Info'} items={this.props.accountInfo['voter_info']} filters={this.state.filtersAsset1} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {

  }
});