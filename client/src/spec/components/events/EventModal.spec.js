import React from 'react';
import {shallow} from 'enzyme';
import {EventModal} from 'components/events/EventModal';

const basicProps = {
  event: {},
  handleClose: jest.fn(),
};

describe('EventModal', () => {
  it('renders without crashing', () => {
    shallow(<EventModal {...basicProps} />);
  });
});
