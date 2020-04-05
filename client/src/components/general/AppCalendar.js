import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {Calendar, momentLocalizer} from 'react-big-calendar';

const localizer = momentLocalizer(moment);

const StyledCalendar = styled(Calendar)`
  .rbc-toolbar {
    display: flex;
    flex-direction: column;
    align-items: space-between;
    padding-bottom: 0.7rem;

    .rbc-toolbar-label {
      margin: 0.5rem 0;
    }

    @media (min-width: 500px) {
      flex-direction: row;
    }

    .rbc-btn-group button {
      outline: none;
    }
  }
`;

const AppCalendar = props => (
  <StyledCalendar
    localizer={localizer}
    startAccessor="start"
    endAccessor="end"
    {...props}
  />
);

export {AppCalendar};

export default AppCalendar;
