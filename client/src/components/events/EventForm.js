import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import {injectIntl, FormattedMessage} from 'react-intl';
import {eventType} from 'types/events';
import AppFormError from 'components/general/AppFormError';

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {...props.event},
    };

    this.changeField = this.changeField.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;

    this.changeField(name, value);
  }

  changeDate(name, dates) {
    const date = dates[0];
    const formattedDate = date ? date.toISOString() : null;

    this.changeField(name, formattedDate);
  }

  changeField(name, value) {
    const {
      props: {onEventChange},
      state: {event},
    } = this;

    const newEvent = {
      ...event,
      [name]: value,
    };

    this.setState({
      event: newEvent,
    });

    onEventChange(newEvent);
  }

  render() {
    const {
      handleChange,
      changeDate,
      props: {
        onSubmit,
        intl,
        errors,
      },
      state: {
        event,
      },
    } = this;

    return (
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>
            <FormattedMessage id="event.fields.title" />
          </Form.Label>

          <Form.Control
            placeholder={intl.formatMessage({id: 'event.fields.title'})}
            onChange={handleChange}
            value={event.title}
            name="title"
            type="text"
          />

          <AppFormError>{errors.title}</AppFormError>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            <FormattedMessage id="event.fields.description" />
          </Form.Label>

          <Form.Control
            as="textarea"
            placeholder={intl.formatMessage({id: 'event.fields.description'})}
            onChange={handleChange}
            value={event.description}
            name="description"
          />

          <AppFormError>{errors.description}</AppFormError>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            <FormattedMessage id="event.fields.start_date" />
          </Form.Label>

          <div>
            <Flatpickr
              value={event.start_date}
              options={{enableTime: true}}
              onChange={date => changeDate('start_date', date)}
            />
          </div>

          <AppFormError>{errors.start_date}</AppFormError>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            <FormattedMessage id="event.fields.end_date" />
          </Form.Label>

          <div>
            <Flatpickr
              value={event.end_date}
              options={{enableTime: true}}
              onChange={date => changeDate('end_date', date)}
            />
          </div>

          <AppFormError>{errors.end_date}</AppFormError>
        </Form.Group>
      </Form>
    );
  }
}

EventForm.propTypes = {
  event: eventType.isRequired,
  onEventChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  intl: PropTypes.any.isRequired,
  errors: PropTypes.object.isRequired,
};

export default injectIntl(EventForm);
