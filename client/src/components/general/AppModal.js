import React, {Component} from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

const modalStyle = {
  overlay: {
    zIndex: 4,
  },
  content: {
    // zIndex: 99999,
  },
};

const ModalTitle = styled.h2``;
const ModalContent = styled.div``;
const ModalFooter = styled.div``;
const ModalButton = styled.button``;

class AppModal extends Component {
  render() {
    const {
      onClose,
      children,
      show,
    } = this.props;

    return (
      <Modal
        isOpen={show}
        style={modalStyle}
      >
        <ModalTitle>
          Hello world
        </ModalTitle>

        <hr />

        {children}

        <ModalFooter>
          <ModalButton
            onClick={() => onClose()}
          >
            Close
          </ModalButton>
        </ModalFooter>
      </Modal>
    );
  }
}

AppModal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AppModal;
