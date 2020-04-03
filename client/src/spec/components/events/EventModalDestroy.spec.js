import React from 'react';
import {shallow} from 'enzyme';
import {EventModalDestroy} from 'components/events/EventModalDestroy';

const basicProps = {
  event: {},
  handleClose: jest.fn(),
  destroyEvent: jest.fn(),
};

describe('EventModalDestroy', () => {
  it('renders without crashing', () => {
    shallow(<EventModalDestroy {...basicProps} />);
  });
});
