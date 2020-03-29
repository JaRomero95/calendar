import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import {FormattedMessage} from 'react-intl';
import EventForm from './EventForm';
import {getEventErrors} from 'store/modules/events/selectors';
import {createEvent, setEventErrors} from 'store/modules/events/actions';

class EventModalCreate extends Component {
  constructor(props) {
    super(props);

    props.setEventErrors({});

    this.state = {
      event: {
        title: '',
        description: '',
        start_date: moment().add(24, 'hours').toJSON(),
        end_date: moment().add(25, 'hours').toJSON(),
      },
      errors: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.setEvent = this.setEvent.bind(this);
    this.getAllErrors = this.getAllErrors.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const {createEvent} = this.props;

    // if (this.hasErrors()) {
    //   return;
    // }

    createEvent(this.state.event);
  }

  setErrors(errors) {
    this.setState({errors});
  }

  setEvent(event) {
    this.setState({event});
  }

  // hasErrors() {
  //   return Object.keys(this.state.errors).length > 0;
  // }

  getAllErrors() {
    return {
      ...this.state.errors,
      ...this.props.apiErrors,
    };
  }

  render() {
    const {
      onSubmit,
      setEvent,
      setErrors,
      getAllErrors,
      props: {
        handleClose,
      },
      state: {
        event,
      },
    } = this;

    return (
      <Modal
        show
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="event.edit" />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EventForm
            onSubmit={onSubmit}
            onEventChange={setEvent}
            onErrorsChange={setErrors}
            event={event}
            errors={getAllErrors()}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={onSubmit}>
            <FormattedMessage id="general.save" />
          </Button>

          <Button variant="secondary" onClick={handleClose}>
            <FormattedMessage id="general.cancel" />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EventModalCreate.propTypes = {
  handleClose: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  apiErrors: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  apiErrors: getEventErrors(state, props),
});

const mapDispatchToProps = dispatch => ({
  createEvent: event => dispatch(createEvent(event)),
  setEventErrors: errors => dispatch(setEventErrors(errors)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventModalCreate);
