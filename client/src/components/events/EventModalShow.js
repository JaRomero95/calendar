import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';
import {eventType} from 'types/events';
import AppFormattedDateTime from 'components/general/AppFormattedDateTime';

import Button from 'react-bootstrap/Button';

class EventModalShow extends Component {
  render() {
    const {
      event,
      handleClose,
      setEdit,
      onDelete,
    } = this.props;

    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="event.show" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5><FormattedMessage id="event.fields.title" /></h5>
            <p>{event.title}</p>
          </div>

          <div>
            <h5><FormattedMessage id="event.fields.description" /></h5>
            <p>{event.description}</p>
          </div>

          <div>
            <h5><FormattedMessage id="event.fields.start_date" /></h5>
            <AppFormattedDateTime date={event.start_date} />
          </div>

          <div>
            <h5><FormattedMessage id="event.fields.end_date" /></h5>
            <AppFormattedDateTime date={event.end_date} />
          </div>

          <Button
            onClick={onDelete}
            variant="outline-danger"
            size="sm"
          >
            <FormattedMessage id="general.delete" />
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setEdit(true)}>
            <FormattedMessage id="general.edit" />
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            <FormattedMessage id="general.close" />
          </Button>
        </Modal.Footer>
      </>
    );
  }
}

EventModalShow.propTypes = {
  event: eventType.isRequired,
  handleClose: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export {EventModalShow};

export default EventModalShow;
