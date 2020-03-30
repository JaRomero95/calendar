import React, {Component} from 'react';
import {connect} from 'react-redux';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import {injectIntl, FormattedMessage} from 'react-intl';
import {eventType} from 'types/events';
import {getEventErrors} from 'store/modules/events/selectors';
import {setEventErrors} from 'store/modules/events/actions';
import AppFormError from 'components/general/AppFormError';
import eventValidator from 'lib/eventValidator';

class EventFormModal extends Component {
  constructor(props) {
    super(props);

    props.setEventErrors({});

    const initialEvent = props.event || {};

    this.state = {
      event: {
        title: '',
        description: '',
        start_date: moment().add(24, 'hours').toJSON(),
        end_date: moment().add(25, 'hours').toJSON(),
        ...initialEvent,
      },
      errors: {...props.errors},
    };

    this.changeDate = this.changeDate.bind(this);
    this.changeField = this.changeField.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    this.updateErrors(prevProps);
  }

  onSubmit(e) {
    e.preventDefault();

    const {
      state: {event},
      props: {onSubmit},
    } = this;

    const errors = eventValidator.validate(event);

    this.setState({errors}, () => {
      if (!this.hasErrors()) {
        onSubmit(event);
      }
    });
  }

  updateErrors(prevProps) {
    const {errors} = this.props;

    if (prevProps.errors !== errors) {
      this.setState({errors});
    }
  }

  hasErrors() {
    const {errors} = this.state;
    return Object.keys(errors).length > 0;
  }

  changeDate(name, dates) {
    const date = dates[0];
    const formattedDate = date ? date.toISOString() : null;

    this.changeField(name, formattedDate);
  }

  handleChange(e) {
    const {name, value} = e.target;

    this.changeField(name, value);
  }

  changeField(name, value) {
    const {
      state: {event},
    } = this;

    const newEvent = {
      ...event,
      [name]: value,
    };

    this.setState({
      event: newEvent,
    });
  }

  render() {
    const {
      handleChange,
      changeDate,
      onSubmit,
      props: {
        intl,
        modalTitle,
        confirmButtonText,
        cancelButtonText,
        cancelButtonAction,
      },
      state: {
        event,
        errors,
      },
    } = this;

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalTitle}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={onSubmit}>
            {confirmButtonText}
          </Button>

          <Button variant="secondary" onClick={cancelButtonAction}>
            {cancelButtonText}
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

EventFormModal.propTypes = {
  event: eventType,
  onSubmit: PropTypes.func.isRequired,
  setEventErrors: PropTypes.func.isRequired,
  intl: PropTypes.any.isRequired, // FIXME: en algunos lugares en any y en otros object
  errors: PropTypes.object.isRequired,
  modalTitle: PropTypes.string.isRequired,
  confirmButtonText: PropTypes.string.isRequired,
  cancelButtonText: PropTypes.string.isRequired,
  cancelButtonAction: PropTypes.func.isRequired,
};

EventFormModal.defaultProps = {
  event: null,
};


const mapStateToProps = (state, props) => ({
  errors: getEventErrors(state, props),
});

const mapDispatchToProps = dispatch => ({
  setEventErrors: errors => dispatch(setEventErrors(errors)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(EventFormModal));
