import * as actions from 'store/modules/events/actions';
import * as types from 'store/modules/events/types';

describe('Events actions', () => {
  it('fetchEvents', () => {
    const params = {test: 'action test'};

    const expectedAction = {
      type: types.FETCH_EVENTS,
      payload: params,
    };

    expect(actions.fetchEvents(params)).toEqual(expectedAction);
  });

  it('updateEvent', () => {
    const params = {test: 'action test'};

    const expectedAction = {
      type: types.UPDATE_EVENT,
      payload: params,
    };

    expect(actions.updateEvent(params)).toEqual(expectedAction);
  });

  it('createEvent', () => {
    const params = {test: 'action test'};

    const expectedAction = {
      type: types.CREATE_EVENT,
      payload: params,
    };

    expect(actions.createEvent(params)).toEqual(expectedAction);
  });

  it('destroyEvent', () => {
    const params = {test: 'action test'};

    const expectedAction = {
      type: types.DESTROY_EVENT,
      payload: params,
    };

    expect(actions.destroyEvent(params)).toEqual(expectedAction);
  });

  it('removeEvent', () => {
    const params = {test: 'action test'};

    const expectedAction = {
      type: types.REMOVE_EVENT,
      payload: params,
    };

    expect(actions.removeEvent(params)).toEqual(expectedAction);
  });

  it('setEvents', () => {
    const params = {test: 'action test'};

    const expectedAction = {
      type: types.SET_EVENTS,
      payload: params,
    };

    expect(actions.setEvents(params)).toEqual(expectedAction);
  });

  it('setEvent', () => {
    const params = {test: 'action test'};

    const expectedAction = {
      type: types.SET_EVENT,
      payload: params,
    };

    expect(actions.setEvent(params)).toEqual(expectedAction);
  });

  it('addEvent', () => {
    const params = {test: 'action test'};

    const expectedAction = {
      type: types.ADD_EVENT,
      payload: params,
    };

    expect(actions.addEvent(params)).toEqual(expectedAction);
  });

  it('setEventErrors', () => {
    const params = {test: 'action test'};

    const expectedAction = {
      type: types.SET_EVENT_ERRORS,
      payload: params,
    };

    expect(actions.setEventErrors(params)).toEqual(expectedAction);
  });

  it('setCreateEventModal', () => {
    const params = {test: 'action test'};

    const expectedAction = {
      type: types.SET_CREATE_EVENT_MODAL,
      payload: params,
    };

    expect(actions.setCreateEventModal(params)).toEqual(expectedAction);
  });

  it('setEventModal', () => {
    const params = {test: 'action test'};

    const expectedAction = {
      type: types.SET_EVENT_MODAL,
      payload: params,
    };

    expect(actions.setEventModal(params)).toEqual(expectedAction);
  });
});
