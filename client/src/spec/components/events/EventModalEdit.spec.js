import React from 'react';
import {shallow} from 'enzyme';
import intl from 'spec/support/intl-mock';
import {callChildProp, getChildProp} from 'spec/support/finders';
import EventFormModal from 'components/events/EventFormModal';
import {EventModalEdit} from 'components/events/EventModalEdit';

const basicProps = {
  event: {title: 'Test event'},
  setEdit: jest.fn(),
  updateEvent: jest.fn(),
  intl,
};

describe('EventModalEdit', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EventModalEdit {...basicProps} />);
  });

  it('pass event to EventFormModal', () => {
    expect(getChildProp(wrapper, EventFormModal, 'event')).toEqual(basicProps.event);
  });

  it('pass updateEvent to EventFormModal', () => {
    callChildProp(wrapper, EventFormModal, 'onSubmit');

    expect(basicProps.updateEvent).toHaveBeenCalled();
  });

  it('pass updateEvent to EventFormModal', () => {
    callChildProp(wrapper, EventFormModal, 'cancelButtonAction');

    expect(basicProps.setEdit).toHaveBeenCalledWith(false);
  });
});
