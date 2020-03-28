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

const middlewares = compose(
  applyMiddleware(sagaMiddleware),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const store = createStore(
  rootReducer,
  initialState,
  middlewares,
);

sagaMiddleware.run(rootSaga);

export default store;
