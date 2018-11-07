import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { IconEx } from '../../components/IconEx';


const infoTypes = ['banner', 'notice', 'tunnel'];
const infoSources = ['Offcial', 'Media', 'WeChat', 'Other'];


const InfosBoardTimeBase = ({timebase, labels}=props) => (
  <View style={styles.timebaseContainer} >
    <Text style={styles.timebaseText} >{new Date(timebase).toLocaleString()}</Text>
    { labels.map(v=>(<Text key={v} style={styles.lableStyle} >{v}</Text>)) }
  </View>
);

const InfosBoardTitle = ({title}=props) => {
  return (
    <View style={styles.titleContainer} >
      <IconEx name='bullhorn' />
      <Text>{ title }</Text>
      <IconEx name='share-alt' />
    </View>
  );
}

const InfosBoardAbstract = ({abstract}=props) => {
  return (
    <View style={styles.abstractContainer} >
      <Text style={styles.abstractText} >{ abstract }</Text>
    </View>
  );
}

const InfosBoardSources = ({sources}=props) => {
  return (
    <View style={styles.sourcesContainer} >
      <Text style={styles.sourcesText} >本文来源于：{  sources }</Text>
    </View>
  );
}

const InfosBoardInfo = ({infosBoard}=props) => {
  return (
    <View style={styles.infoContainer} >
      {infosBoard.info_title && <InfosBoardTitle title={infosBoard.info_title} />}
      {infosBoard.info_abstract && <InfosBoardAbstract abstract={infosBoard.info_abstract} />}
      {infosBoard.info_sources && <InfosBoardSources sources={infosBoard.info_sources } />}
    </View>
  );
}

export default class InfosBoardOnChain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      info_type: null,
      info_declaration_time: null,
      info_labels: [],
      info_title: null,
      info_abstract: null,
      info_link: null,
      info_sources: null,
      info_poster: null,
      info_logo: null,
    }
  }

  render() {

    const { infosBoard } = this.props;

    if(!infosBoard) {
      return (<View style={styles.container}><Text>Kong</Text></View>);
    }
    
    return (
      <View style={styles.container} >
        {infosBoard.info_declaration_time && 
          <InfosBoardTimeBase timebase={infosBoard.info_declaration_time} labels={infosBoard.info_labels} />}
        {infosBoard.info_title && <InfosBoardInfo infosBoard={infosBoard} />}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  timebaseContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.debugColorWhite,
    borderLeftColor: Colors.debugColorGray,
    borderLeftWidth: 5,
  },
  timebaseText: {
    marginLeft: 5,
  },
  lableStyle: {
    color: 'red',
    marginLeft: 5,
  },
  infoContainer: {
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.debugColorWhite,
  },
  abstractText: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  sourcesContainer: {
    marginTop: 10,
    backgroundColor: Colors.debugColorGray,
  },
  sourcesText: {
    marginLeft: 10,
  }
});

