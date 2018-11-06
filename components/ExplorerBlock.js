import React from 'react';
import { ScrollView, View, Text, SectionList, FlatList, TouchableHighlight, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import EosManager from '../libcommon/EosManager';
import SearchBar from '../components/SearchBar';
import BlockInfo from '../components/BlockInfo';
import BlockShortcut from '../components/BlockShortcut';
import BlockAccount from '../components/BlockAccount';
import BlockBlock from '../components/BlockBlock';
import BlockTransaction from '../components/BlockTransaction';


const searchRules = {
  'transaction': EosManager.getinfo, 
  'account': EosManager.getAccount, 
  'contract': EosManager.getAccount, 
  'address': EosManager.getinfo, 
  'height': EosManager.getBlock,
};

export default class ExplorerBlock extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      info: null,
      error: null,
      hidden: false,
      searchType: null,
      searchContent: null,
      searchResult: null,
    };

  }

  componentWillMount() {
    EosManager.getinfo().then( result => {
      console.log('===== ExplorerBlock:: RESULT: ' , result);
      this.setState({info: result.info});
    }).catch( err => {
      console.error('===== ExplorerBlock:: ERROR: ' , err);
    });
  }

  clearSearch = () => {
    this.setState({info: null, error: null, hidden: false});
    this.props.hiddenHead(false);
  }

  handleSearch = ({ search }) => {

    const { type } = this.checkSearchRule(search);

    
    
    this.execApiFunction(type, search);

    // this.get_account(search);
    this.props.hiddenHead(true);
    this.setState({hidden: true});
  }

  execApiFunction = (type, search) => {

    const execApiFunction = 
      (type === 'height' ? EosManager.getBlock(search) : 
      (type === 'transaction' ? EosManager.getTransaction(search) : //'e5a9a3f6f8865960b71bf3a117cc354124a283593ec9565f2de0911cdbef4921') : 
      (type === 'account' ? EosManager.getAccount(search) : 
        EosManager.getAccount(search))));

    execApiFunction.then( result => {
      console.log('===== ExplorerBlock:: RESULT: ' , JSON.stringify(result));
      if(result.info)
        this.setState({searchResult: result.info, searchContent: search, searchType: type});
      else
        this.setState({searchResult: null, searchContent: search, searchType: type, error: result.error});
    }).catch( err => {
      console.error('===== BlockNetwork:: ERROR: ' , err);
      this.setState({searchResult: null, searchContent: search, searchType: type});
    });

  }

  checkSearchRule = (search) => {

    console.log('===== ExplorerBlock::checkSearchRule - search typeof - ',  typeof search);

    if(typeof 'search' !== 'string')
      return {type: null};

    /*Can only contain the characters .abcdefghijklmnopqrstuvwxyz12345. a-z (lowercase), 1-5 and . (period)
    Must start with a letter
    Must be 12 characters*/

    if( !isNaN(parseInt(search)) ) {
      return {type: 'height'};
    }
    else if(search.length > 12) {
      return {type: 'transaction'};
    } else {
      return {type: 'account'};
    }
    return {type: null}
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
        {!this.state.hidden && <BlockShortcut onTouchButton={this.onTouchButton} /> }
        <View style={styles.searchresultContainer}>
          {!this.state.error && this.state.info && <BlockInfo info={this.state.info} />}
          {!this.state.error && this.state.searchType === 'account' && this.state.searchResult 
            && <BlockAccount accountInfo={this.state.searchResult} />}
          {!this.state.error && this.state.searchType === 'height' && this.state.searchResult 
            && <BlockBlock blockInfo={this.state.searchResult} />}
          {!this.state.error && this.state.searchType === 'transaction' && this.state.searchResult 
            && <BlockTransaction transactionInfo={this.state.searchResult} />}
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

