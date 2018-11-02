/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import AppNavigator from './navigation/AppNavigator';

import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs';

const defaultPrivateKey = "5JbuZx3MFvUY1FkYoWdR1o8b4TRCZwQJQzCvrT6JwVdQgLzscVo"; // useraaaaaaaa
const signatureProvider = new JsSignatureProvider([defaultPrivateKey, '5J4j8MJdhiHGmJ26CGTHvqMWYeYNMTEL6itTaxXFPAUpPfPm61L']);

const rpc = new JsonRpc('http://127.0.0.1:8000', { fetch });

const api = new Api({ rpc, signatureProvider, /*textDecoder: new TextDecoder(), textEncoder: new TextEncoder()*/ });


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      info: null,
      info1: null,
    }

  }

  componentDidMount() {
    (async (_This) => {
      try {

      const result = await api.transact({
        actions: [{
          account: 'eosio.token',
          name: 'transfer',
          authorization: [{
            actor: 'taurus',
            permission: 'active',
          }],
          data: {
            from: 'taurus',
            to: 'alackfeng521',
            quantity: '0.0001 EOS',
            memo: '',
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      console.dir(result);
      _This.setState({info: result.transaction_id});

      } catch (e) {
        console.log('\nCaught exception: ' + e);
        if (e instanceof RpcError)
          console.log(JSON.stringify(e.json, null, 2));
        _This.setState({info: e.json});
      }
    })(this);

    (async (_This) => {
      try {

      const result = await rpc.get_account('taurus');

      console.dir(result);
      _This.setState({info1: result.core_liquid_balance});

      } catch (e) {
        console.log('\nCaught exception: ' + e);
        if (e instanceof RpcError)
          console.log(JSON.stringify(e.json, null, 2));
        _This.setState({info1: e.json});
      }
    })(this);
  }

  render() {
    return (
      <View style={styles.container}>
        { Platform.OS === 'ios' && <StatusBar barStyle="default" /> }
          <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
