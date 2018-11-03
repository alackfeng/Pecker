import React from 'react';
import { ScrollView, View, Text, SectionList, FlatList, TouchableHighlight, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import EosManager from '../libcommon/EosManager';


export default class ExplorerBlock extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      info: null,
      error: null,
    };

  }

  componentWillMount() {

    this.getinfo().then( result => {
      console.log('===== ExplorerBlock:: RESULT: ' , result);
    }).catch( err => {
      console.error('===== ExplorerBlock:: ERROR: ' , err);
    });

    // this.get_account('eosio');

  }


  async getinfo() {

    try {

      const result = await EosManager.rpc.get_info();
      this.setState({info: result});

    } catch (e) {
      console.log('\nCaught exception: ' + e);
      if (e instanceof RpcError)
        console.log(JSON.stringify(e.json, null, 2));
      this.setState({error: e.json});
    }
    return 'ok';
  }

  async get_account(name) {

    try {

      const result = await EosManager.rpc.get_account(name);
      this.setState({info: result});

    } catch (e) {
      console.log('\nCaught exception: ' + e);
      if (e instanceof RpcError)
        console.log(JSON.stringify(e.json, null, 2));
      this.setState({error: e.json});
    }
    return 'ok';
  }


  render() {


    return (
      <ScrollView style={styles.container}>
        <Text>hello info:  {JSON.stringify(this.state.info)}</Text>
        <Text>hello error:  {JSON.stringify(this.state.error)}</Text>
      </ScrollView>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },

});

