import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'flatpickr/dist/themes/light.css';
import {RawIntlProvider} from 'react-intl';
import intl from 'i18n/intl';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';

const rootElement = document.getElementById('root');

// TODO: <React.StrictMode></React.StrictMode>

ReactDOM.render(
  <RawIntlProvider value={intl}>
    <Provider store={store}>
      <App />
    </Provider>
  </RawIntlProvider>,
  rootElement,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
