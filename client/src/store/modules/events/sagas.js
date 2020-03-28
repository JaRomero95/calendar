import {all, takeLatest} from 'redux-saga/effects';
import API from 'api';
import * as types from './types';

// export default function* onFetchRecords() {
//   yield takeLatest('RECORDS/FETCH', function fetchRecords() {

//     try {
//         const response = yield call(fetch, 'https://api.service.com/endpoint');
//         const responseBody = response.json();
//     } catch (e) {
//         yield put(fetchFailed(e));
//         return;
//     }

//     yield put(setRecords(responseBody.records));
//   });
// }
function* onFetchEvents() {
  yield takeLatest(types.FETCH_EVENTS, fetchEvents);
}

function* fetchEvents() {
  const events = yield API.events.index({});
  console.log('events :', events);
}

export default function* rootSaga() {
  yield all([
    onFetchEvents(),
  ]);
}
