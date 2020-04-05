import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {RawIntlProvider} from 'react-intl';
import intl from 'i18n/intl';
import 'i18n/initDate';
import './styles/index.scss';
import App from 'components/general/App';
import * as serviceWorker from './serviceWorker';
import store from './store';

const rootElement = document.getElementById('root');

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
