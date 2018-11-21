/** @format */
// index.ios.js or index.android.js
// make sure you use `import` and not require!  
import 'babel-polyfill'
import './shim.js'
import crypto from 'crypto'

import 'ethers/dist/shims.js';
import { ethers } from 'ethers';

// ...the rest of your code

import React from 'react';
import {AppRegistry, YellowBox} from 'react-native';
import {Provider} from 'react-redux';
import store from './store/store';

import App from './App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings(['Remote debugger', 'RNOS']);

const _App = ()=>(
  <Provider store={store}>
    <App/>
  </Provider>
);

AppRegistry.registerComponent(appName, () => _App);
