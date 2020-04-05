import React from 'react';
import {shallow, mount} from 'enzyme';
import intl from 'spec/support/intl-mock';
import {EventFormModal} from 'components/events/EventFormModal';
import eventValidator from 'lib/eventValidator';

jest.mock('lib/eventValidator');

const basicProps = {
  onSubmit: jest.fn(),
  setEventErrors: jest.fn(),
  errors: {},
  modalTitle: '',
  confirmButtonText: '',
  cancelButtonText: '',
  cancelButtonAction: jest.fn(),
  intl,
};

describe('EventFormModal', () => {
  let wrapper;

  beforeEach(() => {
    eventValidator.validate = () => ({});

    wrapper = shallow(<EventFormModal {...basicProps} />);
  });

  describe('form errors', () => {
    it('show title errors', () => {
      expectShowFieldErrors('title');
    });

    it('show description errors', () => {
      expectShowFieldErrors('description');
    });

    it('show start_date errors', () => {
      expectShowFieldErrors('start_date');
    });

    it('show end_date errors', () => {
      expectShowFieldErrors('end_date');
    });

    it('remove errors on props update', () => {
      const wrapper = wrapperWithErrors({title: 'error message'});

      wrapper.setProps({errors: {}});

      expect(findErrorField(wrapper, 'title')).toEqual('');
    });
  });

  describe('handle form inputs', () => {
    it('updates title successfully', () => {
      expectChangeInput(wrapper, 'title');
    });

    it('updates description successfully', () => {
      expectChangeInput(wrapper, 'description');
    });

    it('updates start_date successfully', () => {
      expectChangeDate(wrapper, 'start_date');
    });

    it('updates end_date successfully', () => {
      expectChangeDate(wrapper, 'end_date');
    });
  });

  describe('onSubmit', () => {
    let event;

    beforeEach(() => {
      event = {title: 'Event title'};

      wrapper.setState({event});
    });

    it('submit event when has not errors', () => {
      submitForm(wrapper);

      expect(basicProps.onSubmit).toHaveBeenCalledWith(event);
    });

    describe('with event errors', () => {
      const errors = {title: 'error'};

      beforeEach(() => {
        eventValidator.validate = () => (errors);

        submitForm(wrapper);
      });

      it('not submit event when has errors', () => {
        expect(basicProps.onSubmit).toHaveBeenCalledWith(event);
      });

      it('updates errors', () => {
        expect(wrapper.state('errors')).toEqual(errors);
      });
    });
  });
});

function expectShowFieldErrors(errorField) {
  const error = `${errorField} error message`;

  const wrapper = wrapperWithErrors({[errorField]: error});

  expect(findErrorField(wrapper, errorField)).toEqual(error);
}

function wrapperWithErrors(errors) {
  const props = {
    ...basicProps,
    errors,
  };

  return shallow(<EventFormModal {...props} />);
}

function findErrorField(wrapper, fieldName) {
  const errorElement = wrapper.find(`[data-test="${fieldName}"]`);

  return errorElement.dive().text();
}

function submitForm(wrapper) {
  wrapper.find('Form').simulate('submit', {preventDefault: () => null});
}

function expectChangeInput(wrapper, fieldName) {
  const value = `New ${fieldName} value`;

  expectChangeControl(
    wrapper,
    fieldName,
    value,
    {
      target: {
        name: fieldName,
        value,
      },
    },
  );
}

function expectChangeDate(wrapper, fieldName) {
  const value = new Date();

  expectChangeControl(
    wrapper,
    fieldName,
    value.toISOString(),
    [value],
  );
}

function expectChangeControl(wrapper, fieldName, value, event) {
  const field = formField(wrapper, fieldName);

  field.simulate('change', event);

  expect(wrapper.state().event[fieldName]).toEqual(value);
}

function formField(wrapper, fieldName) {
  return wrapper.find(`[name="${fieldName}"]`);
}
