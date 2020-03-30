import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import API from 'api';
import * as types from './types';
import * as actions from './actions';
import * as generalActions from '../general/actions';

function* onFetchEvents() {
  yield takeLatest(types.FETCH_EVENTS, fetchEvents);
}

function* fetchEvents(action) {
  yield put(generalActions.setLoading(true));

  const events = yield call(API.events.index, action.payload);
  yield put(actions.setEvents(events));

  yield put(generalActions.setLoading(false));
}

function* onUpdateEvent() {
  yield takeLatest(types.UPDATE_EVENT, updateEvent);
}

function* updateEvent(action) {
  yield put(generalActions.setLoading(true));
  yield put(actions.setEventErrors({}));

  const [event, errors] = yield call(API.events.update, action.payload);

  if (errors) {
    yield put(actions.setEventErrors(errors));
  } else {
    yield put(actions.setEvent(event));
    yield put(actions.setEventModal(false));
  }

  yield put(generalActions.setLoading(false));
}

function* onDestroyEvent() {
  yield takeLatest(types.DESTROY_EVENT, destroyEvent);
}

function* destroyEvent(action) {
  const event = action.payload;

  yield put(generalActions.setLoading(true));

  yield call(API.events.destroy, event.id);

  yield put(actions.removeEvent(event));
  yield put(actions.setEventModal(false));

  yield put(generalActions.setLoading(false));
}

function* onCreateEvent() {
  yield takeLatest(types.CREATE_EVENT, createEvent);
}

function* createEvent(action) {
  yield put(generalActions.setLoading(true));
  yield put(actions.setEventErrors({}));

  const [event, errors] = yield call(API.events.create, action.payload);

  if (errors) {
    yield put(actions.setEventErrors(errors));
  } else {
    // FIXME: notificación se ha guardado con éxito
    yield put(actions.addEvent(event));
    yield put(actions.setCreateEventModal(false));
  }

  yield put(generalActions.setLoading(false));
}

export default function* rootSaga() {
  yield all([
    onFetchEvents(),
    onUpdateEvent(),
    onCreateEvent(),
    onDestroyEvent(),
  ]);
}
