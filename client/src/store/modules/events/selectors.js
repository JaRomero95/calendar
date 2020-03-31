import {createSelector} from 'reselect';

const getEvents = state => state.events.events;

const getEventErrors = state => state.events.eventErrors;

const getShowCreateEventModal = state => state.events.showCreateEventModal;

const getShowEventModal = state => state.events.showEventModal;

const getFormattedEvents = createSelector(
  [getEvents],
  events => events.map(event => ({
    title: event.title,
    start: new Date(event.start_date),
    end: new Date(event.end_date),
    allDay: false,
    resource: event,
  })),
);

export {
  getEvents,
  getEventErrors,
  getShowEventModal,
  getShowCreateEventModal,
  getFormattedEvents,
};
