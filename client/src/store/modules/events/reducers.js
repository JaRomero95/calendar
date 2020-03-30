import * as types from './types';
import createReducer from '../../createReducer';

const initialState = {
  events: [],
  eventErrors: {},
  showCreateEventModal: false,
  showEventModal: false,
};

const reducer = createReducer(initialState)({
  [types.SET_EVENTS]: (state, {payload}) => ({
    ...state,
    events: payload,
  }),
  [types.SET_EVENT_ERRORS]: (state, {payload}) => ({
    ...state,
    eventErrors: payload,
  }),
  [types.ADD_EVENT]: (state, {payload}) => ({
    ...state,
    events: [...state.events, payload],
  }),
  [types.REMOVE_EVENT]: (state, {payload}) => ({
    ...state,
    events: state.events.filter(event => event.id !== payload.id),
  }),
  [types.SET_CREATE_EVENT_MODAL]: (state, {payload}) => ({
    ...state,
    showCreateEventModal: payload,
  }),
  [types.SET_EVENT_MODAL]: (state, {payload}) => ({
    ...state,
    showEventModal: payload,
  }),
  [types.SET_EVENT]: (state, {payload}) => {
    const updatedEvent = payload;

    const newEventsArray = state.events.map(event => {
      const eventsAreEqual = event.id === updatedEvent.id;

      return eventsAreEqual ? updatedEvent : event;
    });

    return {
      ...state,
      events: newEventsArray,
    };
  },
});

export default reducer;
