import React, {Component} from 'react';
import Loading from 'components/general/AppLoading';
import EventsPage from 'components/events/EventsPage';
import AppLayout from 'components/general/AppLayout';

class App extends Component {
  render() {
    return (
      <>
        <Loading />
        <AppLayout>
          <EventsPage />
        </AppLayout>
      </>
    );
  }
}

export default App;
