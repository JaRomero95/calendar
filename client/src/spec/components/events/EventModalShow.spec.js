import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import {callChildProp} from 'spec/support/finders';
import {EventModalShow} from 'components/events/EventModalShow';
import AppFormattedDateTime from 'components/general/AppFormattedDateTime';

const basicProps = {
  event: {
    title: 'Test title',
    description: 'Test description',
    start_date: '2000-01-01T20:00:00.000Z',
    end_date: '2000-01-01T22:00:00.000Z',
  },
  handleClose: jest.fn(),
  setEdit: jest.fn(),
  onDelete: jest.fn(),
};

describe('EventModalShow', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EventModalShow {...basicProps} />);
  });

  describe('event data', () => {
    it('show event title', () => {
      expect(wrapper.text()).toContain(basicProps.event.title);
    });

    it('show event description', () => {
      expect(wrapper.text()).toContain(basicProps.event.description);
    });

    it('show event start_date', () => {
      const component = wrapper.find(AppFormattedDateTime).first();
      expect(component.props().date).toEqual(basicProps.event.start_date);
    });

    it('show event end_date', () => {
      const component = wrapper.find(AppFormattedDateTime).last();
      expect(component.props().date).toEqual(basicProps.event.end_date);
    });
  });

  describe('children callbacks', () => {
    it('pass setEdit to primary Button', () => {
      callChildProp(wrapper, 'Button[variant="primary"]', 'onClick');

      expect(basicProps.setEdit).toHaveBeenCalledWith(true);
    });

    it('pass handleClose to secondary Button', () => {
      callChildProp(wrapper, 'Button[variant="secondary"]', 'onClick');

      expect(basicProps.setEdit).toHaveBeenCalled();
    });

    it('pass onDelete to danger Button', () => {
      callChildProp(wrapper, 'Button[variant="outline-danger"]', 'onClick');

      expect(basicProps.onDelete).toHaveBeenCalled();
    });
  });
});
