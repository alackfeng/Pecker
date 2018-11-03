import React from 'react';
import {View, Image, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import Layout from '../constants/Layout';


class Search extends React.Component {
  

  constructor(props) {
    super(props);

    this.state = {
      searchContent: null,
    }
  }

  handleSearchInput = (value) => {

    // clear 
    this.props.clearSearch();

    this.setState({searchContent: value});
  }

  handleSearchFb = () => {
    const { handleSearch } = this.props;
    const { searchContent } = this.state;
    console.log('====== handleSearchFb: search - ', searchContent);

    if(handleSearch && searchContent)
      handleSearch({search: searchContent});
  }

  handleSearch = () => {
    const { handleSearch } = this.props;
    const { searchContent } = this.state;
    console.log('====== handleSearch: search - ', searchContent);

    if(handleSearch && searchContent)
      handleSearch({search: searchContent});
  }



  render() {

    const { handleSearch } = this.props;
    const defaultSearchValue = 'eosio';

    return (<View style={styles.container}>
      <TextInput
        placeholder={'search by 交易/账户/合约/地址/区块高度'}
        style={styles.input}
        onChangeText={this.handleSearchInput}
        autoCapitalize={'none'}
        autoCorrect={false}
        // value={ defaultSearchValue }
      />
      <TouchableWithoutFeedback
        onPress={this.handleSearchFb}
      >
        <TouchableOpacity
          style={styles.search}
          onPress={this.handleSearch}
        >
          <Image
            source={require('../assets/images/search.png')}
          />
        </TouchableOpacity>
      </TouchableWithoutFeedback>
    </View>);

  } 
};

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};


export default Search;


const styles = StyleSheet.create({
  container: {
    width: Layout.window.width * .94,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginTop:5,
    marginLeft: 10,
    alignItems:'center',
    justifyContent: 'center',
    flexDirection:'row',
    flex: 1,
  },

  search:{
    paddingRight:10,
    paddingLeft:30,
    justifyContent:'center',
    height:'100%'
  },
  input:{
    flex:1,
    marginLeft:21,
    padding:0,
  }
});

