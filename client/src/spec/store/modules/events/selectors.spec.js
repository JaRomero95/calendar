import * as selectors from 'store/modules/events/selectors';

describe('Events selectors', () => {
  const event = {
    title: 'test title',
    description: 'test description',
    start_date: '2020-01-01T00:00:00.000Z',
    end_date: '2020-01-01T00:02:00.000Z',
  };

  const eventErrors = {title: 'error title'};

  const state = {
    events: {
      events: [event],
      eventErrors,
      showCreateEventModal: true,
      showEventModal: false,
    },
  };

  it('getEvents', () => {
    expect(selectors.getEvents(state)).toEqual(state.events.events);
  });

  it('getFormattedEvents', () => {
    expect(selectors.getFormattedEvents(state)).toEqual([
      {
        title: event.title,
        start: new Date(event.start_date),
        end: new Date(event.end_date),
        allDay: false,
        resource: event,
      },
    ]);
  });

  it('getEventErrors', () => {
    expect(selectors.getEventErrors(state)).toEqual(state.events.eventErrors);
  });

  it('getShowCreateEventModal', () => {
    expect(selectors.getShowCreateEventModal(state)).toBeTruthy();
  });

  it('getShowEventModal', () => {
    expect(selectors.getShowEventModal(state)).toBeFalsy();
  });
});
