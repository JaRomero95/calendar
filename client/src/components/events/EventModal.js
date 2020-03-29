import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import {eventType} from 'types/events';
import EventModalShow from './EventModalShow';
import EventModalEdit from './EventModalEdit';

class EventModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
    };

    this.setEdit = this.setEdit.bind(this);
    this.getModalComponent = this.getModalComponent.bind(this);
  }

  setEdit(value) {
    this.setState({edit: value});
  }

  getModalComponent() {
    const {edit} = this.state;

    if (edit) { return EventModalEdit; }

    return EventModalShow;
  }

  render() {
    const {
      getModalComponent,
      setEdit,
      props: {
        event,
        handleClose,
      },
    } = this;

    if (!event) { return null; }

    const ModalComponent = getModalComponent();

    return (
      <Modal
        show
        onHide={handleClose}
      >
        <ModalComponent
          event={event}
          handleClose={handleClose}
          setEdit={setEdit}
        />
      </Modal>
    );
  }
}

EventModal.propTypes = {
  event: eventType,
  handleClose: PropTypes.func.isRequired,
};

EventModal.defaultProps = {
  event: null,
};

export default EventModal;
