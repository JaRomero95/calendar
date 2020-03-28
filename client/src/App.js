import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import {fetchEvents} from 'store/modules/events/actions';

const localizer = momentLocalizer(moment);

class App extends Component {
  componentDidMount() {
    const {fetchEvents} = this.props;
    fetchEvents({});
    console.log('process.env :', process.env);
  }

  render() {
    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{height: 500}}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchEvents: params => {
    dispatch(fetchEvents(params));
  },
});

export default connect(null, mapDispatchToProps)(App);
