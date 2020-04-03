import React from 'react';
import styled from 'styled-components';

const Button = styled.input`
  display: none;
`;

const AppForceSubmit = () => (
  <Button
    type="submit"
    tabindex="-1"
  />
);

export {AppForceSubmit};

export default AppForceSubmit;
