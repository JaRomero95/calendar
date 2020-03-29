import React from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

const FormText = styled(Form.Text)`
  &:first-letter {
    text-transform: uppercase;
  }
`;


const AppFormError = ({children}) => (
  <FormText className="text-danger">
    {children}
  </FormText>
);

export default AppFormError;
