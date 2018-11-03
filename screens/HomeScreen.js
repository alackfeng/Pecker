import React from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleIncrement } from '../actions/counterActions';


class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  toWebViewPage = (url) => {
    const { navigation } = this.props;
    if(navigation && navigation.navigate) 
      navigation.navigate('WebView', {openUrl1: 'https://eosflare.io/account/eosflareiobp'});
  }

  render() {

    const { increment, handleIncrement } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'yellow' }}>
        <Button title="To WebView" onPress={ () => this.toWebViewPage() } />
        <Text>Home Screen { increment }</Text>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  handleIncrement: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  increment: state.counterReducer.increment,
});

const mapDispatchToProps = dispatch => bindActionCreators({handleIncrement, }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

