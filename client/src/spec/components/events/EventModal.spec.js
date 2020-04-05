import React from 'react';
import {shallow} from 'enzyme';
import {EventModal} from 'components/events/EventModal';
import EventModalShow from 'components/events/EventModalShow';
import EventModalEdit from 'components/events/EventModalEdit';
import EventModalDestroy from 'components/events/EventModalDestroy';

const basicProps = {
  event: {},
  handleClose: jest.fn(),
};

describe('EventFormModal', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EventModal {...basicProps} />);
  });

  describe('Child modal component', () => {
    it('renders EventModalShow by default', () => {
      expect(getModal(wrapper).type()).toEqual(EventModalShow);
    });

    it('renders EventModalDestroy when EventModalShow receive onDelete', () => {
      executeCallback(wrapper, EventModalShow, 'onDelete');

      expect(getModal(wrapper).type()).toEqual(EventModalDestroy);
    });

    it('renders EventModalShow when EventModalDestroy is closed', () => {
      wrapper.instance().setDelete(true);

      executeCallback(wrapper, EventModalDestroy, 'handleClose');

      expect(getModal(wrapper).type()).toEqual(EventModalShow);
    });

    it('renders EventModalEdit when EventModalShow receive setEdit', () => {
      executeCallback(wrapper, EventModalShow, 'setEdit', true);

      expect(getModal(wrapper).type()).toEqual(EventModalEdit);
    });

    it('renders EventModalShow when EventModalEdit is closed', () => {
      wrapper.instance().setEdit(true);

      executeCallback(wrapper, EventModalEdit, 'setEdit', false);

      expect(getModal(wrapper).type()).toEqual(EventModalShow);
    });

    describe('pass event prop', () => {
      it('to EventModalShow', () => {
        expect(getEvent(wrapper, EventModalShow)).toEqual(basicProps.event);
      });

      it('to EventModalDestroy', () => {
        wrapper.instance().setDelete(true);

        expect(getEvent(wrapper, EventModalDestroy)).toEqual(basicProps.event);
      });

      it('to EventModalEdit', () => {
        wrapper.instance().setEdit(true);

        expect(getEvent(wrapper, EventModalEdit)).toEqual(basicProps.event);
      });
    });
  });
});

function getModal(wrapper) {
  return wrapper.children().first();
}

function executeCallback(wrapper, element, callbackName, event) {
  wrapper.find(element).prop(callbackName)(event);
}

function getEvent(wrapper, modal) {
  return wrapper.find(modal).props().event;
}
