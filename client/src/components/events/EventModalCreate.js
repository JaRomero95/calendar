import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {createEvent} from 'store/modules/events/actions';
import EventFormModal from './EventFormModal';

class EventModalCreate extends Component {
  render() {
    const {
      props: {
        intl,
        createEvent,
        handleClose,
      },
    } = this;

    return (
      <Modal
        onHide={handleClose}
        centered
        show
      >
        <EventFormModal
          onSubmit={createEvent}
          modalTitle={intl.formatMessage({id: 'event.create'})}
          confirmButtonText={intl.formatMessage({id: 'general.create'})}
          cancelButtonText={intl.formatMessage({id: 'general.cancel'})}
          cancelButtonAction={handleClose}
        />
      </Modal>
    );
  }
}

EventModalCreate.propTypes = {
  handleClose: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  intl: PropTypes.any.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createEvent: event => dispatch(createEvent(event)),
});

export default connect(null, mapDispatchToProps)(injectIntl(EventModalCreate));
