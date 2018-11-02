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

  render() {

    const { increment, handleIncrement } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'yellow' }}>
        <Button title="INCRM" onPress={handleIncrement.bind(null, increment)} />
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

