import {all} from 'redux-saga/effects';
import {sagas as eventSagas} from './modules/events';

export default function* rootSaga() {
  yield all([
    eventSagas(),
  ]);
}
