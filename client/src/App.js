import React, {Component} from 'react';
import Loading from 'components/general/AppLoading';
import EventsPage from 'components/events/EventsPage';

class App extends Component {
  render() {
    return (
      <div>
        <Loading />
        <EventsPage />
      </div>
    );
  }
}

export default App;
