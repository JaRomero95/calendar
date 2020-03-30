import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {eventType} from 'types/events';
import {updateEvent} from 'store/modules/events/actions';
import EventFormModal from './EventFormModal';
import {injectIntl} from 'react-intl';

class EventModalEdit extends Component {
  render() {
    const {
      props: {
        setEdit,
        updateEvent,
        event,
        intl,
      },
    } = this;

    return (
      <EventFormModal
        event={event}
        onSubmit={updateEvent}
        modalTitle={intl.formatMessage({id: 'event.create'})}
        confirmButtonText={intl.formatMessage({id: 'general.save'})}
        cancelButtonText={intl.formatMessage({id: 'general.cancel'})}
        cancelButtonAction={() => setEdit(false)}
      />
    );
  }
}

EventModalEdit.propTypes = {
  event: eventType.isRequired,
  setEdit: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateEvent: event => dispatch(updateEvent(event)),
});

export default connect(null, mapDispatchToProps)(injectIntl(EventModalEdit));
