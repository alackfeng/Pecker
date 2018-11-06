import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

import { ItemTitle, ItemKeyValue, itemObjsfilter } from './ItemList';



export default class BlockInfo extends React.Component {

  render() {

    const { title, items, filters } = this.props;

    let itemObjs = [];
    itemObjs.push(itemObjsfilter(items, filters));
    itemObjs.push(itemObjsfilter(items['voter_info'], filters));


    // remain other
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