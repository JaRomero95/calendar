import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-bootstrap/Toast';
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {getToast} from 'store/modules/general/selectors';

const StyledToast = styled(Toast)`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
`;

const StyledAlert = styled(Alert)`
  margin-bottom: 0;
  min-width: 250px;
  text-align: center;
`;

class AppToast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.setShow = this.setShow.bind(this);
    this.resetToast = this.resetToast.bind(this);
    this.handleToastState = this.handleToastState.bind(this);
  }

  componentDidUpdate(prevProps) {
    this.handleToastState(prevProps);
  }

  handleToastState(prevProps) {
    const {message, setAt} = this.props.toast;
    const prevSetAt = prevProps.toast && prevProps.toast.setAt;

    if (message && setAt !== prevSetAt) {
      this.resetToast();
    }
  }

  resetToast() {
    this.setShow(false, () => this.setShow(true));
  }

  setShow(value, callback = null) {
    this.setState({show: value}, callback);
  }

  render() {
    const {
      state: {show},
      props: {toast},
    } = this;

    if (!show) { return null; }

    return (
      <StyledToast
        onClose={() => this.setShow(false)}
        delay={3000}
        show
        autohide
      >
        <StyledAlert variant="success">
          {toast && toast.message}
        </StyledAlert>
      </StyledToast>
    );
  }
}

AppToast.propTypes = {
  toast: PropTypes.object,
};

AppToast.defaultProps = {
  toast: null,
};

const mapStateToProps = (state, props) => ({
  toast: getToast(state, props),
});


export {AppToast};

export default connect(mapStateToProps, null)(AppToast);
