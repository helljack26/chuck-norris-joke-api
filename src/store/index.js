import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { chuckApi } from './chuckApi/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ chuckApi }),
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
