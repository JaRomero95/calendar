import React from 'react';
import {shallow} from 'enzyme';
import {EventsCalendar} from 'components/events/EventsCalendar';

const basicProps = {
  events: [],
  fetchEvents: jest.fn(),
  onSelectEvent: jest.fn(),
};

describe('EventsCalendar', () => {
  it('renders without crashing', () => {
    shallow(<EventsCalendar {...basicProps} />);
  });
});
