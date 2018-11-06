import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

import { ItemAcc, ItemKeyValue } from './ItemList';

export default class AccountInfo extends React.Component {

  render() {

    const { title, items, filters } = this.props;

    const itemObjs = Object.keys(items).map(k => {

        if(filters) {
          const filter = filters.filter(f => (k === f));
          if(filter.length) {
            filters.splice( filters.indexOf(k), 1);
            return <ItemKeyValue key={k} item={k} value={items[k]} />
          }
          return null;
        }
        // ALL
        return <ItemKeyValue key={k} item={k} value={items[k]} />;
      });

    const remainObjs = filters.map(k => {
      return <ItemKeyValue key={k} item={k} value={'nul'} />;
    })

    return(
      <View style={styles.container} >
        { <ItemAcc title={title} iconname='home' accountname={items['account_name']} 
            privileged={items['privileged']} created={items['created']} /> }
        { itemObjs } 
        { remainObjs }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 0,
    marginRight: 0,
    borderLeftColor: 'lightblue',
    borderLeftWidth: 2.5,
  },
});