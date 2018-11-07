import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../constants/Colors';

export class IconEx extends React.Component {
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