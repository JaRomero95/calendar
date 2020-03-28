import moment from 'moment';
import {createSelector} from 'reselect';

const getEvents = state => state.events.events;

const getFormattedEvents = createSelector(
  [getEvents],
  events => events.map(event => ({
    title: event.title,
    start: new Date(event.start_date),
    end: new Date(event.end_date),
  })),
);


export {
  getEvents,
  getFormattedEvents,
};
