import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {eventType} from 'types/events';
import EventModalShow from './EventModalShow';
import EventModalEdit from './EventModalEdit';
import EventModalDestroy from './EventModalDestroy';

class EventModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      destroy: false,
    };

    this.setEdit = this.setEdit.bind(this);
    this.setDelete = this.setDelete.bind(this);
    this.getModalComponent = this.getModalComponent.bind(this);
  }

  setEdit(value) {
    this.setState({edit: value});
  }

  setDelete(value) {
    this.setState({destroy: value});
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
      setDelete,
      props: {
        event,
        handleClose,
      },
      state: {
        destroy,
      },
    } = this;

    const ModalComponent = getModalComponent();

    return (
      <Modal
        onHide={handleClose}
        centered
        show
      >
        {
          destroy ? (
            <EventModalDestroy
              event={event}
              handleClose={() => setDelete(false)}
            />
          ) : (
            <ModalComponent
              event={event}
              handleClose={handleClose}
              setEdit={setEdit}
              onDelete={() => setDelete(true)}
            />
          )

        }
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
