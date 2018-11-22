import React from 'react';
import { View, ScrollView, Text, Button, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleIncrement } from '../actions/counterActions';

import HdWallet from '../libcommon/HdWallet';


let mnemonicWallet = null;
class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      refresh: false,
      tipscreate: null,
    }

  }

  toWebViewPage = (url) => {
    const { navigation } = this.props;
    if(navigation && navigation.navigate) 
      navigation.navigate('WebView', {openUrl1: 'https://eosflare.io/account/eosflareiobp'});
  }

  handleWallet = (type) => {

    const { username: name, password } = this.state;

    if(type === 'create') {

      let { mnemonic } = HdWallet.generateMnemonic();
      mnemonicWallet = HdWallet.create({mnemonic});
      

      this.setState({username: mnemonicWallet.address, password: mnemonicWallet.privateKey});
    }

    if(type === 'delete') {
      
      mnemonicWallet.encrypt2Json({password: '123123'}).then(wallet => {
        console.log('===== HomeScreen::handleWallet - mnemonicWallet encrypt2Json ', wallet);

        this.setState({tipscreate: wallet});

        let unJson = mnemonicWallet.loadEncryptedJson({json: wallet, password: '123123'}).then(unwallet => {
          console.log('===== HomeScreen::handleWallet - mnemonicWallet unwallet ', unwallet);
        })
        
      });
    }
    if(type === 'modify') {
      // let btcAddresses = mnemonicWallet.randomBtcAddresses(20);
      // console.log('===== HomeScreen::handleWallet - mnemonicWallet btcAddresses ', btcAddresses, mnemonicWallet.wallets['BTC']);

      let eosWallets = mnemonicWallet.randomEosAddresses(5);
      
      for(var index in eosWallets) {
        // console.log('===== HomeScreen::handleWallet - mnemonicWallet eosWallets ', eosWallets[index], mnemonicWallet.eosWallets['EOS']);
        const { wallet } = eosWallets[index];
        mnemonicWallet.setWallet({type: 'EOS', wallet: wallet});
      };
      
      console.log('===== HomeScreen::handleWallet - mnemonicWallet eosAddresses ', eosWallets, mnemonicWallet.eosWallets);
    }

    if(type === 'islock') {
      // EOS8eWEFoDmTCg7NoerFs5hW8TjhbXnsNZCZhWsJ3QYPHUVnwFM5E
      const priv = mnemonicWallet.eosWallets['EOS8eWEFoDmTCg7NoerFs5hW8TjhbXnsNZCZhWsJ3QYPHUVnwFM5E'].getPrivateKey();
      HdWallet.importEosPriv(priv);
    } 
    // if(type === 'lock') HdWallet.onLock({name, password});
    // if(type === 'unlock') HdWallet.unLock({name, password});

    this.setState({refresh: !this.state.refresh});
  }

  render() {

    const { increment, handleIncrement } = this.props;
    const { tipscreate } = this.state;

    const wallettips = mnemonicWallet ? mnemonicWallet.eosWallets['EOS'] : null;

    const tips = `\n${this.state.username} \n\t\n${this.state.password}`;



    return (
      <View style={styles.container}>
        <View style={styles.inputContainer} >
          <TextInput
            style={{height: 40, borderColor: 'gray', borderBottomWidth: 1, marginLeft: 10, marginRight: 10}}
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
            placeholder={'username'}
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderBottomWidth: 1, marginLeft: 10, marginRight: 10}}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            placeholder={'password'}
          />
        </View>
        <View style={styles.commitContainer} >
          <Text style={{justifyContent: 'center', textAlign: 'center', width: 75}}>WALLET: </Text>
          <Button title="create" onPress={ () => this.handleWallet('create') } />
          <Button title="delete" onPress={ () => this.handleWallet('delete') } />
          <Button title="modify" onPress={ () => this.handleWallet('modify') } />
        </View>
        <View style={styles.commitContainer} >
          <Text style={{justifyContent: 'center', textAlign: 'center', width: 75}}>LOCK???: </Text>
          <Button title="islock" onPress={ () => this.handleWallet('islock') } />
          <Button title="lock" onPress={ () => this.handleWallet('lock') } />
          <Button title="unlock" onPress={ () => this.handleWallet('unlock') } />
        </View>
        <ScrollView>
          <View style={styles.commitContainer}><Text>Tips: {JSON.stringify(tipscreate) }</Text></View>
          <View style={styles.commitContainer}><Text>Tips: {JSON.stringify(wallettips)}</Text></View>
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  handleIncrement: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  increment: state.counterReducer.increment,
});

const mapDispatchToProps = dispatch => bindActionCreators({handleIncrement, }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    // alignItems: 'center',
    marginTop: 100, 
    // justifyContent: 'center', 
    // backgroundColor: 'yellow' 
  },
  inputContainer: {
    // backgroundColor: 'red',
    justifyContent: 'center'
  },
  commitContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginLeft: 10, 
    marginRight: 10,
    marginTop: 10,
    alignItems: 'center',
  }, 
  commitContainer1: {
    // flexDirection: 'row',
    backgroundColor: 'transparent',
    marginLeft: 10, 
    marginRight: 10,
    marginTop: 10,
    // alignItems: 'center',
  }
});

