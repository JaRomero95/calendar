import React from 'react';
import {shallow} from 'enzyme';
import {callChildProp} from 'spec/support/finders';
import {EventsPage} from 'components/events/EventsPage';
import EventsCalendar from 'components/events/EventsCalendar';
import EventModal from 'components/events/EventModal';
import EventModalCreate from 'components/events/EventModalCreate';
import AppCircleButton from 'components/general/AppCircleButton';

const basicProps = {
  setEventModal: jest.fn(),
  setCreateEventModal: jest.fn(),
  showEventModal: false,
  showCreateEventModal: false,
};

describe('EventsPage', () => {
  const event = {title: 'Test title'};

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EventsPage {...basicProps} />);
  });

  describe('initial render', () => {
    it('not show EventModal', () => {
      expect(wrapper.exists(EventModal)).toBeFalsy();
    });

    it('not show EventModalCreate', () => {
      expect(wrapper.exists(EventModalCreate)).toBeFalsy();
    });
  });

  describe('onSelectEvent', () => {
    beforeEach(() => {
      basicProps.setEventModal.mockClear();

      callChildProp(wrapper, EventsCalendar, 'onSelectEvent', {resource: event});
    });

    it('updates state correctly', () => {
      expect(wrapper.state('event')).toEqual(event);
    });

    it('try to open show event modal', () => {
      expect(basicProps.setEventModal).toHaveBeenCalledWith(true);
    });
  });

  describe('EventModal', () => {
    beforeEach(() => {
      wrapper.setState({event});

      wrapper.setProps({
        showEventModal: true,
        setEventModal: showEventModal => wrapper.setProps({showEventModal}),
      });
    });

    it('show modal when showEventModal prop is true', () => {
      expect(wrapper.exists(EventModal)).toBeTruthy();
    });

    it('remove event from state when close show event modal', () => {
      callChildProp(wrapper, EventModal, 'handleClose');

      expect(wrapper.state('event')).toBeNull();
    });
  });

  describe('EventModalCreate', () => {
    beforeEach(() => {
      wrapper.setProps({showCreateEventModal: true});
    });

    it('show modal when showCreateEventModal prop is true', () => {
      expect(wrapper.exists(EventModalCreate)).toBeTruthy();
    });

    it('pass closeCreateEventModal to handleClose', () => {
      callChildProp(wrapper, EventModalCreate, 'handleClose');

      expect(basicProps.setCreateEventModal).toHaveBeenCalledWith(false);
    });
  });

  describe('AppCircleButton', () => {
    it('pass openCreateEventModal to onClick', () => {
      callChildProp(wrapper, AppCircleButton, 'onClick');

      expect(basicProps.setCreateEventModal).toHaveBeenCalledWith(true);
    });
  });
});
