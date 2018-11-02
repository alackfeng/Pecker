/** @format */
// index.ios.js or index.android.js
// make sure you use `import` and not require!  
import './shim.js'
import crypto from 'crypto'
// ...the rest of your code

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
