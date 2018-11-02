import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import translate from '../constants/translate';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import InfosScreen from '../screens/InfosScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PeckScreen from '../screens/PeckScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: translate('Home'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `home${focused ? '' : ''}`
          : 'home'
      }
    />
  ),
};

const PeckStack = createStackNavigator({
  Pecker: PeckScreen,
});

PeckStack.navigationOptions = {
  tabBarLabel: translate('Peck'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `apple${focused ? '' : ''}` : 'apple'}
    />
  ),
};

const InfosStack = createStackNavigator({
  Infos: InfosScreen,
});

InfosStack.navigationOptions = {
  tabBarLabel: translate('Infos'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `medium${focused ? '' : ''}` : 'medium'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: translate('Settings'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `cog${focused ? '' : 's'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  InfosStack,
  PeckStack,
  SettingsStack,
});