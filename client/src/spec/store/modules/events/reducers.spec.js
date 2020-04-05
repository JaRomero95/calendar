import * as actions from 'store/modules/events/actions';
import reducer from 'store/modules/events/reducers';

describe('Events reducers', () => {
  it('initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      events: [],
      eventErrors: {},
      showCreateEventModal: false,
      showEventModal: false,
    });
  });

  it('SET_EVENTS', () => {
    const events = [{id: 'test'}];

    expect(reducer(undefined, actions.setEvents(events))).toEqual(
      expect.objectContaining({
        events,
      }),
    );
  });

  it('SET_EVENT_ERRORS', () => {
    const eventErrors = {title: 'error title'};

    expect(reducer(undefined, actions.setEventErrors(eventErrors))).toEqual(
      expect.objectContaining({
        eventErrors,
      }),
    );
  });

  it('ADD_EVENT', () => {
    const event = {id: 'first-event'};
    const events = [event];

    const newEvent = {id: 'new-event'};

    expect(reducer({events}, actions.addEvent(newEvent))).toEqual(
      expect.objectContaining({
        events: expect.arrayContaining([event, newEvent]),
      }),
    );
  });

  it('REMOVE_EVENT', () => {
    const event = {id: 'first-event'};
    const events = [event];

    expect(reducer({events}, actions.removeEvent(event))).toEqual(
      expect.objectContaining({
        events: [],
      }),
    );
  });

  it('SET_CREATE_EVENT_MODAL', () => {
    expect(reducer({showCreateEventModal: false}, actions.setCreateEventModal(true))).toEqual(
      expect.objectContaining({
        showCreateEventModal: true,
      }),
    );
  });

  it('SET_EVENT_MODAL', () => {
    expect(reducer({showEventModal: false}, actions.setEventModal(true))).toEqual(
      expect.objectContaining({
        showEventModal: true,
      }),
    );
  });

  it('SET_EVENT_MODAL', () => {
    const eventOne = {id: 'test1', title: 'eventOne'};
    const eventTwo = {id: 'test2', title: 'eventTwo'};
    const eventUpdated = {id: eventTwo.id, title: 'eventUpdated'};

    expect(reducer({events: [eventOne, eventTwo]}, actions.setEvent(eventUpdated))).toEqual(
      expect.objectContaining({
        events: [eventOne, eventUpdated],
      }),
    );
  });
});
