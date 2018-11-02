import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
// import nav from '../reducers/navReducer';
import counterReducer from '../reducers/counterReducer';
// import registerLoginReducer from '../reducers/registerLoginReducer';
// import generalReducer from '../reducers/generalReducer';
// import transferReducer from '../reducers/transferReducer';
// import addressReducer from '../reducers/addressReducer';
// import createReducer from '../reducers/createReducer';
// import voteReducer from '../reducers/voteReducer';
// import {navMiddleware} from '../navigators/appNavigator';
// import {assetSymbol} from '../services/env';

const middleware = process.env.NODE_ENV !== 'production' ?
  [thunk, ]:
  [thunk, ];

const reducer = combineReducers({
  // nav,
  counterReducer,
  // registerLoginReducer,
  // generalReducer,
  // transferReducer,
  // addressReducer,
  // createReducer,
  // voteReducer,
});

const initState = {
  counterReducer:{
    increment: 1,
  },
};

export default store = createStore(reducer, initState, applyMiddleware(...middleware))

