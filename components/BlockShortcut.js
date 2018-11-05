import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';


const ShortcutItem = ({item, onTouchButton} = props) => {

  return <View style={styles.itemContainer} >
    <TouchableOpacity onPress={() => onTouchButton({url: item.name, params: item})}>
      <Text style={styles.itemText} > { item.value } </Text>
    </TouchableOpacity>
  </View>;
}

class BlockShortcut extends React.Component {


  constructor(props) {
    super(props);

    const dataList = [
      {name: 'AllNetwork', value: '区块汇总', logo: 'logo'}, 
      {name: 'hotContracts', value: '热门合约', logo: 'logo'}, 
      {name: 'coinsList', value: '代币列表', logo: 'logo'},
      {name: 'lastBlock', value: '最新区块', logo: 'logo'},
      {name: 'accountPet', value: '账户竞拍', logo: 'logo'},
      {name: 'blackAccounts', value: '黑名单', logo: 'logo'},
      {name: 'accountList', value: '账号列表', logo: 'logo'},
      {name: 'productList', value: '生产者列表', logo: 'logo'},
    ];

    this.state = {
      dataList: dataList,
    }

  }

  renderItem = ({item}) => {

    return <ShortcutItem item={item} onTouchButton={this.props.onTouchButton} />
  }

  render() {
    return (
      <View style={styles.container} >
        <FlatList
          data={this.state.dataList}
          renderItem={this.renderItem}
          numColumns={3}
          keyExtractor={ (item, index) => item.name }
        />
      </View>
    );
  }

};

export default BlockShortcut;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  itemContainer: {
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 10,
    marginLeft: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.leftBorder, //'gray'
    backgroundColor: 'transparent',
  },
  itemText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 12,
  },

});

