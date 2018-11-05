import React from 'react';
import { ScrollView, View, Text, SectionList, FlatList, TouchableHighlight, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import EosManager from '../libcommon/EosManager';
import SearchBar from '../components/SearchBar';
import BlockInfo from '../components/BlockInfo';
import BlockShortcut from '../components/BlockShortcut';


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
      console.log('\n===== EOS get_info : ' + JSON.stringify(result));
      this.setState({info: result});

    } catch (e) {
      console.log('\nCaught exception: ' + e);
      if (e instanceof EosManager.RpcError)
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
      if (e instanceof EosManager.RpcError)
        console.log(JSON.stringify(e.json, null, 2));
      this.setState({error: e.json});
    }
    return 'ok';
  }

  clearSearch = () => this.setState({info: null, error: null})

  handleSearch = ({ search }) => {

    this.get_account(search);
  }

  onTouchButton = ({url, params}) => {
    const { navigation } = this.props;

    console.log('===== ExplorerBlock:: onTouchButton - ', url, params, navigation);

    if(navigation)
      navigation.navigate( url , {name: params.name});
  }


  render() {


    return (
      <ScrollView style={styles.container}>
        <SearchBar handleSearch = {this.handleSearch} clearSearch = { this.clearSearch } />
        <BlockShortcut onTouchButton={this.onTouchButton} />
        <View style={styles.searchresultContainer}>
          {this.state.info && <BlockInfo info={this.state.info} />}
          {this.state.error && <Text style={styles.error}>Search ERROR:  {JSON.stringify(this.state.error)}</Text>}
        </View>
      </ScrollView>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  searchresultContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  error: {
    color: 'red'
  }

});

