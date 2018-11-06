import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

import { ItemTitle, ItemKeyValue } from './ItemList';

export default class AccountAsset extends React.Component {

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
      return <ItemKeyValue key={k} item={k} value={'NUL'} />;
    })

    return(
      <View style={styles.container} >
        { title && <ItemTitle title={title} iconname='home' /> }
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