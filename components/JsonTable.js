import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';


const ItemKeyValue = ({item, value}=props) => (
  <View style={styles.itemContainer} >
    <Text> {item}</Text>
    <Text> {JSON.stringify(value)}</Text>
  </View>
);

const ItemTitle = ({title}=props) => (<View style={styles.itemTitleContainer}><Text style={styles.titleText} >{ title }</Text></View>);

export default class JsonTable extends React.Component {

  render() {

    const { title, items, filters } = this.props;

    const itemObjs = Object.keys(items).map(k => {

        if(filters) {
          const filter = filters.filter(f => (k === f));
          return filter.length ? <ItemKeyValue key={k} item={k} value={items[k]} /> : null;
        }
        // ALL
        return <ItemKeyValue key={k} item={k} value={items[k]} />;
      });

    // console.log('=====JsonTable::render - ', itemObjs);

    return(
      <View style={styles.container} >
        { title && <ItemTitle title={title} /> }
        { itemObjs } 
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
  itemTitleContainer: {
    backgroundColor: 'gray',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 30,
    borderBottomColor: 'lightblue',
    borderBottomWidth: .0,
  },
});