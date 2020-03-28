import * as types from './types';

const fetchEvents = params => ({
  type: types.FETCH_EVENTS,
  payload: params,
});

const setEvents = events => ({
  type: types.SET_EVENTS,
  payload: events,
});

export {
  fetchEvents,
  setEvents,
};
