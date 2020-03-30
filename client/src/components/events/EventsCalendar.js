import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import {fetchEvents} from 'store/modules/events/actions';
import {eventSelectors} from 'store/modules/events';
import {eventsType} from 'types/events';
import dateRangeCalculator from 'lib/dateRangeCalculator';

const localizer = momentLocalizer(moment);

class AppCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDateFrom: moment().startOf('month'),
      startDateUntil: moment().endOf('month'),
      type: 'month',
    };

    this.onRangeChange = this.onRangeChange.bind(this);
    this.loadEvents = this.loadEvents.bind(this);
  }

  componentDidMount() {
    this.loadEvents();
  }

  onRangeChange(range, newType) {
    const type = newType || this.state.type;
    const calculatedRange = dateRangeCalculator[type](range);

    this.setState({
      type,
      ...calculatedRange,
    });

    this.loadEvents();
  }

  loadEvents() {
    const {
      props: {fetchEvents},
      state: {
        startDateFrom,
        startDateUntil,
      },
    } = this;

    fetchEvents({startDateFrom, startDateUntil});
  }

  render() {
    const {
      onRangeChange,
      props: {
        events,
        onSelectEvent,
      },
    } = this;

    return (
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onRangeChange={onRangeChange}
        onSelectEvent={onSelectEvent}
        style={{
          width: '100%',
          // minHeight: '100%',
          // height: '500px',
        }}
      />
    );
  }
}

AppCalendar.propTypes = {
  events: eventsType.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  onSelectEvent: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  events: eventSelectors.getFormattedEvents(state, props),
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: params => {
    dispatch(fetchEvents(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppCalendar);
