import React from 'react';
import {shallow} from 'enzyme';
import intl from 'spec/support/intl-mock';
import {getChildProp} from 'spec/support/finders';
import {EventModalCreate} from 'components/events/EventModalCreate';
import Modal from 'react-bootstrap/Modal';
import EventFormModal from 'components/events/EventFormModal';

const basicProps = {
  handleClose: jest.fn(),
  createEvent: jest.fn(),
  intl,
};

describe('EventModalCreate', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EventModalCreate {...basicProps} />);
  });

  it('pass handleClose to Modal', () => {
    expect(getChildProp(wrapper, Modal, 'onHide')).toEqual(basicProps.handleClose);
  });

  it('pass handleClose to EventFormModal', () => {
    expect(getChildProp(wrapper, EventFormModal, 'cancelButtonAction'))
      .toEqual(basicProps.handleClose);
  });

  it('pass createEvent to EventFormModal', () => {
    expect(getChildProp(wrapper, EventFormModal, 'onSubmit'))
      .toEqual(basicProps.createEvent);
  });
});
