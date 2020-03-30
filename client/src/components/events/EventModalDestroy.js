import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {eventType} from 'types/events';
import {destroyEvent} from 'store/modules/events/actions';

import Button from 'react-bootstrap/Button';

class EventModalDestroy extends Component {
  render() {
    const {
      event,
      handleClose,
      destroyEvent,
    } = this.props;

    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="event.delete" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormattedMessage id="event.confirmDelete" />
          <p><strong>{event.title}</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => destroyEvent(event)}>
            <FormattedMessage id="general.delete" />
          </Button>

          <Button variant="secondary" onClick={handleClose}>
            <FormattedMessage id="general.cancel" />
          </Button>
        </Modal.Footer>
      </>
    );
  }
}

EventModalDestroy.propTypes = {
  event: eventType.isRequired,
  handleClose: PropTypes.func.isRequired,
  destroyEvent: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  destroyEvent: event => dispatch(destroyEvent(event)),
});

export default connect(null, mapDispatchToProps)(EventModalDestroy);
