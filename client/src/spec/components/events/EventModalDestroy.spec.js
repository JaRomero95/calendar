import React from 'react';
import {shallow} from 'enzyme';
import {callChildProp} from 'spec/support/finders';
import {EventModalDestroy} from 'components/events/EventModalDestroy';

const basicProps = {
  event: {title: 'Test title'},
  handleClose: jest.fn(),
  destroyEvent: jest.fn(),
};

describe('EventModalDestroy', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EventModalDestroy {...basicProps} />);
  });

  it('show event title', () => {
    expect(wrapper.text()).toContain(basicProps.event.title);
  });

  it('pass destroyEvent to Modal Button', () => {
    callChildProp(wrapper, 'Button[variant="danger"]', 'onClick');

    expect(basicProps.destroyEvent).toHaveBeenCalledWith(basicProps.event);
  });

  it('pass handleClose to Modal Button', () => {
    callChildProp(wrapper, 'Button[variant="secondary"]', 'onClick');

    expect(basicProps.handleClose).toHaveBeenCalled();
  });
});
