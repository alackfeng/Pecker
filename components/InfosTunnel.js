import React from 'react';
import {View, Text, StyleSheet, ScrollView } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import InfosBoardOnChain from './objects/InfosBoardOnChain';


const testInfosObjs = [
  {info_type: 'tunnel', info_declaration_time: new Date() + 1,info_labels: ['EOS', 'DAPP'], 
  info_title: '十年 最震惊比特币世界的10天1', 
  info_abstract: '比特币是一场悄然兴起的革命。比特币走过十年，是一项革命性技术的浓缩历史。如果按照时间顺序梳理比特币十年，发现震撼了比特币世界的10天发生在大多数人听说比特币大事件，同时也影响了比特币的未来发展。',
  info_link: 'https://zerohero.one/', info_sources: 'ZEROHERO Offcial', info_poster: null, info_logo: null},

  {info_type: 'tunnel', info_declaration_time: new Date() + 2,info_labels: ['EOS', 'DAPP'], 
  info_title: '十年 最震惊比特币世界的10天2', 
  info_abstract: '比特币是一场悄然兴起的革命。比特币走过十年，是一项革命性技术的浓缩历史。如果按照时间顺序梳理比特币十年，发现震撼了比特币世界的10天发生在大多数人听说比特币大事件，同时也影响了比特币的未来发展。',
  info_link: 'https://zerohero.one/', info_sources: 'ZEROHERO Offcial', info_poster: null, info_logo: null},

  {info_type: 'tunnel', info_declaration_time: new Date() + 3,info_labels: ['EOS', 'DAPP'], 
  info_title: '十年 最震惊比特币世界的10天3', 
  info_abstract: '比特币是一场悄然兴起的革命。比特币走过十年，是一项革命性技术的浓缩历史。如果按照时间顺序梳理比特币十年，发现震撼了比特币世界的10天发生在大多数人听说比特币大事件，同时也影响了比特币的未来发展。',
  info_link: 'https://zerohero.one/', info_sources: 'ZEROHERO Offcial', info_poster: null, info_logo: null},

  {info_type: 'tunnel', info_declaration_time: new Date() + 4,info_labels: ['EOS', 'DAPP'], 
  info_title: '十年 最震惊比特币世界的10天4', 
  info_abstract: '比特币是一场悄然兴起的革命。比特币走过十年，是一项革命性技术的浓缩历史。如果按照时间顺序梳理比特币十年，发现震撼了比特币世界的10天发生在大多数人听说比特币大事件，同时也影响了比特币的未来发展。',
  info_link: 'https://zerohero.one/', info_sources: 'ZEROHERO Offcial', info_poster: null, info_logo: null},
];


export default class InfosTunnel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const infosBoardObjs = testInfosObjs.map( info => (<InfosBoardOnChain key={info.info_title} infosBoard={info} />) )
    
    return (
      <ScrollView style={styles.container} >
        { infosBoardObjs }
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent', // Colors.debugColorYellow,
    flex: 1,
  },
  titleText: {
    textAlign: 'center'
  }
});