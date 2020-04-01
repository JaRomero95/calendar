/* eslint-disable no-underscore-dangle */
import {
  applyMiddleware,
  createStore,
  combineReducers,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as reducers from './modules';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers(reducers);

const initialState = {};

const middlewares = [applyMiddleware(sagaMiddleware)];

if (window && window.__REDUX_DEVTOOLS_EXTENSION__) {
  middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(
  rootReducer,
  initialState,
  compose(...middlewares),
);

sagaMiddleware.run(rootSaga);

export default store;
