import * as types from './types';

const fetchEvents = params => ({
  type: types.FETCH_EVENTS,
  payload: params,
});

const updateEvent = event => ({
  type: types.UPDATE_EVENT,
  payload: event,
});

const createEvent = event => ({
  type: types.CREATE_EVENT,
  payload: event,
});

const setEvents = events => ({
  type: types.SET_EVENTS,
  payload: events,
});

const setEvent = event => ({
  type: types.SET_EVENT,
  payload: event,
});

const addEvent = event => ({
  type: types.ADD_EVENT,
  payload: event,
});

const setEventErrors = errors => ({
  type: types.SET_EVENT_ERRORS,
  payload: errors,
});

const setCreateEventModal = value => ({
  type: types.SET_CREATE_EVENT_MODAL,
  payload: value,
});

const setEventModal = value => ({
  type: types.SET_EVENT_MODAL,
  payload: value,
});

export {
  fetchEvents,
  updateEvent,
  createEvent,
  setEvents,
  setEvent,
  addEvent,
  setEventErrors,
  setCreateEventModal,
  setEventModal,
};
