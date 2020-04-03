import React from 'react';
import {shallow} from 'enzyme';
import intl from 'spec/support/intl-mock';
import {EventModalEdit} from 'components/events/EventModalEdit';

const basicProps = {
  event: {},
  setEdit: jest.fn(),
  updateEvent: jest.fn(),
  intl,
};

describe('EventModalEdit', () => {
  it('renders without crashing', () => {
    shallow(<EventModalEdit {...basicProps} />);
  });
});
