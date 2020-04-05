import {expectSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as generalTypes from 'store/modules/general/types';
import * as actions from 'store/modules/events/actions';
import saga from 'store/modules/events/sagas';
import API from 'api';

describe('Events sagas', () => {
  let sagaAction;

  describe('onFetchEvents', () => {
    const events = [{title: 'test event'}];

    beforeEach(() => {
      sagaAction = expectSaga(saga)
        .provide([
          [matchers.call.fn(API.events.index), events],
        ])
        .dispatch(actions.fetchEvents({}));
    });

    it('put events', () => {
      return sagaAction
        .put(actions.setEvents(events))
        .silentRun();
    });

    it('put loading in correct order', async () => {
      expectHandleLoadingState(sagaAction);
    });
  });

  describe('onUpdateEvent', () => {
    const event = {title: 'test event'};

    beforeEach(() => {
      sagaAction = expectSaga(saga)
        .dispatch(actions.updateEvent({}));
    });

    describe('when api returns an event', () => {
      beforeEach(() => {
        sagaAction = sagaAction.provide([
          [matchers.call.fn(API.events.update), [event, null]],
        ]);
      });

      it('put event', () => {
        return sagaAction
          .put(actions.setEvent(event))
          .silentRun();
      });

      it('put event errors', () => {
        return sagaAction
          .put(actions.setEventErrors({}))
          .silentRun();
      });

      it('put event modal', () => {
        return sagaAction
          .put(actions.setEventModal(false))
          .silentRun();
      });

      it('put loading in correct order', async () => {
        expectHandleLoadingState(sagaAction);
      });
    });

    describe('when api returns errors', () => {
      const errors = {title: "Can't be blank"};

      beforeEach(() => {
        sagaAction = sagaAction.provide([
          [matchers.call.fn(API.events.update), [null, errors]],
        ]);
      });

      it('not put event', () => {
        return sagaAction
          .not.put(actions.setEvent(event))
          .silentRun();
      });

      it('put event errors', () => {
        return sagaAction
          .put(actions.setEventErrors(errors))
          .silentRun();
      });

      it('not put event modal', () => {
        return sagaAction
          .not.put(actions.setEventModal(false))
          .silentRun();
      });

      it('put loading in correct order', async () => {
        expectHandleLoadingState(sagaAction);
      });
    });
  });

  describe('onCreateEvent', () => {
    const event = {title: 'test event'};

    beforeEach(() => {
      sagaAction = expectSaga(saga)
        .dispatch(actions.createEvent({}));
    });

    describe('when api returns an event', () => {
      beforeEach(() => {
        sagaAction = sagaAction.provide([
          [matchers.call.fn(API.events.create), [event, null]],
        ]);
      });

      it('put event', () => {
        return sagaAction
          .put(actions.addEvent(event))
          .silentRun();
      });

      it('put event errors', () => {
        return sagaAction
          .put(actions.setEventErrors({}))
          .silentRun();
      });

      it('put event modal', () => {
        return sagaAction
          .put(actions.setCreateEventModal(false))
          .silentRun();
      });

      it('put loading in correct order', async () => {
        expectHandleLoadingState(sagaAction);
      });
    });

    describe('when api returns errors', () => {
      const errors = {title: "Can't be blank"};

      beforeEach(() => {
        sagaAction = sagaAction.provide([
          [matchers.call.fn(API.events.create), [null, errors]],
        ]);
      });

      it('not put event', () => {
        return sagaAction
          .not.put(actions.addEvent(event))
          .silentRun();
      });

      it('put event errors', () => {
        return sagaAction
          .put(actions.setEventErrors(errors))
          .silentRun();
      });

      it('not put event modal', () => {
        return sagaAction
          .not.put(actions.setCreateEventModal(false))
          .silentRun();
      });

      it('put loading in correct order', async () => {
        expectHandleLoadingState(sagaAction);
      });
    });
  });

  describe('onDestroyEvent', () => {
    const event = {title: 'test title'};

    beforeEach(() => {
      sagaAction = expectSaga(saga)
        .dispatch(actions.destroyEvent(event))
        .provide([
          [matchers.call.fn(API.events.destroy)],
        ]);
    });

    it('put remove event', () => {
      return sagaAction
        .put(actions.removeEvent(event))
        .silentRun();
    });

    it('put event modal', () => {
      return sagaAction
        .put(actions.setEventModal(false))
        .silentRun();
    });

    it('put loading in correct order', async () => {
      expectHandleLoadingState(sagaAction);
    });
  });
});

async function expectHandleLoadingState(sagaAction) {
  const {allEffects} = await sagaAction.silentRun();

  const loadingStartIndex = findActionIndex(allEffects, generalTypes.SET_LOADING, true);
  const loadingEndIndex = findActionIndex(allEffects, generalTypes.SET_LOADING, false);

  expect(loadingEndIndex).toBeGreaterThan(loadingStartIndex);
}

function findActionIndex(effects, type, value) {
  return effects.findIndex(effect => {
    const {action} = effect.payload;

    if (!action) { return false; }

    return action.type === type && action.value === value;
  });
}
