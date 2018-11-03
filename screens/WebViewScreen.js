import React, { Component } from 'react';
import { WebView } from 'react-native';

class WebViewScreen extends Component {
  render() {

  	const { navigation } = this.props;

  	const openUrl = navigation && navigation.getParam('openUrl', 'https://www.zerohero.one/');

    return (
      <WebView
        source={{uri: openUrl}}
        style={{marginTop: 20}}
      />
    );
  }
}

export default WebViewScreen;