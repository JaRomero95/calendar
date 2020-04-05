import React from 'react';
import PropTypes from 'prop-types';
import {FormattedDate, FormattedTime} from 'react-intl';

const AppFormattedDateTime = ({date}) => (
  <p>
    <FormattedDate value={date} />
    &nbsp;
    <FormattedTime value={date} />
  </p>
);

AppFormattedDateTime.propTypes = {
  date: PropTypes.string.isRequired,
};

export {AppFormattedDateTime};

export default AppFormattedDateTime;
