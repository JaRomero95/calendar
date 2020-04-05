import React from 'react';
import {shallow} from 'enzyme';
import {App} from 'components/general/App';

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});
