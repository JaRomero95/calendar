import React from 'react';
import styled from 'styled-components';

const Footer = styled.div`
  padding: 1rem;
  text-align: center;
`;

const AppFooter = () => (
  <Footer>
    <span>Juan Antonio Romero Molero</span>
    <span>Factorial Calendar</span>
  </Footer>
);

export {AppFooter};

export default AppFooter;
