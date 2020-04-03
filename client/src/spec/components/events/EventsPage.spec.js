import React from 'react';
import {shallow} from 'enzyme';
import {EventsPage} from 'components/events/EventsPage';

const basicProps = {
  setEventModal: jest.fn(),
  setCreateEventModal: jest.fn(),
};

describe('EventsPage', () => {
  it('renders without crashing', () => {
    shallow(<EventsPage {...basicProps} />);
  });
});
