import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleIncrement } from '../actions/counterActions';

import WalletManager from '../libcommon/WalletManager';


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
    }
    // WalletManager.create();
  }

  toWebViewPage = (url) => {
    const { navigation } = this.props;
    if(navigation && navigation.navigate) 
      navigation.navigate('WebView', {openUrl1: 'https://eosflare.io/account/eosflareiobp'});
  }

  handleWallet = (type) => {

    const { username: name, password } = this.state;

    if(type === 'create') WalletManager.create({name, password});
    if(type === 'delete') WalletManager.delete({name, password});
    if(type === 'modify') WalletManager.modify({name, password});

    if(type === 'islock') WalletManager.islock({name, password});
    if(type === 'lock') WalletManager.lock({name, password});
    if(type === 'unlock') WalletManager.unlock({name, password});

    this.setState({refresh: !this.state.refresh});
  }

  render() {

    const { increment, handleIncrement } = this.props;

    const walletlist = WalletManager.getWallets();
    const wallettips = walletlist.map(i => (<Text>Tips-Wallet: {i}</Text>));

    const tips = `\n${this.state.username} \n${this.state.password}`;



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
        <View style={styles.commitContainer}><Text>Tips: {tips}</Text></View>
        <View style={styles.commitContainer1}>{wallettips}</View>
        {/* <Button title="To WebView" onPress={ () => this.toWebViewPage() } />
        <Text>Home Screen { increment }</Text> */}
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

