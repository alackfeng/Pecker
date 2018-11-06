import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import translate from '../../constants/translate';


class IconEx extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={16}
        style={{ marginBottom: 0 }}
        color={ Colors.tabIconDefault}
      />
    );
  }
}

const itemKeyTypeDate = ['created', 'last_code_update'];

const convertItemKeyValue = (k, v) => {
  // 去掉前后双引号
  let value = v;
  if(typeof v === 'string')
    value = v.replace(/(^"*)|("*$)/g, '');

  if(itemKeyTypeDate.includes(k))
    return new Date(value).toLocaleString();
  return JSON.stringify(value);
}

export const ItemKeyValue = ({item, value}=props) => {


  let itemValue = convertItemKeyValue(item, value);
  if(typeof itemValue === 'string')
    itemValue = itemValue.replace(/(^"*)|("*$)/g, '');

  return (
  <View style={styles.itemContainer} >
    <Text> { translate(item) } </Text>
    <Text> { itemValue }</Text>
  </View>);
};

export const ItemTitle = ({title, iconname}=props) => (
  <View style={styles.itemTitleContainer}>
    {iconname && <IconEx name={iconname} />}
    {title && <Text style={styles.titleText} > { translate(title) }</Text>}
  </View>
);

export const ItemAcc = ({title, iconname, accountname, privileged, created}=props) => (
  <View style={styles.itemTitleContainer}>
    {iconname && <IconEx name={iconname} />}
    <Text style={styles.titleText} > { title ? translate(title): '' } { accountname } {'.'} </Text>
    {privileged && <IconEx name={'heart'} /> }
  </View>
);


const styles = StyleSheet.create({
  itemTitleContainer: {
    backgroundColor: 'gray',
    marginLeft: 1,
    flexDirection: 'row',
    height: 25,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 25,
    borderBottomColor: 'lightblue',
    borderBottomWidth: .0,
  },
});

