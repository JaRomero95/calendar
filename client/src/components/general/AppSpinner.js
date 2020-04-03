import React from 'react';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// FIXME: import colors from another file
const SpinnerContent = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #7C73E6;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #7C73E6 transparent transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }

  &:nth-child(2) {
    animation-delay: -0.3s;
  }

  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const AppSpinner = () => (
  <SpinnerWrapper>
    <SpinnerContent />
    <SpinnerContent />
    <SpinnerContent />
  </SpinnerWrapper>
);

export {AppSpinner};

export default AppSpinner;
