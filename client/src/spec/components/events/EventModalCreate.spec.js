import React from 'react';
import {shallow} from 'enzyme';
import intl from 'spec/support/intl-mock';
import {EventModalCreate} from 'components/events/EventModalCreate';

const basicProps = {
  handleClose: jest.fn(),
  createEvent: jest.fn(),
  intl,
};

describe('EventModalCreate', () => {
  it('renders without crashing', () => {
    shallow(<EventModalCreate {...basicProps} />);
  });
});
