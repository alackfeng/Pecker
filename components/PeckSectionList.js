import React from 'react';
import { ScrollView, View, Text, SectionList, FlatList, TouchableHighlight, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';


const dataContent = 
[
  {title: 'Base', data: [
    {left: ['baidu', 'https://www.baidu.com/', 'WebView'], right: ['zerohero', 'https://www.zerohero.one', 'WebView']}, 
    {left: ['Explorer', 'https://eospark.com/', 'WebView'], right: ['本地浏览器', 'https://www.zerohero.one', 'Explorer']}, 
    {left: ['BuyRAM', 'https://www.baidu.com/', 'WebView'], right: ['SellRAM', 'https://www.zerohero.one', 'WebView']}, 
  ]},
  {title: 'Expand', data: [
    {left: ['创建账号', 'https://www.baidu.com/'], right: ['实验室', 'https://www.zerohero.one']}, 
  ]},
  {title: 'Future', data: ['item5', 'item6']},
];

export default class PeckSectionList extends React.Component {


  constructor(props) {
    super(props);

    this.onPressWebView = this.onPressWebView.bind(this);
  }

  onPressWebView = (navigation, itemContent) => {
    console.log('===== onPressWebView: ', itemContent, /*navigation*/);

    if(itemContent.length !== 3)
      return;

    if(navigation && itemContent[1])
      navigation.navigate( itemContent[2] || 'WebView', {openUrl: itemContent[1]});
  }

  renderSectionHeader = ({section: {title}}) => {
    // console.log('===== renderSectionHeader : ', title);

    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    );
  }

  renderItem = ({item, index, section}) => {
    // // console.log('===== renderItem : ', item);
    const { navigation } = this.props;

    return (
      <View style={styles.itemContainer}>
        {item.left && <TouchableHighlight style={styles.itemLeftContainer} 
          onPress={()=> {this.onPressWebView(navigation, item.left)}}>
          <Text style={styles.itemLeftTitle} key={index}>{item.left[0]}</Text>
        </TouchableHighlight>}
        {item.right && <TouchableHighlight style={styles.itemRightContainer} 
          onPress={()=> {this.onPressWebView(navigation, item.right)}}>
          <Text style={styles.itemRightTitle} key={index}>{item.right[0]}</Text>
        </TouchableHighlight>}
      </View>
    );
  }

  render() {


    return (
      <ScrollView style={styles.container}>
        <SectionList
          renderItem={ this.renderItem }
          renderSectionHeader={ this.renderSectionHeader }
          sections={ dataContent }
          keyExtractor={(item, index) => item + index}
        />
      </ScrollView>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  headerContainer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 24
  },
  itemContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  itemLeftContainer: {
    flex: 1,
    backgroundColor: '#ffba00',
    height: 100,
    justifyContent: 'center',
    width: Layout.window.width * 0.5 - 20,
    marginTop: 10,
    marginLeft: 5,
  },
  itemLeftTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center'
  },
  itemRightContainer: {
    flex: 1,
    backgroundColor: '#00ac47',
    height: 100,
    justifyContent: 'center',
    width: Layout.window.width * 0.5 - 20,
    marginTop: 10,
    marginLeft: 5,
  },
  itemRightTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center'
  },
});

