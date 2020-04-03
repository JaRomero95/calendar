import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getShowCreateEventModal, getShowEventModal} from 'store/modules/events/selectors';
import {setEventModal, setCreateEventModal} from 'store/modules/events/actions';
import EventsCalendar from './EventsCalendar';
import EventModal from './EventModal';
import EventModalCreate from './EventModalCreate';
import AppCircleButton from 'components/general/AppCircleButton';

class EventsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEventModal: false,
      showCreateEventModal: false,
      event: null,
    };

    this.onSelectEvent = this.onSelectEvent.bind(this);
    this.closeShowEventModal = this.closeShowEventModal.bind(this);
    this.openShowEventModal = this.openShowEventModal.bind(this);
    this.openCreateEventModal = this.openCreateEventModal.bind(this);
    this.closeCreateEventModal = this.closeCreateEventModal.bind(this);
  }

  onSelectEvent({resource}) {
    this.openShowEventModal(resource);
  }

  openShowEventModal(event) {
    this.setState({event});
    this.props.setEventModal(true);
  }

  closeShowEventModal() {
    this.setState({event: null});
    this.props.setEventModal(false);
  }

  openCreateEventModal() {
    this.props.setCreateEventModal(true);
  }

  closeCreateEventModal() {
    this.props.setCreateEventModal(false);
  }

  render() {
    const {
      closeShowEventModal,
      openCreateEventModal,
      closeCreateEventModal,
      onSelectEvent,
      props: {
        showEventModal,
        showCreateEventModal,
      },
      state: {
        event,
      },
    } = this;

    return (
      <div>
        <EventsCalendar
          onSelectEvent={onSelectEvent}
        />

        { showEventModal ? <EventModal event={event} handleClose={closeShowEventModal} /> : null }

        { showCreateEventModal ? <EventModalCreate handleClose={closeCreateEventModal} /> : null }

        <AppCircleButton
          variant="primary"
          className="btn-circle"
          onClick={openCreateEventModal}
        >
          +
        </AppCircleButton>
      </div>
    );
  }
}

EventsPage.propTypes = {
  setEventModal: PropTypes.func.isRequired,
  setCreateEventModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  showEventModal: getShowEventModal(state, props),
  showCreateEventModal: getShowCreateEventModal(state, props),
});

const mapDispatchToProps = dispatch => ({
  setEventModal: value => dispatch(setEventModal(value)),
  setCreateEventModal: value => dispatch(setCreateEventModal(value)),
});

export {EventsPage};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
