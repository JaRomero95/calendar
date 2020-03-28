import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import {fetchEvents} from 'store/modules/events/actions';
import {eventSelectors} from 'store/modules/events';
import {eventsType} from 'types/events';

const localizer = momentLocalizer(moment);

class AppCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDateFrom: moment().startOf('month'),
      startDateUntil: moment().endOf('month'),
    };
  }

  componentDidMount() {
    const {
      props: {fetchEvents},
      state: {
        startDateFrom,
        startDateUntil,
      },
    } = this;

    fetchEvents({startDateFrom, startDateUntil});

    this.onRangeChange = this.onRangeChange.bind(this);
  }

  onRangeChange({start, end}) {
    this.setState({
      startDateFrom: start,
      startDateUntil: end,
    });
  }

  render() {
    const {
      onRangeChange,
      onNavigate,
      onViewcontrols,
      onDrillDown,
      props: {events},
    } = this;

    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onRangeChange={onRangeChange}
          style={{height: 500}}
        />
      </div>
    );
  }
}

AppCalendar.propTypes = {
  events: eventsType.isRequired,
  fetchEvents: PropTypes.func.isRequired,
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
