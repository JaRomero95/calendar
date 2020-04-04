import React from 'react';
import {shallow} from 'enzyme';
import {callChildProp} from 'spec/support/finders';
import {EventsCalendar} from 'components/events/EventsCalendar';
import dateRangeCalculator from 'lib/dateRangeCalculator';
import moment from 'moment';

jest.mock('lib/dateRangeCalculator');

const basicProps = {
  events: [],
  fetchEvents: jest.fn(),
  onSelectEvent: jest.fn(),
};

const OriginalDate = Date.now;

describe('EventModalShow', () => {
  let wrapper;

  beforeEach(() => {
    dateRangeCalculator.month = () => ({test: 'month'});
    dateRangeCalculator.week = () => ({test: 'week'});
    dateRangeCalculator.day = () => ({test: 'day'});
    dateRangeCalculator.agenda = () => ({test: 'agenda'});

    global.Date.now = jest.fn(() => new Date('2010-01-19T10:00:00Z').getTime());

    wrapper = shallow(<EventsCalendar {...basicProps} />);

    global.Date.now = OriginalDate;
  });

  describe('fetch events', () => {
    it('loads events when mounted', () => {
      expect(basicProps.fetchEvents).toHaveBeenCalled();
    });

    it('fetch events with correct start date from', () => {
      const params = getFetchEventsArgument(basicProps.fetchEvents);
      const expectedDate = moment('2010-01-01T00:00:00Z');

      expect(params.startDateFrom.isSame(expectedDate)).toBeTruthy();
    });

    it('fetch events with correct start date until', () => {
      const params = getFetchEventsArgument(basicProps.fetchEvents);
      const expectedDate = moment('2010-01-31T23:59:59.999Z');

      expect(params.startDateUntil.isSame(expectedDate)).toBeTruthy();
    });
  });

  describe('onRangeChange', () => {
    it('correct delegation when type is month', () => {
      expectOnRangeChangeStateSuccessfully(wrapper, 'month');
    });

    it('correct delegation when type is week', () => {
      expectOnRangeChangeStateSuccessfully(wrapper, 'week');
    });

    it('correct delegation when type is day', () => {
      expectOnRangeChangeStateSuccessfully(wrapper, 'day');
    });

    it('correct delegation when type is agenda', () => {
      expectOnRangeChangeStateSuccessfully(wrapper, 'agenda');
    });

    it('fetch events again', () => {
      basicProps.fetchEvents.mockClear();

      triggerOnRangeChange(wrapper, 'month');

      expect(basicProps.fetchEvents).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSelectEvent', () => {
    it('pass correct prop callback', () => {
      callChildProp(wrapper, 'AppCalendar', 'onSelectEvent');

      expect(basicProps.onSelectEvent).toHaveBeenCalled();
    });
  });
});

function getFetchEventsArgument(mock) {
  return mock.mock.calls[0][0];
}

function expectOnRangeChangeStateSuccessfully(wrapper, type) {
  triggerOnRangeChange(wrapper, type);

  expect(wrapper.state()).toEqual(expect.objectContaining({
    type,
    test: type,
  }));
}

function triggerOnRangeChange(wrapper, type) {
  callChildProp(wrapper, 'AppCalendar', 'onRangeChange', null, type);
}
