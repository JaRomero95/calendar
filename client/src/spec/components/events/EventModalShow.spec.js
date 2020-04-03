import React from 'react';
import {shallow} from 'enzyme';
import {EventModalShow} from 'components/events/EventModalShow';

const basicProps = {
  event: {},
  handleClose: jest.fn(),
  setEdit: jest.fn(),
  onDelete: jest.fn(),
};

describe('EventModalShow', () => {
  it('renders without crashing', () => {
    shallow(<EventModalShow {...basicProps} />);
  });
});
