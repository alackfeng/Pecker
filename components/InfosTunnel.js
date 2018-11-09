import React from 'react';
import {View, Text, StyleSheet, ScrollView } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import InfosBoardOnChain from './objects/InfosBoardOnChain';
import EosManager from '../libcommon/EosManager';


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

    this.state = {
      infosObjects: null,
    }
  }

  componentWillMount() {

    EosManager.getTunnelInfos({}).then( result => {
      console.log('===== InfosTunnel:: RESULT: ' , result);
      this.setState({infosObjects: result.info});
    }).catch( err => {
      console.error('===== InfosTunnel:: ERROR: ' , err);
    });
  }

  get_infos_board_obj = (infos) => {

    if(infos && typeof infos === 'object' && infos.rows && Array.isArray(infos.rows)) {
      console.log('===== InfosTunnel::get_infos_board_obj infosObjects = ' , infos.rows);

      const infosBoardObjs = infos.rows
        .sort( (a, b) => { return b.id-a.id; } )
        .map( info => (<InfosBoardOnChain key={info.id} infosBoard={info} />) );

      return infosBoardObjs;
    }

    return null;
  }

  render() {

    const { infosObjects } = this.state;

    const infosBoardObjs = this.get_infos_board_obj(infosObjects);
    
    return (
      <ScrollView style={styles.container} >
        { infosBoardObjs ? infosBoardObjs : <Text>Nothing Now!!!</Text> }
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