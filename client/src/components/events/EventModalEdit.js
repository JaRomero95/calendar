import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';
import Button from 'react-bootstrap/Button';
import {eventType} from 'types/events';
import {updateEvent, setEventErrors} from 'store/modules/events/actions';
import {getEventErrors} from 'store/modules/events/selectors';
import EventForm from './EventForm';

class EventModalEdit extends Component {
  constructor(props) {
    super(props);

    props.setEventErrors({});

    this.state = {
      event: {...props.event},
      errors: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.setEvent = this.setEvent.bind(this);
    this.getAllErrors = this.getAllErrors.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const {updateEvent} = this.props;

    updateEvent(this.state.event);
  }

  setEvent(event) {
    this.setState({event});
  }

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
      getAllErrors,
      props: {
        setEdit,
      },
      state: {
        event,
      },
    } = this;

    if (!event) { return null; }

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="event.edit" />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EventForm
            onSubmit={onSubmit}
            onEventChange={setEvent}
            event={event}
            errors={getAllErrors()}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={onSubmit}>
            <FormattedMessage id="general.save" />
          </Button>

          <Button variant="secondary" onClick={() => setEdit(false)}>
            <FormattedMessage id="general.cancel" />
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

EventModalEdit.propTypes = {
  event: eventType.isRequired,
  setEdit: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  apiErrors: getEventErrors(state, props),
});

const mapDispatchToProps = dispatch => ({
  updateEvent: event => dispatch(updateEvent(event)),
  setEventErrors: errors => dispatch(setEventErrors(errors)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventModalEdit);
