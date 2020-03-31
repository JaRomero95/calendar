import React from 'react';
import styled from 'styled-components';
import AppFooter from './AppFooter';

const Wrapper = styled.div`
  height: 100vh;
  min-height: 550px;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  padding: 1rem 0 0;

  @media (min-width: 500px) {
    padding: 1rem 2rem 0;

    & > div {
      width: 100%
    }
  }
`;

const AppLayout = ({children}) => (
  <Wrapper className="wrapper1">
    <Main>
      {children}
    </Main>
    <AppFooter />
  </Wrapper>
);

export default AppLayout;
