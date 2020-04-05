import PropTypes from 'prop-types';

const eventsType = PropTypes.array;

const eventType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
});

export {
  eventsType,
  eventType,
};
