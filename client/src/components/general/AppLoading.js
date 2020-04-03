import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {generalSelectors} from 'store/modules/general';
import {FormattedMessage} from 'react-intl';
import AppSpinner from './AppSpinner';

const LoaderWrapper = styled.div`
  z-index: 1100;
  background-color: rgba(255, 255, 255, 0.8);
  color: #7C73E6;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoaderContentWrapper = styled.div`
  text-align: center;
`;

const LoaderText = styled.div`
  font-size: 1.5em;
  margin-top: 1.2rem;
`;

class AppLoading extends Component {
  render() {
    const {isLoading} = this.props;

    if (!isLoading) { return null; }

    return (
      <LoaderWrapper>
        <LoaderContentWrapper>
          <AppSpinner />
          <LoaderText>
            <FormattedMessage id="general.loading" />
          </LoaderText>
        </LoaderContentWrapper>
      </LoaderWrapper>
    );
  }
}

AppLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, props) => ({
  isLoading: generalSelectors.isLoading(state, props),
});

export {AppLoading};

export default connect(mapStateToProps, null)(AppLoading);
